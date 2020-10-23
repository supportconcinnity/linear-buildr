<template>
    <div id="build">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="buildBox">
                    <div class="actionBody">
                        <div class="actionTitle">Build</div>
                        <div class="actionDesc">
                            You can earn staking rewards by staking LINA and
                            building ℓUSD
                        </div>
                        <div class="actionRate">1 LINA = 400 ℓUSD</div>
                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.stakeMsg
                            }"
                            @click="changeFocusItem(0)"
                        >
                            <div class="itemLeft">
                                <div class="itemIcon">
                                    <img src="@/static/lina_icon.svg" alt="" />
                                </div>
                                <div class="itemType">
                                    <div class="itemTypeTitle">Stake LINA</div>
                                    <div
                                        class="itemTypeBtn"
                                        :class="{ active: activeItemBtn == 0 }"
                                        @click="clickBuy"
                                    >
                                        buy lina
                                        <img src="@/static/arrow_right.svg" />
                                    </div>
                                </div>
                            </div>
                            <div class="itemRight">
                                <div class="inputRect">
                                    <InputNumber
                                        class="input"
                                        ref="itemInput0"
                                        :min="0"
                                        :max="10000000000000000"
                                        type="text"
                                        v-model="buildData.stake"
                                        placeholder="0"
                                        @on-change="changeStake"
                                        @on-focus="inputFocus(0)"
                                        @on-blur="inputBlur(0)"
                                        :formatter="
                                            value => toNonExponential(value)
                                        "
                                    />
                                    <!-- <div class="unit">lina</div> -->
                                </div>
                                <!-- <div class="avaliable">Avaliable : 1,000</div> -->
                            </div>

                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.stakeMsg ? '1' : '0'
                                }"
                            >
                                {{ errors.stakeMsg }}
                            </div>
                        </div>
                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.amountMsg
                            }"
                            @click="changeFocusItem(1)"
                        >
                            <div class="itemLeft">
                                <div class="itemIcon">
                                    <img src="@/static/lina_usd.svg" alt="" />
                                </div>
                                <div class="itemType">
                                    <div class="itemTypeTitle">Build</div>
                                    <div
                                        class="itemTypeBtn"
                                        :class="{ active: activeItemBtn == 1 }"
                                        @click="clickMaxAmount"
                                    >
                                        Max
                                    </div>
                                </div>
                            </div>
                            <div class="itemRight">
                                <div class="inputRect">
                                    <InputNumber
                                        class="input"
                                        ref="itemInput1"
                                        :min="0"
                                        :max="10000000000000000"
                                        type="text"
                                        v-model="buildData.amount"
                                        @on-change="changeAmount"
                                        @on-focus="inputFocus(1)"
                                        @on-blur="inputBlur(1)"
                                        placeholder="0"
                                        :formatter="
                                            value => toNonExponential(value)
                                        "
                                    />
                                    <!-- <div class="unit">ℓUSD</div> -->
                                </div>
                                <!-- <div class="avaliable">Avaliable : 1,000</div> -->
                            </div>
                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.amountMsg ? '1' : '0'
                                }"
                            >
                                {{ errors.amountMsg }}
                            </div>
                        </div>
                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.ratioMsg
                            }"
                            @click="changeFocusItem(2)"
                        >
                            <div class="itemLeft">
                                <div class="itemIcon">
                                    <img src="@/static/percentage.svg" alt="" />
                                </div>
                                <div class="itemType">
                                    <div class="itemTypeTitle">P Ratio</div>
                                    <div
                                        class="itemTypeBtn"
                                        :class="{ active: activeItemBtn == 2 }"
                                        @click="clickTargetRatio"
                                    >
                                        Target ratio
                                    </div>
                                </div>
                            </div>
                            <div class="itemRight">
                                <div class="inputRect">
                                    <InputNumber
                                        class="input"
                                        ref="itemInput2"
                                        :min="750"
                                        :max="10000000000000000"
                                        type="text"
                                        v-model="buildData.ratio"
                                        @on-change="changeRatio"
                                        @on-focus="inputFocus(2)"
                                        @on-blur="inputBlur(2)"
                                        placeholder="0"
                                        :formatter="
                                            value => toNonExponential(value)
                                        "
                                    />
                                    <!-- <div class="unit">%</div> -->
                                </div>
                                <!-- <div class="avaliable">Current : 99.73</div> -->
                            </div>
                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.ratioMsg ? '1' : '0'
                                }"
                            >
                                {{ errors.ratioMsg }}
                            </div>
                        </div>

                        <gasEditor></gasEditor>
                    </div>

                    <div
                        class="buildBtn"
                        :class="{ disabled: buildDisabled }"
                        @click="clickBuild"
                    >
                        BUILD NOW
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
import { toNonExponential } from "@/common/utils";
import gasEditor from "@/components/gasEditor";
import { findParents, removeClass, addClass } from "@/common/utils";

export default {
    name: "build",
    data() {
        return {
            toNonExponential, //科学计数法转正常显示 Conversion of scientific counting method to digital text
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误) Subpages(m0 default, m1 waiting, m2 success, m3 fail)
            buildData: { stake: null, amount: null, ratio: 750 }, //build所需数据 Data that build needed to execute

            activeItemBtn: -1, //当前激活按钮 0,1,2 Start with -1

            errors: {
                stakeMsg: "",
                amountMsg: "",
                ratioMsg: ""
            },

            testRate: {
                stake: 10,
                amount: 2,
                ratio: 4.5
            }
        };
    },
    components: {
        gasEditor
    },
    watch: {
        pratioError() {}
    },
    computed: {
        //build按钮禁止状态
        //Disable build button
        buildDisabled() {
            return _.lte(this.buildData.amount, 0) || this.pratioError;
        },

        pratioError() {
            if (_.lt(this.buildData.ratio, "750")) {
                this.errors.ratioMsg = "Not less than 750";
                return true;
            } else {
                this.errors.ratioMsg = "";
                return false;
            }
        }
    },
    methods: {
        //改变激活元素
        //Select item here
        changeFocusItem(index) {
            // this.activeItem = index;
            this.$nextTick(() => {
                this.$refs["itemInput" + index].$el
                    .querySelector("input")
                    .focus();
            });
        },

        //获取焦点
        //Choose current inputbox
        inputFocus(index) {
            this.$nextTick(() => {
                let currentElement = this.$refs["itemInput" + index].$el;
                let parentElement = findParents(
                    currentElement,
                    "actionInputItem"
                );
                addClass(parentElement, "active");
            });
        },

        //失去焦点
        //Select different inputbox 
        inputBlur(index) {
            this.$nextTick(() => {
                let currentElement = this.$refs["itemInput" + index].$el;
                let parentElement = findParents(
                    currentElement,
                    "actionInputItem"
                );
                removeClass(parentElement, "active");
            });
        },

        //点击购买
        //Click to buy LINA
        clickBuy() {
            if (this.errors.stakeMsg) {
                this.errors = {
                    stakeMsg: "",
                    amountMsg: "",
                    ratioMsg: ""
                };
            } else {
                this.errors = {
                    stakeMsg: "Error message goes here1",
                    amountMsg: "Error message goes here2",
                    ratioMsg: "Error message goes here3"
                };
            }

            this.activeItemBtn = 0;
        },

        //点击最大
        //Click MAX button
        clickMaxAmount() {
            // this.buildData = { stake: 28938.22, amount: 398.23, ratio: 4892 };
            this.buildData.amount = 398.23;
            this.changeAmount(this.buildData.amount);

            this.activeItemBtn = 1;
        },

        //点击target
        //Click target ratio and set it to 500
        clickTargetRatio() {
            this.buildData.ratio = 750;
            this.changeRatio(this.buildData.ratio);

            this.activeItemBtn = 2;
        },

        //点击build
        //Click build button
        clickBuild() {
            if (!this.buildDisabled) {
                this.actionTabs = "m1";
            }
        },

        //If user edit stake amount of LINA
        changeStake(val) {
            this.buildData.amount = this.testRate.amount * val;
            this.buildData.ratio = this.testRate.ratio / val;
        },

        //If user edit amount of lUSD 
        changeAmount(val) {
            this.buildData.stake = this.testRate.stake * val;
            this.buildData.ratio = this.testRate.ratio / val;
        },

        //If user edit P-Ratio
        changeRatio(val) {
            this.buildData.stake = this.testRate.stake * val;
            this.buildData.amount = this.testRate.amount / val;
        },

        etherscan() {
            //模拟跳到错误页
            this.actionTabs = "m3";
        },


        //交易状态页面回调方法 回到主页
        //Go to home page
        goHomePage() {
            this.$store.commit("setCurrentAction", 0);
        },

        //回到默认状态
        //Back to default page
        setDefaultTab() {
            this.activeItemBtn = -1;
            this.buildData = { stake: null, amount: null, ratio: 750 };
            this.actionTabs = "m0";

            //重新拉取新数据
        },

        //重试
        //Retry page
        tryAgain() {
            this.actionTabs = "m0";
        }
    }
};
</script>

//Styling here
<style lang="scss">
#build {
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

                .buildBox,
                .waitingBox,
                .successBox,
                .wrongBox {
                    width: 100%;
                    height: 100%;
                }

                .buildBox {
                    position: relative;

                    .actionBody {
                        padding: 64px 193px 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .actionTitle {
                            color: #5a575c;
                            font-family: Gilroy;
                            font-size: 32px;
                            font-weight: 700;
                            line-height: 40px;
                        }

                        .actionDesc {
                            margin-top: 8px;
                            color: #c6c4c7;
                            font-family: Gilroy-Regular;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 18px;
                            text-align: center;
                            padding: 0 75px;
                        }

                        .actionRate {
                            margin: 16px 0 40px;
                            width: 132px;
                            height: 24px;
                            border-radius: 12px;
                            background: #f6f5f6;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #c6c4c7;
                            font-family: Gilroy;
                            font-size: 12px;
                            font-weight: 500;
                            line-height: 16px;
                        }

                        .actionInputItem {
                            margin-bottom: 24px;
                            border-radius: 8px;
                            border: solid 1px #deddde;
                            padding: 39px 24px;
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            transition: $animete-time linear;
                            position: relative;

                            &:hover,
                            &.active {
                                border-color: white;
                                box-shadow: 0px 2px 12px #deddde;
                            }

                            .itemLeft {
                                display: flex;
                                margin-right: 16px;
                                align-items: center;

                                .itemIcon {
                                    margin-right: 16px;
                                    width: 40px;
                                    height: 40px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border-radius: 50%;
                                    background: #ffffff;
                                    border: 1px solid #deddde;

                                    img {
                                        width: 24px;
                                        height: 24px;
                                        vertical-align: middle;
                                    }
                                }

                                .itemType {
                                    .itemTypeTitle {
                                        color: #5a575c;
                                        font-family: Gilroy;
                                        font-size: 16px;
                                        font-weight: 700;
                                        line-height: 24px;
                                    }

                                    .itemTypeBtn {
                                        transition: $animete-time linear;
                                        cursor: pointer;
                                        display: flex;
                                        opacity: 0.2;
                                        color: #1b05a1;
                                        font-family: Gilroy;
                                        font-size: 12px;
                                        font-weight: 700;
                                        line-height: 16px;
                                        text-transform: uppercase;
                                        letter-spacing: 1.5px;

                                        img {
                                            vertical-align: middle;
                                            margin-left: 6px;
                                        }

                                        &:hover {
                                            &:not(.default) {
                                                opacity: 1;
                                            }
                                        }

                                        &.active {
                                            opacity: 1;
                                        }

                                        &.default {
                                            cursor: default;
                                        }
                                    }
                                }
                            }

                            .itemRight {
                                flex: 1;
                                display: flex;

                                .inputRect {
                                    display: flex;
                                    align-items: center;
                                    justify-content: flex-end;
                                    // margin-bottom: 8px;
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
                                    .unit {
                                        color: #5a575c;
                                        font-family: Gilroy-Regular;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        text-transform: uppercase;
                                    }
                                }

                                .avaliable {
                                    color: #c6c4c7;
                                    font-family: Gilroy;
                                    font-size: 12px;
                                    font-weight: 500;
                                    line-height: 16px;
                                    text-align: right;
                                }
                            }

                            .itemErrMsg {
                                transition: opacity $animete-time linear;
                                position: absolute;
                                left: 0;
                                bottom: -20px;
                                height: 16px;
                                color: #df434c;
                                font-family: Gilroy;
                                font-size: 10px;
                                font-weight: 700;
                                line-height: 16px;
                                text-transform: uppercase;
                                letter-spacing: 1.25px;
                            }

                            &.error {
                                border-color: #df434c;
                            }
                        }
                    }

                    .buildBtn {
                        width: 100%;
                        position: absolute;
                        bottom: 0px;
                        height: 80px;
                        line-height: 80px;
                        cursor: pointer;
                        background: #1b05a1;
                        color: #ffffff;
                        font-family: Gilroy;
                        font-size: 24px;
                        font-weight: 700;
                        text-align: center;
                        text-transform: uppercase;
                        letter-spacing: 3px;
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
