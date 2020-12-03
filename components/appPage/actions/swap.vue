<template>
    <div id="swap">

        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="swapBox">
                    <div class="actionBody">
                        <div class="actionTitle">Swap</div>
                        <div class="actionDesc">
                            You can select the type of currency and enter the
                            amount you want to swap
                        </div>

                        <div class="fromToBox">
                            <div class="box">
                                <img
                                    v-if="isEthereumNetwork"
                                    src="@/static/ETH.svg"
                                />
                                <img
                                    v-else-if="isBinanceNetwork"
                                    src="@/static/bnb.svg"
                                />
                                <div class="title">
                                    <template v-if="isEthereumNetwork"
                                        >Ethereum Chain</template
                                    >
                                    <template v-else-if="isBinanceNetwork"
                                        >Binance Smart Chain</template
                                    >
                                </div>
                            </div>
                            <img
                                class="arrow"
                                src="@/static/swap_arrow_right.svg"
                            />
                            <div class="box">
                                <img
                                    v-if="isEthereumNetwork"
                                    src="@/static/bnb.svg"
                                />
                                <img
                                    v-else-if="isBinanceNetwork"
                                    src="@/static/ETH.svg"
                                />
                                <div class="title">
                                    <template v-if="isEthereumNetwork"
                                        >Binance Smart Chain</template
                                    >
                                    <template v-else-if="isBinanceNetwork"
                                        >Ethereum Chain</template
                                    >
                                </div>
                            </div>
                        </div>

                        <div
                            class="swapInputBox"
                            :class="{
                                error: errors.amountMsg
                            }"
                        >
                            <div class="iconBox">
                                <div class="icon">
                                    <img :src="currency[selected].img" alt="" />
                                </div>
                            </div>
                            <div class="midle">
                                <div class="p_1">
                                    {{ currentSelectCurrency.name }}
                                </div>
                                <span class="p_2" @click="clickMaxAmount">
                                    MAX
                                </span>
                            </div>
                            <!-- <div
                                class="arrow"
                                @click.stop="showDropdownFun"
                                :class="{ perversion: showDropdown }"
                            >
                                <img
                                    class="blueArrow"
                                    src="@/static/arrow.svg"
                                    alt=""
                                />
                                <img
                                    class="grayArrow"
                                    src="@/static/arrow_gray.svg"
                                    alt=""
                                />
                            </div> -->
                            <div class="value">
                                <div class="price">
                                    <div class="number">
                                        <div class="inputRect">
                                            <InputNumber
                                                class="input"
                                                ref="itemInput0"
                                                element-id="transfer_number_input"
                                                :min="0"
                                                :max="
                                                    currency[selected].avaliable
                                                "
                                                type="text"
                                                v-model="transferNumber"
                                                placeholder="0"
                                                @on-focus="inputFocus(0)"
                                                @on-blur="inputBlur(0)"
                                                :formatter="
                                                    value =>
                                                        toNonExponential(value)
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="someWrong" v-show="errors.amountMsg">
                            {{ errors.amountMsg }}
                        </div>

                        <!-- <div class="dropdown" v-if="showDropdown">
                            <div
                                class="dropdownItem"
                                v-for="(item, index) in currency"
                                @click="selectCurrencyFun(index)"
                                :key="index"
                                :class="{
                                    activity: index == selected
                                }"
                            >
                                <div class="iconBox">
                                    <div class="icon">
                                        <img :src="item.img" alt="" />
                                    </div>
                                </div>
                                <div class="midle">
                                    <div class="p_1">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <gasEditorSwap></gasEditorSwap>
                    </div>

                    <div
                        class="swapBtn"
                        :class="{ disabled: swapDisabled }"
                        @click="clickSwap"
                    >
                        SWAP NOW
                    </div>
                </div>
            </TabPane>
            <TabPane name="m1">
                <wating
                    class="waitingBox"
                    v-if="this.actionTabs == 'm1'"
                    @etherscan="etherscan"
                    @homepage="goHomePage"
                ></wating>
            </TabPane>
            <TabPane name="m2">
                <success
                    class="successBox"
                    @homepage="goHomePage"
                    @close="setDefaultTab"
                ></success>
            </TabPane>
            <TabPane name="m3">
                <wrong
                    class="wrongBox"
                    @again="tryAgain"
                    @close="setDefaultTab"
                    @homepage="goHomePage"
                ></wrong>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import _ from "lodash";
import gasEditorSwap from "@/components/gasEditorSwap";
import {
    toNonExponential,
    openBlockchainScan,
    setCursorRange,
    findParents,
    removeClass,
    addClass
} from "@/common/utils";
import {
    isBinanceNetwork,
    isEthereumNetwork
} from "@/assets/linearLibrary/linearTools/network";

export default {
    name: "swap",
    components: {
        gasEditorSwap
    },
    data() {
        return {
            toNonExponential,
            setCursorRange,
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误)
            swapDisabled: false,
            showDropdown: false,
            selected: 0,
            transferNumber: null,
            processing: false, //swap按钮防抖
            confirmTransactionStatus: false, //确认交易状态
            confirmTransactionHash: "", //交易hash

            errors: {
                amountMsg: ""
            }
        };
    },
    created() {},
    mounted() {
        document.documentElement.addEventListener("click", () => {
            this.showDropdown = false;
        });
    },
    watch: {
        walletAddress() {},
        isEthereumNetwork() {},
        isBinanceNetwork() {},
        walletNetworkId() {}
    },
    computed: {
        isEthereumNetwork() {
            return isEthereumNetwork(this.walletNetworkId);
        },

        isBinanceNetwork() {
            return isBinanceNetwork(this.walletNetworkId);
        },

        walletNetworkId() {
            return this.$store.state?.walletNetworkId;
        },

        walletAddress() {
            return this.$store.state?.wallet?.address;
        },

        //所有资产余额
        currency() {
            var tempData = [];

            if (this.$store.state?.walletDetails?.transferableAssets) {
                for (let key in this.$store.state.walletDetails
                    .transferableAssets) {
                    var img = "";
                    if (key == "ETH") img = require("@/static/ETH.svg");
                    if (key == "BNB") img = require("@/static/bnb.svg");
                    if (key == "lUSD") img = require("@/static/lina_usd.svg");
                    if (key == "LINA") img = require("@/static/LINA_logo.svg");
                    tempData.push({
                        name: key,
                        img: img,
                        avaliable: this.$store.state.walletDetails
                            .transferableAssets[key]
                    });
                }
            }

            if (tempData.length == 0) {
                tempData = [
                    {
                        name: "lUSD",
                        img: require("@/static/lina_usd.svg"),
                        avaliable: 0
                    }
                ];
                return tempData;
            } else {
                return tempData;
            }
        },

        currentSelectCurrency() {
            return this.currency[this.selected] || {};
        }
    },
    methods: {
        // openSocial(slug) {
        //     switch (slug) {
        //         case 0:
        //             window.open("https://t.me/joinchat/Tb3iAhuMZsyfspxhEWQLvw");
        //             break;
        //         case 1:
        //             window.open(
        //                 "https://www.linkedin.com/company/linearfinance/"
        //             );
        //             break;
        //         case 2:
        //             window.open("https://medium.com/@linear.finance");
        //             break;
        //         case 3:
        //             window.open("https://twitter.com/LinearFinance");
        //             break;
        //         default:
        //             break;
        //     }
        // },

        clickSwap() {
            // console.log('click swap');
        },

        async selectCurrencyFun(index) {
            this.errors.amountMsg = "";
            this.selected = index;
            this.transferNumber = 0;
        },

        showDropdownFun() {
            setTimeout(() => {
                this.showDropdown = !this.showDropdown;
            }, 1);
        },

        //点击最大
        clickMaxAmount() {
            this.transferNumber = this.currency[this.selected].avaliable;

            var el = document.getElementById("transfer_number_input");
            this.setCursorRange(el, 0, 0);
        },

        //获取焦点
        inputFocus(index) {
            this.$nextTick(() => {
                let currentElement = this.$refs["itemInput" + index].$el;
                let parentElement = findParents(currentElement, "swapInputBox");
                addClass(parentElement, "active");
            });
        },

        //失去焦点
        inputBlur(index) {
            this.$nextTick(() => {
                let currentElement = this.$refs["itemInput" + index].$el;
                let parentElement = findParents(currentElement, "swapInputBox");
                removeClass(parentElement, "active");
            });
        },

        //到 etherscan 查看交易记录详情
        etherscan() {
            //模拟跳到错误页
            this.actionTabs = "m3";
        },

        //交易状态页面回调方法 回到主页
        goHomePage() {
            this.$store.commit("setCurrentAction", 0);
        },

        //回到默认状态
        setDefaultTab() {
            this.activeItemBtn = -1;
            this.burnData = { unStake: null, amount: null, ratio: 750 };
            this.actionTabs = "m0";

            //重新拉取新数据
        },

        //重试
        tryAgain() {
            this.actionTabs = "m0";
        }
    }
};
</script>

<style lang="scss">
#swap {
    // .comingSoon {
    //     text-align: center;

    //     .noticeImg {
    //         width: 120px;
    //         margin-top: 246px;
    //     }
    //     .title {
    //         margin-top: 56px;
    //         font-family: Gilroy;
    //         font-size: 24px;
    //         font-weight: bold;
    //         color: #5a575c;
    //     }
    //     .context {
    //         font-family: Gilroy;
    //         font-size: 16px;
    //         color: #5a575c;
    //     }
    //     .socialBox {
    //         margin-top: 48px;
    //         display: flex;
    //         justify-content: center;

    //         .box {
    //             width: 40px;
    //             height: 40px;
    //             display: flex;
    //             justify-content: center;
    //             align-items: center;
    //             border: solid 1px #deddde;
    //             border-radius: 50%;
    //             margin: 0 12px 0 12px;
    //             cursor: pointer;

    //             svg {
    //                 width: 16px;
    //             }

    //             &:hover {
    //                 border-color: #1b05a1;

    //                 svg {
    //                     path {
    //                         fill: #1b05a1;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    .actionTabs {
        .ivu-tabs-bar {
            display: none;
        }

        .ivu-tabs-content {
            background: #fff;

            .ivu-tabs-tabpane {
                width: 786px;
                height: 840px !important;

                .swapBox,
                .waitingBox,
                .successBox,
                .failBox {
                    width: 100%;
                    height: 100%;
                }

                .swapBox {
                    position: relative;

                    .actionBody {
                        padding: 64px 193px 0;

                        .actionTitle {
                            font-family: Gilroy-Bold;
                            font-size: 32px;
                            font-weight: bold;
                            line-height: 40px;
                            text-align: center;
                            color: #5a575c;
                        }

                        .actionDesc {
                            margin: 8px 55px 100px;
                            font-family: Gilroy-Regular;
                            font-size: 14px;
                            line-height: 18px;
                            text-align: center;
                            color: #99999a;
                        }
                    }

                    .fromToBox {
                        // padding: 0 46px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        .box {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .title {
                                font-family: Gilroy-Bold;
                                font-size: 14px;
                                font-weight: bold;
                                line-height: 18px;
                                color: #99999a;
                                margin-top: 20px;
                            }

                            img {
                                width: 48px;
                            }
                        }

                        .arrow {
                            width: 42px;
                            align-self: flex-start;
                        }
                    }

                    .swapInputBox {
                        width: 400px;
                        height: 120px;
                        border-radius: 8px;
                        border: 1px solid #deddde;
                        transition: $animete-time linear;
                        box-shadow: 0 0 0 #deddde;
                        margin-top: 64px;
                        display: flex;
                        position: relative;

                        .icon {
                            border: solid 1px #deddde;
                        }

                        &:hover,
                        &.active {
                            box-shadow: 0 2px 12px #deddde;
                            border-color: white;
                        }
                        &.error {
                            border-color: #df434c;
                        }
                        & > div {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .iconBox {
                            width: 80px;
                            .icon {
                                text-align: center;
                                width: 40px;
                                height: 40px;
                                line-height: 40px;
                                border-radius: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img {

                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }

                        .midle {
                            flex: 1;
                            flex-direction: column;
                            align-items: flex-start;
                            > div {
                                width: 100%;
                            }
                            .p_1 {
                                font-family: Gilroy-Bold;
                                font-size: 16px;
                                font-weight: bold;
                                line-height: 24px;
                                color: #5a575c;
                            }
                            .p_2 {
                                opacity: 0.2;
                                cursor: pointer;
                                transition: $animete-time linear;
                                font-family: Gilroy-Bold;
                                font-size: 12px;
                                font-weight: bold;
                                line-height: 16px;
                                letter-spacing: 1.5px;
                                color: #1b05a1;

                                &:hover {
                                    opacity: 1;
                                }
                            }
                        }
                        .arrow {
                            width: 30px;
                            cursor: pointer;
                            transition: $animete-time linear;

                            &.perversion {
                                transform: rotate(180deg);
                                .blueArrow {
                                    display: inline !important;
                                }
                                .grayArrow {
                                    display: none !important;
                                }
                            }
                            .grayArrow {
                                display: inline;
                            }
                            .blueArrow {
                                display: none;
                                transform: rotate(180deg);
                            }
                        }
                        &:hover {
                            .blueArrow {
                                display: inline;
                            }
                            .grayArrow {
                                display: none;
                            }
                        }
                        .value {
                            width: 220px;
                            flex-direction: column;
                            padding-right: 15px;
                            .price {
                                width: 100%;
                                display: flex;
                                .number {
                                    flex: 1;
                                    color: #c6c4c7;
                                    font-family: Gilroy;
                                    font-size: 32px;
                                    text-align: right;

                                    .inputRect {
                                        display: flex;
                                        align-items: center;
                                        justify-content: flex-end;
                                        .input {
                                            width: 100%;
                                            border: none;
                                            box-shadow: none;

                                            .ivu-input-number-handler-wrap {
                                                display: none;
                                            }

                                            .ivu-input-number-input {
                                                text-align: right;
                                                color: #5a575c;
                                                font-family: Gilroy-Bold;
                                                font-size: 32px;
                                                font-weight: bold;
                                                line-height: 40px;

                                                &::placeholder {
                                                    color: #99999a;
                                                }
                                            }
                                        }
                                    }
                                }
                                .unit {
                                    width: 40px;
                                    color: #5a575c;
                                    font-family: "PingFangHK-Regular";
                                    font-size: 16px;
                                    text-align: right;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                            }
                            .avaliable {
                                color: #c6c4c7;
                                font-family: Gilroy;
                                font-size: 12px;
                                width: 100%;
                                text-align: right;
                            }
                        }
                    }

                    .someWrong {
                        color: #df434c;
                        font-family: Gilroy;
                        font-weight: 700;
                        font-size: 12px;
                        text-transform: uppercase;
                    }

                    #gasEditor {
                        margin-top: 24px;
                    }

                    .dropdown {
                        position: absolute;
                        top: 521px;
                        width: 400px;
                        height: 232px;
                        padding: 8px 0;
                        background: #fff;
                        box-shadow: 0 2px 12px #deddde;
                        z-index: 1;
                        border-radius: 8px;
                        border: 1px solid #deddde;
                        transition: box-shadow $animete-time linear;
                        display: flex;
                        flex-direction: column;

                        & .activity {
                            background: rgba(27, 5, 161, 0.1);
                            .midle {
                                .p_1 {
                                    color: #1b05a1;
                                }
                            }
                        }
                        .dropdownItem > div {
                            height: 72px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        // .dropdownItem:first-child {
                        //     border-top-left-radius: 8px;
                        //     border-top-right-radius: 8px;
                        // }
                        // .dropdownItem:last-child {
                        //     border-bottom-left-radius: 8px;
                        //     border-bottom-right-radius: 8px;
                        // }
                        .dropdownItem:hover {
                            .midle {
                                .p_1 {
                                    color: #1b05a1;
                                }
                            }
                        }
                        & > div {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }
                        .iconBox {
                            width: 74px;
                            .icon {
                                text-align: center;
                                width: 40px;
                                height: 40px;
                                line-height: 40px;
                                border-radius: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background-color: #fff;
                            }
                        }
                        .midle {
                            flex: 1;
                            flex-direction: column;
                            > div {
                                width: 100%;
                            }
                            .p_1 {
                                font-family: Gilroy-Bold;
                                font-size: 16px;
                                font-weight: bold;
                                line-height: 24px;
                                color: #5a575c;
                            }
                        }
                    }

                    .swapBtn {
                        width: 100%;
                        height: 80px;
                        background: #1b05a1;
                        position: absolute;
                        bottom: 0px;
                        color: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        cursor: pointer;
                        transition: $animete-time linear;
                        font-family: Gilroy-Bold;
                        font-size: 24px;
                        font-weight: bold;
                        line-height: 32px;

                        &:hover {
                            &:not(.disabled) {
                                background-color: #1f04c6;
                            }
                        }

                        &.disabled {
                            opacity: 0.1;
                            cursor: not-allowed;
                        }

                        &.swapBtnActivited {
                            opacity: unset;
                        }
                    }
                }
            }
        }
    }
}
</style>
