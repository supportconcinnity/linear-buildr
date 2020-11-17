<template>
    <div id="walletDetails">
        <div class="walletAndAddressBox">
            <div class="info">
                <div class="wallet">
                    {{ walletType }}
                </div>
                <div class="address">
                    {{ walletAddress }}
                </div>
                <Tooltip
                    class="globalInfoStyle"
                    :content="tooltipContent"
                    offset="0 4"
                    placement="bottom"
                    @on-popper-hide="resetTooltipContent"
                >
                    <svg
                        class="copyBtn"
                        :data-clipboard-text="currentAddress"
                        data-clipboard-action="copy"
                        @click="copyAddress()"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <desc>Created with Lunacy</desc>
                        <g id="Icon/Copy">
                            <path
                                d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                7.67157 7.67157 7 8.5 7Z"
                                transform="translate(2.5 2.5)"
                                id="Combined-Shape"
                                fill="#5a575c"
                                fill-rule="evenodd"
                                stroke="none"
                            />
                        </g>
                    </svg>
                </Tooltip>
            </div>
            <div class="chainChange" :class="{ chainChanging }">
                <div
                    class="ethBox"
                    :class="{ selected: currentChain == 0 }"
                    @click="changeChain(0)"
                >
                    <img src="@/static/ETH.svg" alt="" />
                </div>
                <div
                    class="bscBox"
                    :class="{ selected: currentChain == 1 }"
                    @click="changeChain(1)"
                >
                    <!-- <Tooltip
                        class="globalInfoStyle"
                        content="Coming soon"
                        placement="bottom"
                        offset="0 4"
                    >
                        <img src="@/static/bnb_yellow.svg" alt="" />
                    </Tooltip> -->
                    <img src="@/static/bnb_yellow.svg" alt="" />
                </div>
            </div>
        </div>

        <div class="walletDetailsBox">
            <div class="actionsBox">
                <div class="box">
                    <div
                        class="track"
                        :class="{ selected: trackStatus }"
                        @click="trackModalClick"
                        @mouseenter="trackIconStatus = 1"
                        @mouseleave="trackIconStatus = 0"
                    >
                        <div class="placeholder">
                            <transition-group name="img-fade">
                                <img
                                    key="1"
                                    v-show="!trackStatus && !trackIconStatus"
                                    src="@/static/appPage/track.svg"
                                />
                                <img
                                    key="2"
                                    v-show="!trackStatus && trackIconStatus"
                                    src="@/static/appPage/track_hover.svg"
                                />
                                <img
                                    key="3"
                                    v-show="trackStatus"
                                    src="@/static/appPage/track_selected.svg"
                                />
                            </transition-group>
                        </div>
                        TRACK DEBT
                    </div>
                </div>
                <div class="box">
                    <div
                        class="transaction"
                        :class="{ selected: transactionStatus }"
                        @click="transactionModalClick"
                        @mouseenter="transactionIconStatus = 1"
                        @mouseleave="transactionIconStatus = 0"
                    >
                        <div class="placeholder">
                            <transition-group name="img-fade">
                                <img
                                    key="1"
                                    v-show="
                                        !transactionStatus &&
                                            !transactionIconStatus
                                    "
                                    src="@/static/appPage/transaction.svg"
                                />
                                <img
                                    key="2"
                                    v-show="
                                        !transactionStatus &&
                                            transactionIconStatus
                                    "
                                    src="@/static/appPage/transaction_hover.svg"
                                />
                                <img
                                    key="3"
                                    v-show="transactionStatus"
                                    src="@/static/appPage/transaction_selected.svg"
                                />
                            </transition-group>
                        </div>
                        TRANSACTION
                    </div>
                </div>
                <div class="box">
                    <div
                        class="refer"
                        :class="{ selected: referStatus }"
                        @click="referralModalClick"
                        @mouseenter="referIconStatus = 1"
                        @mouseleave="referIconStatus = 0"
                    >
                        <div class="placeholder">
                            <transition-group name="img-fade">
                                <img
                                    key="1"
                                    v-show="!referStatus && !referIconStatus"
                                    src="@/static/appPage/refer.svg"
                                />
                                <img
                                    key="2"
                                    v-show="!referStatus && referIconStatus"
                                    src="@/static/appPage/refer_hover.svg"
                                />
                                <img
                                    key="3"
                                    v-show="referStatus"
                                    src="@/static/appPage/refer_selected.svg"
                                />
                            </transition-group>
                        </div>
                        REFERRAL
                    </div>
                </div>
            </div>
            <div class="ratioBox">
                <div class="title">
                    Pledge Ratio
                    <Tooltip
                        max-width="200"
                        class="globalInfoStyle"
                        content="Target ratio is the minimum threshold that needs to be maintained to claim rewards or unlock collateral."
                        placement="bottom"
                        offset="0 6"
                    >
                        <img src="@/static/info.svg" />
                    </Tooltip>
                </div>
                <div class="ratio">
                    <div class="box">
                        <div class="value">
                            {{ walletDetails.currentRatioPercent || 0 }}
                        </div>
                        <div class="context">Current</div>
                    </div>
                    <div class="box">
                        <div class="value">
                            {{ walletDetails.targetRatioPercent || 0 }}
                        </div>
                        <div class="context">Target</div>
                    </div>
                </div>
                <Progress
                    stroke-color="#f6f5f6"
                    :percent="100"
                    :success-percent="currentRatio"
                    :stroke-width="8"
                    hide-info
                />
            </div>
            <div class="walletInfo">
                <div class="title">Wallet Balance</div>
                <div class="LINABox">
                    <img class="tokenIcon" src="@/static/LINA_logo.svg" />
                    <div class="box">
                        <div class="tokenItems">
                            <div class="left">LINA</div>
                            <div class="right">
                                {{ walletDetails.amountLINA || 0 }} LINA
                            </div>
                        </div>
                        <div class="tokenToUSDItems">
                            <div class="left">
                                1 LINA = ${{ walletDetails.LINA2USDRate || 0 }}
                                USD
                            </div>
                            <div class="right">
                                ≈ ${{ walletDetails.amountLINA2USD || 0 }} USD
                            </div>
                        </div>
                        <div class="avaliableItems">
                            <div class="left">Available</div>
                            <div class="right">
                                {{ walletDetails.avaliableLINA || 0 }} LINA
                            </div>
                        </div>
                        <div class="stakedItems">
                            <div class="left">Staked</div>
                            <div class="right">
                                {{ walletDetails.stakedLINA || 0 }} LINA
                            </div>
                        </div>
                        <div class="lockedItems">
                            <div class="left">Locked</div>
                            <div class="right">
                                {{ walletDetails.lockLINA || 0 }} LINA
                            </div>
                        </div>
                    </div>
                </div>
                <div class="LUSDBox">
                    <img class="tokenIcon" src="@/static/LUSD_logo.svg" />
                    <div class="box">
                        <div class="tokenItems">
                            <div class="left">ℓUSD</div>
                            <div class="right">
                                {{ walletDetails.amountlUSD || 0 }} ℓUSD
                            </div>
                        </div>
                        <div class="tokenToUSDItems">
                            <div class="left">
                                1 ℓUSD = ${{ walletDetails.lUSD2USDRate }} USD
                            </div>
                            <div class="right">
                                ≈ ${{ walletDetails.amountlUSD2USD || 0 }} USD
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ETHBox">
                    <template v-if="currentChain == 0">
                        <img class="tokenIcon" src="@/static/ETH_logo.svg" />
                        <div class="box">
                            <div class="tokenItems">
                                <div class="left">ETH</div>
                                <div class="right">
                                    {{ walletDetails.amountETH || 0 }} ETH
                                </div>
                            </div>
                            <div class="tokenToUSDItems">
                                <div class="left">
                                    1 ETH = ${{
                                        walletDetails.ETH2USDRate || 0
                                    }}
                                    USD
                                </div>
                                <div class="right">
                                    ≈ ${{ walletDetails.amountETH2USD || 0 }}
                                    USD
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="currentChain == 1">
                        <img
                            class="tokenIcon bsc"
                            src="@/static/bnb_yellow.svg"
                        />
                        <div class="box">
                            <div class="tokenItems">
                                <div class="left">BNB</div>
                                <div class="right">
                                    {{ walletDetails.amountETH || 0 }} BNB
                                </div>
                            </div>
                            <div class="tokenToUSDItems">
                                <div class="left">
                                    1 BNB = ${{
                                        walletDetails.ETH2USDRate || 0
                                    }}
                                    USD
                                </div>
                                <div class="right">
                                    ≈ ${{ walletDetails.amountETH2USD || 0 }}
                                    USD
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="assetBox">
                    <img class="tokenIcon" src="@/static/LUSD_logo.svg" />
                    <div class="leftBox">
                        Liquids
                        <Tooltip
                            max-width="200"
                            class="globalInfoStyle"
                            content="Total value of synthetic exposure created using Linear.Exchange."
                            placement="bottom"
                            offset="0 4"
                        >
                            <img src="@/static/info.svg" />
                        </Tooltip>
                    </div>
                    <div class="rightBox">
                        <div class="tokenItems">
                            {{ walletDetails.liquids || 0 }} ℓUSD
                        </div>
                        <div class="tokenToUSDItems">
                            ≈ ${{ walletDetails.liquids2USD || 0 }} USD
                        </div>
                    </div>
                </div>
                <div class="debtBox">
                    <img class="tokenIcon" src="@/static/LUSD_logo.svg" />
                    <div class="leftBox">
                        Debt
                        <Tooltip
                            max-width="200"
                            class="globalInfoStyle"
                            content="Total value that must be paid off before unlocking collateral. Fluctuates depending on trading activity."
                            placement="bottom"
                            offset="0 4"
                        >
                            <img src="@/static/info.svg" />
                        </Tooltip>
                    </div>
                    <div class="rightBox">
                        <div class="tokenItems">
                            {{ walletDetails.amountDebt || 0 }} ℓUSD
                        </div>
                        <div class="tokenToUSDItems">
                            ≈ ${{ walletDetails.amountDebt2USD || 0 }} USD
                        </div>
                    </div>
                </div>
            </div>
            <div class="totalBalanceToUSD">
                <div class="box">
                    <div class="title">Total Crypto Balance in USD</div>
                    <div class="amount">
                        ${{ walletDetails.totalCryptoBalanceInUSD }}
                    </div>
                </div>

                <svg
                    class="refreshBtn"
                    :class="{ refreshing: walletStatus == 0 }"
                    @click="getdata"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                >
                    <g class="background" fill="none" fill-rule="evenodd">
                        <circle
                            class="border"
                            cx="32"
                            cy="32"
                            r="31.5"
                            stroke="#DEDDDE"
                        />
                        <path
                            class="shape"
                            fill="#DEDDDE"
                            d="M21.345 34.789c1.186 6.082 6.913 10.09 12.794 8.95 3.522-.683 6.395-3.09
                            7.8-6.371l-5.702 1.104c-.596.115-1.177-.255-1.36-.841l-.035-.14c-.12-.618.23-1.214.794-1.396l.134-.034
                            7.644-1.482c.595-.115 1.176.255 1.36.84l.035.14 1.59 8.162c.13.665-.284 1.306-.926 1.431-.595.117-1.177-.253-1.36-.84l-.036-.138-.808-4.144c-1.888
                            3.149-4.986 5.407-8.663 6.12-7.161 1.388-14.139-3.495-15.584-10.908-.13-.666.285-1.307.927-1.432.641-.125 1.266.313
                            1.396.979zm24.45-8.076c.233.637-.076 1.335-.69 1.56-.614.223-1.3-.112-1.533-.749-2.125-5.822-8.411-8.888-14.04-6.845-2.657.964-4.764
                            2.924-5.948 5.413l4.955-1.798c.57-.207 1.203.068 1.475.619l.057.132c.215.592-.038 1.235-.567 1.503l-.127.055-7.317
                            2.655c-.57.207-1.201-.067-1.474-.617l-.057-.131-2.852-7.814c-.232-.637.077-1.335.691-1.56.57-.207 1.202.066 1.476.617l.057.131 1.725
                            4.73c1.493-2.889 3.976-5.122 7.067-6.243 6.856-2.488 14.512 1.246 17.102 8.342z"
                        />
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import Clipboard from "clipboard";
import { storeDetailsData } from "@/assets/linearLibrary/linearTools/request";
import {
    SUPPORTED_WALLETS,
    SUPPORTED_WALLETS_MAP
} from "@/assets/linearLibrary/linearTools/network";
import lnrJSConnector, {
    selectedWallet
} from "@/assets/linearLibrary/linearTools/lnrJSConnector";

export default {
    name: "walletDetails",
    data() {
        return {
            currentAddress: this.$store.state?.wallet?.address,
            tooltipContent: "Copy to clipboard",
            // refreshing: false, //刷新钱包详情数据中

            transactionStatus: false, //历史记录窗口状态
            transactionIconStatus: 0, //鼠标状态 0离开,1进入

            trackStatus: false, //踪迹窗口状态
            trackIconStatus: 0, //鼠标状态 0离开,1进入

            referStatus: false, //推荐窗口状态
            referIconStatus: 0, //鼠标状态 0离开,1进入

            chainChanging: false
        };
    },
    watch: {
        trackStatusChange() {},
        currentChain() {},
        walletStatus() {},
        walletAddress() {},
        walletNetworkName() {},
        walletDetails() {}
    },
    computed: {
        //当前选择的是什么链 0eth 1bsc
        currentChain() {
            return this.$store.state?.currentChain;
        },
        walletStatus() {
            return this.$store.state?.wallet?.status;
        },
        walletType() {
            return this.$store.state?.walletType;
        },
        walletAddress() {
            return this.$store.state?.wallet?.address;
        },
        walletNetworkName() {
            return this.$store.state?.walletNetworkName;
        },
        walletDetails() {
            return _.clone(this.$store.state?.walletDetails);
        },
        //当前抵押率占目标抵押率的百分比
        currentRatio() {
            var currentRatio = 0;

            if (Object.keys(this.walletDetails).length !== 0) {
                currentRatio =
                    (this.walletDetails.currentRatioPercent /
                        this.walletDetails.targetRatioPercent) *
                    100;
                if (currentRatio > 100) currentRatio = 100;
            }

            return currentRatio;
        }
    },
    created() {
        //订阅历史记录窗口关闭事件
        this.$pub.subscribe("transactionModalCloseEvent", (msg, params) => {
            this.transactionStatus = false;
        });
        //订阅历史记录窗口关闭事件
        this.$pub.subscribe("trackModalCloseEvent", (msg, params) => {
            this.trackStatus = false;
        });
        //订阅推荐窗口关闭事件
        this.$pub.subscribe("referralModalCloseEvent", (msg, params) => {
            this.referStatus = false;
        });
        //订阅钱包账户改变事件
        this.$pub.subscribe("onWalletAccountChange", (msg, params) => {
            this.walletStatusChange();
        });

        //订阅链改变事件
        this.$pub.subscribe("onWalletStatusChange", (msg, params) => {
            this.walletStatusChange();
        });

        //等待钱包设置完毕
        this.waitWalletAddressInit().then(() => {
            //开启自动刷新
            // this.$pub.publish("onWalletDetailsLoopRefreshStart");
        });
    },
    destroyed() {
        //关闭自动刷新
        this.$pub.publish("onWalletDetailsLoopRefreshStop");
    },
    mounted() {
        // 测试用,无用时删除
        // _.delay(this.trackModalClick, 500)
        // 测试用,无用时删除
    },
    methods: {
        //等待钱包设置完毕
        async waitWalletAddressInit() {
            return new Promise(resolve => {
                const check = async () => {
                    const walletAddress = this.$store.state?.wallet?.address;
                    if (walletAddress) {
                        resolve(true);
                    } else {
                        setTimeout(check, 1000);
                    }
                };

                check();
            });
        },

        //测试复制文字
        copyAddress() {
            var that = this;
            var clipboarda = new Clipboard(".copyBtn");
            clipboarda.on("success", function(e) {
                that.tooltipContent = "Copied";
                e.clearSelection();
            });
            clipboarda.on("error", function(e) {
                that.tooltipContent = "Error";
            });
        },

        //重置复制提示框的文本
        resetTooltipContent() {
            var that = this;
            setTimeout(function() {
                that.tooltipContent = "Copy to clipboard";
            }, 300);
        },

        async changeChain(value) {
            //不重复连接
            if (value == this.currentChain || this.chainChanging) return;

            //连接类型
            const selectType =
                value == 0
                    ? SUPPORTED_WALLETS_MAP.METAMASK
                    : SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;

            // this.chainChanging = true;
            await selectedWallet(selectType, true);
            // this.chainChanging = false;
        },

        //获取当前钱包详情数据
        async getdata() {
            // this.refreshing = true;
            await storeDetailsData();
            // this.refreshing = false;
        },

        //历史记录窗口状态改变
        transactionModalClick() {
            this.transactionStatus = !this.transactionStatus;
            this.$pub.publish("transactionModalChange", this.transactionStatus);

            //窗口打开时关闭其他两个窗口
            if (this.transactionStatus) {
                this.referStatus = false;
                this.trackStatus = false;
                this.$pub.publish("referralModalChange", this.referStatus);
                this.$pub.publish("trackModalChange", this.trackStatus);
            }
        },

        //推荐窗口状态改变
        referralModalClick() {
            this.referStatus = !this.referStatus;
            this.$pub.publish("referralModalChange", this.referStatus);

            //窗口打开时关闭其他两个窗口
            if (this.referStatus) {
                this.transactionStatus = false;
                this.trackStatus = false;
                this.$pub.publish(
                    "transactionModalChange",
                    this.transactionStatus
                );
                this.$pub.publish("trackModalChange", this.trackStatus);
            }
        },

        //踪迹窗口状态改变
        trackModalClick() {
            this.trackStatus = !this.trackStatus;
            this.$pub.publish("trackModalChange", this.trackStatus);

            //窗口打开时关闭其他两个窗口
            if (this.trackStatus) {
                this.transactionStatus = false;
                this.referStatus = false;
                this.$pub.publish(
                    "transactionModalChange",
                    this.transactionStatus
                );
                this.$pub.publish("referralModalChange", this.referStatus);
            }
        },

        walletStatusChange() {
            //切换钱包关闭窗口,防止出错
            this.referStatus = false;
            this.transactionStatus = false;
            this.trackStatus = false;
            this.$pub.publish("referralModalChange", this.referStatus);
            this.$pub.publish("transactionModalChange", this.transactionStatus);
            this.$pub.publish("trackModalChange", this.trackStatus);
            this.$store.commit("setCurrentAction", 0);
        }
    }
};
</script>

<style lang="scss">
#walletDetails {
    width: 374px;

    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(360deg);
        }
        to {
            -webkit-transform: rotate(0deg);
        }
    }

    @keyframes spin {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }

    .img-fade-enter-active,
    .img-fade-leave-active {
        transition: opacity $animete-time;
    }

    .img-fade-enter,
    .img-fade-leave-to {
        opacity: 0;
    }

    .walletAndAddressBox {
        height: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .info {
            width: 294px;
            padding: 7px 16px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border-radius: 20px;
            background: #f6f5f6;

            .wallet {
                font-family: Gilroy-Bold;
                font-size: 14px;
                font-weight: bold;
                line-height: 18px;
                color: #5a575c;
                margin-right: 5px;
            }

            .address {
                flex: 1;
                font-family: Gilroy-Regular;
                font-size: 14px;
                line-height: 18px;
                color: #99999a;
                margin-right: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .copyBtn {
                cursor: pointer;
                width: 16px;
                height: 16px;

                &:hover {
                    #Combined-Shape {
                        fill: #1b05a1;
                        stroke: #1b05a1;
                    }
                }
            }
        }

        .chainChange {
            width: 64px;
            height: 32px;
            display: flex;
            border-radius: 20px;
            background: #f6f5f6;

            &.chainChanging {
                .ethBox,
                .bscBox {
                    opacity: 0.2 !important;
                    cursor: not-allowed !important;
                }
            }

            .ethBox,
            .bscBox {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: $animete-time linear;
                opacity: 0.2;

                img {
                    height: 16px;
                }

                &:hover {
                    opacity: 1;
                }

                &.selected {
                    opacity: 1;
                    box-shadow: 0 2px 6px 0 #deddde;
                    background-color: #ffffff;
                }
            }
        }
    }

    .walletDetailsBox {
        width: 100%;
        height: 840px;

        .actionsBox {
            display: flex;
            justify-content: space-between;
            padding: 0 24px;

            .box {
                .track,
                .transaction,
                .refer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    color: #c6c4c7;
                    font-family: Gilroy;
                    font-size: 12px;
                    text-align: center;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: $animete-time linear;
                    font-weight: bold;
                    line-height: 16px;
                    letter-spacing: 1.5px;

                    .placeholder {
                        width: 48px;
                        height: 48px;
                        margin-bottom: 8px;
                        position: relative;

                        img {
                            left: 0;
                            width: 48px;
                            position: absolute;
                            transform: translateZ(0);
                        }
                    }
                }

                .track:hover,
                .transaction:hover,
                .refer:hover,
                .selected {
                    color: #1b05a1;
                }
            }
        }

        .ratioBox {
            margin: 22px 0 12px;
            padding: 12px 24px 24px;
            border-top: solid 2px #f6f5f6;
            border-bottom: solid 2px #f6f5f6;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #c6c4c7;
                font-family: Gilroy;
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 20px;

                img {
                    margin-top: 3px;
                }
            }

            .ratio {
                display: flex;

                .box {
                    flex: 1;
                    font-family: Gilroy;
                    font-size: 32px;
                    line-height: 32px;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 6px;

                    .context {
                        font-size: 14px;
                        font-family: Gilroy-Regular;
                        font-weight: 400;
                    }

                    &:nth-child(1) {
                        border-right: solid 1.5px #deddde;
                        color: #5a575c;
                    }

                    &:nth-child(2) {
                        color: #c6c4c7;
                    }
                }
            }

            .ivu-progress {
                .ivu-progress-outer {
                    .ivu-progress-inner {
                        .ivu-progress-success-bg {
                            background-color: #1b05a1;
                        }
                    }
                }
            }
        }

        .walletInfo {
            margin-bottom: 26px;
            padding: 0 22px;
            border-bottom: solid 2px #f6f5f6;

            .tokenIcon {
                border-radius: 50%;
                border: solid 1px #deddde;

                &.bsc {
                    width: 42px;
                    padding: 10px;
                    background: white;
                }
            }

            .title {
                color: #c6c4c7;
                font-family: Gilroy;
                font-size: 14px;
                font-weight: 700;
            }

            .LINABox,
            .LUSDBox,
            .ETHBox,
            .assetBox,
            .debtBox {
                padding: 16px 0;
            }

            .tokenItems {
                color: #5a575c;
                font-family: Gilroy;
                font-size: 16px;
                font-weight: 700;
            }

            .tokenToUSDItems {
                color: #c6c4c7;
                font-family: Gilroy;
                font-size: 12px;
                font-weight: 400;
            }

            .LINABox {
                display: flex;
                border-bottom: solid 1px #f6f5f6;

                img {
                    height: 40px;
                    margin-right: 8px;
                }

                .box {
                    flex: 1;

                    .tokenItems,
                    .tokenToUSDItems {
                        display: flex;
                        justify-content: space-between;
                    }

                    .tokenToUSDItems {
                        margin-bottom: 3px;
                    }

                    .avaliableItems,
                    .stakedItems,
                    .lockedItems {
                        display: flex;
                        justify-content: space-between;
                        font-family: Gilroy;
                        font-size: 12px;
                    }
                }
            }

            .LUSDBox,
            .ETHBox {
                display: flex;
                border-bottom: solid 1px #f6f5f6;

                img {
                    margin-right: 8px;
                }

                .box {
                    flex: 1;

                    .tokenItems,
                    .tokenToUSDItems {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }

            .assetBox {
                border-bottom: solid 1px #f6f5f6;
            }

            .assetBox,
            .debtBox {
                display: flex;
                justify-content: space-between;

                img {
                    margin-right: 8px;
                }

                .leftBox {
                    display: flex;
                    align-items: center;
                    font-family: Gilroy;
                    font-size: 16px;
                    font-weight: 700;

                    .ivu-tooltip {
                        margin-left: 8px;
                    }
                }

                .rightBox {
                    flex: 1;
                    text-align: right;
                }
            }
        }

        .totalBalanceToUSD {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .box {
                .title {
                    color: #c6c4c7;
                    font-family: Gilroy;
                    font-size: 14px;
                    font-weight: 700;
                    text-align: center;
                    margin: 0 0 8px;
                }

                .amount {
                    color: #5a575c;
                    font-family: Gilroy;
                    font-size: 32px;
                    line-height: 32px;
                    font-weight: 700;
                    text-align: center;
                }
            }

            .refreshBtn {
                cursor: pointer;
                .border,
                .shape {
                    transition: fill $animete-time linear;
                }
            }

            .refreshBtn:hover {
                .border {
                    stroke: #1b05a1;
                }
                .shape {
                    fill: #1b05a1;
                }
            }

            .refreshBtn:active {
                .background {
                    fill: #1b05a1;
                }
                .border {
                    stroke: #fff;
                }
                .shape {
                    fill: #fff;
                }
            }

            .refreshing {
                -webkit-animation: spin 1s linear 1s 5 alternate;
                animation: spin 1s linear infinite;
            }

            .refreshing:hover {
                cursor: not-allowed;
            }
        }
    }
}
</style>
