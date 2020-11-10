import _ from "lodash";
import {
    NETWORK_SPEEDS_TO_KEY,
    GWEI_UNIT,
    GAS_LIMIT_BUFFER,
} from "./constants/network";
import { URLS } from "./constants/urls";

export const SUPPORTED_NETWORKS = {
    1: "MAINNET",
    3: "ROPSTEN",
    56: "BSCMAINNET",
    97: "BSCTESTNET"
};

export const SUPPORTED_NETWORKS_MAP = _.invert(SUPPORTED_NETWORKS);

export const DEFAULT_GAS_LIMIT = {
    approve: 220000,
    staking: 220000,
    build: 500000,
    burn: 500000,
    unstake: 500000,
    claim: 140000,
    exchange: 22000,
};

export const WALLET_STATUS = {
    UNINIT: -1, //未初始化
    UPDATING: 0, //更新中
    FINISH: 1, //更新完成
    ERROR: 2, //更新失败
};

//infura project id
export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

export const INFURA_JSON_RPC_URLS = {
    1: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    3: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
};

export const SUPPORTED_WALLETS_MAP = {
    METAMASK: "Metamask",
    WALLET_CONNECT: "WalletConnect",
};

export async function getEthereumNetwork() {
    if (!window.web3) return { name: "MAINNET", networkId: 1 };
    let networkId = 1;
    try {
        if (window.web3?.eth?.net) {
            networkId = await window.web3.eth.net.getId();
            return {
                name: SUPPORTED_NETWORKS[networkId],
                networkId: Number(networkId),
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

export const getNetworkSpeeds = async () => {
    let result = await fetch(URLS.ETH_GAS_STATION, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (result?.status != 200) {
        result = await fetch(URLS.DEFI_PULSE_STATION, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }
    const networkInfo = await result.json();
    return {
        [NETWORK_SPEEDS_TO_KEY.SLOW]: {
            price: networkInfo.safeLow / 10,
            time: networkInfo.safeLowWait,
        },
        [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
            price: networkInfo.average / 10,
            time: networkInfo.avgWait,
        },
        [NETWORK_SPEEDS_TO_KEY.FAST]: {
            price: networkInfo.fast / 10,
            time: networkInfo.fastWait,
        },
    };
};

export const formatGasPrice = (gasPrice) => gasPrice * GWEI_UNIT;

export const unFormatGasPrice = (gasPrice) => gasPrice / GWEI_UNIT;

export function onMetamaskAccountChange(cb) {
    if (!window.ethereum) return;
    const listener = _.throttle(cb, 2000);
    window.ethereum.on("accountsChanged", listener);
}

export const bufferGasLimit = (gasLimit) =>
    Math.round(Number(gasLimit) * (1 + GAS_LIMIT_BUFFER));
