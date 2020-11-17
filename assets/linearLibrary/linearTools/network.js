import _ from "lodash";
import {
    NETWORK_SPEEDS_TO_KEY,
    GWEI_UNIT,
    GAS_LIMIT_BUFFER
} from "./constants/network";
import { URLS } from "./constants/urls";
import api from "@/api";

export const SUPPORTED_NETWORKS = {
    1: "MAINNET",
    3: "ROPSTEN",
    56: "BSCMAINNET",
    97: "BSCTESTNET"
};

export const WALLET_EXTENSIONS = {
    METAMASK:
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    BINANCE:
        "https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp"
};

export const SUPPORTED_NETWORKS_MAP = _.invert(SUPPORTED_NETWORKS);

export const DEFAULT_GAS_LIMIT = {
    approve: 220000,
    staking: 220000,
    build: 500000,
    burn: 500000,
    unstake: 500000,
    claim: 140000,
    exchange: 22000
};

export const WALLET_STATUS = {
    UNINIT: -1, //未初始化
    UPDATING: 0, //更新中
    FINISH: 1, //更新完成
    ERROR: 2 //更新失败
};

//infura project id
export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

export const INFURA_JSON_RPC_URLS = {
    1: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    3: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`
};

export const SUPPORTED_WALLETS_MAP = {
    METAMASK: "MetaMask",
    BINANCE_CHAIN: "BinanceChain",
    WALLET_CONNECT: "WalletConnect"
};

export async function getEthereumNetwork() {
    if (!window.web3) {
        window.open(WALLET_EXTENSIONS.METAMASK);
        return { name: "MAINNET", networkId: 1 };
    }
    let networkId = 1;
    try {
        if (window.web3?.eth?.net) {
            networkId = await window.web3.eth.net.getId();
            return {
                name: SUPPORTED_NETWORKS[networkId],
                networkId: Number(networkId)
            };
        } else if (window.web3?.version?.network) {
            networkId = Number(window.web3.version.network);
            return { name: SUPPORTED_NETWORKS[networkId], networkId };
        } else if (window.ethereum?.networkVersion) {
            networkId = Number(window.ethereum?.networkVersion);
            return { name: SUPPORTED_NETWORKS[networkId], networkId };
        }
        return { name: "MAINNET", networkId };
    } catch (e) {
        console.log(e);
        return { name: "MAINNET", networkId };
    }
}

export async function getBinanceNetwork() {
    if (!window.BinanceChain) {
        window.open(WALLET_EXTENSIONS.BINANCE);
        return { name: "BSCMAINNET", networkId: 1 };
    }
    let networkId = 56;
    try {
        if (window.BinanceChain?.chainId) {
            networkId = Number(window.BinanceChain?.chainId);
            return {
                name: SUPPORTED_NETWORKS[networkId],
                networkId: networkId
            };
        }
        return { name: "BSCMAINNET", networkId };
    } catch (e) {
        console.log(e);
        return { name: "BSCMAINNET", networkId };
    }
}

export const getNetworkSpeeds = async () => {
    const currentChain = $nuxt.$store.state?.currentChain;

    if (currentChain == 0) {
        let result = await fetch(URLS.ETH_GAS_STATION, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        if (result?.status != 200) {
            result = await fetch(URLS.DEFI_PULSE_STATION, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
        }
        const networkInfo = await result.json();
        return {
            [NETWORK_SPEEDS_TO_KEY.SLOW]: {
                price: networkInfo.safeLow / 10,
                time: networkInfo.safeLowWait
            },
            [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
                price: networkInfo.average / 10,
                time: networkInfo.avgWait
            },
            [NETWORK_SPEEDS_TO_KEY.FAST]: {
                price: networkInfo.fast / 10,
                time: networkInfo.fastWait
            }
        };
    } else {
        let currentGasPrice = 0;
        const res = await api.getBSCGasPrice();
        if (res?.result) {
            currentGasPrice = unFormatGasPrice(res.result);
        }
        return {
            [NETWORK_SPEEDS_TO_KEY.SLOW]: {
                price: currentGasPrice * 0.75,
                time: 3
            },
            [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
                price: currentGasPrice,
                time: 2
            },
            [NETWORK_SPEEDS_TO_KEY.FAST]: {
                price: currentGasPrice * 1.25,
                time: 1
            }
        };
    }
};

export const formatGasPrice = gasPrice => gasPrice * GWEI_UNIT;

export const unFormatGasPrice = gasPrice => gasPrice / GWEI_UNIT;

export function onMetamaskAccountChange(cb) {
    if (!window.ethereum) return;
    const listener = _.throttle(cb, 2000);
    window.ethereum.on("accountsChanged", listener);
}

export function onBinanceAccountChange(cb) {
    if (!window.BinanceChain) return;
    const listener = _.throttle(cb, 2000);
    window.BinanceChain.on("accountsChanged", listener);
}

export function onBinanceChainChange(cb) {
    if (!window.BinanceChain) return;
    const listener = _.throttle(cb, 2000);
    window.BinanceChain.on("chainChanged", listener);
}

export const bufferGasLimit = gasLimit =>
    Math.round(Number(gasLimit) * (1 + GAS_LIMIT_BUFFER));
