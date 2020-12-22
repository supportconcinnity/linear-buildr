<template>
    <div id="swap">
        <div class="comingSoon">
            <img class="noticeImg" src="@/static/notice.svg" alt="" />
            <div class="title">Coming Soon</div>
            <div class="context">Stay tuned to our social media</div>
            <div class="socialBox">
                <div class="box" @click="openSocial(0)">
                    <svg
                        enable-background="new 0 0 24 24"
                        height="512"
                        viewBox="0 0 24 24"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267
                         1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247
                          1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"
                            fill="#c1c1c1"
                        />
                    </svg>
                </div>
                <div class="box" @click="openSocial(1)">
                    <svg
                        t="1598342108609"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3371"
                        width="32"
                        height="32"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                        <defs>
                            <style type="text/css"></style>
                        </defs>
                        <path
                            d="M260.096 155.648c0 27.307008-9.899008 50.516992-29.696 69.632-19.796992 19.115008-45.396992 28.672-76.8
                         28.672-30.036992 0-54.612992-9.556992-73.728-28.672-19.115008-19.115008-28.672-42.324992-28.672-69.632 0-28.672
                          9.556992-52.224 28.672-70.656 19.115008-18.432 44.372992-27.648 75.776-27.648 31.403008 0 56.32 9.216 74.752 27.648
                           18.432 18.432 28.331008 41.984 29.696 70.656 0 0 0 0 0 0m-202.752 808.96c0 0 0-632.832 0-632.832 0 0 196.608 0 196.608
                            0 0 0 0 632.832 0 632.832 0 0-196.608 0-196.608 0 0 0 0 0 0 0m313.344-430.08c0-58.708992-1.364992-126.292992-4.096-202.752
                             0 0 169.984 0 169.984 0 0 0 10.24 88.064 10.24 88.064 0 0 4.096 0 4.096 0 40.96-68.267008 105.812992-102.4 194.56-102.4
                              68.267008 0 123.220992 22.868992 164.864 68.608 41.643008 45.739008 62.464 113.664 62.464 203.776 0 0 0 374.784 0 374.784
                               0 0-196.608 0-196.608 0 0 0 0-350.208 0-350.208 0-91.476992-33.451008-137.216-100.352-137.216-47.787008 0-81.236992
                                24.576-100.352 73.728-4.096 8.192-6.144 24.576-6.144 49.152 0 0 0 364.544 0 364.544 0 0-198.656 0-198.656 0 0 0 0-430.08
                                 0-430.08 0 0 0 0 0 0"
                            p-id="3372"
                            fill="#c1c1c1"
                        ></path>
                    </svg>
                </div>
                <div class="box" @click="openSocial(2)">
                    <svg
                        width="24px"
                        height="21px"
                        viewBox="0 0 24 21"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <desc>Created with Lunacy</desc>
                        <g id="medium-icon">
                            <path
                                d="M22.1842 18.4458L24 20.2638L24 20.3241L14.79 20.3241L14.79 20.2638L16.6388 18.4458C16.836 18.2774 16.9305 18.0102 16.8851
                            17.7477L16.8851 6.12578C16.8851 5.63461 16.8851 4.97078 16.9676 4.403L10.755 20.5567L10.6811 20.5567L4.248 5.69489L3.97687 5.04856L3.97687
                             14.7933C3.8998 15.4451 4.00538 16.1061 4.281 16.6973L6.86925 20.2642L6.86925 20.3245L0 20.3245L0 20.2642L2.58825 16.6888C2.862 16.1008
                              2.96325 15.4428 2.892 14.7933L2.892 4.02344C2.934 3.493 2.78137 2.96567 2.4645 2.55033L0.632625 0.0602778L0.632625 0L7.20563 0L12.7106
                               12.5876L17.5583 0L23.9918 0L23.9918 0.0602778L22.1842 2.17117C21.9675 2.33722 21.8595 2.61761 21.9049 2.8945L21.9049 17.7477C21.8565
                                18.0173 21.966 18.291 22.1842 18.4458Z"
                                id="Path"
                                fill="#c1c1c1"
                                stroke="none"
                            />
                        </g>
                    </svg>
                </div>
                <div class="box" @click="openSocial(3)">
                    <svg
                        width="24px"
                        height="20px"
                        viewBox="0 0 24 20"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <desc>Created with Lunacy</desc>
                        <g id="twitter-official">
                            <path
                                d="M7.54753 19.9056C16.6042 19.9056 21.5577 12.2466 21.5577 5.60489C21.5577 5.38728 21.5577 5.17072 21.5434 4.95417C22.507 4.24299
                             23.3388 3.36239 24 2.35359C23.1013 2.76007 22.148 3.02664 21.1718 3.14441C22.1997 2.51629 22.9691 1.52837 23.3366 0.364502C22.37 0.949928
                              21.3126 1.3625 20.2099 1.58441C18.6835 -0.0721782 16.2583 -0.47761 14.294 0.595451C12.3297 1.66851 11.3149 3.95321 11.8186 6.16843C7.85944
                               5.96581 4.17072 4.057 1.67044 0.917038C0.363516 3.21355 1.03102 6.15149 3.19481 7.62642C2.41123 7.6027 1.64473 7.38693 0.96 6.99733L0.96
                                7.06096C0.960616 9.45352 2.61289 11.5142 4.91044 11.9879C4.18551 12.1897 3.4249 12.2192 2.68706 12.0742C3.33212 14.1216 5.18072 15.5242
                                 7.28738 15.5646C5.54376 16.9634 3.38982 17.7227 1.17216 17.7204C0.780385 17.7196 0.388994 17.6954 0 17.6479C2.25181 19.1229 4.87192 19.9053
                                  7.54753 19.9016"
                                id="Path"
                                fill="#c1c1c1"
                                stroke="none"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <!-- <Tabs v-model="actionTabs" class="actionTabs">
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
                                                :min="0"
                                                :max="
                                                    floor(
                                                        currentSelectCurrency.avaliable,
                                                        2
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
        </Tabs> -->
    </div>
</template>

<script>
import _ from "lodash";
import gasEditorSwap from "@/components/gasEditorSwap";
import {
    formatterInput,
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
            formatterInput,
            setCursorRange,
            actionTabs: "m0", //子页(m0默认,m1等待)
            swapNumber: null,

            activeItemBtn: -1,

            confirmTransactionStep: 0, //当前交易进度
            confirmTransactionStatus: false, //当前交易确认状态
            confirmTransactionHash: "", //当前交易hash
            transactionErrMsg: "", //交易错误信息
            processing: false, // 处理状态, 防止重复点击
            waitProcessArray: [], //等待交易进度组
            waitProcessFlow: Function, //flow闭包函数

            freezeSuccessHash: "", //冻结hash
            waitPendingProcess: false, //等待查询
            sourceWalletType: "", //原始钱包类型
            waitChainChangeStatus: false, //等待metamask切换链状态,false为切换,true已切换
            chainChangeToken: "", //等待事件监听id
            autoChainChange: false, //是否自动切换链

            frozenBalance: 0,

            floor: _.floor,

            errors: {
                amountMsg: ""
            }
        };
    },
    async created() {
        // await this.getFrozenBalance();
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
            if (this.isEthereumNetwork) {
                this.sourceWalletType = SUPPORTED_WALLETS_MAP.METAMASK;
            } else if (this.isBinanceNetwork) {
                this.sourceWalletType = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
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

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.FREEZE
                    ) {
                        await this.startFreezeContract(n2bn(this.swapNumber));
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
                            6100006
                        ].includes(error.code)
                    ) {
                        this.transactionErrMsg = error.message;
                    } else {
                        //通用错误
                        this.transactionErrMsg =
                            "Something went wrong, please try again.";
                    }
                } finally {
                    if (this.autoChainChange) {
                        //切换回原始网络
                        await selectedWallet(this.sourceWalletType);
                        this.sourceWalletType = "";
                    }
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
                this.freezeSuccessHash = this.confirmTransactionHash =
                    transaction.hash;

                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.FREEZE,
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

            let swapWalletType,
                sourceWallet = this.walletAddress.toLocaleLowerCase();
            if (this.isEthereumNetwork) {
                swapWalletType = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
            } else if (this.isBinanceNetwork) {
                swapWalletType = SUPPORTED_WALLETS_MAP.METAMASK;
            }

            let walletStatus;
            if (this.autoChainChange) {
                //切换钱包
                console.log("开始自动切换钱包");
                walletStatus = await selectedWallet(swapWalletType);
                console.log("自动切换钱包完成");
            } else {
                //监听手动切换事件
                this.chainChangeToken = this.$pub.subscribe(
                    "onMetamaskChainChange",
                    () => {
                        this.waitChainChangeStatus = true;
                    }
                );

                console.log("开始手动切换metamask链");
                walletStatus = await this.waitChainChange();
                console.log("手动切换metamask链完成");
            }

            //验证钱包是否相同
            if (this.walletAddress.toLocaleLowerCase() != sourceWallet) {
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

                console.log(LnBridge, gasPrice, SETUP);

                console.log(`等待 [${swapWalletType}] 获取锁定hash`);
                this.waitPendingProcess = true;
                const processArray = await this.getPendingProcess(LnBridge);
                console.log(
                    `[${swapWalletType}] 获取锁定hash完成`,
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
                    if (this.waitChainChangeStatus) {
                        this.$pub.unsubscribe(this.chainChangeToken);
                        this.chainChangeToken = "";
                        this.waitChainChangeStatus = false;
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
                return bufferGasLimit(DEFAULT_GAS_LIMIT.unfreez);
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
            this.actionTabs = "m0";
            this.waitProcessArray = [];
            this.confirmTransactionStep = 0;
            this.swapNumber = null;
            this.waitPendingProcess = false;
            this.freezeSuccessHash = "";
            this.processing = false;

            if (this.autoChainChange) {
                //切换回原始网络
                this.sourceWalletType &&
                    (await selectedWallet(this.sourceWalletType));
                // this.getFrozenBalance();
            }
        },

        //点击最大
        clickMaxAmount() {
            this.activeItemBtn = 0;
            this.swapNumber = _.floor(this.currentSelectCurrency.avaliable, 2);

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
        },

        openSocial(slug) {
            switch (slug) {
                case 0:
                    window.open("https://t.me/joinchat/Tb3iAhuMZsyfspxhEWQLvw");
                    break;
                case 1:
                    window.open(
                        "https://www.linkedin.com/company/linearfinance/"
                    );
                    break;
                case 2:
                    window.open("https://medium.com/linear-finance");
                    break;
                case 3:
                    window.open("https://twitter.com/LinearFinance");
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
#swap {
    .comingSoon {
        text-align: center;

        .noticeImg {
            width: 120px;
            margin-top: 246px;
        }
        .title {
            margin-top: 56px;
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
        .context {
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
        .socialBox {
            margin-top: 48px;
            display: flex;
            justify-content: center;

            .box {
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 1px #deddde;
                border-radius: 50%;
                margin: 0 12px 0 12px;
                cursor: pointer;

                svg {
                    width: 16px;
                }

                &:hover {
                    border-color: #1b05a1;

                    svg {
                        path {
                            fill: #1b05a1;
                        }
                    }
                }
            }
        }
    }

    /* .actionTabs {
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
    } */
}
</style>
