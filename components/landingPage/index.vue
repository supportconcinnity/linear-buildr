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
                    <div class="boxItem buyLINA" @click="openBuy">
                        <img
                            class="boxLogo"
                            src="@/static/LINA_logo.svg"
                            alt=""
                        />
                        <div class="boxDesc">Buy LINA</div>

                        <img
                            class="rightArrow"
                            src="@/static/arrow_right.svg"
                            alt=""
                        />
                    </div>

                    <!-- <div
                            class="boxItem walletConnectBox"
                            @click="
                                selectedWallet(
                                    SUPPORTED_WALLETS_MAP.WALLET_CONNECT
                                )
                            "
                        >
                            <img
                                class="boxLogo"
                                src="@/static/wallect_connect_logo.svg"
                               
                            />
                            <div class="boxTitle">Connect Wallet</div>
                            <div class="boxDesc">WalletConnect</div>
                            
                        </div> -->
                    <div
                        class="boxItem metaMaskBox"
                        @click="selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK)"
                    >
                        <img
                            class="boxLogo"
                            src="@/static/metamask.svg"
                            alt=""
                        />
                        <div class="boxDesc">Connect Wallet</div>
                        <div class="boxTitle">MetaMask</div>
                    </div>

                    <div
                        class="boxItem binanceBox"
                        @click="
                            selectedWallet(SUPPORTED_WALLETS_MAP.BINANCE_CHAIN)
                        "
                    >
                        <img
                            class="boxLogo"
                            src="@/static/binance.svg"
                            alt=""
                        />
                        <div class="boxDesc">Connect Wallet</div>
                        <div class="boxTitle">Binance Chain Wallet</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    // connectToWallet,
    selectedWallet
} from "@/assets/linearLibrary/linearTools/lnrJSConnector";

import {
    SUPPORTED_WALLETS_MAP
    // onMetamaskAccountChange,
    // onBinanceAccountChange,
    // onBinanceChainChange
} from "@/assets/linearLibrary/linearTools/network";

export default {
    name: "landingPage",
    data() {
        return {
            SUPPORTED_WALLETS_MAP,
            introduct: "0",
            selectedWallet
        };
    },
    mounted() {
        //进入界面的欢迎效果
        setTimeout(() => {
            this.introduct = "1";
        }, 100);
        //调试用,进入指定页,不用时屏蔽
        // this.$store.commit("setCurrentAction", 4); //设置为build
        // this.selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK); //自动连接metamasks
        // setTimeout(
        //     () => this.selectedWallet(SUPPORTED_WALLETS_MAP.BINANCE_CHAIN),
        //     1000
        // ); //自动连接BINANCE
        //调试用,进入指定页,不用时屏蔽
    },
    methods: {
        openBuy() {
            return;
            window.open(
                "https://app.uniswap.org/#/swap?inputCurrency=0x3e9bc21c9b189c09df3ef1b824798658d5011937&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7"
            );
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

                .boxItem {
                    cursor: pointer;
                    padding: 56px;
                    border: solid 1px #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    transition: $animete-time linear;
                    border-radius: 8px;
                    box-shadow: 0 2px 12px 0 #deddde;
                    background-color: #ffffff;

                    .boxLogo {
                        width: 80px;
                        height: 80px;
                    }

                    &.buyLINA {
                        .boxLogo {
                            border: solid 1px #deddde;
                            border-radius: 50%;
                        }
                    }

                    .boxDesc {
                        font-family: Gilroy-Bold;
                        font-size: 16px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.5;
                        letter-spacing: 2px;
                        text-align: center;
                        color: #1b05a1;
                        margin: 24px 0 5px;
                        text-transform: uppercase;
                    }

                    .rightArrow {
                        width: 24px;
                    }

                    .boxTitle {
                        font-family: Gilroy-Regular;
                        font-size: 14px;
                        line-height: 18px;
                        text-align: center;
                        color: #99999a;
                    }

                    &:hover {
                        border-color: #1b05a1;
                    }
                }
            }
        }
    }
}
</style>
