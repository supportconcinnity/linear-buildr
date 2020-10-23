<template>
    <div id="claim">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="claimBox">
                    <div class="actionBody">
                        <div class="actionTitle">Claim</div>
                        <div class="actionDesc">
                            If you have staked your LINA and builded ℓUSD,
                            <br />
                            you are eligiable to collect two kinds of rewards
                        </div>

                        <div
                            class="rewardsBox"
                            :class="{ rewardsBoxClosed: !feesAreClaimable }"
                        >
                            <div class="box">
                                <img
                                    v-if="feesAreClaimable"
                                    src="@/static/LINA_logo.svg"
                                    alt=""
                                />
                                <img
                                    v-else
                                    src="@/static/LINA_gray_logo.svg"
                                    alt=""
                                />
                                <div class="title">Staking Rewards</div>
                                <div class="amount">
                                    <span>8.418</span> LINA
                                </div>
                            </div>
                            <div class="box">
                                <img
                                    v-if="feesAreClaimable"
                                    src="@/static/LUSD_logo.svg"
                                    alt=""
                                />
                                <img
                                    v-else
                                    src="@/static/LUSD_gray_logo.svg"
                                    alt=""
                                />
                                <div class="title">Exchange Rewards</div>
                                <div class="amount"><span>82.8</span> ℓUSD</div>
                            </div>
                        </div>

                        <div class="infoBox">
                            <div class="statusBox">
                                <div class="title">
                                    Reward Status
                                    <Tooltip
                                        class="tip"
                                        max-width="275"
                                        content="You need to Build or Burn to reach the target C-Ratio in order to claim the reward"
                                        placement="top"
                                    >
                                        <img src="@/static/info.svg" alt="" />
                                    </Tooltip>
                                </div>
                                <div
                                    class="status"
                                    :class="{ open: feesAreClaimable }"
                                >
                                    {{ feesAreClaimable ? "Open" : "Closed" }}
                                </div>
                            </div>
                            <div class="periodBox">
                                <div class="title">
                                    Claim period ends in
                                </div>
                                <div class="days"><span>2</span> Days</div>
                            </div>
                            <gasEditor></gasEditor>
                        </div>
                    </div>

                    <div
                        class="claimBtn"
                        :class="{ disabled: !feesAreClaimable }"
                        @click="clickClaim"
                    >
                        CLAIM NOW
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
import gasEditor from "@/components/gasEditor";

export default {
    name: "claim",
    components: {
        gasEditor
    },
    data() {
        return {
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误)
            feesAreClaimable: true //是否可以领取奖励
        };
    },
    methods: {
        //点击 claim
        clickClaim() {
            if (this.feesAreClaimable) {
                //模拟跳到pending页
                this.actionTabs = "m1";
            }
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
#claim {

    .actionTabs {
        .ivu-tabs-bar {
            display: none;
        }

        .ivu-tabs-content {
            background: #fff;

            .ivu-tabs-tabpane {
                width: 786px;
                height: 840px !important;

                .claimBox,
                .waitingBox,
                .successBox,
                .failBox {
                    width: 100%;
                    height: 100%;
                }

                .claimBox {
                    position: relative;

                    .actionBody {
                        padding: 64px 193px 0;

                        .actionTitle {
                            color: #5a575c;
                            font-family: Gilroy;
                            font-size: 32px;
                            font-weight: 700;
                            line-height: 40px;
                            text-align: center;
                        }

                        .actionDesc {
                            margin: 8px 0 76px 0;
                            color: #c6c4c7;
                            font-family: Gilroy-Regular;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 18px;
                            text-align: center;
                        }

                        .rewardsBox {
                            display: flex;
                            justify-content: center;
                            margin-bottom: 64px;

                            .box {
                                width: 188px;
                                height: 300px;
                                border-radius: 8px;
                                background: rgba(27, 5, 161, 0.03);
                                text-align: center;

                                img {
                                    width: 56px;
                                    margin: 74px 0 24px 0;
                                }

                                .title {
                                    color: #5a575c;
                                    font-family: Gilroy-Bold;
                                    font-size: 16px;
                                    font-weight: 400;
                                }

                                .amount {
                                    color: #5a575c;
                                    font-family: Gilroy-Bold;
                                    font-size: 16px;
                                    font-weight: 400;
                                    text-align: center;

                                    span {
                                        color: #5a575c;
                                        font-family: Gilroy;
                                        font-size: 32px;
                                        font-weight: 700;
                                        text-align: right;
                                    }
                                }

                                &:nth-child(1) {
                                    margin-right: 12px;
                                }

                                &:nth-child(2) {
                                    margin-left: 12px;
                                }
                            }
                        }

                        .rewardsBoxClosed {
                            .box {
                                background: #f6f5f6;

                                .title {
                                    color: #c6c4c7;
                                }

                                .amount {
                                    color: #c6c4c7;

                                    span {
                                        color: #c6c4c7;
                                    }
                                }
                            }
                        }

                        .infoBox {
                            .statusBox,
                            .periodBox {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-bottom: 14px;

                                .title {
                                    color: #5a575c;
                                    font-family: Gilroy;
                                    font-size: 16px;
                                    font-weight: 700;
                                }

                                .status {
                                    width: 64px;
                                    height: 24px;
                                    color: #5a575c;
                                    font-family: Gilroy-Medium;
                                    font-size: 12px;
                                    line-height: 24px;
                                    font-weight: 400;
                                    text-align: center;
                                    border-radius: 12px;
                                    background: #f6f5f6;
                                }

                                .open {
                                    color: #1b05a1;
                                    background: rgba(27, 5, 161, 0.03);
                                }

                                .days {
                                    color: #5a575c;
                                    font-family: Gilroy-Regular;
                                    font-size: 16px;
                                    font-weight: 400;

                                    span {
                                        color: #5a575c;
                                        font-family: Gilroy;
                                        font-size: 24px;
                                        font-weight: 700;
                                    }
                                }
                            }
                        }
                    }

                    .claimBtn {
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
                            opacity: 0.1;
                            cursor: not-allowed;
                        }

                        &.claimBtnActivited {
                            opacity: unset;
                        }
                    }
                }
            }
        }
    }

    .tip {
        .ivu-tooltip-rel {
            transition: $animete-time linear;

            img {
                opacity: 0.2;
                vertical-align: middle;
            }

            img:hover {
                opacity: 1;
            }
        }

        .ivu-tooltip-popper {
            &[x-placement="top"] {
                .ivu-tooltip-arrow {
                    border-right: 1px solid #dedede;
                    border-bottom: 1px solid #dedede;
                }
            }

            &[x-placement^="bottom"] {
                .ivu-tooltip-arrow {
                    border-left: 1px solid #dedede;
                    border-top: 1px solid #dedede;
                }
            }

            .ivu-tooltip-arrow {
                transform: rotate(45deg);
                width: 10px;
                height: 10px;
                background: white;
                border: none;
            }

            .ivu-tooltip-inner {
                background-color: #fff;
                font-family: Gilroy;
                font-size: 12px;
                font-weight: 500;
                line-height: 16px;
                color: #5a575c;
                padding: 10px 16px;
                border: 1px solid #dedede;
                box-shadow: none;
                border-radius: 16px;
            }
        }
    }
}
</style>
