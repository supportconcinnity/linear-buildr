import * as ethers from "ethers";
import { getDefaultProvider, providers } from "ethers";
import ChainConfigs from "./chainConfigs.json";
import util from "./util";
import {
  TOKEN_BRIDGE_MAINNET,
  TOKEN_BRIDGE_TESTNET,
} from "~/constants/envVars";
import * as contracts from "../linearJs/lib/contracts";

let Contracts: any = contracts;

export const RPC_URL = {
  56: "https://bsc-dataseed1.binance.org",
  // 97: "https://data-seed-prebsc-1-s3.binance.org:8545",
  10001: "https://master.http.eth.dev.linear.finance",
  10056: "https://master.http.bsc.dev.linear.finance",
};

export const typedConfigs: ChainConfig[] = ChainConfigs;

export interface ChainConfig {
  name: string;
  networkId: number;
  networkType: string;
  chainType: string;
  rpcUrl?: string;
  isLiquidationEnable: boolean;
  blockchainBrowser: string;
  blockchainBrowserApi: string;
  tokenBridgeApi: string;
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
  LnOracleRouter?: string;
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
  lJPY: string;
  lXLCI: string;
  lXBCI: string;
  lVET: string;
  lEUR: string;
  lUNI: string;
}

export interface NetworksMap {
  key: number;
  value: ChainConfig;
}

interface Contracts {
  [k: string]: ethers.Contract;
}

const API_KEY = {
  infura: process.env.INFURA_PROJECT_ID,
  etherscan: process.env.ETHERSCAN_KEY,
  alchemy: process.env.ALCHEMY_KEY,
};

export const networksMap = new Map();

typedConfigs.forEach((object) => {
  let id = object.networkId;
  networksMap.set(id, object);
});

const assetUpgradeableSubcontract = [
  "lUSD",
  "lBTC",
  "lETH",
  "lLINK",
  "lTRX",
  "lDOT",
  "lYFI",
  "lBNB",
  "lADA",
  "lXLM",
  "lXAU",
  "lXAG",
  "lEUR",
  "lUNI",
  "lJPY",
  "lXLCI",
  "lXBCI",
  "lVET",
];

const perpetualSubcontract = ["LnPerpetual_lBTC", "LnPerpetual_lETH"];

export default class Web3Connector {
  networkId: number;
  network: string;
  provider: providers.BaseProvider;
  signer: ethers.Signer | undefined;
  addressList: ChainAddresses;
  contracts: Contracts;
  utils: any;
  isEthereumNetwork: boolean;
  isBinanceNetwork: boolean;
  isMainnetNetwork: boolean;
  isTestnetNetwork: boolean;
  isDevNetwork: boolean;
  othersNetwork: number[];
  tokenBridgeApi: string;
  blockchainBrowser: string;
  blockchainBrowserApi: string;
  constructor(id: number, signer?: ethers.Signer) {
    const chainData = networksMap.get(id);
    const {
      name,
      networkId,
      networkType,
      chainType,
      rpcUrl,
      addresses,
      blockchainBrowser,
      blockchainBrowserApi,
    } = chainData;
    this.networkId = networkId || 1;
    this.network = name;
    this.provider = rpcUrl
      ? getDefaultProvider(rpcUrl, API_KEY)
      : getDefaultProvider();
    this.signer = signer;
    this.addressList = addresses;
    this.blockchainBrowser = blockchainBrowser;
    this.blockchainBrowserApi = blockchainBrowserApi;
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
        this.tokenBridgeApi = TOKEN_BRIDGE_MAINNET;
        break;
      default:
        this.tokenBridgeApi = TOKEN_BRIDGE_MAINNET;
    }
    function initContracts(
      contractAddress: { [index: string]: any } = {},
      signerOrProvider: providers.BaseProvider | ethers.Signer
    ) {
      return Object.keys(contractAddress).reduce(function (
        result: Contracts,
        key
      ) {
        const factoryKey = `${key}__factory`;
        if (assetUpgradeableSubcontract.includes(key)) {
          result[key] = contracts.LnAssetUpgradeable__factory.connect(
            contractAddress[key],
            signerOrProvider
          );
        } else if (perpetualSubcontract.includes(key)) {
          result[key] = contracts.LnPerpetual__factory.connect(
            contractAddress[key],
            signerOrProvider
          );
        } else {
          if (Contracts[factoryKey] === undefined) {
            console.log(key);
          }
          result[key] = Contracts[factoryKey].connect(
            contractAddress[key],
            signerOrProvider
          );
        }

        return result;
      },
      {});
    }

    // is a signer is not passed, init readable contracts only
    if (signer) {
      this.contracts = initContracts(addresses, signer);
    } else {
      this.contracts = initContracts(addresses, this.provider);
    }
  }
}
