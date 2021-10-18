import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

interface WalletConnectCofig {
  infuraId?: string | undefined;
  chainId?: number | undefined;
  rpc?: { [k: number]: string } | undefined;
}
const WalletConnectSigner = async (props: WalletConnectCofig) => {
  let infuraId = props.infuraId ?? "";
  let chainId = props.chainId ?? 1;
  let rpc = props.rpc;

  const provider = new WalletConnectProvider({
    bridge: "https://bridge.walletconnect.org",
    qrcode: false,
    infuraId,
    chainId,
    rpc,
  });

  provider.connector.on("display_uri", (err, payload) => {
    if (err) {
      console.log(err);
      return;
    }
    const uri = payload.params[0];
    window.$nuxt.$store.commit("setWalletConnect", {
      uri,
      qrcode: true,
    });
  });
  await provider.enable();
  return UpdateWalletConnectSigner(provider);
};

export const UpdateWalletConnectSigner = (provider: any) => {
  let wrappedProvider = new providers.Web3Provider(provider);
  let signer = wrappedProvider.getSigner();
  return { signer, provider: wrappedProvider };
};

export default WalletConnectSigner;
