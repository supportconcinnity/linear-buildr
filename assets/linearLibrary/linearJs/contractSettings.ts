import { getDefaultProvider, providers } from "ethers";

import ChainConfigs from "./chainConfigs.json";

export const typedConfigs: ChainConfig[] = ChainConfigs;

export interface ChainConfig {
  name: string;
  networkId: number;
  rpcUrl?: string;
  addresses: ChainAddresses;
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

const API_KEY = {
  infura: process.env.INFURA_PROJECT_ID,
  etherscan: process.env.ETHERSCAN_KEY,
  alchemy: process.env.ALCHEMY_KEY,
};

class ContractSettings {
  networkId: number;
  network: string;
  provider: providers.BaseProvider;
  addressList: ChainAddresses;
  constructor(chainData: ChainConfig) {
    chainData = chainData || {};
    const { name, networkId, rpcUrl, addresses } = chainData;
    this.networkId = networkId || 1;
    this.network = name;
    this.provider = rpcUrl
      ? getDefaultProvider(rpcUrl, API_KEY)
      : getDefaultProvider();
    this.addressList = addresses;
  }
}

export default ContractSettings;
