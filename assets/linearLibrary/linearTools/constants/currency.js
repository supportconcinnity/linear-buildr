import _ from "lodash";

export const CRYPTO_CURRENCIES = ["ETH","BNB", "LINA", "lUSD"];
export const CRYPTO_CURRENCY_TO_KEY = _.keyBy(CRYPTO_CURRENCIES, key => key);
