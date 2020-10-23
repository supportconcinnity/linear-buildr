<template>
    <div id="transfer">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="transferBox">
                    <div class="transferMain">
                        <div class="text">
                            <div class="title">Transfer</div>
                            <div class="descript">
                                You can select the type of currency you want to transfer and enter the wallet address
                            </div>
                        </div>
                        <div class="from" @click="changeActiveItem(0)">
                            <div class="iconBox">
                                <div class="icon">
                                    <img :src="currency[selected].img" alt="" />
                                </div>
                            </div>
                            <div class="midle">
                                <div class="p_1">
                                    Amount
                                </div>
                                <div class="p_2" @click="clickMaxAmount">
                                    MAX
                                </div>
                            </div>
                            <div
                                class="arrow"
                                @click="showDropdownFun"
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
                                                :min="0"
                                                :max="
                                                    currency[selected].avaliable
                                                "
                                                type="text"
                                                v-model="transferNumber"
                                                placeholder="0"
                                                :formatter="
                                                    value =>
                                                        toNonExponential(value)
                                                "
                                            />
                                        </div>
                                    </div>
                                    <!-- <div class="unit">
                                        {{currency[selected].name}}
                                    </div> -->
                                </div>
                                <!-- <div class="avaliable">
                                    Avaliable: {{currency[selected].avaliable}}
                                </div> -->
                            </div>
                        </div>
                        <div
                            class="to"
                            :class="{
                                error: walletError && this.walletAddress != ''
                            }"
                        >
                            <div class="li_1">
                                <div class="iconBox">
                                    <div class="icon">
                                        <img src="@/static/wallet.svg" alt="" />
                                    </div>
                                </div>
                                <div class="midle">
                                    <div class="p_1">
                                        From
                                        <input type="text" value="0x5A0b5..." />
                                        to
                                    </div>
                                </div>
                            </div>
                            <div class="li_2">
                                <input
                                    type="text"
                                    v-model="walletAddress"
                                    placeholder="Please enter the wallet address …"
                                />
                            </div>
                        </div>
                        <div
                            class="someWrong"
                            v-if="walletError && this.walletAddress != ''"
                        >
                            Error message goes here
                        </div>

                        <gasEditor></gasEditor>

                        <div class="dropdown" v-if="showDropdown">
                            <div
                                class="dropdownItem"
                                v-for="(item, index) in currency"
                                @click="selectCurrencyFun(index)"
                                :key="index"
                                :class="{
                                    activity: index == selected,
                                    gray: item.avaliable < 1000
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
                                <div class="value">
                                    <div class="avaliable">
                                        Avaliable: {{ item.avaliable }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="transferBtn"
                        :class="{ disabled: transferDisabled || walletError }"
                        @click="clickTransfer"
                    >
                        TRANSFER NOW
                    </div>
                </div>
            </TabPane>
            <TabPane name="m1">
                <div class="waitingBox">
                    <wating
                        @etherscan="etherscan"
                        @homepage="homepage"
                    ></wating>
                </div>
            </TabPane>
            <TabPane name="m2">
                <div class="successBox">
                    <success @homepage="homepage" @close="close"></success>
                </div>
            </TabPane>
            <TabPane name="m3">
                <div class="failBox">
                    <wrong
                        @again="again"
                        @close="close"
                        @homepage="homepage"
                    ></wrong>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import _ from "lodash";
import gasEditor from "@/components/gasEditor";
import { toNonExponential } from "@/common/utils";
export default {
    name: "transfer",
    data() {
        return {
            toNonExponential,
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误)
            showDropdown: false,
            currency: [
                {
                    name: "ETH",
                    img: require("@/static/ETH.svg"),
                    avaliable: 1000
                },
                {
                    name: "ℓUSD",
                    img: require("@/static/lina_usd.svg"),
                    avaliable: 500
                },
                {
                    name: "LINA",
                    img: require("@/static/lina_icon.svg"),
                    avaliable: 1000
                }
            ],
            selected: 0,
            transferNumber: null,
            walletAddress: ""
        };
    },
    watch: {},
    computed: {
        //transfer按钮禁止状态
        transferDisabled() {
            return _.lte(this.transferNumber, 0);
        },
        walletError() {
            if (/^0x[a-fA-F0-9]{40}$/.test(this.walletAddress)) {
                return false;
            }
            return true;
        }
    },
    created() {},
    components: {
        gasEditor
    },
    mounted() {
        document.documentElement.addEventListener("click", () => {
            this.showDropdown = false;
        });
    },
    methods: {
        showDropdownFun() {
            setTimeout(() => {
                this.showDropdown = true;
            }, 1);
        },
        selectCurrencyFun(index) {
            this.selected = index;
            this.transferNumber =
                this.transferNumber > this.currency[this.selected].avaliable
                    ? this.currency[this.selected].avaliable
                    : this.transferNumber;
        },
        //点击Transfer
        clickTransfer() {
            // this.actionTabs = 'm1'

            // 发起右下角通知
            this.$pub.publish("notificationQueue", {
                hash: Math.ceil(Math.random() * 100000),
                type: "transfer",
                value: Math.random(),
                unit: this.selectedAssetKind
            });
            if (!this.transferDisabled) {
                // alert("click Transfer");
        

            }
        },
        //点击最大
        clickMaxAmount() {
            this.transferNumber = this.currency[this.selected].avaliable;
        },
        //改变激活元素
        changeActiveItem(index) {
            this.$nextTick(() => {
                this.$refs["itemInput" + index].$el
                    .querySelector("input")
                    .focus();
            });
        },
        //交易状态页面回调方法 打开etherscan
        etherscan() {
            let href = `https://${
                this.networkName === "MAINNET" ? "" : this.networkName + "."
            }etherscan.io/tx/${this.confirmTransactionHash}`;

            window.open(href, "_blank");
        },
        //交易状态页面回调方法 回到主页
        homepage() {
            this.$store.commit("setCurrentAction", 0);
        },
        //交易状态页面回调方法 close
        close() {
            this.actionTabs = "m0";
        },
        //交易状态页面回调方法 again
        again() {
            this.actionTabs = "m0";
        }
    }
};
</script>

<style lang="scss">
#transfer {
    .actionTabs {
        border-radius: 16px;
        box-shadow: 0px 2px 6px #deddde;

        .ivu-tabs-bar {
            display: none;
        }

        .ivu-tabs-content {
            background: #fff;
            .ivu-tabs-tabpane {
                width: 786px;
                height: 840px !important;

                .transferBox,
                .waitingBox,
                .successBox,
                .failBox {
                    width: 100%;
                    height: 100%;
                }

                .transferBox {
                    position: relative;

                    .transferMain {
                        height: 100%;
                        padding: 64px 193px 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .text {
                            .title {
                                font-family: Gilroy;
                                color: $mainTextColor;
                                font-size: 32px;
                                line-height: 40px;
                                font-weight: bold;
                            }
                            .descript {
                                color: $secondaryTextColor;
                                font-family: Gilroy;
                                margin-top: 8px;
                                font-size: 16px;
                                line-height: 18px;
                                font-weight: normal;
                            }
                            text-align: center;
                        }
                        .from,
                        .to {
                            width: 400px;
                            height: 120px;
                            border-radius: 8px;
                            border: 1px solid #deddde;
                            transition: $animete-time linear;
                            box-shadow: 0 0 0 #deddde;
                            .icon {
                                border: solid 1px #deddde;
                            }
                            &:hover {
                                box-shadow: 0 2px 12px #deddde;
                                border-color: white;
                            }
                        }
                        .from {
                            margin-top: 92px;
                            display: flex;
                            position: relative;
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
                                    color: #5a575c;
                                    font-family: Gilroy-Bold;
                                    font-size: 16px;
                                }
                                .p_2 {
                                    color: #1b05a1;
                                    opacity: 0.2;
                                    font-family: Gilroy-Bold;
                                    font-size: 12px;
                                    cursor: pointer;
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
                                        font-family: Gilroy-Bold;
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
                                                    font-family: Gilroy;
                                                    font-size: 32px;
                                                    font-weight: 700;
                                                    line-height: 40px;

                                                    &::placeholder {
                                                        color: #c6c4c7;
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
                                    font-family: Gilroy-Medium;
                                    font-size: 12px;
                                    width: 100%;
                                    text-align: right;
                                }
                            }
                        }
                        .to {
                            margin-top: 24px;
                            padding: 0 24px;
                            display: flex;
                            flex-direction: column;
                            &.error {
                                border-color: #df434c;
                            }
                            .li_1 {
                                height: 88px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .iconBox {
                                    width: 64px;
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
                                        color: #5a575c;
                                        font-family: Gilroy-Bold;
                                        font-size: 16px;
                                        input {
                                            width: 91px;
                                            height: 24px;
                                            background: #f6f5f6;
                                            color: #c6c4c7;
                                            font-family: Gilroy-Medium;
                                            font-size: 12px;
                                            padding: 7px 16px;
                                            border-radius: 24px;
                                            margin: 0 5px;
                                            border: none;
                                        }
                                        input:focus,
                                        textarea:focus {
                                            outline: none;
                                        }
                                    }
                                }
                            }
                            .li_2 {
                                flex: 1;
                                color: #1b05a1;
                                opacity: 0.2;
                                color: #c6c4c7;
                                font-family: "Gilroy-Bold";
                                font-size: 14px;
                                transform: translateY(-12px);
                                input {
                                    border: none;
                                    width: 100%;
                                }
                                input:focus,
                                textarea:focus {
                                    outline: none;
                                }
                                &::placeholder {
                                    color: #c6c4c7;
                                }
                            }
                        }
                        .someWrong {
                            color: #df434c;
                            margin-left: 193px;
                            font-family: Gilroy-Medium;
                            font-size: 12px;
                        }

                        #gasEditor {
                            width: 100%;
                            margin-top: 172px;
                        }

                        .dropdown {
                            position: absolute;
                            top: 397px;
                            width: 400px;
                            height: 280px;
                            background: #fff;
                            box-shadow: 0 2px 12px #deddde;
                            z-index: 1;
                            border-radius: 8px;
                            border: 1px solid #deddde;
                            transition: box-shadow $animete-time linear;
                            display: flex;
                            flex-direction: column;
                            & .gray {
                                .p_1 {
                                    color: #c6c4c7 !important;
                                }
                                .avaliable {
                                    color: #c6c4c7 !important;
                                }
                            }
                            & .activity {
                                background: #f6f5f6;
                                .avaliable {
                                    color: #5a575c !important;
                                }
                            }
                            .dropdownItem > div {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            & > div {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                            }
                            .iconBox {
                                width: 104px;
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
                                    color: #5a575c;
                                    font-family: Gilroy-Bold;
                                    font-size: 24px;
                                }
                            }
                            .value {
                                width: 175px;
                                flex-direction: column;
                                .avaliable {
                                    color: #5a575c;
                                    font-family: Gilroy-Regular;
                                    font-size: 16px;
                                    text-align: center;
                                }
                            }
                        }
                    }

                    .transferBtn {
                        width: 100%;
                        height: 80px;
                        background: #1b05a1;
                        position: absolute;
                        bottom: 0px;
                        color: #ffffff;
                        font-family: Gilroy-Bold;
                        font-size: 24px;
                        font-weight: 400;
                        line-height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        cursor: pointer;
                        transition: $animete-time linear;

                        &:hover {
                            &:not(.disabled) {
                                background-color: #1f04c6;
                            }
                        }

                        &.disabled {
                            cursor: not-allowed;
                            opacity: 0.1;
                        }
                    }
                }
            }
        }
    }
}
</style>
