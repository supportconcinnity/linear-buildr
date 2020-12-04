"use strict";

const pageResults = require("graph-results-pager");

const graphAPIEndpoints = {
    ethereum:
        "https://api.thegraph.com/subgraphs/name/linear-tech/linear-exchange-ropsten",

    binance:
        "https://graph-api.linear.finance/subgraphs/name/linear-tech/linear-exchange-bsc"
};

const maxRequest = 1000;

module.exports = {
    pageResults,
    graphAPIEndpoints,
    exchange: {
        pricesLast({
            max = maxRequest,
            source = undefined,
            graphApi = undefined
        } = {}) {
            if (!graphApi) {
                graphApi = $nuxt.$store.state?.currentGraphApi;
            }
            return pageResults({
                api: graphAPIEndpoints[graphApi],
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
