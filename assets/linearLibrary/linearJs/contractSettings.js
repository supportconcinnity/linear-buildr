import { getDefaultProvider } from "ethers";
import addresses from "./lib/addresses";

const SUPPORTED_NETWORKS = {
    1: "mainnet",
    3: "ropsten",
};

const API_KEY = {
    infura: process.env.INFURA_PROJECT_ID,
    alchemy: process.env.ALCHEMY_KEY,
    etherscan: process.env.ETHERSCAN_KEY,
};

class ContractSettings {
    constructor(contractSettings) {
        contractSettings = contractSettings || {};
        const { provider, signer, networkId } = contractSettings;
        this.networkId = networkId || 1;
        this.network = SUPPORTED_NETWORKS[Number(this.networkId)];
        this.provider = provider || getDefaultProvider();
        if (!provider && networkId) {
            this.provider = getDefaultProvider(this.network, API_KEY);
        }
        this.signer = signer;
        this.addressList = addresses[this.networkId];
    }
}

ContractSettings.SUPPORTED_NETWORKS = SUPPORTED_NETWORKS;

export default ContractSettings;
