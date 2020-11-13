import {
    getEthereumNetwork,
    getBinanceNetwork,
    SUPPORTED_WALLETS_MAP,
    INFURA_PROJECT_ID,
    onMetamaskAccountChange,
    onBinanceAccountChange,
    onBinanceChainChange
} from "./network";
import { LinearJs } from "../linearJs";
import $pub from "pubsub-js";
import { storeDetailsData } from "./request";

let lnrJSConnector = {
    signers: LinearJs.signers,
    setContractSettings: function(contractSettings) {
        this.lnrJS = new LinearJs(contractSettings);
        this.signer = this.lnrJS.contractSettings.signer;
        this.provider = this.lnrJS.contractSettings.provider;
        this.utils = this.lnrJS.utils;
    }
};

export const connectToWallet = async networkType => {
    try {
        let network;
        if (networkType == SUPPORTED_WALLETS_MAP.BINANCE_CHAIN) {
            network = await getBinanceNetwork();
        } else if (networkType == SUPPORTED_WALLETS_MAP.METAMASK) {
            network = await getEthereumNetwork();
        }

        const { name, networkId } = network;

        if (!name) {
            throw new Error("not support network");
        }

        setSigner({ type: networkType, networkId });

        switch (networkType) {
            case SUPPORTED_WALLETS_MAP.METAMASK:
                return connectToMetamask(networkId, name);
            case SUPPORTED_WALLETS_MAP.BINANCE_CHAIN:
                return connectToBinance(networkId, name);
            case SUPPORTED_WALLETS_MAP.WALLET_CONNECT:
                return connectToWalletConnect(networkId, name);
            default:
                return {};
        }
    } catch (error) {
        console.log(error, "connectToWallet error");
        return false;
    }
};

const connectToMetamask = async (networkId, networkName) => {
    const walletState = {
        walletType: SUPPORTED_WALLETS_MAP.METAMASK
    };
    try {
        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = true;
            await window.ethereum.enable();
        }
        const accounts = await lnrJSConnector.signer.getNextAddresses();
        if (accounts && accounts.length > 0) {
            return {
                ...walletState,
                currentWallet: accounts[0],
                networkId,
                networkName: networkName.toLowerCase()
            };
        } else {
            return {
                ...walletState
            };
        }
    } catch (e) {
        console.log(e);
        return {
            ...walletState,
            msg: e
        };
    }
};

const connectToBinance = async (networkId, networkName) => {
    const walletState = {
        walletType: SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
    };
    try {
        if (window.BinanceChain) {
            window.BinanceChain.autoRefreshOnNetworkChange = true;
            await window.BinanceChain.enable();
        }
        const accounts = await lnrJSConnector.signer.getNextAddresses();
        if (accounts && accounts.length > 0) {
            return {
                ...walletState,
                currentWallet: accounts[0],
                networkId,
                networkName: networkName.toLowerCase()
            };
        } else {
            return {
                ...walletState
            };
        }
    } catch (e) {
        console.log(e);
        return {
            ...walletState,
            msg: e
        };
    }
};

const connectToWalletConnect = async (networkId, networkName) => {
    const walletState = {
        walletType: SUPPORTED_WALLETS_MAP.WALLET_CONNECT
    };
    try {
        await lnrJSConnector.signer.provider._web3Provider.enable();
        const accounts = await lnrJSConnector.signer.getNextAddresses();

        if (accounts && accounts.length > 0) {
            return {
                ...walletState,
                currentWallet: accounts[0],
                networkId,
                networkName: networkName.toLowerCase()
            };
        }
    } catch (e) {
        console.log(e);
        return {
            ...walletState,
            msg: e
        };
    }
};

export const setSigner = ({ type, networkId }) => {
    const signer = new lnrJSConnector.signers[type](
        getSignerConfig({ type, networkId })
    );
    lnrJSConnector.setContractSettings({
        networkId,
        signer
    });
};

const getSignerConfig = ({ type, networkId }) => {
    if (type === SUPPORTED_WALLETS_MAP.WALLET_CONNECT) {
        return {
            infuraId: INFURA_PROJECT_ID
        };
    }
    return {};
};

export const selectedWallet = async walletType => {
    try {
        //连接钱包
        const walletStatus = await connectToWallet(walletType);
        const store = $nuxt.$store;

        //连接成功
        if (walletStatus && walletStatus?.currentWallet) {
            store.commit(
                "setWalletNetworkName",
                walletStatus?.networkName.toUpperCase()
            );
            store.commit("setWalletType", walletType);

            //防止onWalletAccountChange内数据未更新时,太快进入功能子页获取不到wallet的问题
            store.commit("mergeWallet", {
                address: walletStatus?.currentWallet
            });

            //绑定事件
            if (walletType == SUPPORTED_WALLETS_MAP.METAMASK) {
                store.commit("setCurrentChain", 0);

                onMetamaskAccountChange(async (wallet, walletType) => {
                    const address = await lnrJSConnector.signer.getNextAddresses();
                    const signer = new lnrJSConnector.signers[
                        SUPPORTED_WALLETS_MAP.METAMASK
                    ]({});
                    lnrJSConnector.setContractSettings({
                        networkId: walletStatus.networkId,
                        signer
                    });

                    store.commit("mergeWallet", {
                        address: address[0]
                    });

                    //回到起始页,防止数据错误
                    store.commit("setCurrentAction", 0);
                    storeDetailsData();
                });
            } else if (walletType == SUPPORTED_WALLETS_MAP.BINANCE_CHAIN) {
                store.commit("setCurrentChain", 1);

                onBinanceAccountChange(async wallet => {
                    const address = await lnrJSConnector.signer.getNextAddresses();
                    const signer = new lnrJSConnector.signers[
                        SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                    ]({});

                    lnrJSConnector.setContractSettings({
                        networkId: walletStatus.networkId,
                        signer
                    });

                    store.commit("mergeWallet", {
                        address: address[0]
                    });

                    //回到起始页,防止数据错误
                    store.commit("setCurrentAction", 0);
                    storeDetailsData();
                });

                //切换网络刷新页面
                onBinanceChainChange(chainId => {
                    location.reload();
                });
            } else if (walletType == SUPPORTED_WALLETS_MAP.WALLET_CONNECT) {
            }

            //连接成功,更新数据
            storeDetailsData();

            return true;
        } else {
            console.log("Connect wallet fail");
            return false;
        }
    } catch (error) {
        console.log(error, "selectedWallet error");
        return false;
    }
};

export default lnrJSConnector;
