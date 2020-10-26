export default {
    async getReferralCode(wallet) {
        return await $nuxt.$axios
            .$post("/referral/getCode", { wallet })
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
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
                only_check,
            })
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err.response);
            });
    },
};
