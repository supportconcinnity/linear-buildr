<template>
    <div id="transferWatingEnhanceSwap">
        <div class="close" @click.stop="$emit('close')">
            <closeSvg></closeSvg>
        </div>

        <div class="waitTitle">
            <template v-if="waitChainChange">
                Switch to

                <template
                    v-if="
                        sourceWalletType == SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                    "
                >
                    Metamask Wallet
                </template>

                <template
                    v-if="
                        sourceWalletType == SUPPORTED_WALLETS_MAP.METAMASK &&
                            currentWalletType == SUPPORTED_WALLETS_MAP.METAMASK
                    "
                >
                    <template v-if="isEthereumNetwork(targetNetworkId)"
                        >Ethereum</template
                    >
                    <template v-if="isBinanceNetwork(targetNetworkId)"
                        >BSC</template
                    >
                    Network in Metamask
                </template>
                <template
                    v-if="
                        sourceWalletType == SUPPORTED_WALLETS_MAP.METAMASK &&
                            currentWalletType != SUPPORTED_WALLETS_MAP.METAMASK
                    "
                >
                    BSC Wallet
                </template>
            </template>

            <template v-else>
                <span v-if="currentStep > setupArray.length - 1"
                    >Congratulations!</span
                >
                <span v-else-if="currentErrMsg"
                    >Oops! Something went wrong</span
                >
                <span v-else-if="!currentConfirm">
                    Confirm with
                    <template
                        v-if="
                            currentWalletType == SUPPORTED_WALLETS_MAP.METAMASK
                        "
                    >
                        Metamask
                    </template>

                    <template
                        v-if="
                            currentWalletType ==
                                SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                        "
                    >
                        BSC Wallet
                    </template>
                </span>
                <span v-else>Interacting with the smart contract</span>
            </template>
        </div>

        <div class="waitDesc">
            <span v-if="currentStep > setupArray.length - 1"
                >Your transaction has been processed already</span
            ><span class="error" v-else-if="currentErrMsg">{{
                currentErrMsg
            }}</span>
        </div>

        <div class="walletRect">
            <template v-if="waitChainChange">
                <template
                    v-if="sourceWalletType == SUPPORTED_WALLETS_MAP.METAMASK"
                >
                    <div
                        v-if="
                            hasBinanceWallet &&
                                !isBinanceNetwork(currentNetworkId)
                        "
                        class="hasBinanceWallet"
                    >
                        <div class="step" @click="jumpToSetup">
                            How to setup
                            <img src="@/static/arrow_right.svg" />
                        </div>

                        <div class="walletIcon">
                            <img
                                v-if="isEthereumNetwork(currentNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_eth.svg"
                            />
                            <img
                                v-if="isBinanceNetwork(currentNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_bsc.svg"
                            />
                            <img
                                class="arrow"
                                src="@/static/transferProgress/short_arrow.svg"
                            />
                            <img
                                v-if="isEthereumNetwork(targetNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_eth.svg"
                            />
                            <img
                                v-if="isBinanceNetwork(targetNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_bsc.svg"
                            />
                        </div>

                        <div class="divider"><span>OR</span></div>

                        <div class="waitTitle">
                            Switch to BSC Wallet
                        </div>

                        <div class="walletIcon">
                            <img
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_wallet.svg"
                            />
                            <img
                                class="arrow"
                                src="@/static/transferProgress/short_arrow.svg"
                            />
                            <img
                                class="wallteLogo"
                                src="@/static/transferProgress/bsc_wallet.svg"
                            />
                        </div>
                    </div>

                    <div v-else class="notBinanceWallet">
                        <div class="step" @click="jumpToSetup">
                            How to setup BSC on Metamask
                            <img src="@/static/arrow_right.svg" />
                        </div>

                        <div class="walletIcon">
                            <img
                                v-if="isEthereumNetwork(currentNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_eth.svg"
                            />
                            <img
                                v-if="isBinanceNetwork(currentNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_bsc.svg"
                            />
                            <img
                                class="arrow"
                                src="@/static/transferProgress/long_arrow.svg"
                            />
                            <img
                                v-if="isEthereumNetwork(targetNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_eth.svg"
                            />
                            <img
                                v-if="isBinanceNetwork(targetNetworkId)"
                                class="wallteLogo"
                                src="@/static/transferProgress/metamask_bsc.svg"
                            />
                        </div>
                    </div>
                </template>

                <template
                    v-if="
                        sourceWalletType == SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                    "
                >
                    <div class="walletIcon">
                        <img
                            class="wallteLogo"
                            src="@/static/transferProgress/bsc_wallet.svg"
                        />
                        <img
                            class="arrow"
                            src="@/static/transferProgress/long_arrow.svg"
                        />
                        <img
                            class="wallteLogo"
                            src="@/static/transferProgress/metamask_wallet.svg"
                        />
                    </div>
                </template>
            </template>

            <template v-else>
                <template
                    v-if="sourceWalletType == SUPPORTED_WALLETS_MAP.METAMASK"
                >
                    <div
                        class="walletIcon"
                        v-if="
                            currentWalletType == SUPPORTED_WALLETS_MAP.METAMASK
                        "
                    >
                        <img
                            v-if="isEthereumNetwork(currentNetworkId)"
                            class="wallteLogo eth"
                            src="@/static/transferProgress/metamask_eth.svg"
                        />
                        <img
                            v-if="isBinanceNetwork(currentNetworkId)"
                            class="wallteLogo eth"
                            src="@/static/transferProgress/metamask_bsc.svg"
                        />
                    </div>
                    <div
                        class="walletIcon"
                        v-if="
                            currentWalletType ==
                                SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                        "
                    >
                        <img
                            class="wallteLogo"
                            src="@/static/transferProgress/bsc_wallet.svg"
                        />
                    </div>
                </template>

                <template
                    v-if="
                        sourceWalletType == SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                    "
                >
                    <div
                        class="walletIcon"
                        v-if="
                            currentWalletType ==
                                SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                        "
                    >
                        <img
                            class="wallteLogo"
                            src="@/static/transferProgress/bsc_wallet.svg"
                        />
                    </div>

                    <div v-else class="walletIcon">
                        <img
                            v-if="isEthereumNetwork(currentNetworkId)"
                            class="wallteLogo eth"
                            src="@/static/transferProgress/metamask_eth.svg"
                        />
                        <img
                            v-if="isBinanceNetwork(currentNetworkId)"
                            class="wallteLogo eth"
                            src="@/static/transferProgress/metamask_bsc.svg"
                        />
                    </div>
                </template>
            </template>
        </div>

        <div class="processBar">
            <div class="itemBox">
                <div
                    v-for="(item, index) in setupArray"
                    :key="index"
                    class="item"
                >
                    <div class="imgBox">
                        <transition-group name="img-fade">
                            <!-- 大于进度 -->
                            <img
                                class="img"
                                key="1"
                                v-if="currentStep < index"
                                src="@/static/transferProgress/default.svg"
                            />

                            <!-- 当前进度没错误 -->

                            <template
                                v-else-if="
                                    currentStep == index && !currentErrMsg
                                "
                            >
                                <img
                                    key="2"
                                    class="loading"
                                    src="@/static/transferProgress/loading.svg"
                                />

                                <template v-if="waitChainChange">

                                    <img
                                        v-if="
                                            isEthereumNetwork(targetNetworkId)
                                        "
                                        key="23"
                                        class="walletType"
                                        src="@/static/transferProgress/eth_network.svg"
                                    />
                                    <img
                                        v-if="
                                            isBinanceNetwork(targetNetworkId)
                                        "
                                        key="24"
                                        class="walletType"
                                        src="@/static/transferProgress/bsc_network.svg"
                                    />
                                </template>

                                <template v-else>
                                    <img
                                        v-if="
                                            isEthereumNetwork(currentNetworkId)
                                        "
                                        key="23"
                                        class="walletType"
                                        src="@/static/transferProgress/eth_network.svg"
                                    />
                                    <img
                                        v-if="
                                            isBinanceNetwork(currentNetworkId)
                                        "
                                        key="24"
                                        class="walletType"
                                        src="@/static/transferProgress/bsc_network.svg"
                                    />
                                </template>
                            </template>

                            <!-- 当前进度有错误 -->
                            <img
                                key="3"
                                v-else-if="
                                    currentStep == index && currentErrMsg
                                "
                                src="@/static/transferProgress/failed.svg"
                            />

                            <!-- 已完成进度没错误 -->
                            <img
                                key="4"
                                v-else-if="
                                    currentStep > index && !currentErrMsg
                                "
                                src="@/static/transferProgress/completed.svg"
                            />

                            <!-- 已完成进度有错误 -->
                            <img
                                key="5"
                                v-else-if="currentStep > index && currentErrMsg"
                                src="@/static/transferProgress/completed_disable.svg"
                            />
                        </transition-group>
                    </div>
                    <div
                        class="text"
                        :class="{ current: currentStep == index }"
                    >
                        {{ item }}
                    </div>
                    <div
                        class="view"
                        v-if="
                            currentStep == index &&
                                currentConfirm &&
                                !currentErrMsg
                        "
                        @click.stop="
                            openBlockchainBrowser(currentHash, currentNetworkId)
                        "
                    >
                        <template v-if="isEthereumNetwork(currentNetworkId)">
                            View Etherscan
                        </template>
                        <template
                            v-else-if="isBinanceNetwork(currentNetworkId)"
                        >
                            View Bscscan
                        </template>

                        <img src="@/static/arrow_right.svg" />
                    </div>
                    <div
                        v-else-if="currentStep == index && currentErrMsg"
                        class="tryAgain"
                        @click.stop="tryAgain"
                    >
                        try again
                    </div>
                </div>
            </div>

            <div class="dividerBox">
                <ul>
                    <li
                        v-for="(item, index) in setupArray"
                        :key="index"
                        class="divider"
                        :class="{
                            has: index < setupArray.length - 1,
                            active: currentStep > index && !currentErrMsg
                        }"
                        :style="{
                            left: `calc(100% / ${setupArray.length} /2)`
                        }"
                    ></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { openBlockchainBrowser } from "@/common/utils";
import closeSvg from "@/components/svg/close";
import {
    SUPPORTED_WALLETS_MAP,
    isEthereumNetwork,
    isBinanceNetwork
} from "@/assets/linearLibrary/linearTools/network";
export default {
    name: "transferWatingEnhanceSwap",
    components: {
        closeSvg
    },
    props: {
        currentStep: {
            type: Number,
            default: 1
        },
        currentHash: {
            type: String,
            default: ""
        },
        currentConfirm: {
            type: Boolean,
            default: false
        },
        currentNetworkId: {
            type: [Number, String],
            default: 1
        },
        targetNetworkId: {
            type: [Number, String],
            default: 56
        },

        sourceWalletType: {
            type: String,
            default: ""
        },
        currentErrMsg: {
            type: String,
            default: ""
        },
        waitChainChange: {
            type: Boolean,
            default: false
        },
        setupArray: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            openBlockchainBrowser,
            SUPPORTED_WALLETS_MAP,
            isEthereumNetwork,
            isBinanceNetwork
        };
    },
    watch: {
        currentWalletType() {},
        hasBinanceWallet() {}
    },
    computed: {
        currentWalletType() {
            return this.$store.state?.walletType;
        },

        hasBinanceWallet() {
            return window.BinanceChain;
        }
    },
    mounted() {},
    methods: {
        tryAgain() {
            this.$emit("tryAgain");
        },

        jumpToSetup() {
            let url =
                "https://docs.binance.org/smart-chain/wallet/metamask.html";
            window.open(url, "_blank");
        }
    },
    destroyed() {}
};
</script>

<style lang="scss">
#transferWatingEnhanceSwap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: white;

    .waitTitle {
        font-family: Gilroy-Bold;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: normal;
        text-align: center;
        color: #5a575c;
        max-width: 550px;
        width: 100%;
        margin-top: 228px;
    }

    .waitDesc {
        width: 100%;
        max-width: 500px;
        max-height: 50px;
        overflow-y: auto;
        color: #5a575c;
        font-family: Gilroy-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        position: absolute;
        top: 272px;
        word-break: break-all;

        .error {
            color: #df434c;
        }
    }

    .walletRect {
        .step {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-family: Gilroy-Bold;
            font-size: 12px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.33;
            letter-spacing: 1.5px;
            text-align: center;
            color: #1a38f8;
            text-transform: uppercase;
            margin-top: 8px;

            img {
                margin-left: 4px;
            }
        }
        .walletIcon {
            margin-top: 76px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;

            .wallteLogo {
                width: 120px;
                height: 120px;

                &.eth {
                    margin-left: 20px;
                }
            }

            .arrow {
                width: 148px;
                height: 20px;
                margin: 0 25px;
            }
        }

        .hasBinanceWallet,
        .notBinanceWallet {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .hasBinanceWallet {
            .walletIcon {
                margin-top: 24px;

                .wallteLogo {
                    width: 60px;
                    height: 60px;
                }

                .arrow {
                    width: 70px;
                }
            }

            .divider {
                border-top: 1px solid #e5e5e5;
                margin: 40px 0;
                position: relative;
                width: 150%;

                span {
                    font-family: Gilroy-Regular;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    color: #99999a;
                    position: absolute;
                    left: 50%;
                    background: white;
                    width: 75px;
                    transform: translate(-50%, -50%);
                }
            }

            .waitTitle {
                margin-top: 0px;
            }
        }

        .notBinanceWallet {
            .walletIcon {
                margin-top: 52px;
            }
        }
    }

    .processBar {
        width: 100%;
        max-width: 500px;
        position: absolute;
        bottom: 165px;

        .itemBox {
            width: 100%;
            position: absolute;
            display: flex;
            justify-content: space-around;
            z-index: 2;

            .item {
                // z-index: 1;
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;

                .imgBox {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    margin-bottom: 8px;

                    img {
                        background-color: white;
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        transform: translateZ(0);

                        &.walletType {
                            width: 16px;
                            height: 16px;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }

                        &.loading {
                            animation: rotate 3s linear infinite;
                        }
                    }
                }

                .text {
                    margin-bottom: 4px;
                    font-family: Gilroy-Medium;
                    font-size: 12px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: normal;
                    text-align: center;
                    color: #5a575c;

                    &.current {
                        font-family: Gilroy-Bold;
                        font-weight: bold;
                    }
                }

                .view,
                .tryAgain {
                    cursor: pointer;
                    opacity: 0.2;
                    text-align: center;
                    display: flex;
                    font-family: Gilroy-Bold;
                    font-size: 10px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.6;
                    letter-spacing: 1.25px;
                    color: #1a38f8;
                    text-transform: uppercase;

                    transition: opacity $animete-time linear;

                    img {
                        width: 16px;
                        height: 16px;
                    }

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }

        .dividerBox {
            position: relative;
            z-index: 1;
            ul {
                list-style: none;
                width: 100%;
                position: relative;
                display: flex;
                justify-content: space-around;
                top: 17.5px;

                li {
                    flex: 1;
                    position: relative;

                    &.has {
                        height: 5px;
                        background-color: #e5e5e5;

                        &.active {
                            background-color: #1a38f8;
                        }
                    }
                }
            }
        }
    }

    .close {
        position: absolute;
        top: 24px;
        right: 24px;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>
