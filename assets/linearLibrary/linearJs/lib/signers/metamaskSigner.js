import { providers } from "ethers";

const MetamaskSigner = async () => {
  const { ethereum } = window;
  const provider = new providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  signer.getNextAddresses = () =>
    new Promise((resolve) => resolve(ethereum.enable()));
  return { signer, provider };
};

export default MetamaskSigner;
