export default {


    async getReferralCode($wallet) {
        return await $nuxt.$axios
            .$post("/referral/getCode", { wallet: $wallet })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    },

    async checkReferralCode($wallet, $code) {
        return await this.addReferralCode($wallet, $code, true);
    },

    async addReferralCode($wallet, $code, $only_check = false) {
        return await $nuxt.$axios
            .$post("/referral/addCode", {
                wallet: $wallet,
                referral_code: $code,
                only_check: $only_check
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    }
};
