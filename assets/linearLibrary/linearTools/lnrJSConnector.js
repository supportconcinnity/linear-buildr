import {
    getEthereumNetwork,
    SUPPORTED_WALLETS_MAP,
    INFURA_PROJECT_ID
} from "./network";
import { LinearJs } from "../linearJs";


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
        const { name, networkId } = await getEthereumNetwork();

        if (!name) {
            throw new Error("not support network");
        }

        setSigner({ type: networkType, networkId });

        switch (networkType) {
            case SUPPORTED_WALLETS_MAP.METAMASK:
                return connectToMetamask(networkId, name);
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

export default lnrJSConnector;
