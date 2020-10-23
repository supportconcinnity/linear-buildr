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
                        What do LINA stakers need to do?
                        <p slot="content">
                            Users can use ℓUSD to purchase synthetic assets on
                            our exchange or even move it to other protocols or
                            dapps within the DeFi ecosystem.
                        </p>
                    </Panel>
                </Collapse>
            </div>
            <div class="walletBox">
                <div class="box">
                    <div class="title">
                        Buy LINA or Connect your wallet
                    </div>
                    <div class="buyLINA">
                        <a href="#">
                            <img class="LINALogo" src="@/static/LINA_logo.svg" alt="" />
                            Buy LINA <img src="@/static/arrow_right.svg" alt="" />
                        </a>
                    </div>
                    <div class="connectWallet">
                        <div
                            class="walletConnectBox"
                            @click="selectedWallet('WalletConnect')"
                        >
                            <img
                                src="@/static/wallect_connect_logo.svg"
                                alt=""
                            />
                            WalletConnect
                        </div>
                        <div
                            class="metaMaskBox"
                            @click="selectedWallet('Metamask')"
                        >
                            <img src="@/static/metamask_logo.svg" alt="" />
                            MetaMask
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "landingPage",
    data() {
        return {
            introduct: "1"
        };
    },
    methods: {
        //将选择的钱包类型设置为全局状态
        selectedWallet: function(walletType) {
            this.$store.commit("setWalletType", walletType);
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
            box-shadow: 0px 2px 12px #deddde;

            .ivu-collapse {
                background: unset;
                border: unset;

                .ivu-collapse-item {
                    margin: 0 0 24px 138px;
                    border: unset;

                    .ivu-collapse-header {
                        color: #c6c4c7;
                        font-family: Gilroy;
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
                                width: 380px;
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
                    display: flex;
                    align-items: center;
                    flex-direction: column;

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
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 32px;
                        text-align: center;
                        text-transform: uppercase;
                        letter-spacing: 1px;

                        img {
                            width: 28px;
                            margin: 5px auto 0;
                            display: block;
                        }
                    }
                }

                .connectWallet {
                    .walletConnectBox,
                    .metaMaskBox {
                        width: 306px;
                        height: 80px;
                        display: flex;
                        align-items: center;
                        border-radius: 16px;
                        border: solid 1px #deddde;
                        color: #5a575c;
                        font-family: Gilroy;
                        font-size: 16px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        cursor: pointer;
                        transition: $animete-time linear;

                        img {
                            width: 40px;
                            margin: 0 24px 0 32px;
                        }

                        &:hover {
                            border-color: white;
                            background: #ffffff;
                            box-shadow: 0px 2px 12px #deddde;
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
