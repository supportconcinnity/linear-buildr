export default {
    async getReferralCode(wallet) {
        return await $nuxt.$axios
            .$post("/referral/getCode", { wallet })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    },

    async checkReferralCode(wallet, referral_code) {
        return await this.addReferralCode(wallet, referral_code, true);
    },

    async addReferralCode(wallet, referral_code, only_check = false) {
        return await $nuxt.$axios
            .$post("/referral/addCode", {
                wallet,
                referral_code,
                only_check
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    },

    async getBSCGasPrice() {
        return await $nuxt.$axios
            .$post("https://bsc-dataseed.binance.org", {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_gasPrice",
                params: []
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    },

    async getTokenPrice({ tokenid = [], target = "usd" }) {
        return await $nuxt.$axios
            .$get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${tokenid.join(
                    ","
                )}&vs_currencies=${target}`
            )
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    }
};
