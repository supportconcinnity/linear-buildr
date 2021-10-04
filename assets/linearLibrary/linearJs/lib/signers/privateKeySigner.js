import { Wallet, getDefaultProvider } from "ethers";
import Web3Connector from "../../../linearTools/networkConnector";

const PrivateKeySigner = function (provider, networkId, privateKey) {
  if (networkId && !provider) {
    provider = getDefaultProvider(new Web3Connector(networkId).provider);
  }
  return new Wallet(privateKey, provider || getDefaultProvider());
};

export default PrivateKeySigner;
