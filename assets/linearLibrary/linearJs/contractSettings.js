import { getDefaultProvider } from "ethers";
import addresses from "./lib/addresses";
import { GRAPH_API } from "@/assets/linearLibrary/linearTools/network";

const SUPPORTED_NETWORKS = {
    1: "mainnet",
    3: "ropsten",
    56: "bscmainnet",
    97: "bsctestnet"
};

export const SELECT_NETWORKS_HASH_URLBASE = {
    1: "https://etherscan.io/tx/",
    3: "https://ropsten.etherscan.io/tx/",
    56: "https://bscscan.com/tx/",
    97: "https://testnet.bscscan.com/tx/"
};

export const getBrowserUrlBase = ({graphApi,netWork})=>{
    if(graphApi == GRAPH_API.ETHEREUM){
        if(netWork == "testNet"){
            return SELECT_NETWORKS_HASH_URLBASE[3];
        }else if(netWork == "mainNet"){
            return SELECT_NETWORKS_HASH_URLBASE[1];
        }
    }else if(graphApi == GRAPH_API.BINANCE){
        if(netWork == "testNet"){
            return SELECT_NETWORKS_HASH_URLBASE[97];
        }else if(netWork == "mainNet"){
            return SELECT_NETWORKS_HASH_URLBASE[56];
        }
    }
}

const API_KEY = {
    infura: process.env.INFURA_PROJECT_ID,
    alchemy: process.env.ALCHEMY_KEY,
    etherscan: process.env.ETHERSCAN_KEY
};

class ContractSettings {
    constructor(contractSettings) {
        contractSettings = contractSettings || {};
        const { provider, signer, networkId } = contractSettings;
        this.networkId = networkId || 1;
        this.network = SUPPORTED_NETWORKS[Number(this.networkId)];
        this.provider = provider || getDefaultProvider();
        if (!provider && networkId) {
            let tempNetwork = this.network;
            switch (this.networkId) {
                case 56: //BSC主网RPC
                    tempNetwork = "https://bsc-dataseed.binance.org/";
                    break;
                case 97: //BSC测试网RPC
                    tempNetwork =
                        "https://data-seed-prebsc-1-s1.binance.org:8545/";
                    break;
            }
            this.provider = getDefaultProvider(tempNetwork, API_KEY);
        }
        this.signer = signer;
        this.addressList = addresses[this.networkId];
    }
}

ContractSettings.SUPPORTED_NETWORKS = SUPPORTED_NETWORKS;

export default ContractSettings;
