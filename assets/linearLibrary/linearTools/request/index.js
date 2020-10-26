import _ from "lodash";
import lnrJSConnector from "../lnrJSConnector";

import { CRYPTO_CURRENCIES } from "../constants/currency";
import { formatNumber, formatEtherToNumber } from "../format";
import { WALLET_STATUS } from "../network";
import { BigNumber } from "ethers";

import {
    bnAdd,
    bnSub,
    bnMul,
    bnDiv,
    bnAdd2N,
    bnSub2N,
    bnMul2N,
    bnDiv2N
} from "@/common/bnCalc";

/**
 * 获取Liquids总数
 */
export const getLiquids = async () => {
    const {
        lnrJS: {
            LnAssetSystem,
            contractSettings: { addressList }
        },
        utils
    } = lnrJSConnector;

    //获取资产列表
    const assetAddress = await LnAssetSystem.getAssetAddresses();

    let liquids = BigNumber.from(0);

    //遍历资产合约
    assetAddress.map(address => {
        Object.keys(addressList).map(async key => {
            if (addressList[key] == address) {
                let asset = lnrJSConnector.lnrJS[key];
                let balance = await asset.balanceOf(address);
                liquids = liquids == null ? balance : liquids.add(balance);
            }
        });
    });

    return liquids;
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
 * 保存详情面板下所有数据到store中
 * @param {Store} store
 * @param {String} wallet 钱包地址
 */
export const storeDetailsData = async (store, wallet) => {
    if (wallet) {
        //记录之前状态
        // const status = store.state?.wallet?.status || WALLET_STATUS.UNINIT;
        try {
            await store.commit("setWallet", {
                address: wallet,
                status: WALLET_STATUS.UPDATING
            });

            const {
                lnrJS: {
                    LnProxyERC20,
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
                LnCollateralSystem.GetUserTotalCollateralInUsd(wallet),
                getBuildRatio(),
                LnProxyERC20.balanceOf(wallet),
                LnCollateralSystem.userCollateralData(
                    wallet,
                    utils.formatBytes32String("LINA")
                ),
                LnRewardLocker.balanceOf(wallet),
                lUSD.balanceOf(wallet),
                provider.getBalance(wallet),
                getLiquids(),
                LnDebtSystem.GetUserDebtBalanceInUsd(wallet)
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
            // console.log(amountDebt[0], "amountDebt request");
            //获取货币->USD 兑换率
            const priceRates = await getPriceRates(CRYPTO_CURRENCIES);
            const LINA2USDRate = priceRates.LINA / 1e18 || 1;
            const lUSD2USDRate = priceRates.lUSD / 1e18 || 1;
            const ETH2USDRate = priceRates.ETH / 1e18 || 1;

            // console.log(priceRates, "priceRates");

            //大数计算测试,无用时删除
            /*  console.log(
                priceRates.LINA.toString(),
                priceRates.lUSD.toString(),
                priceRates.ETH.toString(),
                "bigNumber------------------------",
                bnAdd(priceRates.LINA, priceRates.ETH),
                bnSub(priceRates.LINA, priceRates.ETH),
                bnMul(priceRates.LINA, priceRates.ETH),
                bnDiv(priceRates.LINA, priceRates.ETH),
                "bigNumber To Number------------------------",
                bnAdd2N(priceRates.LINA, priceRates.ETH),
                bnSub2N(priceRates.LINA, priceRates.ETH),
                bnMul2N(priceRates.LINA, priceRates.ETH),
                bnDiv2N(priceRates.LINA, priceRates.ETH),
                "formatEther------------------------",
                utils.formatEther(bnAdd(priceRates.LINA, priceRates.ETH)),
                utils.formatEther(bnSub(priceRates.LINA, priceRates.ETH)),
                utils.formatEther(bnMul(priceRates.LINA, priceRates.ETH)),
                utils.formatEther(bnDiv(priceRates.LINA, priceRates.ETH)),
                "Manual To Number------------------------",
                bnAdd(priceRates.LINA, priceRates.ETH) / 1e18,
                bnSub(priceRates.LINA, priceRates.ETH) / 1e18,
                bnMul(priceRates.LINA, priceRates.ETH) / 1e18,
                bnDiv(priceRates.LINA, priceRates.ETH) / 1e18,
                "composition",
                bnAdd(
                    bnAdd(priceRates.LINA, priceRates.ETH),
                    bnSub(priceRates.LINA, priceRates.ETH)
                ) / 1e18,
                bnMul(
                    bnAdd(priceRates.LINA, priceRates.ETH),
                    bnDiv(priceRates.LINA, priceRates.ETH)
                ) / 1e18
            ); */

            // console.log(
            //     totalCollateralInUsd / (priceRates.lUSD / 1e18),
            //     "totalCollateralInUsd"
            // );

            const currentRatioPercent =
                totalCollateralInUsd != 0 && amountDebt[0] != 0
                    ? (totalCollateralInUsd / amountDebt[0]) * 100
                    : 0;

            const amountLINA = avaliableLINA + stakedLINA + lockLINA;
            const amountLINA2USD = avaliableLINA * LINA2USDRate;
            const amountlUSD2USD = amountlUSD * lUSD2USDRate;
            const amountETH2USD = amountETH * ETH2USDRate;
            const liquids2USD = liquids * lUSD2USDRate;
            const amountDebt2USD = amountDebt[0] * lUSD2USDRate;
            const totalCryptoBalanceInUSD =
                amountLINA2USD + amountETH2USD + liquids2USD;

            //所有资产余额
            const transferableAssets = {
                ETH: amountETH,
                LINA: avaliableLINA,
                lUSD: amountlUSD
            };

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
                liquids,
                liquids2USD,
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

            await store.commit("setWalletDetails", formatData);
            await store.commit("mergeWallet", { status: WALLET_STATUS.FINISH });
            return formatData;
        } catch (error) {
            await store.commit("mergeWallet", { status: WALLET_STATUS.ERROR });
            console.log(error, "storeDetailsData error");
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
