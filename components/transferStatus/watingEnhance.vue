<template>
    <div id="transferWatingEnhance">
        <img
            v-if="walletType == SUPPORTED_WALLETS_MAP.METAMASK"
            class="wallteLogo"
            src="@/static/metamask.svg"
        />
        <img
            v-if="walletType == SUPPORTED_WALLETS_MAP.BINANCE_CHAIN"
            class="wallteLogo"
            src="@/static/binance.svg"
        />

        <div class="close" @click.stop="$emit('close')">
            <closeSvg></closeSvg>
        </div>

        <div class="waitTitle">
            <span v-if="currentStep > setupArray.length - 1"
                >Congratulations!</span
            >
            <span v-else-if="currentErrMsg">Oops! Something is wrong</span>
            <span v-else-if="!currentConfirm">Confirm with your wallet</span>
            <span v-else>Interacting with the smart contract</span>
        </div>
        <div class="waitDesc">
            <span v-if="currentStep > setupArray.length - 1"
                >Your transaction has been processed already</span
            ><span class="error" v-else-if="currentErrMsg">{{
                currentErrMsg
            }}</span>
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
                            <img
                                key="2"
                                class="loading"
                                v-else-if="
                                    currentStep == index && !currentErrMsg
                                "
                                src="@/static/transferProgress/loading.svg"
                            />

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
                    <div class="text">{{ item }}</div>
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
                        View on Etherscan
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
import { SUPPORTED_WALLETS_MAP } from "@/assets/linearLibrary/linearTools/network";
export default {
    name: "transferWatingEnhance",
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
        currentErrMsg: {
            type: String,
            default: ""
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
            SUPPORTED_WALLETS_MAP
        };
    },
    watch: {
        walletType() {}
    },
    computed: {
        walletType() {
            return this.$store.state?.walletType;
        }
    },
    mounted() {},
    methods: {
        tryAgain() {
            this.$emit("tryAgain");
        }
    },
    destroyed() {}
};
</script>

<style lang="scss">
#transferWatingEnhance {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .wallteLogo {
        width: 120px;
        height: 120px;
        margin-top: 245px;
        margin-bottom: 64px;
    }

    .waitTitle {
        font-family: Gilroy;
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        text-align: center;
        color: #5a575c;
        max-width: 500px;
        width: 100%;
    }

    .waitDesc {
        width: 100%;
        max-width: 500px;
        max-height: 115px;
        overflow-y: auto;
        font-family: Gilroy;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #5a575c;
        margin-bottom: 32px;

        .error {
            color: #f22e45;
        }
    }

    .processBar {
        width: 100%;
        max-width: 500px;
        position: relative;

        .itemBox {
            width: 100%;
            position: absolute;
            display: flex;
            justify-content: space-around;

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
                        background-color: #fafafa;
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        transform: translateZ(0);

                        &.loading {
                            animation: rotate 3s linear infinite;
                        }
                    }
                }

                .text {
                    font-family: Gilroy;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 16px;
                    text-align: center;
                    margin-bottom: 4px;
                }

                .view,
                .tryAgain {
                    cursor: pointer;
                    opacity: 0.2;
                    font-family: Gilroy;
                    font-size: 10px;
                    font-weight: bold;
                    line-height: 16px;
                    letter-spacing: 1.25px;
                    text-align: center;
                    color: #1a38f8;
                    display: flex;

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
            z-index: -1;
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
