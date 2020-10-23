export const state = () => ({
    locale: "en", //默认语言
    theme: "light", //默认主题,light或dark
    walletType: "", //选择了什么钱包
    currentAction: 0, //应用页面跳转控制 1build 2burn 3claim 4transfer
    gasDetails: { price: 0, type: 'MEDIUM', status: -1 }, //gas设置详情,-1未初始化,1已初始化
});

export const mutations = {
    setTheme(state, theme) {
        state.theme = theme;
    },

    setLocale(state, locale) {
        state.locale = locale;
    },

    setWalletType(state, walletType) {
        state.walletType = walletType;
    },

    setGasDetails(state, gasDetails) {
        state.gasDetails = gasDetails;
    },

    mergeGasDetails(state, gasDetails) {
        state.gasDetails = { ...state.gasDetails, ...gasDetails };
    },

    setCurrentAction(state, data) {
        state.currentAction = data
    }
};

export const actions = {
    //服务端渲染才调用
    // async nuxtServerInit({ commit }, { req }) {}
};
