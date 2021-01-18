<template>
    <div id="landingPage">
        <div class="headerBox">
            <img
                class="linearBuildrlogo"
                src="@/static/linear_buildr_logo.svg"
                alt=""
            />
            <div class="mBuyLINA mobileShow" @click.stop="openBuy">
                BUY LINA
                <img src="@/static/arrow_right.svg" alt="" />
            </div>
        </div>
        <div class="container">
            <div class="introductBox">
                <Collapse v-model="introduct" accordion>
                    <Panel name="1">
                        <div class="line"></div>
                        Welcome to Linear!
                        <p slot="content">
                            The first cross-chain compatible, decentralized
                            delta-one asset protocol to quickly and
                            cost-effectively, create, trade, and manage
                            synthetic assets (Liquids)
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
                        Why stake LINA?
                        <p slot="content">
                            By staking LINA to build ℓUSD for self use / provide
                            liquidity for traders, users are entitled to staking
                            rewards and a split of the transaction fees
                            generated on our exchange.
                        </p>
                    </Panel>
                    <Panel name="4">
                        <div class="line"></div>
                        What do I do with ℓUSD?
                        <p slot="content">
                            Users can use ℓUSD to purchase synthetic assets on
                            our exchange or even move it to other protocols or
                            dapps within the DeFi ecosystem.
                        </p>
                    </Panel>

                    <!-- <Panel name="5">
                        <div class="line"></div>
                        ethereum
                        <p slot="content">
                            {{ ethereum }}
                        </p>
                    </Panel> -->
                </Collapse>

                <div class="buyLINA" @click.stop="openBuy">
                    Buy LINA
                    <Icon type="ios-arrow-round-forward" />
                </div>

                <div
                    class="mRect mobileShow"
                    @click.stop="selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK)"
                >
                    <img class="boxLogo" src="@/static/metamask.svg" alt="" />
                    <div class="box">
                        <div class="context">
                            Connect MetaMask Wallet
                        </div>
                        <div class="chain">
                            Ethereum Chain
                        </div>
                    </div>
                </div>
            </div>
            <div class="walletBox">
                <div class="box">
                    <div
                        class="boxItem"
                        @click.stop="
                            selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK)
                        "
                    >
                        <img
                            class="boxLogo"
                            src="@/static/metamask.svg"
                            alt=""
                        />

                        <div>
                            <div class="boxSub">Connect</div>

                            <div class="boxTitle">
                                Ethereum<br />
                                Network
                            </div>
                        </div>

                        <div class="boxDesc">
                            via MetaMask
                        </div>
                    </div>

                    <div
                        class="boxItem"
                        @click.stop="
                            selectedWallet(SUPPORTED_WALLETS_MAP.BINANCE_CHAIN)
                        "
                    >
                        <img
                            class="boxLogo"
                            src="@/static/binance.svg"
                            alt=""
                        />

                        <div>
                            <div class="boxSub">Connect</div>

                            <div class="boxTitle">
                                Binance<br />
                                Smart Chain <br />
                                Network
                            </div>
                        </div>

                        <div class="boxDesc">
                            via Binance Chain Wallet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectedWallet } from "@/assets/linearLibrary/linearTools/lnrJSConnector";

import { SUPPORTED_WALLETS_MAP } from "@/assets/linearLibrary/linearTools/network";

import { openBuyLINA } from "@/common/utils";

export default {
    name: "landingPage",
    data() {
        return {
            SUPPORTED_WALLETS_MAP,
            introduct: "0",
            selectedWallet
        };
    },
    watch: {
        // ethereum() {}
    },
    computed: {
        // ethereum() {
        //     return window.ethereum;
        // }
    },
    mounted() {
        //进入界面的欢迎效果
        setTimeout(() => {
            this.introduct = "1";
        }, 100);
        //调试用,进入指定页,不用时屏蔽
        // this.$store.commit("setCurrentAction", 5);
        // this.selectedWallet(SUPPORTED_WALLETS_MAP.METAMASK); //自动连接metamasks
        // setTimeout(
        //     () => selectedWallet(SUPPORTED_WALLETS_MAP.BINANCE_CHAIN),
        //     1000
        // ); //自动连接BINANCE
        //调试用,进入指定页,不用时屏蔽
    },
    methods: {
        openBuy() {
            openBuyLINA()
        }
    }
};
</script>

<style lang="scss">
#landingPage {
    overflow: hidden;
    padding-bottom: 64px;

    .mobileShow {
        display: none;
    }

    .headerBox {
        width: 1440px;
        height: 120px;
        padding-left: 120px;
        display: flex;
        align-items: center;

        .linearBuildrlogo {
            cursor: pointer;
            width: 163px;
            height: 32px;
        }
    }

    .container {
        display: flex;
        padding-bottom: 4px;

        .introductBox {
            width: 1014px;
            height: 840px;
            position: relative;
            display: flex;
            align-items: center;
            background: #fff;
            border-radius: 16px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-right: 60px;

            .ivu-collapse {
                background: unset;
                border: unset;
                padding-left: 120px;

                .ivu-collapse-item {
                    margin-bottom: 24px;
                    border: unset;

                    .ivu-collapse-header {
                        padding: 0;
                        border: unset;
                        display: flex;
                        align-items: center;
                        font-family: Gilroy-Bold;
                        font-size: 24px;
                        font-weight: bold;
                        height: unset;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.33;
                        letter-spacing: normal;
                        color: #99999a;

                        i {
                            display: none;
                        }

                        .line {
                            width: 4px;
                            height: 24px;
                            margin-right: 30px;
                            border-radius: 4px;
                            background: #bababa;
                            transition: $animete-time linear;
                        }
                    }

                    .ivu-collapse-content {
                        width: 774px;
                        padding: 0;

                        .ivu-collapse-content-box {
                            padding-left: 34px;
                            font-family: Gilroy-Regular;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.5;
                            letter-spacing: normal;
                            color: #5a575c;

                            p {
                                width: 400px;
                            }
                        }
                    }
                }

                .ivu-collapse-item-active {
                    &.ivu-collapse-item {
                        margin-bottom: 8px;
                    }

                    .ivu-collapse-header {
                        color: #5a575c;
                        font-size: 56px;
                        line-height: 64px;
                        line-height: 1.14;

                        .line {
                            height: 55px;
                            background: #1a38f8;
                        }
                    }
                }
            }

            .buyLINA {
                position: absolute;
                left: 120px;
                bottom: 68px;
                font-family: Gilroy-Bold;
                font-size: 16px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                color: #1a38f8;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: $animete-time linear;

                .ivu-icon {
                    font-size: 30px;
                    color: #1a38f8;
                    font-weight: bold;
                    transition: $animete-time linear;
                    margin-left: 4px;
                }

                &:hover {
                    color: #7eb5ff;
                    .ivu-icon {
                        color: #7eb5ff;
                    }
                }
            }
        }

        .walletBox {
            .box {
                width: 306px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .boxItem {
                    flex: 1;
                    cursor: pointer;
                    border: solid 1px #e5e5e5;
                    display: flex;
                    flex-direction: column;
                    transition: $animete-time linear;
                    background-color: #ffffff;
                    padding: 80px 32px 38px;
                    border-radius: 8px;
                    align-items: center;
                    justify-content: space-between;

                    &:not(:last-of-type) {
                        margin-bottom: 28px;
                    }

                    .boxLogo {
                        width: 80px;
                        height: 80px;
                    }

                    .boxSub {
                        font-family: Gilroy-Bold;
                        font-size: 16px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.5;
                        letter-spacing: normal;
                        text-align: center;
                        color: #5a575c;
                        margin-bottom: 8px;
                    }

                    .boxTitle {
                        font-family: Gilroy-bold;
                        font-size: 24px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.33;
                        letter-spacing: normal;
                        color: #1a38f8;
                        text-align: center;
                    }

                    .boxDesc {
                        font-family: Gilroy-Regular;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.5;
                        letter-spacing: normal;
                        text-align: center;
                        color: #99999a;
                    }

                    &:hover {
                        border: solid 1px #deddde;
                        box-shadow: 0 2px 12px 0 #deddde;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: $max-phone-width) {
    #landingPage {
        overflow: hidden;
        padding-bottom: 0;

        .mobileShow {
            display: block;
        }

        .headerBox {
            width: 100vw;
            height: 64px;
            padding: 16px 16px 16px 16px;
            display: flex;
            align-items: center;
            position: relative;

            .linearBuildrlogo {
                cursor: pointer;
                width: 163px;
                height: 32px;
            }

            .mBuyLINA {
                flex: 1;
                height: 16px;
                font-family: Gilroy-Bold;
                font-size: 12px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.4;
                letter-spacing: 1.5px;
                text-align: right;
                color: #1a38f8;
                img {
                    width: 16px;
                    height: 16px;
                    float: right;
                }
            }
        }

        .container {
            display: flex;
            padding: 0 16px;

            .introductBox {
                width: 100%;
                height: 88vh;
                position: relative;
                display: flex;
                align-items: stretch;
                background: #fff;
                border-radius: 16px;
                margin-right: 0;

                .ivu-collapse {
                    background: unset;
                    border: unset;
                    padding-top: 92px;
                    padding-left: 32px;

                    .ivu-collapse-item {
                        margin-bottom: 16px;
                        border: unset;

                        .ivu-collapse-header {
                            padding: 0;
                            border: unset;
                            display: flex;
                            align-items: center;
                            font-family: Gilroy-Bold;
                            font-size: 14px;
                            font-weight: bold;
                            height: unset;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.33;
                            letter-spacing: normal;
                            color: #99999a;

                            i {
                                display: none;
                            }

                            .line {
                                width: 3px;
                                height: 17px;
                                margin-right: 16px;
                                border-radius: 4px;
                                background: #bababa;
                                transition: $animete-time linear;
                            }
                        }

                        .ivu-collapse-content {
                            width: 100%;
                            padding: 0 10px 0 0;

                            .ivu-collapse-content-box {
                                font-family: Gilroy-Regular;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                font-style: normal;
                                line-height: 1.5;
                                letter-spacing: normal;
                                color: #5a575c;
                                padding-top: 8px;
                                padding-bottom: 30px;
                                padding-left: 20px;

                                p {
                                    width: 100%;
                                }
                            }
                        }
                    }

                    .ivu-collapse-item-active {
                        &.ivu-collapse-item {
                            margin-bottom: 8px;
                        }

                        .ivu-collapse-header {
                            color: #5a575c;
                            font-size: 24px;
                            height: 32px;
                            line-height: 1.14;

                            .line {
                                height: 17px;
                                background: #1a38f8;
                            }
                        }
                    }
                }

                .buyLINA {
                    display: none;
                }

                .mRect {
                    display: flex;
                    position: absolute;
                    justify-content: space-around;
                    align-items: center;
                    width: 74.66vw;
                    height: 28.57vw;
                    bottom: 8.533vw;
                    left: 8.533vw;
                    border-radius: 8px;
                    border: solid 1px #deddde;
                    padding: 0 4vw;
                    cursor: pointer;

                    img {
                        width: 10.66vw;
                        height: 10.66vw;
                    }

                    .box {
                        .context {
                            font-family: Gilroy-Bold;
                            font-size: 14px;
                            font-weight: bold;
                            color: #1a38f8;
                        }

                        .chain {
                            font-family: Gilroy;
                            font-size: 14px;
                            color: #99999a;
                        }
                    }
                }
            }

            .walletBox {
                display: none;
            }
        }
    }
}
</style>
