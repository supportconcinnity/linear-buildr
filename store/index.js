import { NETWORK_SPEEDS_TO_KEY } from "@/assets/linearLibrary/linearTools/constants/network";
import { SUPPORTED_NETWORKS } from "@/assets/linearLibrary/linearTools/networkMethods";
export const state = () => ({
  locale: "en", //默认语言
  theme: "light", //默认主题,light或dark
  currentAction: 0, //应用页面跳转控制 1build 2burn 3claim 4transfer 5swap
  walletDetailsActionURL: "", //如果url参数有 referral transaction track，则先打开
  gasDetails: { price: 0, type: NETWORK_SPEEDS_TO_KEY.MEDIUM, status: -1 }, //gas设置详情,-1未初始化,1已初始化
  sourceGasDetails: {
    price: 0,
    type: NETWORK_SPEEDS_TO_KEY.MEDIUM,
    status: -1,
    networkId: "",
  }, //swap gas设置详情,-1未初始化,1已初始化
  targetGasDetails: {
    price: 0,
    type: NETWORK_SPEEDS_TO_KEY.MEDIUM,
    status: -1,
    networkId: "",
  }, //swap gas设置详情,-1未初始化,1已初始化
  liquidationStatus: {
    status: false,
    timestamp: 0,
  },
  wallet: { address: "", status: -1 }, //钱包 address=钱包地址,status:-1=未初始化数据,0:更新中,1更新完成,2更新失败,
  walletDetails: {}, //钱包详情
  walletDetailsLoopRefreshStatus: true,
  walletType: "", //当前钱包类型 参考SUPPORTED_WALLETS
  walletNetworkId: "1", //当前钱包网络ID 参考 SUPPORTED_NETWORKS
  walletNetworkName: SUPPORTED_NETWORKS["1"],
  networkDetails: {
    networkId: "",
    network: "",
    provider: "", //web3 provider
    addressList: {}, //contract address
    utils: "",
    signers: "",
    isEthereumNetwork: "", //boolean
    isBinanceNetwork: "", //boolean
    isMainnetNetwork: "", //boolean
    isTestnetNetwork: "", //boolean
    isDevNetwork: "", //boolean
    othersNetwork: [], //network id array
    tokenBridgeApi: "", //tokenBridge url
    blockchainBrowser: "", //chain scan url
    blockchainBrowserApi: "",
  }, // network details according to current wallet's chain
  mMenuState: false, //移动端 显示菜单
  mWalletState: false, //移动端 显示钱包详情
  isMobile: false, //是否移动端
  registeredMetamaskWalletEvents: false, //是否已经注册metamask钱包回调事件(onMetamaskAccountChange和onMetamaskChainChange)
  registeredBinanceWalletEvents: false, //是否已经注册binance钱包回调事件(onMetamaskAccountChange和onMetamaskChainChange)
  registeredWalletConnectEvents: false, //是否已经注册WalletConnect协议回调事件(onWalletConnectAccountChange和onWalletConnectChainChange)
  walletConnect: {
    uri: "https://www.investopedia.com/terms/q/quick-response-qr-code.asp",
    qrcode: false,
  }, // wallet conncect 的 uri连接，在还没生成的时候用教程顶替 , qrcode 为是否显示二维码用
  swapUnfreezeDatas: {}, //swap等待解冻所需数据,用于页面强制刷新后重载swap逻辑
  swapUnfreezeContinue: false, //用于判断用户是否点击了继续swap
  isTransaction: false, // 是否在交易页面
  autoConnect: false, //自动连接钱包
  setupModal: false, //nework setup 窗口
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

  setSourceGasDetails(state, gasDetails) {
    state.sourceGasDetails = { ...gasDetails };
  },

  setTargetGasDetails(state, gasDetails) {
    state.targetGasDetails = { ...gasDetails };
  },

  setLiquidationStatus(state, data) {
    state.liquidationStatus = { ...data };
  },

  // setCurrentBlockChain(state, blockChain) {
  //     state.currentGraphApi = blockChain;
  // },

  mergeGasDetails(state, gasDetails) {
    state.gasDetails = { ...state.gasDetails, ...gasDetails };
  },

  setCurrentAction(state, data) {
    state.currentAction = data;
  },

  setWalletDetailsActionURL(state, data) {
    state.walletDetailsActionURL = data;
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

  setNetworkDetails(state, networkDetails) {
    state.networkDetails = networkDetails;
  },

  setLoopRefreshStatus(state, status) {
    state.walletDetailsLoopRefreshStatus = status;
  },

  setmMenuState(state, status) {
    state.mMenuState = status;
  },

  setmWalletState(state, status) {
    state.mWalletState = status;
  },

  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },

  setRegisteredMetamaskWalletEvents(state, status) {
    state.registeredMetamaskWalletEvents = status;
  },

  setRegisteredBinanceWalletEvents(state, status) {
    state.registeredBinanceWalletEvents = status;
  },

  setRegisteredWalletConnectEvents(state, status) {
    state.registeredWalletConnectEvents = status;
  },

  setSwapUnfreezeDatas(state, datas) {
    state.swapUnfreezeDatas = datas;
  },

  setSwapUnfreezeContinue(state, status) {
    state.swapUnfreezeContinue = status;
  },

  setIsTransaction(state, isTransaction) {
    state.isTransaction = isTransaction;
  },

  setAutoConnect(state, status) {
    state.autoConnect = status;
  },

  setWalletConnect(state, data) {
    state.walletConnect = { ...state.walletConnect, ...data };
  },

  setSetupModal(state, status) {
    state.setupModal = status;
  },
};

export const actions = {
  //服务端渲染才调用
  // async nuxtServerInit({ commit }, { req }) {}
};
