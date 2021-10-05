import {
  getEthereumNetwork,
  getBinanceNetwork,
  SUPPORTED_WALLETS,
  INFURA_PROJECT_ID,
  onMetamaskAccountChange,
  onBinanceAccountChange,
  onWalletConnectAccountChange,
  onBinanceChainChange,
  onMetamaskChainChange,
  onWalletConnectChainChange,
  onWalletConnectDisconnect,
  CHAIN_CHANGE_TYPE,
  INFURA_JSON_RPC_URLS,
  SUPPORTED_NETWORKS,
} from "./networkMethods";
import Web3Connector from "./networkConnector";
import $pub from "pubsub-js";
import signers from "../linearJs/lib/signers";
import { storeDetailsData } from "./request";
import { UpdateWalletConnectSigner } from "../linearJs/lib/signers/walletConnectSigner";

let window: any;
let $nuxt: any;

let lnrJSConnector: any = {
  signers,
  setContractSettings: function (networkId: number) {
    this.lnrJS = new Web3Connector(networkId);
    // this.signer = this.lnrJS.signers;
    this.provider = this.lnrJS.provider;
    this.utils = this.lnrJS.utils;
  },
};

export const defaultNetwork = {
  name: "MAINNET",
  networkId: 1,
};

export const connectToWallet = async (walletType: SUPPORTED_WALLETS) => {
  try {
    let registeredWalletConnectEvents =
      $nuxt.$store.state?.registeredWalletConnectEvents;

    let networkId = $nuxt.$store.state.networkDetails.networkId;

    //当连接方式为wallet_connect 且已经设置监听方式时,不要再去重新生成signer，改用updateWalletConnectWeb3Provider去更新provider
    if (!registeredWalletConnectEvents) {
      setSigner({ type: walletType, networkId });
    }
    let wallet;
    switch (walletType) {
      case SUPPORTED_WALLETS.METAMASK:
        return (wallet = await connectToMetamask());

      case SUPPORTED_WALLETS.BINANCE_CHAIN:
        return (wallet = await connectToBinance());

      case SUPPORTED_WALLETS.WALLET_CONNECT:
        return (wallet = await connectToWalletConnect());
    }
  } catch (error) {
    console.log(error, "connectToWallet error");
  }
};

const connectToMetamask = async () => {
  const walletState = {
    walletType: SUPPORTED_WALLETS.METAMASK,
  };
  try {
    if (window.ethereum) {
      // window.ethereum.autoRefreshOnNetworkChange = true;
      await window.ethereum.enable();
    }
    const provider = await signers.MetaMask().provider;
    const accounts = await provider.listAccounts();
    if (accounts && accounts.length > 0) {
      let network = await provider.getNetwork();
      return {
        ...walletState,
        currentWallet: accounts[0],
        networkId: network.chainId,
        networkName: network.name.toLowerCase(),
      };
    }
  } catch (e) {
    console.log(e);
  }
};

const connectToBinance = async () => {
  const walletState = {
    walletType: SUPPORTED_WALLETS.BINANCE_CHAIN,
  };
  try {
    if (window.BinanceChain) {
      // window.BinanceChain.autoRefreshOnNetworkChange = true;
      await window.BinanceChain.enable();
    }
    let provider = signers.BinanceChain().provider;
    const accounts = await provider.listAccounts();
    if (accounts && accounts.length > 0) {
      let network = await provider.getNetwork();
      return {
        ...walletState,
        currentWallet: accounts[0],
        networkId: network.chainId,
        networkName: network.name.toLowerCase(),
      };
    }
  } catch (e) {
    console.log(e);
  }
};

const connectToWalletConnect = async () => {
  const walletState = {
    walletType: SUPPORTED_WALLETS.WALLET_CONNECT,
  };
  try {
    //启动
    //to do: Is the network is selected if using wallet connect
    let provider = signers.WalletConnect().provider;
    $nuxt.$store.commit("setWalletConnect", {
      qrcode: false,
    });

    // //更新web3Provider,不然会出现调用合约方法出错的问题
    // updateWalletConnectWeb3Provider({
    //   type: walletState.walletType,
    //   networkId,
    // });

    const accounts = await provider.listAccounts();
    if (accounts && accounts.length > 0) {
      let network = await provider.getNetwork();
      return {
        ...walletState,
        currentWallet: accounts[0],
        networkId: network.chainId,
        networkName: network.name.toLowerCase(),
      };
    }
  } catch (e) {
    console.log(e);
  }
};

interface Iprops {
  type: SUPPORTED_WALLETS;
  networkId: number;
}

//更新wallect connect signer
const updateWalletConnectWeb3Provider = (props: Iprops) => {
  if (props.type !== SUPPORTED_WALLETS.WALLET_CONNECT) {
    return;
  }

  // let signer = UpdateWalletConnectSigner({
  //   provider: lnrJSConnector.signers.provider,
  // });
  lnrJSConnector.setContractSettings(props.networkId);
};

export const setSigner = (props: Iprops) => {
  lnrJSConnector.setContractSettings(props.networkId);
};
// const getSignerConfig = ({ type, networkId }) => {
//   if (type === SUPPORTED_WALLETS.WALLET_CONNECT) {
//     let rpc = { ...INFURA_JSON_RPC_URLS, ...RPC_URL };
//     return {
//       chainId: networkId,
//       infuraId: INFURA_PROJECT_ID,
//       rpc,
//     };
//   }
//   return {};
// };

/**
 * 选择钱包
 * @param walletType 钱包类型
 * @param waitStore  是否等待数据获取完成
 */
export const selectedWallet = async (
  walletType: SUPPORTED_WALLETS,
  waitStore = true
) => {
  //walletType = SUPPORTED_WALLETS.WALLET_CONNECT;
  try {
    //连接钱包
    const walletStatus = await connectToWallet(walletType);
    $nuxt.$Spin.show();
    const store = $nuxt.$store;

    //连接成功
    if (walletStatus && walletStatus.currentWallet) {
      store.commit(
        "setWalletNetworkName",
        walletStatus?.networkName.toUpperCase()
      );
      store.commit("setWalletNetworkId", walletStatus.networkId.toString());

      store.commit("setAutoConnect", true);

      //防止onWalletAccountChange内数据未更新时,太快进入功能子页获取不到wallet的问题
      store.commit("mergeWallet", {
        address: walletStatus?.currentWallet,
      });

      store.commit("setWalletType", walletType);

      //不重复注册事件,防止事件叠加
      let registeredMetamaskWalletEvents =
        store.state?.registeredMetamaskWalletEvents;
      let registeredBinanceWalletEvents =
        store.state?.registeredBinanceWalletEvents;
      let registeredWalletConnectEvents =
        store.state?.registeredWalletConnectEvents;

      //绑定事件
      if (
        walletType == SUPPORTED_WALLETS.METAMASK &&
        !registeredMetamaskWalletEvents
      ) {
        onMetamaskAccountChange(async () => {
          //当前链的钱包切换时才执行更新
          if (store.state.walletType == SUPPORTED_WALLETS.METAMASK) {
            $nuxt.$Spin.show();
            let network = await getEthereumNetwork();
            let { networkId } = network!;
            if (networkId === undefined) return;
            const address = await lnrJSConnector.signers
              .MetaMask()
              .provider.listAccounts();

            lnrJSConnector.setContractSettings(networkId);

            store.commit("mergeWallet", {
              address: address[0],
            });

            store.commit("setWalletDetails", {}); //清理数据
            await storeDetailsData();
            $pub.publish("onWalletAccountChange");
            $nuxt.$Spin.hide();
          }
        });

        //切换网络刷新页面
        onMetamaskChainChange(async () => {
          if (store.state.walletType == SUPPORTED_WALLETS.METAMASK) {
            store.commit("setWalletDetails", {}); //清理数据
            const status = await selectedWallet(SUPPORTED_WALLETS.METAMASK);
            status &&
              $pub.publish("onWalletChainChange", CHAIN_CHANGE_TYPE.NETWORK);
          }
        });

        store.commit("setRegisteredMetamaskWalletEvents", true);
      } else if (
        walletType == SUPPORTED_WALLETS.BINANCE_CHAIN &&
        !registeredBinanceWalletEvents
      ) {
        onBinanceAccountChange(async () => {
          //当前链的钱包切换时才执行更新
          if (store.state.walletType == SUPPORTED_WALLETS.BINANCE_CHAIN) {
            $nuxt.$Spin.show();

            const address = await lnrJSConnector.signers
              .BinanceChain()
              .provider.listAccounts();
            const signer = lnrJSConnector.signers.BinanceChain().signer;

            lnrJSConnector.setContractSettings(walletStatus.networkId);

            store.commit("mergeWallet", {
              address: address[0],
            });

            await storeDetailsData();
            $pub.publish("onWalletAccountChange");
            $nuxt.$Spin.hide();
          }
        });

        //切换网络刷新页面
        onBinanceChainChange(() => {
          if (store.state.walletType == SUPPORTED_WALLETS.BINANCE_CHAIN) {
            location.reload();
            // $pub.publish("onBinanceChainChange");
          }
        });

        store.commit("setRegisteredBinanceWalletEvents", true);
      } else if (
        walletType == SUPPORTED_WALLETS.WALLET_CONNECT &&
        !registeredWalletConnectEvents
      ) {
        onWalletConnectAccountChange(
          lnrJSConnector.signers.WalletConnect().provider,
          async (accounts: string[]) => {
            //当前链的钱包切换时才执行更新
            if (
              store.state.walletType == SUPPORTED_WALLETS.WALLET_CONNECT &&
              store.state?.wallet.address != accounts[0]
            ) {
              $nuxt.$Spin.show();
              let networkId = (
                await lnrJSConnector.signers
                  .WalletConnect()
                  .provider.getNetwork()
              ).chainId;

              updateWalletConnectWeb3Provider({
                type: SUPPORTED_WALLETS.WALLET_CONNECT,
                networkId,
              });
              const address = await await lnrJSConnector.signers
                .WalletConnect()
                .provider.listAccounts();

              store.commit("mergeWallet", {
                address: address[0],
              });

              store.commit("setWalletDetails", {}); //清理数据
              await storeDetailsData();
              $pub.publish("onWalletAccountChange");
              $nuxt.$Spin.hide();
            }
          }
        );

        //切换网络刷新页面
        onWalletConnectChainChange(
          lnrJSConnector.signers.PrivateKey().provider,
          async () => {
            if (store.state.walletType == SUPPORTED_WALLETS.WALLET_CONNECT) {
              store.commit("setWalletDetails", {}); //清理数据

              const status = await selectedWallet(
                SUPPORTED_WALLETS.WALLET_CONNECT
              );
              status &&
                $pub.publish("onWalletChainChange", CHAIN_CHANGE_TYPE.NETWORK);
            }
          }
        );

        //断开连接
        onWalletConnectDisconnect(
          lnrJSConnector.signers.PrivateKey().provider,
          async () => {
            if (store.state.walletType == SUPPORTED_WALLETS.WALLET_CONNECT) {
              store.commit("setAutoConnect", false);
              if (registeredWalletConnectEvents) {
                store.commit("setRegisteredWalletConnectEvents", false);
              }
              location.reload();
            }
          }
        );

        store.commit("setRegisteredWalletConnectEvents", true);
      }

      waitStore ? await storeDetailsData() : storeDetailsData();

      return true;
    } else {
      console.log("Connect wallet fail");
    }

    return false;
  } catch (error) {
    console.log(error, "selectedWallet error");
    return false;
  } finally {
    $nuxt.$Spin.hide();
  }
};

export default lnrJSConnector;
