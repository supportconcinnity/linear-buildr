"use strict";

const pageResults = require("graph-results-pager");

const maxRequest = 1000;

const graphAPIEndpoints = {
    1: process.env.GRAPH_BUILDR_ETHEREUM_MAINNET,
    3: process.env.GRAPH_BUILDR_ETHEREUM_ROPSTEN,
    56: process.env.GRAPH_BUILDR_BINANCE_MAINNET,
    97: process.env.GRAPH_BUILDR_BINANCE_TESTNET
};


module.exports = {
    pageResults,
    graphAPIEndpoints,
    lnr: {
        minted({
            max = maxRequest,
            account = undefined,
            minBlock = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "minteds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined,
                            block_gte: minBlock || undefined
                        }
                    },
                    properties: [
                        "id", // the transaction hash
                        "account", // the address of the burner
                        "timestamp", // the timestamp when this transaction happened
                        "block", // the block in which this transaction happened
                        "value", // the issued amount in lUSD
                        "source" //符号
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({ id, account, timestamp, block, value, source }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            block: Number(block),
                            value: value / 1e18,
                            source: source,
                            symbol: "+"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        burned({
            max = maxRequest,
            account = undefined,
            minBlock = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "burneds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined,
                            block_gte: minBlock || undefined
                        }
                    },
                    properties: [
                        "id", // the transaction hash
                        "account", // the address of the burner
                        "timestamp", // the timestamp when this transaction happened
                        "block", // the block in which this transaction happened
                        "value", // the burned amount in lUSD
                        "source" //符号
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({ id, account, timestamp, block, value, source }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            block: Number(block),
                            value: value / 1e18,
                            source: source,
                            symbol: "-"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        debtSnapshots({
            max = maxRequest,
            account = undefined,
            minBlock = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "debtSnapshots",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined,
                            block_gte: minBlock || undefined
                        }
                    },
                    properties: [
                        "id", // the transaction hash
                        "account", // the address of the burner
                        "timestamp",
                        "debtBalanceOf"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({ id, account, timestamp, debtBalanceOf }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            debtBalanceOf
                        })
                    )
                )
                .catch(err => console.error(err, "debtSnapshot err"));
        },
        transfer({
            account = undefined,
            max = maxRequest,
            minBlock = undefined,
            maxBlock = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "transfers",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            addressStr_contains: account
                                ? `\\"${account}\\"`
                                : undefined,
                            block_gte: minBlock || undefined,
                            block_lte: maxBlock || undefined
                        }
                    },
                    properties: [
                        "id",
                        "to",
                        "from",
                        "value",
                        "block",
                        "timestamp",
                        "source"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({
                            id,
                            block,
                            timestamp,
                            from,
                            to,
                            value,
                            source
                        }) => ({
                            block: Number(block),
                            timestamp: Number(timestamp * 1000),
                            date: new Date(timestamp * 1000),
                            hash: id.split("-")[0],
                            from,
                            to,
                            value: value / 1e18,
                            source: source,
                            symbol:
                                account.toUpperCase() == from.toUpperCase()
                                    ? "-"
                                    : "+"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        feesClaimed({
            max = maxRequest,
            account = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "feesClaimeds",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined
                        }
                    },
                    properties: [
                        "id", // the transaction hash
                        "account", // the address of the claimer
                        "timestamp", // the timestamp when this transaction happened
                        "block", // the block in which this transaction happened
                        "rewardslusd",
                        "rewardsLina"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({
                            id,
                            account,
                            timestamp,
                            block,
                            rewardslusd,
                            rewardsLina
                        }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            block: Number(block),
                            rewardslusd: rewardslusd / 1e18,
                            rewardsLina: rewardsLina / 1e18
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        collateral({
            max = maxRequest,
            account = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "collaterals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined
                        }
                    },
                    properties: [
                        "id",
                        "account",
                        "timestamp",
                        "block",
                        "value",
                        "currency"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({
                            id,
                            account,
                            timestamp,
                            block,
                            value,
                            currency
                        }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            block: Number(block),
                            value: value / 1e18,
                            source: currency,
                            symbol: "-"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        redeemCollateral({
            max = maxRequest,
            account = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "redeemCollaterals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined
                        }
                    },
                    properties: [
                        "id",
                        "account",
                        "timestamp",
                        "block",
                        "value",
                        "currency"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({
                            id,
                            account,
                            timestamp,
                            block,
                            value,
                            currency
                        }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            block: Number(block),
                            value: value / 1e18,
                            source: currency,
                            symbol: "+"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        referral({
            to = undefined,
            max = maxRequest,
            minBlock = undefined,
            maxBlock = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "referrals",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            to: to ? `\\"${to}\\"` : undefined,
                            block_gte: minBlock || undefined,
                            block_lte: maxBlock || undefined
                        }
                    },
                    properties: [
                        "id",
                        "to",
                        "from",
                        "value",
                        "block",
                        "timestamp",
                        "source"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({
                            id,
                            block,
                            timestamp,
                            from,
                            to,
                            value,
                            source
                        }) => ({
                            block: Number(block),
                            timestamp: Number(timestamp * 1000),
                            date: new Date(timestamp * 1000),
                            hash: id.split("-")[0],
                            from,
                            to,
                            value: value / 1e18,
                            source: source,
                            symbol: "+"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        updateUserDebt({
            max = maxRequest,
            filter = {},
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "updateUserDebts",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: filter
                    },
                    properties: [
                        "debtProportion",
                        "debtFactor",
                        "totalAssetSupplyInUsd",
                        "timestamp"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({
                            debtProportion,
                            debtFactor,
                            totalAssetSupplyInUsd,
                            timestamp
                        }) => ({
                            debtProportion: debtProportion,
                            debtFactor: debtFactor,
                            totalAssetSupplyInUsd: totalAssetSupplyInUsd,
                            timestamp: Number(timestamp * 1000)
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        freeZe({
            max = maxRequest,
            account = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "freeZes",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined
                        }
                    },
                    properties: [
                        "id",
                        "account",
                        "timestamp",
                        "value",
                        "currency"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({ id, account, timestamp, value, currency }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            value: value / 1e18,
                            source: currency,
                            symbol: "-"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        unfreeze({
            max = maxRequest,
            account = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "unfreezes",
                    selection: {
                        orderBy: "timestamp",
                        orderDirection: "desc",
                        where: {
                            account: account ? `\\"${account}\\"` : undefined
                        }
                    },
                    properties: [
                        "id",
                        "account",
                        "timestamp",
                        "value",
                        "currency"
                    ]
                }
            })
                .then(results =>
                    results.map(
                        ({ id, account, timestamp, value, currency }) => ({
                            hash: id.split("-")[0],
                            account,
                            timestamp: Number(timestamp * 1000),
                            value: value / 1e18,
                            source: currency,
                            symbol: "+"
                        })
                    )
                )
                .catch(err => console.error(err));
        },
        userSwapAssetsCount({
            max = maxRequest,
            account = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "userSwapAssetsCounts",
                    selection: {
                        where: {
                            id: account ? `\\"${account}\\"` : undefined
                        }
                    },
                    properties: ["id", "freeZeTokens", "UnFreeZeTokens"]
                }
            })
                .then(results =>
                    results.map(({ id, freeZeTokens, UnFreeZeTokens }) => ({
                        account: id,
                        freeZeTokens: freeZeTokens / 1e18,
                        UnFreeZeTokens: UnFreeZeTokens / 1e18
                    }))
                )
                .catch(err => console.error(err));
        }
    }
};
