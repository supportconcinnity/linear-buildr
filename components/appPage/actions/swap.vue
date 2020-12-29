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
                                    <img
                                        :src="currentSelectCurrency.img"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div class="midle">
                                <div class="p_1">
                                    {{ currentSelectCurrency.name }}
                                </div>
                                <span
                                    class="p_2"
                                    :class="{ active: activeItemBtn == 0 }"
                                    @click="clickMaxAmount"
                                >
                                    MAX
                                </span>
                            </div>
                            <div class="value">
                                <div class="price">
                                    <div class="number">
                                        <div class="inputRect">
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="someWrong" v-show="errors.amountMsg">
                            {{ errors.amountMsg }}
                        </div>
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
    DECIMAL_PRECISION
} from "@/assets/linearLibrary/linearTools/constants/process";
import { lnr } from "@/assets/linearLibrary/linearTools/request/linearData/transactionData";

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
            //     "Confirm Swapping on BSC",
            //     "Confirm Swapping on Ethereum"
            // ], //等待交易进度组
            waitProcessFlow: Function, //flow闭包函数

            freezeSuccessHash: "", //冻结hash
            waitPendingProcess: false, //等待查询

            chainChangedStatus: false, //是否已经切换网络或链,false未切换,true已切换
            autoChainChange: false, //是否自动切换链

            floor: _.floor,

            frozenBalance: 0, //已经冻结的数量

            DECIMAL_PRECISION,

            errors: {
                amountMsg: ""
            },

            confirmTransactionChainChanging: false, //当前是否在切链步骤
            sourNetworkId: "", //原始网络ID
            targetNetworkId: "", //目标网络ID
            sourceWalletType: "", //原始钱包类型
            sourceWalletAddress: "", //原始钱包地址

            chainChangeTokenFromUnfreeze: "", //解冻切换钱包事件监听id
            chainChangeTokenFromSubscribe: "", //切换钱包事件监听id
            walletChangeTokenFromSubscribe: "" //切换钱包地址时间监听id
        };
    },
    async created() {
        //监听链切换
        this.chainChangeTokenFromSubscribe = this.$pub.subscribe(
            "onWalletChainChange",
            async () => {
                if (this.actionTabs == "m0") {
                    console.log("onWalletChainChange");
                    await this.getFrozenBalance();
                }
            }
        );

        this.walletChangeTokenFromSubscribe = this.$pub.subscribe(
            "onWalletAccountChange",
            async () => {
                if (this.actionTabs == "m0") {
                    console.log("onWalletAccountChange");
                    await this.getFrozenBalance();
                }
            }
        );

        await this.getFrozenBalance();
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
        walletType() {}
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

                    //清空之前数据
                    this.waitProcessArray = [];
                    this.confirmTransactionStep = 0;
                    this.waitProcessFlow = null;

                    let LnProxy, LnBridge;
                    if (this.isEthereumNetwork) {
                        LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                        LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                        BUILD_PROCESS_SETUP.FREEZE =
                            BUILD_PROCESS_SETUP.SWAP + " Ethereum";
                        BUILD_PROCESS_SETUP.UNFREEZE =
                            BUILD_PROCESS_SETUP.SWAP + " BSC";
                    } else if (this.isBinanceNetwork) {
                        LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                        LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                        BUILD_PROCESS_SETUP.FREEZE =
                            BUILD_PROCESS_SETUP.SWAP + " BSC";
                        BUILD_PROCESS_SETUP.UNFREEZE =
                            BUILD_PROCESS_SETUP.SWAP + " Ethereum";
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

                    //如果新输入的大于已冻结的
                    if (this.swapNumber > this.frozenBalance) {
                        this.waitProcessArray.push(BUILD_PROCESS_SETUP.FREEZE);
                    }

                    this.waitProcessArray.push(BUILD_PROCESS_SETUP.UNFREEZE);

                    //记录原始钱包类型
                    this.sourceWalletType = this.walletType;

                    //记录目标网络id
                    this.targetNetworkId = getOtherNetworks(
                        this.walletNetworkId
                    ).join();

                    //记录原始钱包地址
                    this.sourceWalletAddress = this.walletAddress.toLocaleLowerCase();

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
                        BUILD_PROCESS_SETUP.APPROVE
                    ) {
                        await this.startApproveContract(
                            n2bn(Number.MAX_SAFE_INTEGER)
                        );
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.FREEZE
                    ) {
                        const swapNumber = _.floor(
                            this.swapNumber - this.frozenBalance,
                            DECIMAL_PRECISION
                        );
                        await this.startFreezeContract(n2bn(swapNumber));
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.UNFREEZE
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
                } finally {
                    // if (this.autoChainChange) {
                    //     //切换回原始网络
                    //     await selectedWallet(this.sourceWalletType);
                    //     this.sourceWalletType = "";
                    // }
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
                    type: BUILD_PROCESS_SETUP.APPROVE,
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

            let LnBridge, gasPrice, SETUP;
            if (this.isEthereumNetwork) {
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                gasPrice = this.$store.state?.gasDetailsETH?.price;
                SETUP = " Ethereum";
            } else if (this.isBinanceNetwork) {
                LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                gasPrice = this.$store.state?.gasDetailsBSC?.price;
                SETUP = " BSC";
            }

            const { utils } = lnrJSConnector;

            const transactionSettings = {
                gasPrice,
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
                    type: BUILD_PROCESS_SETUP.FREEZE,
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
            let targetWalletType,
                walletStatus,
                sourceWallet = this.walletAddress.toLocaleLowerCase();
            if (this.isEthereumNetwork) {
                targetWalletType = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
            } else if (this.isBinanceNetwork) {
                targetWalletType = SUPPORTED_WALLETS_MAP.METAMASK;
            }

            //原始网络Id,不等于目标网络Id当前情况下,等待用户切换钱包或网络
            if (
                this.walletNetworkId != this.targetNetworkId &&
                this.walletType == this.sourceWalletType
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

            // let walletStatus;
            // if (this.autoChainChange) {
            //     //切换钱包
            //     console.log("开始自动切换钱包");
            //     walletStatus = await selectedWallet(targetWalletType);
            //     console.log("自动切换钱包完成");
            // } else {
            //     //监听手动切换事件
            //     this.chainChangeTokenFromUnfreeze = this.$pub.subscribe(
            //         "onWalletChainChange",
            //         () => {
            //             console.log(
            //                 "onWalletChainChange startUnFreezeContract"
            //             );
            //             this.chainChangedStatus = true;
            //         }
            //     );

            //     console.log("开始手动切换metamask链");
            //     walletStatus = await this.waitChainChange();
            //     console.log("手动切换metamask链完成");
            // }

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
                let LnBridge, gasPrice, SETUP;
                if (this.isEthereumNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                    gasPrice = this.$store.state?.gasDetailsETH?.price;
                    SETUP = " Ethereum";
                } else if (this.isBinanceNetwork) {
                    LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
                    gasPrice = this.$store.state?.gasDetailsBSC?.price;
                    SETUP = " BSC";
                }

                console.log(`等待 [${targetWalletType}] 获取锁定hash`);
                this.waitPendingProcess = true;
                const processArray = await this.getPendingProcess(LnBridge);
                console.log(
                    `[${targetWalletType}] 获取锁定hash完成`,
                    processArray
                );

                const { utils } = lnrJSConnector;

                const transactionSettings = {
                    gasPrice,
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
                            type: BUILD_PROCESS_SETUP.UNFREEZE,
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

                    console.log(processArray, count, "getPendingProcess");

                    //过滤空
                    processArray = processArray.filter(item => item != "");

                    if (this.waitProcessArray.length > 1) {
                        if (!processArray.includes(this.freezeSuccessHash)) {
                            this.waitPendingProcess && setTimeout(wait, 3000);
                            return;
                        }
                        resolve(processArray);
                    } else {
                        //没有之前的锁定记录
                        if (!processArray || processArray.length < 1) {
                            reject({
                                code: 6100006,
                                message: "No valid LINA was found"
                            });
                        }
                        resolve(processArray);
                    }
                };

                wait();
            });
        },

        //回到默认状态
        async setDefaultTab() {
            this.waitProcessArray = [];
            this.confirmTransactionStep = 0;
            this.swapNumber = null;
            this.waitPendingProcess = false;
            this.freezeSuccessHash = "";
            this.processing = false;
            this.sourNetworkId = "";
            this.targetNetworkId = "";
            this.sourceWalletType = "";
            this.sourceWalletAddress = "";
            this.frozenBalance = null;
            this.chainChangedStatus = false;
            this.confirmTransactionChainChanging = false;
            this.confirmTransactionHash = "";
            this.confirmTransactionNetworkId = false;
            this.confirmTransactionStatus = false;
            this.actionTabs = "m0";
            await this.getFrozenBalance();

            // if (this.autoChainChange) {
            //     //切换回原始网络
            //     this.sourceWalletType &&
            //         (await selectedWallet(this.sourceWalletType));
            //     await this.getFrozenBalance();
            // }
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
                            flex-direction: column;
                            align-items: flex-start;
                            margin-right: 20px;
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

                                &.active {
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
