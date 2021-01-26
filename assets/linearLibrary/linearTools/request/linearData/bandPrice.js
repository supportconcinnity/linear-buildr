"use strict";
const {  BigNumber } = require("ethers");
const pageResults = require("graph-results-pager");
const { bn2n } = require("@/common/bnCalc");

const maxRequest = 1000;

const graphAPIEndpoints = {
    1: process.env.GRAPH_BAND_BINANCE_MAINNET,
    3: process.env.GRAPH_BAND_BINANCE_TESTNET,
    56: process.env.GRAPH_BAND_BINANCE_MAINNET,
    97: process.env.GRAPH_BAND_BINANCE_TESTNET
};

module.exports = {
    pageResults,
    graphAPIEndpoints,
    band: {
        pricesLast({
            max = maxRequest,
            source = undefined,
            sources = [],
            networkId = $nuxt.$store.state?.walletNetworkId
        } = {}) {
            return graphResultsPager({
                api: graphAPIEndpoints[networkId],
                max,
                query: {
                    entity: "pricesLasts",
                    selection: {
                        where: {
                            id: source ? `\\"${source}\\"` : undefined,
                            id_in: sources.length != 0
                            ? "[" +
                                sources
                                  .map(code => `\\"${code}\\"`)
                                  .join(",") +
                              "]"
                            : undefined,
                        }
                    },
                    properties: ["id", "currentPrice", "lastPrice"]
                }
            })
                .then(results =>
                    results.map(({ id, currentPrice, lastPrice }) => ({
                        source: id,
                        currentPrice: bn2n(BigNumber.from(currentPrice)),
                        lastPrice: bn2n(BigNumber.from(lastPrice)),
                    }))
                )
                .catch(err => console.error(err));
        },
    }
};
