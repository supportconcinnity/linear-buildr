<template>
    <div id="swap" :class="{ isMobile }">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="swapBox">
                    <div class="actionBody">
                        <template v-if="!isMobile">
                            <div class="actionTitle">Swap</div>
                            <div class="actionDesc">
                                You can select the type of liquids and enter the
                                amount you want to swap to the other chain.
                            </div>
                        </template>

                        <div
                            v-if="isMobile"
                            v-show="errors.amountMsg"
                            class="someWrongMobile"
                        >
                            <img class="errIcon" src="@/static/error.svg" />
                            <div class="errMessage">
                                {{ errors.amountMsg }}
                            </div>
                        </div>

                        <div
                            class="swapInputBox"
                            :class="{
                                error: errors.amountMsg
                            }"
                        >
                            <div class="iconBox">
                                <img
                                    class="icon"
                                    :src="currentSelectCurrency.img"
                                />
                                <div class="name">
                                    {{ currentSelectCurrency.name }}
                                </div>

                                <div v-if="isMobile" class="avaliable">
                                    Avaliable:
                                    {{
                                        formatNumber(
                                            currentSelectCurrency.avaliable,
                                            DECIMAL_PRECISION
                                        )
                                    }}
                                    {{ currentSelectCurrency.name }}
                                </div>
                            </div>

                            <div class="divider"></div>

                            <div class="inputBox" @click="inputFocus(0)">
                                <template v-if="isMobile">
                                    <div class="label">
                                        <div class="amount">
                                            Amount
                                        </div>
                                        <InputNumber
                                            class="input"
                                            ref="itemInput0"
                                            element-id="transfer_number_input"
                                            :min="frozenBalance"
                                            :max="
                                                floor(
                                                    currentSelectCurrency.avaliable,
                                                    DECIMAL_PRECISION
                                                )
                                            "
                                            type="text"
                                            v-model="swapNumber"
                                            placeholder="0"
                                            @on-focus="inputFocus(0)"
                                            @on-blur="inputBlur(0)"
                                            :formatter="formatterInput"
                                        />
                                    </div>

                                    <span
                                        class="max"
                                        :class="{
                                            active: activeItemBtn == 0
                                        }"
                                        @click="clickMaxAmount"
                                    >
                                        MAX
                                    </span>
                                </template>
                                <template v-else>
                                    <div class="label">
                                        <div class="amount">
                                            Amount
                                        </div>
                                        <span
                                            class="max"
                                            :class="{
                                                active: activeItemBtn == 0
                                            }"
                                            @click="clickMaxAmount"
                                        >
                                            MAX
                                        </span>
                                    </div>
                                    <InputNumber
                                        class="input"
                                        ref="itemInput0"
                                        element-id="transfer_number_input"
                                        :min="frozenBalance"
                                        :max="
                                            floor(
                                                currentSelectCurrency.avaliable,
                                                DECIMAL_PRECISION
                                            )
                                        "
                                        type="text"
                                        v-model="swapNumber"
                                        placeholder="0"
                                        @on-focus="inputFocus(0)"
                                        @on-blur="inputBlur(0)"
                                        :formatter="formatterInput"
                                    />
                                </template>
                            </div>
                        </div>

                        <div
                            v-if="!isMobile"
                            class="someWrong"
                            v-show="errors.amountMsg"
                        >
                            {{ errors.amountMsg }}
                        </div>
                        <gasEditorSwap
                            v-if="this.actionTabs == 'm0'"
                        ></gasEditorSwap>
                    </div>

                    <div
                        class="swapBtn"
                        :class="{ disabled: swapDisabled }"
                        @click="clickSwap"
                    >
                        SWAP <template v-if="!isMobile">NOW</template>
                    </div>

                    <Spin fix v-if="processing"></Spin>
                </div>
            </TabPane>
            <TabPane name="m1">
                <watingEnhanceSwap
                    class="waitingBox"
                    v-if="this.actionTabs == 'm1'"
                    :currentStep="confirmTransactionStep"
                    :currentHash="confirmTransactionHash"
                    :currentConfirm="confirmTransactionStatus"
                    :currentNetworkId="confirmTransactionNetworkId"
                    :waitChainChange="confirmTransactionChainChanging"
                    :sourceWalletType="sourceWalletType"
                    :targetNetworkId="targetNetworkId"
                    :currentErrMsg="transactionErrMsg"
                    :setupArray="waitProcessArray"
                    @tryAgain="waitProcessFlow"
                    @close="setDefaultTab"
                ></watingEnhanceSwap>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import _ from "lodash";
import gasEditorSwap from "@/components/gasEditorSwap";
import watingEnhanceSwap from "@/components/transferStatus/watingEnhanceSwap";
import {
    formatterInput,
    setCursorRange,
    findParents,
    removeClass,
    addClass
} from "@/common/utils";
import {
    bufferGasLimit,
    DEFAULT_GAS_LIMIT,
    getOtherNetworks,
    isBinanceNetwork,
    isEthereumNetwork,
    SUPPORTED_WALLETS_MAP
} from "@/assets/linearLibrary/linearTools/network";
import lnrJSConnector, {
    connectToWallet,
    selectedWallet
} from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import { bn2n, bnSub, bnSub2N, n2bn } from "@/common/bnCalc";
import {
    BUILD_PROCESS_SETUP,
    BUILD_PROCESS_SETUP_MOBILE,
    DECIMAL_PRECISION
} from "@/assets/linearLibrary/linearTools/constants/process";
import { lnr } from "@/assets/linearLibrary/linearTools/request/linearData/transactionData";
import { formatNumber } from "@/assets/linearLibrary/linearTools/format";

export default {
    name: "swap",
    components: {
        gasEditorSwap,
        watingEnhanceSwap
    },
    data() {
        return {
            formatterInput,
            setCursorRange,
            actionTabs: "m0", //子页(m0默认,m1等待)
            swapNumber: null,

            activeItemBtn: -1,

            confirmTransactionStep: -1, //当前交易进度
            confirmTransactionStatus: false, //当前交易确认状态
            confirmTransactionNetworkId: "", //当前交易确认网络id
            confirmTransactionHash: "", //当前交易hash

            transactionErrMsg: "", //交易错误信息
            processing: false, // 处理状态, 防止重复点击
            waitProcessArray: [],
            // waitProcessArray: [
            //     "Approve address",
            //     "Contract on ETH",
            //     "Contract on BSC"
            // ], //等待交易进度组
            waitProcessFlow: Function, //flow闭包函数

            freezeSuccessHash: "", //冻结hash
            waitPendingProcess: false, //等待查询

            chainChangedStatus: false, //是否已经切换网络或链,false未切换,true已切换

            floor: _.floor,

            frozenBalance: 0, //已经冻结的数量

            DECIMAL_PRECISION,

            errors: { amountMsg: "" },

            confirmTransactionChainChanging: false, //当前是否在切链步骤
            sourceNetworkId: "", //原始网络ID
            targetNetworkId: "", //目标网络ID
            sourceWalletType: "", //原始钱包类型
            sourceWalletAddress: "", //原始钱包地址

            chainChangeTokenFromUnfreeze: "", //解冻切换钱包事件监听id
            chainChangeTokenFromSubscribe: "", //切换钱包事件监听id
            walletChangeTokenFromSubscribe: "", //切换钱包地址时间监听id

            sourceGasPrice: 0, //原始网络gas
            targetGasPrice: 0, //目标网络gas

            formatNumber,
            BUILD_PROCESS_SETUP,
            swapUnfreezeContinue: false
        };
    },
    async created() {
        //监听链切换
        this.chainChangeTokenFromSubscribe = this.$pub.subscribe(
            "onWalletChainChange",
            async () => {
                if (this.actionTabs == "m0") {
                    await this.getFrozenBalance();
                }
            }
        );

        this.walletChangeTokenFromSubscribe = this.$pub.subscribe(
            "onWalletAccountChange",
            async () => {
                if (this.actionTabs == "m0") {
                    await this.getFrozenBalance();
                }
            }
        );
    },

    async mounted() {
        await this.getFrozenBalance();
        this.swapUnfreezeContinue = this.$store.state?.swapUnfreezeContinue;

        if (this.swapUnfreezeContinue) {
            const unfreezeDatas = this.$store.state?.swapUnfreezeDatas;
            this.confirmTransactionStep = unfreezeDatas.confirmTransactionStep;
            this.freezeSuccessHash = unfreezeDatas.freezeSuccessHash;
            this.sourceWalletType = unfreezeDatas.sourceWalletType;
            this.sourceNetworkId = unfreezeDatas.sourceNetworkId;
            this.confirmTransactionNetworkId = unfreezeDatas.targetNetworkId;
            this.sourceWalletAddress = unfreezeDatas.sourceWalletAddress;
            this.targetNetworkId = unfreezeDatas.targetNetworkId;
            this.waitProcessArray = [...unfreezeDatas.waitProcessArray];
            this.swapNumber = unfreezeDatas.swapNumber;
            this.targetGasPrice = unfreezeDatas.targetGasPrice;
            this.chainChangedStatus = true;
            this.confirmTransactionChainChanging = false;

            this.clickSwap();
        }
    },
    destroyed() {
        //清除事件,防止重复
        this.$pub.unsubscribe(this.chainChangeTokenFromUnfreeze);
        this.$pub.unsubscribe(this.chainChangeTokenFromSubscribe);
        this.$pub.unsubscribe(this.walletChangeTokenFromSubscribe);
    },
    watch: {
        walletAddress() {},
        isEthereumNetwork() {},
        isBinanceNetwork() {},
        walletNetworkId() {},
        walletType() {},
        isMobile() {}
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

        transferableAssets() {
            return this.$store.state?.walletDetails?.transferableAssets;
        },

        currentSelectCurrency() {
            return {
                name: "LINA",
                img: require("@/static/LINA_logo.svg"),
                avaliable: this.transferableAssets
                    ? this.transferableAssets["LINA"]
                    : 0
            };
        },

        swapDisabled() {
            return !this.swapNumber || this.processing;
        },

        walletType() {
            return this.$store.state?.walletType;
        },

        isMobile() {
            return this.$store.state?.isMobile;
        }
    },
    methods: {
        async getFrozenBalance() {
            try {
                this.processing = true;

                //获取其他网络id
                let otherNetworkId = getOtherNetworks(
                    this.walletNetworkId
                ).join();

                //获取当前和其他网络冻结数据
                const [current, other] = await Promise.all([
                    lnr.userSwapAssetsCount({
                        account: this.walletAddress,
                        networkId: this.walletNetworkId
                    }),
                    lnr.userSwapAssetsCount({
                        account: this.walletAddress,
                        networkId: otherNetworkId
                    })
                ]);
                let currentFreeZeTokens = 0,
                    otherUnFreeZeTokens = 0;
                current.length &&
                    (currentFreeZeTokens = current[0].freeZeTokens);
                other.length && (otherUnFreeZeTokens = other[0].UnFreeZeTokens);

                //计算可以解冻的数量
                const frozenBalance = bnSub2N(
                    n2bn(currentFreeZeTokens),
                    n2bn(otherUnFreeZeTokens)
                );
                this.frozenBalance = this.swapNumber =
                    frozenBalance > 0
                        ? _.floor(frozenBalance, DECIMAL_PRECISION)
                        : null;

                console.log(
                    currentFreeZeTokens,
                    otherUnFreeZeTokens,
                    frozenBalance
                );
            } catch (error) {
                console.log(error, "getFrozenBalance error");
            } finally {
                this.processing = false;
            }
        },

        async clickSwap() {
            try {
                if (!this.swapDisabled) {
                    this.processing = true;

                    //端更换进度设置
                    this.BUILD_PROCESS_SETUP = this.isMobile
                        ? BUILD_PROCESS_SETUP_MOBILE
                        : BUILD_PROCESS_SETUP;

                    //如果是继续的流程
                    if (this.swapUnfreezeContinue && this.isMobile) {
                        if (isEthereumNetwork(this.targetNetworkId)) {
                            this.BUILD_PROCESS_SETUP.UNFREEZE =
                                this.BUILD_PROCESS_SETUP.SWAP + " ETH";
                        } else if (isBinanceNetwork(this.targetNetworkId)) {
                            this.BUILD_PROCESS_SETUP.UNFREEZE =
                                this.BUILD_PROCESS_SETUP.SWAP + " BSC";
                        }
                    } else {
                        //清空之前数据
                        this.waitProcessArray = [];
                        this.confirmTransactionStep = 0;
                        this.waitProcessFlow = null;

                        let LnProxy,
                            LnBridge,
                            suffixETH = this.isMobile ? " ETH" : " Ethereum";
                        if (this.isEthereumNetwork) {
                            LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                            LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                            this.BUILD_PROCESS_SETUP.FREEZE =
                                this.BUILD_PROCESS_SETUP.SWAP + suffixETH;
                            this.BUILD_PROCESS_SETUP.UNFREEZE =
                                this.BUILD_PROCESS_SETUP.SWAP + " BSC";
                        } else if (this.isBinanceNetwork) {
                            LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                            LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                            this.BUILD_PROCESS_SETUP.FREEZE =
                                this.BUILD_PROCESS_SETUP.SWAP + " BSC";
                            this.BUILD_PROCESS_SETUP.UNFREEZE =
                                this.BUILD_PROCESS_SETUP.SWAP + suffixETH;
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
                            this.waitProcessArray.push(
                                this.BUILD_PROCESS_SETUP.APPROVE
                            );
                        }

                        //  this.waitProcessArray.push(this.BUILD_PROCESS_SETUP.APPROVE);

                        //如果新输入的大于已冻结的
                        if (this.swapNumber > this.frozenBalance) {
                            this.waitProcessArray.push(
                                this.BUILD_PROCESS_SETUP.FREEZE
                            );
                        }

                        this.waitProcessArray.push(
                            this.BUILD_PROCESS_SETUP.UNFREEZE
                        );

                        //记录原始钱包类型
                        this.sourceWalletType = this.walletType;

                        //记录原始网络类型
                        this.sourceNetworkId = this.walletNetworkId;

                        //记录目标网络id
                        this.targetNetworkId = getOtherNetworks(
                            this.walletNetworkId
                        ).join();

                        //记录原始钱包地址
                        this.sourceWalletAddress = this.walletAddress.toLocaleLowerCase();

                        //记录gas price
                        this.sourceGasPrice =
                            this.$store.state?.sourceGasDetails?.price ||
                            50000000000;
                        this.targetGasPrice =
                            this.$store.state?.targetGasDetails?.price ||
                            50000000000;
                    }

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
            // if (this.isEthereumNetwork) {
            //     this.sourceWalletType = SUPPORTED_WALLETS_MAP.METAMASK;
            // } else if (this.isBinanceNetwork) {
            //     this.sourceWalletType = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
            // }

            return async () => {
                try {
                    this.transactionErrMsg = "";

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        this.BUILD_PROCESS_SETUP.APPROVE
                    ) {
                        await this.startApproveContract(
                            n2bn(Number.MAX_SAFE_INTEGER)
                        );
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        this.BUILD_PROCESS_SETUP.FREEZE
                    ) {
                        const swapNumber = _.floor(
                            this.swapNumber - this.frozenBalance,
                            DECIMAL_PRECISION
                        );
                        await this.startFreezeContract(n2bn(swapNumber));
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        this.BUILD_PROCESS_SETUP.UNFREEZE
                    ) {
                        await this.startUnFreezeContract();
                    }
                } catch (error) {
                    console.log(error, "error");
                    //自定义错误
                    if (
                        _.has(error, "code") &&
                        [
                            6100001,
                            6100002,
                            6100003,
                            6100004,
                            6100005,
                            6100006,
                            6100007
                        ].includes(error.code)
                    ) {
                        this.transactionErrMsg = error.message;
                    } else {
                        //通用错误
                        this.transactionErrMsg =
                            "Something went wrong, please try again.";
                    }
                }
            };
        },

        //开始Approve合约调用
        async startApproveContract(approveAmountLINA) {
            this.confirmTransactionStatus = false;

            let LnProxy, LnBridge;
            if (this.isEthereumNetwork) {
                LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
            } else if (this.isBinanceNetwork) {
                LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
            }

            const { utils } = lnrJSConnector;

            //取合约地址
            const LnBridgeAddress = LnBridge.contract.address;

            const transactionSettings = {
                gasPrice: this.sourceGasPrice,
                gasLimit: this.gasLimit
            };

            this.confirmTransactionNetworkId = this.walletNetworkId;

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
                    type: this.BUILD_PROCESS_SETUP.APPROVE,
                    networkId: this.walletNetworkId,
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

            let LnBridge,
                SETUP,
                suffixETH = this.isMobile ? " ETH" : " Ethereum";
            if (this.isEthereumNetwork) {
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                SETUP = suffixETH;
            } else if (this.isBinanceNetwork) {
                LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                SETUP = " BSC";
            }

            const { utils } = lnrJSConnector;

            const transactionSettings = {
                gasPrice: this.sourceGasPrice,
                gasLimit: DEFAULT_GAS_LIMIT.freeze
            };

            this.confirmTransactionNetworkId = this.walletNetworkId;

            transactionSettings.gasLimit = await this.getGasEstimateFromFreeze(
                LnBridge,
                swapNumber
            );

            let transaction = await LnBridge.freeze(
                swapNumber,
                transactionSettings
            );

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.freezeSuccessHash = this.confirmTransactionHash =
                    transaction.hash;

                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: this.BUILD_PROCESS_SETUP.FREEZE,
                    networkId: this.walletNetworkId,
                    value: `Swapped on ${SETUP} ${this.confirmTransactionStep +
                        1}/${this.waitProcessArray.length}`
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

        async startUnFreezeContract() {
            this.confirmTransactionStatus = false;

            //不是自动进入流程,且是手机端时
            if (!this.swapUnfreezeContinue && this.isMobile) {
                const unfreezeDatas = {
                    confirmTransactionStep: this.confirmTransactionStep,
                    waitProcessArray: this.waitProcessArray,
                    freezeSuccessHash: this.freezeSuccessHash,
                    targetNetworkId: this.targetNetworkId,
                    sourceWalletType: this.sourceWalletType,
                    sourceWalletAddress: this.sourceWalletAddress,
                    swapNumber: this.swapNumber,
                    sourceNetworkId: this.sourceNetworkId,
                    targetGasPrice: this.targetGasPrice
                };

                //保存手机端解冻的数据
                this.$store.commit("setSwapUnfreezeDatas", unfreezeDatas);
            }

            //清除自动进入流程
            this.swapUnfreezeContinue &&
                this.$store.commit("setSwapUnfreezeContinue", false);

            let walletStatus;

            /**
             * 当前网络Id,不等于目标网络Id
             * 当前钱包类型等于目标钱包类型
             * 等待用户切换钱包或网络 */
            if (
                this.walletNetworkId != this.targetNetworkId
                // && this.walletType == this.sourceWalletType
            ) {
                this.confirmTransactionChainChanging = true;
                this.chainChangedStatus = false;
                this.confirmTransactionNetworkId = this.walletNetworkId;

                //监听手动切换事件
                this.chainChangeTokenFromUnfreeze = this.$pub.subscribe(
                    "onWalletChainChange",
                    async (msg, changeType) => {
                        console.log(changeType, "startUnFreezeContract");
                        this.chainChangedStatus = true;
                        this.confirmTransactionChainChanging = false;
                        this.confirmTransactionNetworkId = this.walletNetworkId;
                    }
                );

                console.log("开始手动切换metamask链");
                walletStatus = await this.waitChainChange();
                console.log("手动切换metamask链完成");
            } else {
                walletStatus = true;
            }

            this.confirmTransactionNetworkId = this.walletNetworkId;

            //验证当前网络id是否目标网络id
            if (this.walletNetworkId != this.targetNetworkId) {
                throw {
                    code: 6100007,
                    message:
                        "The network is not correct. Please switch to a valid network"
                };
            }

            //验证钱包地址是否相同
            if (
                this.walletAddress.toLocaleLowerCase() !=
                this.sourceWalletAddress
            ) {
                throw {
                    code: 6100005,
                    message:
                        "The wallet address is inconsistent, please confirm and try again"
                };
            }

            if (walletStatus) {
                let LnBridge,
                    SETUP,
                    suffixETH = this.isMobile ? " ETH" : " Ethereum";
                if (this.isEthereumNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                    SETUP = suffixETH;
                } else if (this.isBinanceNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                    SETUP = " BSC";
                }

                console.log(`等待获取锁定hash`);
                this.waitPendingProcess = true;
                const processArray = await this.getPendingProcess(LnBridge);
                console.log(`获取锁定hash完成`, processArray);

                const { utils } = lnrJSConnector;

                const transactionSettings = {
                    gasPrice: this.targetGasPrice,
                    gasLimit: DEFAULT_GAS_LIMIT.freeze
                };

                for (const index in processArray) {
                    const txId = processArray[index];

                    if (!txId) {
                        continue;
                    }

                    this.confirmTransactionStatus = false;

                    transactionSettings.gasLimit = await this.getGasEstimateFromUnFreeze(
                        LnBridge,
                        txId
                    );

                    let transaction = await LnBridge.unfreeze(
                        txId,
                        transactionSettings
                    );

                    if (transaction) {
                        this.confirmTransactionStatus = true;
                        this.confirmTransactionHash = transaction.hash;

                        // 发起右下角通知
                        this.$pub.publish("notificationQueue", {
                            hash: this.confirmTransactionHash,
                            type: this.BUILD_PROCESS_SETUP.UNFREEZE,
                            networkId: this.walletNetworkId,
                            value: `Swapped on ${SETUP} ${this
                                .confirmTransactionStep + 1}/${
                                this.waitProcessArray.length
                            }`
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
                            break;
                        }
                    }
                }

                this.confirmTransactionStep += 1;

                this.$store.commit("setSwapUnfreezeDatas", {});
            } else {
                throw {
                    code: 6100004,
                    message:
                        "Something went wrong, please try again or install wallet extensions."
                };
            }
        },

        waitChainChange() {
            return new Promise(resolve => {
                const wait = () => {
                    if (this.chainChangedStatus) {
                        this.$pub.unsubscribe(
                            this.chainChangeTokenFromUnfreeze
                        );
                        this.chainChangeTokenFromUnfreeze = "";
                        this.chainChangedStatus = false;
                        resolve(true);
                    } else {
                        setTimeout(wait, 1000);
                    }
                };

                wait();
            });
        },

        async getGasEstimateFromUnFreeze(LnBridge, txId) {
            try {
                const { utils } = lnrJSConnector;

                if (!txId) {
                    throw new Error("invalid hash");
                }

                let gasEstimate = await LnBridge.contract.estimateGas.unfreeze(
                    txId
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.unfreeze);
            }
        },

        async getPendingProcess(LnBridge) {
            let count = 0;

            return new Promise((resolve, reject) => {
                const wait = async () => {
                    //超时退出
                    // if (count > 60) {
                    //     reject({
                    //         code: 6100006,
                    //         message: "No valid LINA was found"
                    //     });
                    // }

                    let processArray = await LnBridge.getPendingProcess(
                        this.walletAddress
                    );
                    count++;

                    //过滤空
                    processArray = processArray.filter(item => item != "");

                    console.log(
                        processArray,
                        this.freezeSuccessHash,
                        count,
                        "getPendingProcess"
                    );

                    //有等待数据
                    if (processArray?.length > 0) {
                        //有冻结hash
                        if (this.freezeSuccessHash) {
                            //冻结hash在解冻组内
                            if (processArray.includes(this.freezeSuccessHash)) {
                                resolve(processArray);
                                return;
                            }
                        } else {
                            resolve(processArray);
                            return;
                        }
                    }

                    this.waitPendingProcess && setTimeout(wait, 3000);

                    // if (this.waitProcessArray.length > 1) {
                    //     if (!processArray.includes(this.freezeSuccessHash)) {
                    //         this.waitPendingProcess && setTimeout(wait, 3000);
                    //     } else {
                    //         resolve(processArray);
                    //     }
                    // } else {
                    //     //没有之前的锁定记录
                    //     if (!processArray || processArray.length < 1) {
                    //         reject({
                    //             code: 6100006,
                    //             message: "No valid LINA was found"
                    //         });
                    //     } else {
                    //         resolve(processArray);
                    //     }
                    // }
                };

                wait();
            });
        },

        //回到默认状态
        async setDefaultTab() {
            this.waitProcessArray = [];
            this.confirmTransactionStep = -1;
            this.swapNumber = null;
            this.waitPendingProcess = false;
            this.freezeSuccessHash = "";
            this.processing = false;
            this.targetNetworkId = "";
            this.sourceWalletType = "";
            this.sourceWalletAddress = "";
            this.frozenBalance = null;
            this.chainChangedStatus = false;
            this.confirmTransactionChainChanging = false;
            this.confirmTransactionHash = "";
            this.confirmTransactionNetworkId = "";
            this.confirmTransactionStatus = false;
            this.actionTabs = "m0";
            this.sourceNetworkId = "";
            await this.getFrozenBalance();
        },

        //点击最大
        clickMaxAmount() {
            this.activeItemBtn = 0;
            this.swapNumber = _.floor(
                this.currentSelectCurrency.avaliable,
                DECIMAL_PRECISION
            );

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
                            margin: 8px 55px 84px;
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

                        .swapInputBox {
                            width: 400px;
                            border-radius: 8px;
                            border: 1px solid #deddde;
                            transition: $animete-time linear;
                            box-shadow: 0 0 0 #deddde;
                            margin-top: 64px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            position: relative;
                            margin-bottom: 24px;

                            &:hover,
                            &.active {
                                box-shadow: 0 2px 12px #deddde;
                                border-color: white;
                            }
                            &.error {
                                border-color: #df434c;
                            }

                            .iconBox {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                .icon {
                                    margin: 24px 0 16px;
                                    width: 64px;
                                    height: 64px;
                                    border-radius: 100%;
                                    margin img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }

                                .name {
                                    font-family: Gilroy-Bold;
                                    text-align: center;
                                    font-size: 24px;
                                    line-height: 32px;
                                    letter-spacing: 0;
                                }
                            }

                            .divider {
                                margin-top: 24px;
                                width: 100%;
                                height: 1px;
                                background-color: #e5e5e5;
                            }

                            .inputBox {
                                display: flex;
                                padding: 24px;
                                width: 100%;
                                align-items: center;

                                .label {
                                    .amount {
                                        font-family: Gilroy-Bold;
                                        font-size: 16px;
                                        font-weight: bold;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.5;
                                        letter-spacing: normal;
                                        color: #5a575c;
                                    }

                                    .max {
                                        font-family: Gilroy-Bold;
                                        font-size: 12px;
                                        font-weight: bold;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.33;
                                        letter-spacing: 1.5px;
                                        text-align: center;
                                        color: #1a38f8;
                                        opacity: 0.2;
                                        cursor: pointer;

                                        &:hover {
                                            opacity: 1;
                                        }

                                        &.active {
                                            opacity: 1;
                                        }
                                    }
                                }

                                .input {
                                    flex: 1;
                                    border: none;
                                    box-shadow: none;

                                    .ivu-input-number-handler-wrap {
                                        display: none;
                                    }

                                    .ivu-input-number-input {
                                        text-align: right;
                                        font-family: Gilroy-bold;
                                        font-size: 32px;
                                        font-weight: bold;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.25;
                                        letter-spacing: normal;
                                        color: #5a575c;

                                        &::placeholder {
                                            color: #99999a;
                                        }
                                    }
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

@media only screen and (max-width: $max-phone-width) {
    #swap {
        height: 100%;
        .actionTabs {
            height: 100%;
            .ivu-tabs-content {
                height: 100%;
                .ivu-tabs-tabpane {
                    width: 100%;
                    height: 100% !important;
                    min-height: 516px;
                    .swapBox {
                        padding-top: 24px;
                        .actionBody {
                            height: calc(100% - 48px);
                            overflow-y: auto;
                            padding: 20px 22px 44px;
                            margin: 0 10px;

                            .someWrongMobile {
                                border-radius: 8px;
                                background-color: rgba(#df434c, 0.05);
                                padding: 12px 16px;
                                display: flex;
                                align-items: center;
                                margin-bottom: 16px;
                                margin-top: -20px;

                                .errIcon {
                                    margin-right: 12px;
                                    width: 24px;
                                    height: 24px;
                                }

                                .errMessage {
                                    font-family: Gilroy-Medium;
                                    font-size: 12px;
                                    font-weight: 500;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.33;
                                    letter-spacing: normal;
                                    color: #df434c;
                                }
                            }

                            .swapInputBox {
                                width: 100%;
                                margin-top: 0;
                                margin-bottom: 16px;

                                .iconBox {
                                    .avaliable {
                                        font-family: Gilroy-Medium;
                                        font-size: 12px;
                                        font-weight: 500;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.33;
                                        letter-spacing: normal;
                                        text-align: center;
                                        color: #99999a;
                                    }
                                }

                                .inputBox {
                                    padding: 16px;

                                    .label {
                                        flex: 1;
                                        .amount {
                                            font-family: Gilroy-Medium;
                                            font-size: 12px;
                                            font-weight: 500;
                                            line-height: 1.33;
                                            color: #99999a;
                                        }
                                        .input {
                                            width: 100%;
                                            .ivu-input-number-input {
                                                padding: 0;
                                                text-align: left;
                                                font-size: 16px;
                                                line-height: 1.5;
                                            }
                                        }
                                    }

                                    .max {
                                        margin-left: 16px;
                                        border-radius: 8px;
                                        border: solid 1px #e5e5e5;
                                        padding: 14px 24px;
                                        font-family: Gilroy-Bold;
                                        font-size: 10px;
                                        font-weight: bold;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.6;
                                        letter-spacing: 1.25px;
                                        text-align: center;
                                        color: #1a38f8;
                                    }
                                }
                            }
                        }
                        .swapBtn {
                            height: 48px;
                            font-size: 16px;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.5;
                            letter-spacing: 2px;
                        }
                    }
                }
            }
        }
    }
}
</style>
