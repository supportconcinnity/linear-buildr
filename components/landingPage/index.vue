<template>
    <div id="landingPage">
        <div class="headerBox">
            <img
                class="linearBuildrlogo"
                src="@/static/linear_buildr_logo.svg"
                alt=""
            />
        </div>
        <div class="container">
            <div class="introductBox">
                <Collapse v-model="introduct" accordion>
                    <Panel name="1">
                        <div class="line"></div>
                        Welcome to Linear.
                        <p slot="content">
                            The first cross-chain compatible, decentralized
                            delta-one asset protocol to quickly and
                            cost-effectively, create, trade, and manage
                            synthetic assets (Liquids).
                        </p>
                    </Panel>
                    <Panel name="2">
                        <div class="line"></div>
                        What is Buildr?
                        <p slot="content">
                            Buildr is part of the Linear's dApp suite. You can
                            pledge and stake your LINA tokens to build ℓUSD, the
                            base currency of Linear Exchange.
                        </p>
                    </Panel>
                    <Panel name="3">
                        <div class="line"></div>
                        Why Stake LINA?
                        <p slot="content">
                            By staking LINA to build ℓUSD for self use / provide
                            liquidity for traders, users are entitled to staking
                            rewards and a split of the transaction fees
                            generated on our exchange.
                        </p>
                    </Panel>
                    <Panel name="4">
                        <div class="line"></div>
                        What do LINA Stakers Need to Do?
                        <p slot="content">
                            Users can use ℓUSD to purchase synthetic assets on
                            our exchange or even move it to other protocols or
                            dApps within the DeFi ecosystem.
                        </p>
                    </Panel>
                </Collapse>
            </div>
            <div class="walletBox">
                <div class="box">
                    <div class="buyLINA">
                        <a href="javascript:(void 0)">
                            <!-- <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x3e9bc21c9b189c09df3ef1b824798658d5011937&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7"> -->
                            <img
                                class="LINALogo"
                                src="@/static/LINA_logo.svg"
                                alt=""
                            />
                            Buy LINA on Uniswap
                            <img src="@/static/arrow_right.svg" alt="" />
                        </a>
                    </div>
                    <div class="connectWallet">
                        <!-- <div
                            class="walletConnectBox"
                            @click="
                                selectedWallet(
                                    SUPPORTED_WALLETS_MAP.WALLET_CONNECT
                                )
                            "
                        >
                            <img
                                src="@/static/wallect_connect_logo.svg"
                                alt=""
                            />
                            WalletConnect
                        </div> -->
                        <div
                            class="metaMaskBox"
                            @click="
                                selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK)
                            "
                        >
                            <img src="@/static/metamask.svg" alt="" />
                            <div class="context">Connect Wallet</div>
                            <div class="walletName">MetaMask</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lnrJSConnector, {
    connectToWallet
} from "@/assets/linearLibrary/linearTools/lnrJSConnector";

import {
    SUPPORTED_WALLETS_MAP,
    onMetamaskAccountChange
} from "@/assets/linearLibrary/linearTools/network";

export default {
    name: "landingPage",
    data() {
        return {
            SUPPORTED_WALLETS_MAP,
            introduct: "0"
        };
    },
    mounted() {
        //进入界面的欢迎效果
        setTimeout(()=> {this.introduct = "1";}, 100);
        //调试用,进入指定页,不用时屏蔽
        // this.$store.commit("setCurrentAction", 1); //设置为build
        // this.selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK); //自动连接metamasks
        //调试用,进入指定页,不用时屏蔽
    },
    methods: {
        //将选择的钱包类型设置为全局状态
        async selectedWallet(walletType) {
            //连接钱包
            const walletStatus = await connectToWallet(walletType);

            //连接成功
            if (walletStatus && walletStatus?.currentWallet) {
                this.$store.commit(
                    "setWalletNetworkName",
                    walletStatus?.networkName.toUpperCase()
                );
                this.$store.commit("setWalletType", walletType);

                //防止onWalletAccountChange内数据未更新时,太快进入功能子页获取不到wallet的问题
                await this.$store.commit("mergeWallet", {
                    address: walletStatus?.currentWallet
                });

                //绑定metamask事件
                if (walletType == SUPPORTED_WALLETS_MAP.METAMASK) {
                    onMetamaskAccountChange(async (wallet, walletType) => {
                        const address = await lnrJSConnector.signer.getNextAddresses();
                        const signer = new lnrJSConnector.signers[
                            SUPPORTED_WALLETS_MAP.METAMASK
                        ]({});
                        lnrJSConnector.setContractSettings({
                            networkId: walletStatus.networkId,
                            signer
                        });

                        //回到起始页,防止数据错误
                        this.$store.commit("setCurrentAction", 0);
                        this.$pub.publish("onWalletAccountChange", address[0]);
                    });

                    this.$emit(
                        "selectedWallet",
                        SUPPORTED_WALLETS_MAP.METAMASK
                    ); //通知父组件已选择了钱包，跳到app page组件
                } else if (walletType == SUPPORTED_WALLETS_MAP.WALLET_CONNECT) {
                    this.$emit(
                        "selectedWallet",
                        SUPPORTED_WALLETS_MAP.WALLET_CONNECT
                    );
                }

                //已获取钱包 触发数据更新
                this.$pub.publish(
                    "onWalletAccountChange",
                    walletStatus.currentWallet
                );
            } else {
                console.log("Connect wallet fail");
            }
        }
    }
};
</script>

<style lang="scss">
#landingPage {
    overflow: hidden;
    padding-bottom: 64px;

    .headerBox {
        width: 1440px;
        height: 120px;
        padding: 40px 0 0 120px;

        img {
            height: 40px;
            cursor: pointer;
        }
    }

    .container {
        display: flex;
        padding-bottom: 4px;

        .introductBox {
            width: 1032px;
            height: 840px;
            position: relative;
            left: -18px;
            display: flex;
            align-items: center;
            background: #fff;
            background: #ffffff;
            border-radius: 18px;

            .ivu-collapse {
                background: unset;
                border: unset;

                .ivu-collapse-item {
                    margin: 0 0 24px 138px;
                    border: unset;

                    .ivu-collapse-header {
                        color: #c6c4c7;
                        font-family: Gilroy-Bold;
                        font-size: 24px;
                        font-weight: 700;
                        border: unset;
                        display: flex;
                        align-items: center;

                        i {
                            display: none;
                        }

                        .line {
                            width: 4px;
                            height: 20px;
                            margin-right: 25px;
                            border-radius: 4px;
                            background: #c6c4c7;
                        }
                    }

                    .ivu-collapse-content {
                        width: 774px;

                        .ivu-collapse-content-box {
                            padding-left: 30px;
                            color: #5a575c;
                            font-family: Gilroy-Regular;
                            font-size: 16px;
                            font-weight: 400;

                            p {
                                width: 400px;
                            }
                        }
                    }
                }

                .ivu-collapse-item-active {
                    .ivu-collapse-header {
                        color: #5a575c;
                        font-size: 38px;

                        .line {
                            height: 30px;
                            background: #1b05a1;
                        }
                    }
                }
            }
        }

        .walletBox {
            flex: 1;

            .box {
                width: 306px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .title {
                    color: #c6c4c7;
                    font-family: Gilroy;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    letter-spacing: 2px;
                }

                .buyLINA {
                    width: 306px;
                    height: 408px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 12px 0 #deddde;
                    border: solid 1px #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    transition: $animete-time linear;

                    .LINALogo {
                        width: 80px;
                        height: 80px;
                        margin-bottom: 24px;
                        border: solid 1px #deddde;
                        border-radius: 50%;
                    }

                    a {
                        color: #1b05a1;
                        font-family: Gilroy;
                        font-size: 16px;
                        font-weight: 700;
                        line-height: 32px;
                        text-align: center;
                        text-transform: uppercase;
                        letter-spacing: 1px;

                        img {
                            width: 24px;
                            margin: 5px auto 0;
                            display: block;
                        }
                    }

                    &:hover {
                        border-color: #1b05a1;
                    }
                }

                .connectWallet {
                    .walletConnectBox,
                    .metaMaskBox {
                        width: 306px;
                        height: 408px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 8px;
                        box-shadow: 0 2px 12px 0 #deddde;
                        border: solid 1px #ffffff;
                        background-color: #ffffff;
                        color: #5a575c;
                        font-family: Gilroy;
                        font-weight: 700;
                        font-size: 16px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        cursor: pointer;
                        transition: $animete-time linear;

                        img {
                            width: 80px;
                            margin-bottom: 24px;
                        }

                        .context {
                            color: #1b05a1;
                        }

                        .walletName {
                            margin-top: 4px;
                            color: #c1c1c1;
                        }

                        &:hover {
                            border-color: #1b05a1;
                        }
                    }

                    .walletConnectBox {
                        margin-bottom: 16px;
                    }
                }
            }
        }
    }
}
</style>
