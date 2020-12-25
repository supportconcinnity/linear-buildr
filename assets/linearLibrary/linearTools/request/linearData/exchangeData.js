"use strict";

const pageResults = require("graph-results-pager");

const maxRequest = 1000;

const graphAPIEndpoints = {
    1: process.env.GRAPH_EXCHANGE_ETHEREUM_MAINNET,
    3: process.env.GRAPH_EXCHANGE_ETHEREUM_ROPSTEN,
    56: process.env.GRAPH_EXCHANGE_BINANCE_MAINNET,
    97: process.env.GRAPH_EXCHANGE_BINANCE_TESTNET
};

module.exports = {
    pageResults,
    graphAPIEndpoints,
    exchange: {
        pricesLast({
            max = maxRequest,
            source = undefined,
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return pageResults({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "pricesLasts",
                    selection: {
                        where: {
                            id: source ? `\\"${source}\\"` : undefined
                        }
                    },
                    properties: ["id", "currentPrice", "lastPrice"]
                }
            })
                .then(results =>
                    results.map(({ id, currentPrice, lastPrice }) => ({
                        source: id,
                        currentPrice: currentPrice / 1e18,
                        lastPrice: lastPrice / 1e18
                    }))
                )
                .catch(err => console.error(err));
        }
    }
};
