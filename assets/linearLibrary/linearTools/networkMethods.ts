import _ from "lodash";
import {
  NETWORK_SPEEDS_TO_KEY,
  GWEI_UNIT,
  GAS_LIMIT_BUFFER,
} from "./constants/network";
import { ChainType, networksMap, NetworkType } from "./networkConnector";
import { URLS } from "./constants/urls";
import api from "@/api";
import { ethers } from "ethers";

let window: any;

export enum SUPPORTED_WALLETS {
  METAMASK = "MetaMask",
  BINANCE_CHAIN = "BinanceChain",
  WALLET_CONNECT = "WalletConnect",
}

/**
 * PC端钱包安装地址
 */
export const WALLET_EXTENSIONS = {
  METAMASK:
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
  BINANCE:
    "https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp",
};

/**
 * 链切换类型
 * network 钱包内切换网络
 * wallet 切换钱包
 */
export const CHAIN_CHANGE_TYPE = {
  NETWORK: "network",
  WALLET: "wallet",
};

/**
 * 默认gas 限制
 */
export const DEFAULT_GAS_LIMIT = {
  approve: 300000,
  staking: 300000,
  build: 500000,
  burn: 500000,
  unstake: 500000,
  claim: 140000,
  exchange: 22000,
  freeze: 200000,
  unfreeze: 200000,
};

/**
 * 钱包信息更新状态
 */
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

//RPC网络配置
export const ETHEREUM_CHAIN_OPTIONS = {
  56: {
    chainName: "BSC Mainnet",
    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
    chainId: "0x38",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

export const getNetworkSpeeds = async (
  networkType: NetworkType,
  chainType: ChainType,
  walletNetworkId: number
) => {
  if (networkType === NetworkType.DEV) {
    return {
      [NETWORK_SPEEDS_TO_KEY.SLOW]: {
        price: 10,
        time: 1,
      },
      [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
        price: 15,
        time: 0.5,
      },
      [NETWORK_SPEEDS_TO_KEY.FAST]: {
        price: 20,
        time: 0.2,
      },
    };
  } else if (chainType === ChainType.ETHEREUM) {
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
  } else if (chainType === ChainType.BINANCE) {
    let currentGasPrice = 20;
    const res = await api.getBSCGasPrice(walletNetworkId);
    if (res?.result) {
      currentGasPrice = unFormatGasPrice(res.result);
    }

    return {
      [NETWORK_SPEEDS_TO_KEY.SLOW]: {
        price: currentGasPrice * 0.75,
        time: 1,
      },
      [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
        price: currentGasPrice,
        time: 0.5,
      },
      [NETWORK_SPEEDS_TO_KEY.FAST]: {
        price: currentGasPrice * 1.25,
        time: 0.2,
      },
    };
  }
};

export const formatGasPrice = (gasPrice: number) => gasPrice * GWEI_UNIT;

export const unFormatGasPrice = (gasPrice: number) => gasPrice / GWEI_UNIT;

export function onMetamaskAccountChange(cb: any) {
  if (!window.ethereum) return;
  const listener = _.throttle(cb, 2000);
  window.ethereum.on("accountsChanged", listener);
}

export function onMetamaskChainChange(cb: any) {
  if (!window.ethereum) return;
  const listener = _.throttle(cb, 2000);
  window.ethereum.on("chainChanged", listener);
}

export function onBinanceAccountChange(cb: any) {
  if (!window.BinanceChain) return;
  const listener = _.throttle(cb, 2000);
  window.BinanceChain.on("accountsChanged", listener);
}

export function onBinanceChainChange(cb: any) {
  if (!window.BinanceChain) return;
  const listener = _.throttle(cb, 2000);
  window.BinanceChain.on("chainChanged", listener);
}

export function onWalletConnectAccountChange(
  provider: ethers.providers.Web3Provider,
  cb: any
) {
  if (!provider) return;
  const listener = _.throttle(cb, 2000);
  provider.on("accountsChanged", listener);
}

export function onWalletConnectChainChange(
  provider: ethers.providers.Web3Provider,
  cb: any
) {
  if (!provider) return;
  const listener = _.throttle(cb, 2000);
  provider.on("chainChanged", listener);
}

export function onWalletConnectDisconnect(
  provider: ethers.providers.Web3Provider,
  cb: any
) {
  if (!provider) return;
  const listener = _.throttle(cb, 2000);
  provider.on("disconnect", listener);
}

export const bufferGasLimit = (gasLimit: number | string) =>
  Math.round(Number(gasLimit) * (1 + GAS_LIMIT_BUFFER));

/**
 * 添加网络到metamask
 * @param {*} networkId  网络ID
 */
export const addEthereumChain = async () => {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{ ...ETHEREUM_CHAIN_OPTIONS[56] }],
  });
};

/**
 * 检查连接的网络ID
 * @returns
 */
export const checkNetwork = async (networkId: number) => {
  return networksMap.has(networkId);
};
