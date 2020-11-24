<template>
    <div id="swap">
        <!-- <div class="comingSoon">
            <img class="noticeImg" src="@/static/notice.svg" alt="">
            <div class="title">Coming Soon</div>
            <div class="context">Stay tuned to our social media</div>
            <div class="socialBox">
                <div class="box" @click="openSocial(0)">
                    <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267
                         1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247
                          1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" fill="#c1c1c1"/>
                    </svg>
                </div>
                <div class="box" @click="openSocial(1)">
                    <svg t="1598342108609" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="3371" width="32" height="32" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <style type="text/css"></style>
                        </defs>
                        <path d="M260.096 155.648c0 27.307008-9.899008 50.516992-29.696 69.632-19.796992 19.115008-45.396992 28.672-76.8
                         28.672-30.036992 0-54.612992-9.556992-73.728-28.672-19.115008-19.115008-28.672-42.324992-28.672-69.632 0-28.672
                          9.556992-52.224 28.672-70.656 19.115008-18.432 44.372992-27.648 75.776-27.648 31.403008 0 56.32 9.216 74.752 27.648
                           18.432 18.432 28.331008 41.984 29.696 70.656 0 0 0 0 0 0m-202.752 808.96c0 0 0-632.832 0-632.832 0 0 196.608 0 196.608
                            0 0 0 0 632.832 0 632.832 0 0-196.608 0-196.608 0 0 0 0 0 0 0m313.344-430.08c0-58.708992-1.364992-126.292992-4.096-202.752
                             0 0 169.984 0 169.984 0 0 0 10.24 88.064 10.24 88.064 0 0 4.096 0 4.096 0 40.96-68.267008 105.812992-102.4 194.56-102.4
                              68.267008 0 123.220992 22.868992 164.864 68.608 41.643008 45.739008 62.464 113.664 62.464 203.776 0 0 0 374.784 0 374.784
                               0 0-196.608 0-196.608 0 0 0 0-350.208 0-350.208 0-91.476992-33.451008-137.216-100.352-137.216-47.787008 0-81.236992
                                24.576-100.352 73.728-4.096 8.192-6.144 24.576-6.144 49.152 0 0 0 364.544 0 364.544 0 0-198.656 0-198.656 0 0 0 0-430.08
                                 0-430.08 0 0 0 0 0 0" p-id="3372" fill="#c1c1c1">
                        </path>
                    </svg>
                </div>
                <div class="box" @click="openSocial(2)">
                    <svg width="24px" height="21px" viewBox="0 0 24 21" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                        <desc>Created with Lunacy</desc>
                        <g id="medium-icon">
                            <path d="M22.1842 18.4458L24 20.2638L24 20.3241L14.79 20.3241L14.79 20.2638L16.6388 18.4458C16.836 18.2774 16.9305 18.0102 16.8851
                            17.7477L16.8851 6.12578C16.8851 5.63461 16.8851 4.97078 16.9676 4.403L10.755 20.5567L10.6811 20.5567L4.248 5.69489L3.97687 5.04856L3.97687
                             14.7933C3.8998 15.4451 4.00538 16.1061 4.281 16.6973L6.86925 20.2642L6.86925 20.3245L0 20.3245L0 20.2642L2.58825 16.6888C2.862 16.1008
                              2.96325 15.4428 2.892 14.7933L2.892 4.02344C2.934 3.493 2.78137 2.96567 2.4645 2.55033L0.632625 0.0602778L0.632625 0L7.20563 0L12.7106
                               12.5876L17.5583 0L23.9918 0L23.9918 0.0602778L22.1842 2.17117C21.9675 2.33722 21.8595 2.61761 21.9049 2.8945L21.9049 17.7477C21.8565
                                18.0173 21.966 18.291 22.1842 18.4458Z" id="Path" fill="#c1c1c1" stroke="none" />
                        </g>
                    </svg>
                </div>
                <div class="box" @click="openSocial(3)">
                    <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                        <desc>Created with Lunacy</desc>
                        <g id="twitter-official">
                            <path d="M7.54753 19.9056C16.6042 19.9056 21.5577 12.2466 21.5577 5.60489C21.5577 5.38728 21.5577 5.17072 21.5434 4.95417C22.507 4.24299
                             23.3388 3.36239 24 2.35359C23.1013 2.76007 22.148 3.02664 21.1718 3.14441C22.1997 2.51629 22.9691 1.52837 23.3366 0.364502C22.37 0.949928
                              21.3126 1.3625 20.2099 1.58441C18.6835 -0.0721782 16.2583 -0.47761 14.294 0.595451C12.3297 1.66851 11.3149 3.95321 11.8186 6.16843C7.85944
                               5.96581 4.17072 4.057 1.67044 0.917038C0.363516 3.21355 1.03102 6.15149 3.19481 7.62642C2.41123 7.6027 1.64473 7.38693 0.96 6.99733L0.96
                                7.06096C0.960616 9.45352 2.61289 11.5142 4.91044 11.9879C4.18551 12.1897 3.4249 12.2192 2.68706 12.0742C3.33212 14.1216 5.18072 15.5242
                                 7.28738 15.5646C5.54376 16.9634 3.38982 17.7227 1.17216 17.7204C0.780385 17.7196 0.388994 17.6954 0 17.6479C2.25181 19.1229 4.87192 19.9053
                                  7.54753 19.9016" id="Path" fill="#c1c1c1" stroke="none" />
                        </g>
                    </svg>
                </div>
            </div>
        </div> -->

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
                                    src="@/static/bnb_yellow.svg"
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
                                    src="@/static/bnb_yellow.svg"
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
                                <div class="p_2" @click="clickMaxAmount">
                                    MAX
                                </div>
                            </div>
                            <div
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
                            </div>
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

                        <div class="dropdown" v-if="showDropdown">
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
                        </div>

                        <gasEditor :forceBTH="true"></gasEditor>
                        <gasEditor :forceBSC="true" style="margin-top: 14px;"></gasEditor>
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
import gasEditor from "@/components/gasEditor";
import {
    toNonExponential,
    openEtherScan,
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
        gasEditor
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
                    if (key == "BNB") img = require("@/static/bnb_yellow.svg");
                    if (key == "lUSD") img = require("@/static/lina_usd.svg");
                    if (key == "LINA") img = require("@/static/lina_icon.svg");
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
                                }
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
                                border: solid 1px #deddde;
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
