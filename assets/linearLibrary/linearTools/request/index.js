import _ from "lodash";
import lnrJSConnector from "../lnrJSConnector";
import exchangeData from "@/assets/linearLibrary/linearTools/request/linearData/exchangeData";

import {
    CRYPTO_CURRENCIES,
    CRYPTO_CURRENCIES_API
} from "../constants/currency";
import { formatNumber, formatEtherToNumber } from "../format";
import { isBinanceNetwork, isEthereumNetwork, WALLET_STATUS } from "../network";
import config from "@/config/common";
import api from "@/api";
import { n2bn, bn2n } from "@/common/bnCalc";

let loopId = 0;

/**
 * 获取Liquids总数
 */
export const getLiquids = async wallet => {
    const {
        lnrJS: {
            LnAssetSystem,
            contractSettings: { addressList }
        },
        utils
    } = lnrJSConnector;

    //获取资产列表
    const assetAddress = await LnAssetSystem.getAssetAddresses();

    let liquids = 0;

    //遍历资产合约
    for (let i = 0; i < assetAddress.length; i++) {
        for (const key in addressList) {
            if (addressList[key] == assetAddress[i]) {
                let asset = lnrJSConnector.lnrJS[key];

                //上exchange时使用合约内价格
                let [balance, price] = await Promise.all([
                    asset.balanceOf(wallet),
                    exchangeData.exchange.pricesLast({ source: key })
                ]);
                liquids += formatEtherToNumber(balance) * price[0].currentPrice;
            }
        }
    }

    return utils.parseEther(liquids.toString());
};

/**
 * 获取当前抵押率基数
 */
export const getBuildRatio = async () => {
    const {
        lnrJS: { LnConfig }
    } = lnrJSConnector;
    let BUILD_RATIO = await LnConfig.BUILD_RATIO();
    let uint = await LnConfig.getUint(BUILD_RATIO);
    return uint;
};

/**
 * 获取兑换率
 * @param {String} currency 货币名称, 参考CRYPTO_CURRENCIES
 */
export const getPriceRates = async currency => {
    const rates = {};
    const {
        lnrJS: { LnChainLinkPrices },
        utils
    } = lnrJSConnector;
    if (_.isString(currency)) {
        rates[currency] = await LnChainLinkPrices.getPrice(
            utils.formatBytes32String(currency)
        );
    } else if (_.isArray(currency)) {
        for (let index = 0; index < currency.length; index++) {
            const name = currency[index];
            rates[name] = await LnChainLinkPrices.getPrice(
                utils.formatBytes32String(name)
            );
        }
    }

    return rates;
};

/**
 * 从coingecko获取兑换率
 * @param {String} currency 货币名称, 参考CRYPTO_CURRENCIES_API
 */
export const getPriceRatesFromApi = async currency => {
    const rates = {};
    if (_.isString(currency)) {
        if (currency == "lUSD") {
            rates["lUSD"] = n2bn("1");
        } else {
            const id = CRYPTO_CURRENCIES_API[currency]?.id;
            const results = await api.getTokenPrice({
                tokenid: [id]
            });
            rates[currency] = n2bn(results[id]?.usd);
        }
    } else if (_.isArray(currency)) {
        let ids = [];

        for (const index in currency) {
            const c = currency[index];
            if (c != "lUSD") {
                ids.push(CRYPTO_CURRENCIES_API[c]?.id);
            }
        }
        const results = await api.getTokenPrice({ tokenid: ids });

        for (const index in currency) {
            const c = currency[index];
            if (c == "lUSD") {
                rates["lUSD"] = n2bn("1");
            } else {
                const id = CRYPTO_CURRENCIES_API[c]?.id;
                rates[c] = n2bn(results[id]?.usd);
            }
        }
    }
    return rates;
};

/**
 * 保存详情面板下所有数据到store中
 */
export const storeDetailsData = async () => {
    const store = $nuxt.$store;
    const walletAddress = store.state?.wallet?.address;

    if (walletAddress) {
        clearTimeout(loopId);

        //之前状态
        // const status = store.state?.wallet?.status;

        try {
            await store.commit("mergeWallet", {
                status: WALLET_STATUS.UPDATING
            });

            const walletNetworkId = store.state.walletNetworkId;
            const isEthereum = isEthereumNetwork(walletNetworkId);
            const isBinance = isBinanceNetwork(walletNetworkId);

            let LnProxy;

            if (isEthereum) {
                LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
            } else if (isBinance) {
                LnProxy = lnrJSConnector.lnrJS.LnProxyBEP20;
            }

            const {
                lnrJS: {
                    LnCollateralSystem,
                    lUSD,
                    LnDebtSystem,
                    LnRewardLocker
                },
                utils,
                provider
            } = lnrJSConnector;

            //可以直接转换数值的组
            const result = await Promise.all([
                LnCollateralSystem.GetUserTotalCollateralInUsd(walletAddress),
                getBuildRatio(),
                LnProxy.balanceOf(walletAddress),
                LnCollateralSystem.userCollateralData(
                    walletAddress,
                    utils.formatBytes32String("LINA")
                ),
                LnRewardLocker.balanceOf(walletAddress),
                lUSD.balanceOf(walletAddress),
                provider.getBalance(walletAddress),
                getLiquids(walletAddress),
                LnDebtSystem.GetUserDebtBalanceInUsd(walletAddress)
            ]);

            const [
                totalCollateralInUsd,
                buildRatio,
                avaliableLINA,
                stakedLINA,
                lockLINA,
                amountlUSD,
                amountETH,
                liquids,
                amountDebt
            ] = result.map(formatEtherToNumber);
            //获取货币->USD 兑换率
            // const priceRates = await getPriceRates(CRYPTO_CURRENCIES);
            const priceRates = await getPriceRatesFromApi(CRYPTO_CURRENCIES);
            const LINA2USDRate = priceRates.LINA / 1e18 || 1;
            const lUSD2USDRate = priceRates.lUSD / 1e18 || 1;
            const ETH2USDRate =
                (isEthereum ? priceRates.ETH : isBinance ? priceRates.BNB : 1) /
                    1e18 || 1;

            const currentRatioPercent =
                totalCollateralInUsd != 0 && amountDebt[0] != 0
                    ? (totalCollateralInUsd / amountDebt[0]) * 100
                    : 0;

            const amountLINA = avaliableLINA + stakedLINA + lockLINA;
            const amountLINA2USD = amountLINA * LINA2USDRate;
            const amountlUSD2USD = amountlUSD * lUSD2USDRate;
            const amountETH2USD = amountETH * ETH2USDRate;
            const liquids2USD = liquids;
            const amountDebt2USD = amountDebt[0] * lUSD2USDRate;
            const totalCryptoBalanceInUSD =
                amountLINA2USD + amountETH2USD + liquids2USD;

            //所有资产余额
            const transferableAssets = {
                LINA: avaliableLINA,
                lUSD: amountlUSD
            };

            let keyName;
            if (isEthereum) {
                keyName = "ETH";
            } else if (isBinance) {
                keyName = "BNB";
            }
            transferableAssets[keyName] = amountETH;

            let formatData = {
                currentRatioPercent,
                targetRatioPercent: 100 / buildRatio,
                amountLINA,
                amountLINA2USD,
                avaliableLINA,
                stakedLINA,
                lockLINA,
                amountlUSD,
                lUSD2USDRate,
                amountlUSD2USD,
                amountETH,
                ETH2USDRate,
                amountETH2USD,
                amountDebt: amountDebt[0],
                amountDebt2USD,
                totalCryptoBalanceInUSD,

                buildRatio,
                totalCollateralInUsd
            };

            //统一格式化数据
            formatData = formatDecimal(formatData, [
                "currentRatioPercent",
                "targetRatioPercent"
            ]);
            formatData.LINA2USDRate = _.floor(LINA2USDRate, 4);
            formatData.priceRates = priceRates;
            //不需要格式化
            formatData.transferableAssets = transferableAssets;
            formatData.liquids = formatNumber(liquids);
            formatData.liquids2USD = formatNumber(liquids2USD);

            // console.log(formatData,'storeDetailsData');

            await store.commit("setWalletDetails", formatData);
            await store.commit("mergeWallet", { status: WALLET_STATUS.FINISH });
            return formatData;
        } catch (error) {
            await store.commit("mergeWallet", { status: WALLET_STATUS.ERROR });
            console.log(error, "storeDetailsData error");
        } finally {
            if (store.state.walletDetailsLoopRefreshStatus) {
                loopId = setTimeout(
                    storeDetailsData,
                    config.walletDetailsRefreshTimeout
                );
            }
        }
    }
};

/**
 * 遍历格式化数据
 * @param {Object} data     //数据
 * @param {Array} ignoreList    //忽略列表
 */
const formatDecimal = (data, ignoreList = []) => {
    let newData = {};

    for (const key in data) {
        newData[key] = ignoreList.includes(key)
            ? _.floor(data[key])
            : formatNumber(data[key]);
    }

    return newData;
};
