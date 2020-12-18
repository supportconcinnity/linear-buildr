"use strict";

const pageResults = require("graph-results-pager");

const maxRequest = 1000;

const graphAPIEndpoints = {
    ethereum: process.env.GRAPH_EXCHANGE_ETHEREUM,
    binance: process.env.GRAPH_EXCHANGE_BINANCE
};

module.exports = {
    pageResults,
    graphAPIEndpoints,
    exchange: {
        pricesLast({
            max = maxRequest,
            source = undefined,
            blockChain = undefined
        } = {}) {
            if (!blockChain) {
                blockChain = $nuxt.$store.state?.currentGraphApi;
            }
            return pageResults({
                api: graphAPIEndpoints[blockChain],
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
