import { NETWORK_SPEEDS_TO_KEY } from "@/assets/linearLibrary/linearTools/constants/network";

export const state = () => ({
    locale: "en", //默认语言
    theme: "light", //默认主题,light或dark
    walletType: "", //选择了什么钱包
    currentAction: 0, //应用页面跳转控制 1build 2burn 3claim 4transfer
    currentChain: 0, //当前链 0eth 1bsc
    gasDetails: { price: 0, type: NETWORK_SPEEDS_TO_KEY.MEDIUM, status: -1 }, //gas设置详情,-1未初始化,1已初始化
    wallet: { address: "", status: -1 }, //钱包 address=钱包地址,status:-1=未初始化数据,0:更新中,1更新完成,2更新失败,
    walletDetails: {}, //钱包详情
    walletDetailsLoopRefreshStatus: true,
    walletNetworkName: "MAINNET"
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
        state.currentAction = data;
    },

    setCurrentChain(state, value) {
        state.currentChain = value;
    },

    setWallet(state, wallet) {
        state.wallet = wallet;
    },

    mergeWallet(state, wallet) {
        state.wallet = { ...state.wallet, ...wallet };
    },

    setWalletDetails(state, walletDetails) {
        state.walletDetails = walletDetails;
    },

    mergeWalletDetails(state, walletDetails) {
        state.walletDetails = { ...state.walletDetails, ...walletDetails };
    },

    setWalletNetworkName(state, walletNetworkName) {
        state.walletNetworkName = walletNetworkName;
    },

    setLoopRefreshStatus(state, status) {
        state.walletDetailsLoopRefreshStatus = status;
    }
};

export const actions = {
    //服务端渲染才调用
    // async nuxtServerInit({ commit }, { req }) {}
};
