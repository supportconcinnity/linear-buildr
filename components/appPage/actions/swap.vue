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

                        <!-- {{ frozenBalance }}-frozenBalance -->

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
                                                v-model="swapNumber"
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

                    <Spin fix v-if="processing"></Spin>
                </div>
            </TabPane>
            <TabPane name="m1">
                <watingEnhance
                    class="waitingBox"
                    v-if="this.actionTabs == 'm1'"
                    :currentStep="confirmTransactionStep"
                    :currentHash="confirmTransactionHash"
                    :currentConfirm="confirmTransactionStatus"
                    :currentErrMsg="transactionErrMsg"
                    :setupArray="waitProcessArray"
                    @tryAgain="waitProcessFlow"
                    @close="setDefaultTab"
                ></watingEnhance>
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
    bufferGasLimit,
    DEFAULT_GAS_LIMIT,
    isBinanceNetwork,
    isEthereumNetwork,
    SUPPORTED_WALLETS_MAP
} from "@/assets/linearLibrary/linearTools/network";
import lnrJSConnector, {
    connectToWallet,
    selectedWallet
} from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import { log } from "util";
import { bn2n, bnSub, n2bn } from "~/common/bnCalc";
import { BUILD_PROCESS_SETUP } from "@/assets/linearLibrary/linearTools/constants/process";

export default {
    name: "swap",
    components: {
        gasEditorSwap
    },
    data() {
        return {
            toNonExponential,
            setCursorRange,
            actionTabs: "m0", //子页(m0默认,m1等待)
            showDropdown: false,
            selected: 0,
            swapNumber: null,

            confirmTransactionStep: 0, //当前交易进度
            confirmTransactionStatus: false, //当前交易确认状态
            confirmTransactionHash: "", //当前交易hash
            transactionErrMsg: "", //交易错误信息
            processing: false, // 处理状态, 防止重复点击
            waitProcessArray: [], //等待交易进度组
            waitProcessFlow: Function, //flow闭包函数

            frozenBalance: 0,

            errors: {
                amountMsg: ""
            }
        };
    },
    async created() {
        await this.getFrozenBalance();
    },
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
                    if (key == "lUSD") img = require("@/static/currency/lUSD.svg");
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
                        name: "LINA",
                        img: require("@/static/LINA_logo.svg"),
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
        },

        swapDisabled() {
            return !this.swapNumber || this.processing;
        }
    },
    methods: {
        async getFrozenBalance() {
            try {
                this.processing = true;
                let LnBridge;
                if (this.isEthereumNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                } else if (this.isBinanceNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                }

                this.frozenBalance = bn2n(
                    await LnBridge.frozenOf(this.walletAddress)
                );
            } catch (error) {
                this.frozenBalance = 0;
                console.log(error, "getFrozenBalance error");
            } finally {
                this.processing = false;
            }
        },

        async clickSwap() {
            try {
                if (!this.swapDisabled) {
                    this.processing = true;

                    //清空之前数据
                    this.waitProcessArray = [];
                    this.confirmTransactionStep = 0;

                    let LnProxy, LnBridge;
                    if (this.isEthereumNetwork) {
                        LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                        LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                    } else if (this.isBinanceNetwork) {
                        LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                        LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                    }

                    //取合约地址
                    const LnBridgeAddress = LnBridge.contract.address;

                    //获取之前approve的数量
                    const approveAmount = await LnProxy.allowance(
                        this.walletAddress,
                        LnBridgeAddress
                    );

                    const freezeAmount = n2bn(this.swapNumber);

                    //LINA差值
                    const diffCollateralLINA = bnSub(
                        freezeAmount,
                        approveAmount
                    );

                    if (diffCollateralLINA.gt(approveAmount)) {
                        this.waitProcessArray.push(BUILD_PROCESS_SETUP.APPROVE);
                    }

                    //  this.waitProcessArray.push(BUILD_PROCESS_SETUP.APPROVE);

                    this.waitProcessArray.push(BUILD_PROCESS_SETUP.FREEZE);
                    this.waitProcessArray.push(BUILD_PROCESS_SETUP.UNFREEZE);

                    this.actionTabs = "m1"; //进入等待页

                    this.waitProcessFlow = this.startFlow();

                    //开始逻辑流处理函数
                    await this.waitProcessFlow();
                }
            } catch (error) {
                this.frozenBalance = 0;
                console.log(error, "getFrozenBalance error");
            } finally {
                this.processing = false;
            }
        },

        startFlow() {
            let sourceType, sourceWallet;
            if (this.isEthereumNetwork) {
                sourceType = SUPPORTED_WALLETS_MAP.METAMASK;
            } else if (this.isBinanceNetwork) {
                sourceType = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
            }

            return async () => {
                try {
                    this.transactionErrMsg = "";

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.APPROVE
                    ) {
                        await this.startApproveContract(
                            n2bn(Number.MAX_SAFE_INTEGER)
                        );
                    }

                    let swapNumber = this.swapNumber;

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.FREEZE
                    ) {
                        await this.startFreezeContract(n2bn(swapNumber));
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.UNFREEZE
                    ) {
                        await this.startUnFreezeContract(n2bn(swapNumber));
                    }
                } catch (error) {
                    console.log(error, "error");
                    //自定义错误
                    if (
                        _.has(error, "code") &&
                        [6100001, 6100002, 6100003, 6100004].includes(
                            error.code
                        )
                    ) {
                        this.transactionErrMsg = error.message;
                    } else {
                        //通用错误
                        this.transactionErrMsg =
                            "Something went wrong, please try again.";
                    }
                } finally {
                    await selectedWallet(sourceType, false, false);
                }
            };
        },

        //开始Approve合约调用
        async startApproveContract(approveAmountLINA) {
            this.confirmTransactionStatus = false;

            let LnProxy, LnBridge, gasPrice;
            if (this.isEthereumNetwork) {
                LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                gasPrice = this.$store.state?.gasDetailsETH?.price;
            } else if (this.isBinanceNetwork) {
                LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                gasPrice = this.$store.state?.gasDetailsBSC?.price;
            }

            const { utils } = lnrJSConnector;

            //取合约地址
            const LnBridgeAddress = LnBridge.contract.address;

            const transactionSettings = {
                gasPrice,
                gasLimit: this.gasLimit
            };

            transactionSettings.gasLimit = await this.getGasEstimateFromApprove(
                LnBridgeAddress,
                approveAmountLINA
            );

            let transaction = await LnProxy.approve(
                LnBridgeAddress,
                approveAmountLINA,
                transactionSettings
            );

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;
                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.APPROVE,
                    value: `Approve ${this.confirmTransactionStep + 1} / ${
                        this.waitProcessArray.length
                    }`
                });
                let status = await utils.waitForTransaction(transaction.hash);

                if (!status) {
                    throw {
                        code: 6100001,
                        message:
                            "Something went wrong while gaining approval from the contract, please try again."
                    };
                }

                //成功后累加当前进度
                this.confirmTransactionStep += 1;
            }
        },

        //评估Approve的gas
        async getGasEstimateFromApprove(contractAddress, approveAmountLINA) {
            try {
                const { utils } = lnrJSConnector;

                let LnProxy;
                if (this.isEthereumNetwork) {
                    LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                } else if (this.isBinanceNetwork) {
                    LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                }

                if (
                    approveAmountLINA.isZero() ||
                    approveAmountLINA.lt("0") //小于等于0
                ) {
                    throw new Error("invalid approveAmountLINA");
                }

                let gasEstimate = await LnProxy.contract.estimateGas.approve(
                    contractAddress,
                    approveAmountLINA
                );
                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.approve);
            }
        },

        async startFreezeContract(swapNumber) {
            this.confirmTransactionStatus = false;

            let LnBridge, gasPrice;
            if (this.isEthereumNetwork) {
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                gasPrice = this.$store.state?.gasDetailsETH?.price;
            } else if (this.isBinanceNetwork) {
                LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                gasPrice = this.$store.state?.gasDetailsBSC?.price;
            }

            const { utils } = lnrJSConnector;

            const transactionSettings = {
                gasPrice,
                gasLimit: DEFAULT_GAS_LIMIT.freeze
            };

            transactionSettings.gasLimit = await this.getGasEstimateFromFreeze(
                LnBridge,
                swapNumber
            );

            let transaction;

            transaction = await LnBridge.freeze(
                swapNumber,
                transactionSettings
            );

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;

                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.FREEZE,
                    value: `Swapped on Ethereum ${this.confirmTransactionStep + 1}/${
                        this.waitProcessArray.length
                    }`
                });

                let status = await utils.waitForTransaction(transaction.hash);

                if (!status) {
                    throw {
                        code: 6100002,
                        message:
                            "Something went wrong while Freezing your LINA, please try again."
                    };
                }

                this.confirmTransactionStep += 1;
            }
        },

        async getGasEstimateFromFreeze(LnBridge, swapNumber) {
            try {
                const { utils } = lnrJSConnector;

                if (
                    swapNumber.lte(n2bn("0")) //小于等于0
                ) {
                    throw new Error("invalid freezeAmount");
                }

                let gasEstimate;

                gasEstimate = await LnBridge.contract.estimateGas.freeze(
                    swapNumber
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.freeze);
            }
        },

        async startUnFreezeContract(swapNumber) {
            this.confirmTransactionStatus = false;

            let walletType;
            // sourceWallet = this.walletAddress;
            if (this.isEthereumNetwork) {
                walletType = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
            } else if (this.isBinanceNetwork) {
                walletType = SUPPORTED_WALLETS_MAP.METAMASK;
            }

            const walletStatus = await selectedWallet(walletType, false, false);

            // console.log(sourceWallet, this.walletAddress);

            // if (this.walletAddress != sourceWallet) {
            //     throw {
            //         code: 6100004,
            //         message:
            //             "The wallet address is inconsistent, please confirm and try again"
            //     };
            // }

            if (walletStatus) {
                let LnBridge, gasPrice;
                if (this.isEthereumNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                    gasPrice = this.$store.state?.gasDetailsETH?.price;
                } else if (this.isBinanceNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                    gasPrice = this.$store.state?.gasDetailsBSC?.price;
                }

                const { utils } = lnrJSConnector;

                const transactionSettings = {
                    gasPrice,
                    gasLimit: DEFAULT_GAS_LIMIT.freeze
                };

                transactionSettings.gasLimit = await this.getGasEstimateFromUnFreeze(
                    LnBridge,
                    swapNumber
                );

                let transaction;

                transaction = await LnBridge.unfreeze(
                    swapNumber,
                    transactionSettings
                );

                if (transaction) {
                    this.confirmTransactionStatus = true;
                    this.confirmTransactionHash = transaction.hash;

                    // 发起右下角通知
                    this.$pub.publish("notificationQueue", {
                        hash: this.confirmTransactionHash,
                        type: BUILD_PROCESS_SETUP.UNFREEZE,
                        value: `Swapped on BSC ${this.confirmTransactionStep +
                            1}/${this.waitProcessArray.length}`
                    });

                    let status = await utils.waitForTransaction(
                        transaction.hash
                    );

                    if (!status) {
                        throw {
                            code: 6100003,
                            message:
                                "Something went wrong while Freezing your LINA, please try again."
                        };
                    }

                    this.confirmTransactionStep += 1;
                }
            } else {
                throw {
                    code: 6100004,
                    message:
                        "Something went wrong, please try again or install wallet extensions."
                };
            }
        },

        async getGasEstimateFromUnFreeze(LnBridge, swapNumber) {
            try {
                const { utils } = lnrJSConnector;

                if (
                    swapNumber.lte(n2bn("0")) //小于等于0
                ) {
                    throw new Error("invalid freezeAmount");
                }

                let gasEstimate;

                gasEstimate = await LnBridge.contract.estimateGas.unfreeze(
                    swapNumber
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.freeze);
            }
        },

        async selectCurrencyFun(index) {
            this.errors.amountMsg = "";
            this.selected = index;
            this.swapNumber = 0;
        },

        //回到默认状态
        setDefaultTab() {
            this.actionTabs = "m0";
            this.waitProcessArray = [];
            this.confirmTransactionStep = 0;
            this.swapNumber = 0;
            this.getFrozenBalance();
        },

        showDropdownFun() {
            setTimeout(() => {
                this.showDropdown = !this.showDropdown;
            }, 1);
        },

        //点击最大
        clickMaxAmount() {
            this.swapNumber = this.currency[this.selected].avaliable;

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

        //交易状态页面回调方法 回到主页
        goHomePage() {
            this.$store.commit("setCurrentAction", 0);
        },

        //重试
        tryAgain() {
            this.setDefaultTab();
        }
    }
};
</script>

<style lang="scss">
#swap {
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
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.25;
                            letter-spacing: normal;
                            text-align: center;
                            color: #5a575c;
                        }

                        .actionDesc {
                            margin: 8px 55px 100px;
                            font-family: Gilroy-Regular;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.29;
                            letter-spacing: normal;
                            text-align: center;
                            color: #99999a;
                        }
                    }

                    .fromToBox {
                        padding: 0 46px;
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
                        border-radius: 8px;
                        border: 1px solid #deddde;
                        transition: $animete-time linear;
                        box-shadow: 0 0 0 #deddde;
                        margin-top: 64px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        padding: 40px 24px;
                        margin-bottom: 24px;

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
                            margin-right: 16px;
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
                                color: #1a38f8;

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
                            flex: 1;
                            flex-direction: column;
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
                                                padding: 0;
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
                                    color: #1a38f8;
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
                                    color: #1a38f8;
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
                        background: #1a38f8;
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
                                background-color: #7eb5ff;
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
