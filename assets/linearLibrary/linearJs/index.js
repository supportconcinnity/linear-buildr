import * as ethers from "ethers";

import Metamask from "./lib/signers/metamaskSigner";
import WalletConnect from "./lib/signers/walletConnectSigner";
import PrivateKey from "./lib/signers/privateKeySigner";
import ContractSettings from "./contractSettings";
import contracts from "./contracts";
import util from "./util";

const signers = {
    Metamask,
    WalletConnect,
    PrivateKey
};

export class LinearJs {
    constructor(contractSettings, signers = { PrivateKey }) {
        contractSettings = new ContractSettings(contractSettings);
        this.signers = signers;
        this.contractSettings = contractSettings;
        const { network } = contractSettings;
        this.network = network;
        const contractForEnv = contracts[network];
        Object.keys(contractForEnv).map(name => {
            const Contract = contractForEnv[name];
            this[name] = new Contract(contractSettings);
        });
        const utils = new util(contractSettings);
        this.utils = { ...utils, ...ethers.utils };
    }
}

LinearJs.signers = signers;
