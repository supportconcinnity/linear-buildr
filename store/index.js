import { NETWORK_SPEEDS_TO_KEY } from "@/assets/linearLibrary/linearTools/constants/network";
import {
    SUPPORTED_NETWORKS,
    BLOCKCHAIN
} from "@/assets/linearLibrary/linearTools/network";

export const state = () => ({
    locale: "en", //默认语言
    theme: "light", //默认主题,light或dark
    currentAction: 0, //应用页面跳转控制 1build 2burn 3claim 4transfer
    gasDetails: { price: 0, type: NETWORK_SPEEDS_TO_KEY.MEDIUM, status: -1 }, //gas设置详情,-1未初始化,1已初始化
    gasDetailsETH: { price: 0, type: NETWORK_SPEEDS_TO_KEY.MEDIUM, status: -1 }, //gas设置详情,-1未初始化,1已初始化
    gasDetailsBSC: { price: 0, type: NETWORK_SPEEDS_TO_KEY.MEDIUM, status: -1 }, //gas设置详情,-1未初始化,1已初始化
    wallet: { address: "", status: -1 }, //钱包 address=钱包地址,status:-1=未初始化数据,0:更新中,1更新完成,2更新失败,
    walletDetails: {}, //钱包详情
    walletDetailsLoopRefreshStatus: false,
    walletType: "", //当前钱包类型 参考SUPPORTED_WALLETS_MAP
    walletNetworkId: "1", //当前钱包网络ID 参考 SUPPORTED_NETWORKS
    walletNetworkName: SUPPORTED_NETWORKS["1"], //当前钱包网络名称,参考SUPPORTED_NETWORKS_MAP
    currentGraphApi: BLOCKCHAIN.ETHEREUM, //当前钱包网络子图接口地址
    mMenuState: false, //移动端 显示菜单
    registeredMetamaskWalletEvents: false, //是否已经注册metamask钱包回调事件(onMetamaskAccountChange和onMetamaskChainChange)
    registeredBinanceWalletEvents: false //是否已经注册binance钱包回调事件(onMetamaskAccountChange和onMetamaskChainChange)
});

export const mutations = {
    setTheme(state, theme) {
        state.theme = theme;
    },

    setLocale(state, locale) {
        state.locale = locale;
    },

    setWalletNetworkId(state, walletNetworkId) {
        state.walletNetworkId = walletNetworkId;
    },

    setGasDetails(state, gasDetails) {
        state.gasDetails = gasDetails;
    },

    setGasDetailsETH(state, gasDetails) {
        state.gasDetailsETH = gasDetails;
    },

    setGasDetailsBSC(state, gasDetails) {
        state.gasDetailsBSC = gasDetails;
    },

    setCurrentBlockChain(state, blockChain) {
        state.currentGraphApi = blockChain;
    },

    mergeGasDetails(state, gasDetails) {
        state.gasDetails = { ...state.gasDetails, ...gasDetails };
    },

    setCurrentAction(state, data) {
        state.currentAction = data;
    },

    setWalletType(state, value) {
        state.walletType = value;
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
    },

    setmMenuState(state, status) {
        state.mMenuState = status;
    },

    setRegisteredMetamaskWalletEvents(state, status) {
        state.registeredMetamaskWalletEvents = status;
    },

    setRegisteredBinanceWalletEvents(state, status) {
        state.registeredBinanceWalletEvents = status;
    }
};

export const actions = {
    //服务端渲染才调用
    // async nuxtServerInit({ commit }, { req }) {}
};
