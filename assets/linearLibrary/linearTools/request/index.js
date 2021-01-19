import _ from "lodash";
import lnrJSConnector from "../lnrJSConnector";

import {
    CRYPTO_CURRENCIES,
    CRYPTO_CURRENCIES_API
} from "../constants/currency";
import currencies from "@/common/currency";
import { formatNumber, formatEtherToNumber } from "../format";
import { isBinanceNetwork, isEthereumNetwork, WALLET_STATUS } from "../network";
import config from "@/config/common";
import api from "@/api";
import { n2bn, bn2n, bnMul } from "@/common/bnCalc";

let loopId = 0;

/**
 * 获取所有合成资产余额/汇率列表，所有合成资产换算成lusd的总价值
 */
export const getLiquids = async wallet => {
    const {
        lnrJS: {
            LnAssetSystem,
            contractSettings: { addressList }
        }
    } = lnrJSConnector;

    //获取资产列表
    const assetAddress = await LnAssetSystem.getAssetAddresses();

    let liquids = 0;
    let assetKeys = [];
    let assetPromise = [];
    let liquidsData = {liquids: 0, liquidsList: []};

    //整理数据,判断前端库中是否有该资产的合约
    for (let i = 0; i < assetAddress.length; i++) {
        for (const key in addressList) {
            //获取相同合约地址的数据
            if (addressList[key] == assetAddress[i]) {
                let asset = lnrJSConnector.lnrJS[key];
                //汇总获取price的key
                assetKeys.push(key);

                //汇总取余额的token
                assetPromise.push(asset.balanceOf(wallet));
            }
        }
    }

    //获取汇总数据
    const [assetPrices, assetBalances] = await Promise.all([
        getPriceRates(assetKeys),
        Promise.all(assetPromise)
    ]);

    //计算资产总数
    for (let i = 0; i < assetAddress.length; i++) {
        for (const key in addressList) {
            //相同合约地址的数据
            if (addressList[key] == assetAddress[i] && bn2n(assetBalances[i]) > 0) {
                liquidsData.liquidsList.push({
                    name: key,
                    balance: bn2n(assetBalances[i]),
                    valueUSD: bn2n(bnMul(assetBalances[i], assetPrices[key])),
                    img: currencies[key].icon
                });

                liquids += bn2n(bnMul(assetBalances[i], assetPrices[key]));
            }
        }
    }

    liquidsData.liquids = n2bn(liquids);
    return liquidsData;
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
    const walletNetworkId = $nuxt.$store.state.walletNetworkId;
    const isEthereum = isEthereumNetwork(walletNetworkId);
    const isBinance = isBinanceNetwork(walletNetworkId);

    const rates = {};
    const { utils } = lnrJSConnector;

    let contract;
    if (isEthereum) {
        contract = lnrJSConnector.lnrJS.LnChainLinkPrices;
    } else if (isBinance) {
        contract = lnrJSConnector.lnrJS.LnBandProtocol;
    }

    let pricesPromise = [];

    if (_.isString(currency)) {
        if (
            ["ETH", "BNB"].includes(currency) ||
            (isEthereum && currency == "LINA")
        ) {
            const id = CRYPTO_CURRENCIES_API[currency]?.id;
            const results = await api.getTokenPrice({
                tokenid: [id]
            });
            rates[currency] = n2bn(results[id]?.usd);
        } else {
            rates[currency] = await contract.getPrice(
                utils.formatBytes32String(currency)
            );
        }
    } else if (_.isArray(currency)) {
        for (let index = 0; index < currency.length; index++) {
            const name = currency[index];
            if (
                ["ETH", "BNB"].includes(name) ||
                (isEthereum && name == "LINA")
            ) {
                const id = CRYPTO_CURRENCIES_API[name]?.id;
                pricesPromise.push(
                    api.getTokenPrice({
                        tokenid: [id]
                    })
                );
            } else {
                pricesPromise.push(
                    contract.getPrice(utils.formatBytes32String(name))
                );
            }
        }

        let prices = await Promise.all(pricesPromise);
        for (let index = 0; index < currency.length; index++) {
            const name = currency[index];
            let price = prices[index];

            if (
                ["ETH", "BNB"].includes(name) ||
                (isEthereum && name == "LINA")
            ) {
                const id = CRYPTO_CURRENCIES_API[name]?.id;
                price = n2bn(price[id]?.usd);
            }

            rates[name] = price;
        }
    }

    // console.log(rates, "rates");
    return rates;
};

/**
 * 从coingecko获取兑换率
 * @param {String} currency 货币名称, 参考CRYPTO_CURRENCIES_API
 */
export const getPriceRatesFromApi = async currency => {
    const rates = {};
    const {
        lnrJS: { LnChainLinkPrices },
        utils
    } = lnrJSConnector;
    if (_.isString(currency)) {
        if (currency == "lUSD") {
            rates["lUSD"] = n2bn("1");
        } else if (currency == "LINA") {
            rates["LINA"] = await LnChainLinkPrices.getPrice(
                utils.formatBytes32String("LINA")
            );
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
            if (!["lUSD", "LINA"].includes(c)) {
                ids.push(CRYPTO_CURRENCIES_API[c]?.id);
            }
        }

        const results = await api.getTokenPrice({ tokenid: ids });

        for (const index in currency) {
            const c = currency[index];
            if (c == "lUSD") {
                rates["lUSD"] = n2bn("1");
            } else if (c == "LINA") {
                rates["LINA"] = await LnChainLinkPrices.getPrice(
                    utils.formatBytes32String("LINA")
                );
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

            let LnProxy = lnrJSConnector.lnrJS.LinearFinance;

            // if (isEthereum) {
            //     LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
            // } else if (isBinance) {
            //     LnProxy = lnrJSConnector.lnrJS.LnProxyBEP20;
            // }

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
                amountDebt
            ] = result.map(formatEtherToNumber);

            let liquidsData = await getLiquids(walletAddress);

            //获取货币->USD 兑换率
            const priceRates = await getPriceRates(CRYPTO_CURRENCIES);
            // const priceRates = await getPriceRatesFromApi(CRYPTO_CURRENCIES);

            // console.log(priceRates,'priceRates');
            const LINA2USDRate = priceRates.LINA / 1e18 || 0;
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
            const liquids2USD = formatEtherToNumber(liquidsData.liquids);
            const amountDebt2USD = amountDebt[0] * lUSD2USDRate;
            const totalCryptoBalanceInUSD =
                amountLINA2USD + amountETH2USD + liquids2USD;

            //所有资产余额
            let transferableAssets = [
                {
                    name: "LINA",
                    balance: avaliableLINA,
                    valueUSD: 0,
                    img: require("@/static/LINA_logo.svg")
                }
            ];

            if (isEthereum) {
                transferableAssets.push({
                    name: "ETH",
                    balance: amountETH,
                    valueUSD: 0,
                    img: require("@/static/ETH_logo.svg")
                })
            } else if (isBinance) {
                transferableAssets.push({
                    name: "BNB",
                    balance: amountETH,
                    valueUSD: 0,
                    img: require("@/static/currency/lBNB.svg")
                });
            }

            transferableAssets = transferableAssets.concat(liquidsData.liquidsList);

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
            formatData.liquids = formatNumber(formatEtherToNumber(liquidsData.liquids));
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
