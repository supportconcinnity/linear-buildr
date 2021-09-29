import * as ethers from "ethers";
import { getDefaultProvider, providers } from "ethers";
import ChainConfigs from "../linearJs/chainConfigs.json";
import MetaMask from "../linearJs/lib/signers/metamaskSigner";
import BinanceChain from "../linearJs/lib/signers/binanceSigner";
import WalletConnect from "../linearJs/lib/signers/walletConnectSigner";
import PrivateKey from "../linearJs/lib/signers/privateKeySigner";
import util from "../linearJs/util";
import {
  TOKEN_BRIDGE_DEV,
  TOKEN_BRIDGE_MAINNET,
  TOKEN_BRIDGE_TESTNET,
} from "~/constants/envVars";
import * as contracts from "../linearJs/lib/contracts";

const signers = {
  MetaMask,
  BinanceChain,
  WalletConnect,
  PrivateKey,
};

export const typedConfigs: ChainConfig[] = ChainConfigs;

export interface ChainConfig {
  name: string;
  networkId: number;
  networkType: string;
  chainType: string;
  rpcUrl?: string;
  blockchainBrowser: string;
  blockchainBrowserApi: string;
  addresses: ChainAddresses;
}

export enum ChainType {
  ETHEREUM = "ethereum",
  BINANCE = "binance",
}

export enum NetworkType {
  DEV = "dev",
  TEST = "test",
  MAINNET = "mainnet",
}

export interface ChainAddresses {
  LinearFinance: string;
  LnAssetSystem: string;
  LnErc20Bridge: string;
  LnBuildBurnSystem?: string;
  LnConfig?: string;
  LnChainLinkPrices?: string;
  LnDebtSystem?: string;
  LnCollateralSystem?: string;
  LnRewardLocker?: string;
  LnRewardSystem?: string;
  lUSD: string;
  lBTC: string;
  lETH: string;
  lLINK: string;
  lTRX: string;
  lDOT: string;
  lYFI: string;
  lBNB: string;
  lADA: string;
  lXLM: string;
  lXAU: string;
  lXAG: string;
  lEUR: string;
  lUNI: string;
  lJPY: string;
  lXLCI: string;
  lXBCI: string;
  lVET: string;
}

export interface NetworksMap {
  key: number;
  value: ChainConfig;
}

const API_KEY = {
  infura: process.env.INFURA_PROJECT_ID,
  etherscan: process.env.ETHERSCAN_KEY,
  alchemy: process.env.ALCHEMY_KEY,
};

export const networksMap = new Map();

typedConfigs.forEach((object) => networksMap.set(object.networkId, object));

export class Web3Connector {
  networkId: number;
  network: string;
  provider: providers.BaseProvider;
  addressList: ChainAddresses;
  utils: any;
  signers: any;
  isEthereumNetwork: boolean;
  isBinanceNetwork: boolean;
  isMainnetNetwork: boolean;
  isTestnetNetwork: boolean;
  isDevNetwork: boolean;
  othersNetwork: number[];
  tokenBridgeApi: string;
  // contracts:{}
  constructor(id: number) {
    const chainData = networksMap.get(id);
    const { name, networkId, networkType, chainType, rpcUrl, addresses } =
      chainData;
    this.networkId = networkId || 1;
    this.network = name;
    this.provider = rpcUrl
      ? getDefaultProvider(rpcUrl, API_KEY)
      : getDefaultProvider();
    this.addressList = addresses;
    this.signers = signers;
    const utils = new util(this.provider);
    this.utils = { ...utils, ...ethers.utils };
    this.isEthereumNetwork = chainType === ChainType.ETHEREUM;
    this.isBinanceNetwork = chainType === ChainType.BINANCE;
    this.isMainnetNetwork = networkType === NetworkType.MAINNET;
    this.isDevNetwork = networkType === NetworkType.DEV;
    this.isTestnetNetwork = networkType === NetworkType.TEST;

    /**
     * 获取所在网络其他网络id
     */
    this.othersNetwork = [];
    typedConfigs.forEach((object) => {
      if (object.networkType === networkType)
        this.othersNetwork.push(object.networkId);
    });

    switch (networkType) {
      case NetworkType.MAINNET:
        this.tokenBridgeApi = TOKEN_BRIDGE_MAINNET;
        break;
      case NetworkType.TEST:
        this.tokenBridgeApi = TOKEN_BRIDGE_TESTNET;
        break;
      case NetworkType.DEV:
        this.tokenBridgeApi = TOKEN_BRIDGE_DEV;
        break;
      default:
        this.tokenBridgeApi = TOKEN_BRIDGE_MAINNET;
    }

    // this.contracts[]
  }
}
