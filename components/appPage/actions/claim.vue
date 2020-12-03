<template>
    <div id="claim">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="claimBox">
                    <div class="actionBody">
                        <div class="actionTitle">Claim</div>
                        <div class="actionDesc">
                            Claim rewards from staking LINA and building ℓUSD
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
                                    <span>{{ stakingRewards }}</span> LINA
                                </div>
                            </div>
                            <div class="box">
                                <img
                                    v-if="feesAreClaimable"
                                    src="@/static/lina_usd.svg"
                                    alt=""
                                />
                                <img
                                    v-else
                                    src="@/static/LUSD_gray_logo.svg"
                                    alt=""
                                />
                                <div class="title">Exchange Rewards</div>
                                <div class="amount">
                                    <span>{{ tradingRewards }}</span> ℓUSD
                                </div>
                            </div>
                        </div>

                        <div class="infoBox">
                            <div class="statusBox">
                                <div class="title">
                                    Reward Status
                                    <Tooltip
                                        class="globalInfoStyle"
                                        max-width="275"
                                        content="Reward can only be claimed when target ratio is reached."
                                        placement="top"
                                    >
                                        <img src="@/static/info.svg" alt="" />
                                    </Tooltip>
                                </div>
                                <div
                                    class="status"
                                    :class="{ open: feesAreClaimable }"
                                >
                                    {{
                                        feesAreClaimable
                                            ? "Open"
                                            : hasClaim
                                            ? "Claimed"
                                            : "Closed"
                                    }}
                                </div>
                            </div>
                            <div class="periodBox">
                                <div class="title">
                                    Claim Period Ends
                                </div>
                                <div class="days">
                                    <span>{{ closeIn }}</span>
                                </div>
                            </div>
                            <gasEditor></gasEditor>
                        </div>
                    </div>

                    <div
                        class="claimBtn"
                        :class="{ disabled: claimDisabled }"
                        @click="clickClaim"
                    >
                        CLAIM NOW
                    </div>

                    <Spin fix v-if="processing"></Spin>
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
import { addSeconds, formatDistanceToNow } from "date-fns";
import {
    formatEtherToNumber,
    formatNumber
} from "@/assets/linearLibrary/linearTools/format";
import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import { storeDetailsData } from "@/assets/linearLibrary/linearTools/request";
import gasEditor from "@/components/gasEditor";
import {
    bufferGasLimit,
    DEFAULT_GAS_LIMIT
} from "@/assets/linearLibrary/linearTools/network";
import { utils } from "ethers";

export default {
    name: "claim",
    components: {
        gasEditor
    },
    data() {
        return {
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误)
            closeIn: "", //多少天后可领取奖励
            feesAreClaimable: false, //是否可以领取奖励
            tradingRewards: 0, //交易所手续费奖励
            stakingRewards: 0, //通胀奖励
            processing: false, //加载状态
            confirmTransactionHash: "", //交易hash
            hasClaim: true //有没有claim过
        };
    },
    created() {
        this.useGetFeeData(this.walletAddress);
    },
    watch: {
        walletAddress() {},
        walletNetworkName() {}
    },
    computed: {
        walletNetworkName() {
            return this.$store.state?.walletNetworkName;
        },

        walletAddress() {
            return this.$store.state?.wallet?.address;
        },

        //claim按钮禁止状态
        claimDisabled() {
            return (
                !this.feesAreClaimable ||
                this.processing ||
                (this.tradingRewards == 0 && this.stakingRewards == 0)
            );
        }
    },
    methods: {
        //点击 claim
        async clickClaim() {
            if (!this.claimDisabled) {
                this.processing = true;

                //获取gas评估
                const gasLimit = await this.getGasEstimate();

                const transactionSettings = {
                    gasPrice: this.$store.state?.gasDetails?.price,
                    gasLimit: gasLimit
                };

                try {
                    this.actionTabs = "m1"; //进入等待页

                    let {
                        lnrJS: { LnFeeSystemTest, LnFeeSystem }
                    } = lnrJSConnector;

                    let transaction = null;
                    if (["ROPSTEN", "BSCTESTNET"].includes(this.walletNetworkName)) {
                        transaction = await LnFeeSystemTest.claimFees(
                            transactionSettings
                        );
                    } else {
                        transaction = await LnFeeSystem.claimFees(
                            transactionSettings
                        );
                    }

                    if (transaction) {
                        this.confirmTransactionHash = transaction.hash;

                        // 发起右下角通知
                        this.$pub.publish("notificationQueue", {
                            hash: this.confirmTransactionHash,
                            type: "Claiming Rewards",
                            value: "",
                            unit: ""
                        });

                        //等待结果返回
                        let status = await lnrJSConnector.utils.waitForTransaction(
                            transaction.hash
                        );

                        //判断成功还是错误子页
                        this.actionTabs = status ? "m2" : "m3";

                        //成功则更新数据
                        status &&
                            _.delay(async () => await storeDetailsData(), 5000);
                    }
                } catch (e) {
                    console.log(e);
                    this.actionTabs = "m3"; //进入错误页
                } finally {
                    this.processing = false;
                }
            }
        },

        //计算距离申领奖励开始的时间？
        getFeePeriodCountdown(recentFeePeriods, feePeriodDuration) {
            if (!recentFeePeriods) return;

            //feePeriodDuration = 21600;
            if (
                parseInt(feePeriodDuration.add(recentFeePeriods.startTime)) -
                    _.now() / 1000 <=
                0
            )
                return "Now";

            let currentPeriodStart = null;
            if (recentFeePeriods && recentFeePeriods.startTime) {
                currentPeriodStart =
                    formatNumber(recentFeePeriods.startTime) == "0"
                        ? null
                        : new Date(parseInt(recentFeePeriods.startTime * 1000));
            }

            const currentPeriodEnd =
                currentPeriodStart && feePeriodDuration
                    ? addSeconds(currentPeriodStart, feePeriodDuration)
                    : null;
            return currentPeriodEnd
                ? formatDistanceToNow(currentPeriodEnd)
                : "N/A";
        },

        async useGetFeeData(walletAddress) {
            const FEE_PERIOD = 0;

            try {
                this.processing = true;

                let contract = null;
                if (["ROPSTEN", "BSCTESTNET"].includes(this.walletNetworkName)) {
                    //测试合约, 较短时间
                    contract = lnrJSConnector.lnrJS.LnFeeSystemTest;
                } else {
                    contract = lnrJSConnector.lnrJS.LnFeeSystem;
                }

                let [
                    feePeriodDuration,
                    recentFeePeriods,
                    feesAreClaimable,
                    feesAvailable,
                    prePeriod,
                    lastClaimedId
                ] = await Promise.all([
                    contract.feePeriodDuration(),
                    contract.recentFeePeriods(FEE_PERIOD),
                    contract.isFeesClaimable(walletAddress),
                    contract.feesAvailable(walletAddress),
                    contract.preRewardPeriod(),
                    contract.userLastClaimedId(walletAddress)
                ]);

                this.closeIn = this.getFeePeriodCountdown(
                    recentFeePeriods,
                    feePeriodDuration
                );
                this.hasClaim = prePeriod.id.eq(lastClaimedId);
                this.feesAreClaimable = feesAreClaimable;
                this.tradingRewards =
                    feesAvailable && feesAvailable[0] && !this.hasClaim
                        ? formatNumber(feesAvailable[0] / 1e18)
                        : 0;
                this.stakingRewards =
                    feesAvailable && feesAvailable[1] && !this.hasClaim
                        ? formatNumber(feesAvailable[1] / 1e18)
                        : 0;


                
            } catch (e) {
                console.log(e);
            } finally {
                this.processing = false;
            }
        },

        //评估gas
        async getGasEstimate() {
            try {
                const {
                    lnrJS: { LnFeeSystemTest, LnFeeSystem }
                } = lnrJSConnector;

                let gasEstimate = null;
                if (["ROPSTEN", "BSCTESTNET"].includes(this.walletNetworkName))
                    gasEstimate = await LnFeeSystemTest.contract.estimateGas.claimFees();
                else
                    gasEstimate = await LnFeeSystem.contract.estimateGas.claimFees();

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                const errorMessage =
                    (e && e.message) || "Error while getting gas estimate";
                console.log(errorMessage);

                return bufferGasLimit(DEFAULT_GAS_LIMIT.claim);
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
            this.processing = false;
            this.actionTabs = "m0";

            setTimeout(this.useGetFeeData(this.walletAddress), 5000);
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
                                    font-family: Gilroy;
                                    font-size: 16px;
                                    font-weight: 700;
                                }

                                .amount {
                                    color: #5a575c;
                                    font-family: Gilroy;
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
                                }

                                .status {
                                    width: 64px;
                                    height: 24px;
                                    color: #5a575c;
                                    font-family: Gilroy;
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
                                        font-size: 16px;
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
                        font-family: Gilroy;
                        font-size: 24px;
                        font-weight: 700;
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
}
</style>
