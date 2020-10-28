"use strict";

const pageResults = require("graph-results-pager");

const graphAPIEndpoints = {
    exchange:
        "https://api.thegraph.com/subgraphs/name/ssscott2019/linearexchange"
};

const maxRequest = 1000;

module.exports = {
    pageResults,
    graphAPIEndpoints,
    exchange: {
        pricesLast({ max = maxRequest, source = undefined } = {}) {
            return pageResults({
                api: graphAPIEndpoints.exchange,
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
