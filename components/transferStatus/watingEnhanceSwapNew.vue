<!-- swap多步 -->

<template>
    <div id="watingEnhanceSwapNew">
        <div class="close" @click.stop="$emit('close')">
            <img v-if="isMobile" src="@/static/icon-cancel.svg" />
            <closeSvg v-else></closeSvg>
        </div>

        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0" class="checkPage">
                <div class="tabContent">
                    <div class="contentTitle">
                        …We are preparing the contract...
                    </div>

                    <div class="contentIcon">
                        <img
                            src="@/static/transferProgress/swap_check_icon.svg"
                            alt=""
                        />
                    </div>

                    <div class="contentStep">
                        <div class="stepBox">
                            <div
                                v-for="(item, index) in checkStatus.stepArray"
                                :key="index"
                                class="stepItem"
                            >
                                <!-- 垂直连接线 -->
                                <div
                                    class="line"
                                    v-if="
                                        index < checkStatus.stepArray.length - 1
                                    "
                                ></div>

                                <!-- index大于当前进度显示默认 -->
                                <img
                                    :key="Math.random()"
                                    class="stepIcon"
                                    v-if="index > checkStatus.stepIndex"
                                    src="@/static/transferProgress/default.svg"
                                />

                                <!-- index小于当前进度 -->
                                <template
                                    v-else-if="index < checkStatus.stepIndex"
                                >
                                    <!-- 有错误显示灰色完成 -->
                                    <img
                                        :key="Math.random()"
                                        class="stepIcon"
                                        v-if="checkStatus.stepError"
                                        src="@/static/transferProgress/completed_disable.svg"
                                    />

                                    <!-- 没错误显示正确完成 -->
                                    <img
                                        :key="Math.random()"
                                        class="stepIcon"
                                        v-else
                                        src="@/static/transferProgress/completed.svg"
                                    />
                                </template>

                                <!-- index等于当前进度 -->
                                <template v-else>
                                    <!-- 最后一步未安装钱包 -->
                                    <img
                                        :key="Math.random()"
                                        class="stepIcon"
                                        v-if="
                                            checkStatus.stepIndex ==
                                                checkStatus.stepArray.length -
                                                    1 &&
                                                checkStatus.stepType == 2
                                        "
                                        src="@/static/transferProgress/option.svg"
                                    />

                                    <!-- 有错误显示失败 -->
                                    <img
                                        :key="Math.random()"
                                        class="stepIcon"
                                        v-else-if="checkStatus.stepError"
                                        src="@/static/transferProgress/failed.svg"
                                    />

                                    <!-- 没有错误显示加载 -->
                                    <img
                                        :key="Math.random()"
                                        class="stepIcon loading"
                                        v-else
                                        src="@/static/transferProgress/loading.svg"
                                    />
                                </template>

                                <div
                                    class="stepInfo"
                                    :class="{
                                        active: checkStatus.stepIndex == index
                                    }"
                                >
                                    {{ item }}

                                    <div
                                        v-if="
                                            index == checkStatus.bscStepIndx &&
                                                checkStatus.bscStepIndx ==
                                                    checkStatus.stepIndex
                                        "
                                        class="subStep"
                                    >
                                        <div
                                            class="subItem"
                                            :class="{
                                                active:
                                                    checkStatus.stepIndex ==
                                                    index
                                            }"
                                            v-for="(subitem,
                                            subIndex) in checkStatus.bscSubStep"
                                            :key="subIndex"
                                        >
                                            <div class="oval"></div>
                                            <div class="subStepInfo">
                                                {{ subitem }}
                                            </div>
                                        </div>

                                        <div class="subStepErrorBox">
                                            <div
                                                v-if="
                                                    checkStatus.stepType == 3 &&
                                                        checkStatus.bscstepType ==
                                                            0
                                                "
                                                class="subStepErrorItem"
                                                @click="subStepClickHandle(0)"
                                            >
                                                Get some BNB on your wallet
                                                <img
                                                    :key="Math.random()"
                                                    class="errorIcon"
                                                    src="@/static/transferProgress/arrow_right_error.svg"
                                                />
                                            </div>

                                            <template
                                                v-if="
                                                    checkStatus.stepType == 3 &&
                                                        checkStatus.bscstepType ==
                                                            1
                                                "
                                            >
                                                <div
                                                    class="subStepErrorItem"
                                                    @click="
                                                        subStepClickHandle(1)
                                                    "
                                                >
                                                    1. Please get some ETH on
                                                    your wallet
                                                    <img
                                                        :key="Math.random()"
                                                        class="errorIcon"
                                                        src="@/static/transferProgress/arrow_right_error.svg"
                                                    />
                                                </div>

                                                <div
                                                    class="subStepErrorItem"
                                                    @click="
                                                        subStepClickHandle(0)
                                                    "
                                                >
                                                    2. Please get some BNB on
                                                    your wallet
                                                    <img
                                                        :key="Math.random()"
                                                        class="errorIcon"
                                                        src="@/static/transferProgress/arrow_right_error.svg"
                                                    />
                                                </div>
                                            </template>
                                        </div>
                                    </div>

                                    <!-- 检查钱包插件 -->
                                    <div
                                        class="stepJump"
                                        v-if="
                                            index == checkStatus.stepIndex &&
                                                checkStatus.stepIndex ==
                                                    checkStatus.stepArray
                                                        .length -
                                                        1 &&
                                                checkStatus.stepType == 2
                                        "
                                    >
                                        <div
                                            class="jumpInfo"
                                            @click="actionTabs = 'm1'"
                                        >
                                            I have Binance chain on Metamask
                                            <img
                                                :key="Math.random()"
                                                class="jumpIcon"
                                                src="@/static/transferProgress/arrow_right active.svg"
                                            />
                                        </div>

                                        <div
                                            class="jumpInfo"
                                            @click="stepClickHandle"
                                        >
                                            Install Binance chain wallet
                                            <img
                                                :key="Math.random()"
                                                class="jumpIcon"
                                                src="@/static/transferProgress/arrow_right active.svg"
                                            />
                                        </div>
                                    </div>

                                    <!-- 当前错误信息 -->
                                    <div
                                        v-if="
                                            checkStatus.stepIndex == index &&
                                                checkStatus.stepError &&
                                                checkStatus.bscStepIndx != index
                                        "
                                        class="stepError"
                                        :class="{
                                            clickable: checkStatus.stepType == 1
                                        }"
                                        @click="stepClickHandle"
                                    >
                                        {{ checkStatus.stepError }}

                                        <!-- 可点击错误icon -->
                                        <img
                                            :key="Math.random()"
                                            v-if="checkStatus.stepType == 1"
                                            class="errorIcon"
                                            src="@/static/transferProgress/arrow_right_error.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="checkStatus.stepType == 3"
                    class="refreshBtn"
                    @click="checkPrepare(checkStatus.stepIndex)"
                >
                    refresh
                    <img src="@/static/transferProgress/refresh.svg" alt="" />
                </div>
            </TabPane>

            <TabPane name="m1" class="transactionPage">2 </TabPane>
        </Tabs>
    </div>
</template>

<script>
import _ from "lodash";
import { openBlockchainBrowser } from "@/common/utils";
import closeSvg from "@/components/svg/close";
import {
    SUPPORTED_WALLETS_MAP,
    isEthereumNetwork,
    isBinanceNetwork,
    getOtherNetworks,
    isMainnetNetwork,
    WALLET_EXTENSIONS,
    DEFAULT_GAS_LIMIT,
    bufferGasLimit,
    unFormatGasPrice,
    getBinanceNetwork,
    getEthereumNetwork,
    BINANCE_TOKEN_ADDRESS,
    isTestnetNetwork
} from "@/assets/linearLibrary/linearTools/network";
import api from "@/api";
import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import { bnSub, n2bn } from "@/common/bnCalc";
import { providers } from "ethers";
import { LinearJs } from "@/assets/linearLibrary/linearJs";

export default {
    name: "watingEnhanceSwapNew",
    components: {
        closeSvg
    },
    props: {
        swapNumber: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            openBlockchainBrowser,
            SUPPORTED_WALLETS_MAP,
            isEthereumNetwork,
            isBinanceNetwork,

            actionTabs: "m0", //m0检查页,m1交易页

            checkStatus: {
                stepIndex: 0, //当前检查步骤
                stepError: "", //错误信息
                stepType: -1, //步骤类型,-1默认,0显示错误文本,1余额不足,2未安装钱包插件,3bsc子步骤

                stepArray: [],

                bscStepIndx: 0,
                bscSubStep: ["BNB Tokens"],
                bscstepType: -1 //子步骤类型,-1默认,0只需要购买bnb,1需要购买eth再买bnb
            },

            targetWalletAddress: "",
            targetNetworkId: "",

            sourceGasPrice: "",
            targetGasPrice: ""
        };
    },
    watch: {
        currentWalletType() {},
        hasBinanceWallet() {},
        isMobile() {},
        walletAddress() {},
        walletNetworkId() {}
    },
    computed: {
        currentWalletType() {
            return this.$store.state?.walletType;
        },

        hasBinanceWallet() {
            return window.BinanceChain;
        },

        walletNetworkId() {
            return this.$store.state?.walletNetworkId;
        },

        isMobile() {
            return this.$store.state?.isMobile;
        },
        walletAddress() {
            return this.$store.state?.wallet?.address;
        }
    },
    created() {
        this.initStep();
    },
    mounted() {
        this.checkPrepare();
    },
    methods: {
        //初始化进度信息
        initStep() {
            this.checkStatus.stepArray = [];

            this.targetNetworkId = getOtherNetworks(
                this.walletNetworkId
            ).join();
            const sourceStep = isEthereumNetwork(this.walletNetworkId)
                ? "Checking the amount of ETH on Metamask"
                : isBinanceNetwork(this.walletNetworkId)
                ? "Checking the amount of BNB on Metamask / Binance Chain Wallet"
                : "";
            const targetStep = isEthereumNetwork(this.targetNetworkId)
                ? "Checking the amount of ETH on Metamask"
                : isBinanceNetwork(this.targetNetworkId)
                ? "Checking the amount of BNB on Metamask / Binance Chain Wallet"
                : "";
            const extention = isEthereumNetwork(this.targetNetworkId)
                ? "Checking MetaMask Extention"
                : isBinanceNetwork(this.targetNetworkId)
                ? "Checking Binance Chain Wallet Extention"
                : "";

            this.checkStatus.bscStepIndx = isBinanceNetwork(
                this.walletNetworkId
            )
                ? 0
                : 1;

            this.checkStatus.stepArray.push(sourceStep);
            this.checkStatus.stepArray.push(targetStep);
            this.checkStatus.stepArray.push(extention);
        },

        //检查准备工作
        async checkPrepare(currentStep = 0) {
            try {
                this.checkStatus.stepIndex = currentStep;
                this.checkStatus.stepError = "";
                this.checkStatus.bscSubStep = ["BNB Tokens"];
                this.checkStatus.bscstepType = -1;
                this.checkStatus.stepType = -1;

                //记录gas price
                this.sourceGasPrice =
                    this.$store.state?.sourceGasDetails?.price ||
                    50 * 1000000000;
                this.targetGasPrice =
                    this.$store.state?.targetGasDetails?.price ||
                    50 * 1000000000;

                let sourceCurrency, targetCurrency;

                if (isEthereumNetwork(this.walletNetworkId)) {
                    sourceCurrency = "ETH";
                    targetCurrency = "BNB";
                } else if (isBinanceNetwork(this.walletNetworkId)) {
                    sourceCurrency = "BNB";
                    targetCurrency = "ETH";
                }

                if (currentStep < 1) {
                    //原始网络余额
                    const sourceBalance = await lnrJSConnector.provider.getBalance(
                        this.walletAddress
                    );
                    const freezeFee = await this.getFreezeFee();
                    console.log(freezeFee, "freezeFee");
                    console.log(sourceBalance / 1e18, "sourceBalance");

                    if (sourceBalance.lt(n2bn(freezeFee))) {
                        this.checkStatus.stepType = 1;
                        this.checkStatus.stepError = `Get some ${sourceCurrency} on your wallet`;
                        return;
                    }
                    this.checkStatus.stepIndex++;
                }

                if (currentStep < 2) {
                    //目标网络余额

                    /* const providerObject = this.getProviderObject(
                    this.targetNetworkId
                );
                if (providerObject) {
                    await this.connectToTargetWallet(providerObject);
                    //没有冻结lina的签名,无法预先评估gas limit
                    unfreezeFee = await this.getUnfreezeFee();
                } else {
                    const { result } = await api.getWalletBalance(
                        this.walletAddress,
                        this.targetNetworkId
                    );

                    targetBalance = n2bn(result / 1e18);
                    unfreezeFee = freezeFee;
                    // unfreezeFee = 0.01;
                } */

                    let targetBalance, unfreezeFee;

                    unfreezeFee = isEthereumNetwork(this.targetNetworkId)
                        ? 0.1
                        : 0.01;
                    const { result } = await api.getWalletBalance(
                        this.walletAddress,
                        this.targetNetworkId
                    );
                    targetBalance = n2bn(result / 1e18);
                    console.log(unfreezeFee, "unfreezeFee");
                    console.log(targetBalance / 1e18, "targetBalance");

                    if (targetBalance.lt(n2bn(unfreezeFee))) {
                        if (isBinanceNetwork(this.targetNetworkId)) {
                            this.checkStatus.bscSubStep.push("ETH Tokens");

                            const ethContractAddress =
                                BINANCE_TOKEN_ADDRESS[this.targetNetworkId].ETH;
                            const { result } = await api.getTokenBalance(
                                this.walletAddress,
                                ethContractAddress,
                                this.targetNetworkId
                            );
                            const ethBalance = n2bn(result / 1e18);
                            // const ethBalance = n2bn("20");
                            console.log(ethBalance / 1e18, "ethBalance");

                            //bnb余额和eth余额差值
                            const difference = bnSub(
                                n2bn(unfreezeFee),
                                targetBalance
                            );

                            //有足够eth
                            if (ethBalance.gte(difference)) {
                                this.checkStatus.bscstepType = 0;
                            } else {
                                //没有足够eth
                                this.checkStatus.bscstepType = 1;
                            }

                            this.checkStatus.stepType = 3;
                            this.checkStatus.stepError = "error";
                            return;
                        }

                        this.checkStatus.stepType = 1;
                        this.checkStatus.stepError = `Get some ${targetCurrency} on your wallet`;
                        return;
                    }
                    this.checkStatus.stepIndex++;
                }

                if (currentStep < 3) {
                    //连接目标钱包
                    await this.connectToTargetWallet();

                    if (this.checkStatus.stepType == -1) {
                        this.checkStatus.stepIndex++;
                        // this.actionTabs = "m1";
                    }
                }
            } catch (error) {
                //自定义错误
                if (
                    _.has(error, "code") &&
                    [100001, 100002, 100003, 100004].includes(error.code)
                ) {
                    this.checkStatus.stepError = error.message;
                } else {
                    console.log(error, "checkPrepare error");
                    //通用错误
                    this.checkStatus.stepError =
                        "Something went wrong, please try again.";
                }

                this.checkStatus.stepType = 0;
            }
        },

        async connectToTargetWallet(provider = null) {
            try {
                provider == null &&
                    (provider = await this.getProviderObject(
                        this.targetNetworkId
                    ));

                //钱包注入对象
                if (provider) {
                    const [walletAddress] = await provider.enable();

                    let network;
                    if (isBinanceNetwork(this.targetNetworkId)) {
                        network = await getBinanceNetwork();
                    } else if (isEthereumNetwork(this.targetNetworkId)) {
                        network = await getEthereumNetwork();
                    }
                    const { networkId } = network;

                    //目标网络不一致
                    if (
                        this.checkStatus.stepIndex == 2 &&
                        networkId != this.targetNetworkId
                    ) {
                        throw {
                            code: 100004,
                            message:
                                "The network is not correct. Please switch to a valid network"
                        };
                    }

                    //目标钱包不一致
                    this.targetWalletAddress = walletAddress.toLowerCase();
                    if (
                        this.checkStatus.stepIndex == 2 &&
                        this.targetWalletAddress !=
                            this.walletAddress.toLowerCase()
                    ) {
                        throw {
                            code: 100003,
                            message:
                                "The destination wallet address is inconsistent"
                        };
                    }
                } else {
                    //目标为以太网
                    if (isEthereumNetwork(this.targetNetworkId)) {
                        throw {
                            code: 100002,
                            message: "Not Found Wallet Extention"
                        };
                    } else if (isBinanceNetwork(this.targetNetworkId)) {
                        //目标为BSC
                        this.checkStatus.stepType = 2;
                    }
                }
            } catch (error) {
                throw error;
            }
        },

        //获取钱包
        getProviderObject(networkId) {
            //钱包注入对象名称
            const injection = isEthereumNetwork(networkId)
                ? "ethereum"
                : isBinanceNetwork(networkId)
                ? "BinanceChain"
                : null;

            return window[injection];
        },

        //获取解冻合约
        getTargetContract() {
            let type, contract;
            if (isEthereumNetwork(this.targetNetworkId)) {
                type = SUPPORTED_WALLETS_MAP.METAMASK;
                contract = "LnErc20Bridge";
            } else if (isBinanceNetwork(this.targetNetworkId)) {
                type = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
                contract = "LnBep20Bridge";
            }

            const signer = new LinearJs.signers[type]();
            this.targetContract = new LinearJs({
                networkId: Number(this.targetNetworkId),
                signer
            });

            return this.targetContract[contract];
        },

        async getFreezeFee() {
            let LnBridge;
            if (isEthereumNetwork(this.walletNetworkId)) {
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
            } else if (isBinanceNetwork(this.walletNetworkId)) {
                LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
            }

            const gasLimit = await this.getGasEstimateFromFreeze(
                LnBridge,
                n2bn(this.swapNumber)
            );

            const fee =
                (unFormatGasPrice(this.sourceGasPrice) * gasLimit) / 1000000000;

            return fee;
        },

        async getGasEstimateFromFreeze(LnBridge, swapNumber) {
            try {
                if (
                    swapNumber.lte(n2bn("0")) //小于等于0
                ) {
                    throw new Error("invalid freezeAmount");
                }

                let gasEstimate = await LnBridge.contract.estimateGas.freeze(
                    swapNumber
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.freeze);
            }
        },

        async getUnfreezeFee() {
            const LnBridge = await this.getTargetContract();
            const gasLimit = await this.getGasEstimateFromUnFreeze(
                LnBridge,
                n2bn(this.swapNumber)
            );

            const fee =
                (unFormatGasPrice(this.targetGasPrice) * gasLimit) / 1000000000;

            return fee;
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

        //步骤可点击处理
        stepClickHandle() {
            //余额不足
            if (this.checkStatus.stepType == 1) {
                const urls = {
                    1: "https://metamask.io/",
                    3: "https://faucet.metamask.io/",
                    56: "https://binance.org/faucet-smart",
                    97: "https://testnet.binance.org/faucet-smart"
                };
                if (this.checkStatus.stepIndex == 0) {
                    window.open(urls[this.walletNetworkId]);
                } else if (this.checkStatus.stepIndex == 1) {
                    window.open(urls[this.targetNetworkId]);
                }
            } else if (this.checkStatus.stepType == 2) {
                //打开钱包插件安装路径
                window.open(WALLET_EXTENSIONS.BINANCE);
            }
        },

        subStepClickHandle(type) {
            //bsc子步骤
            const urls = {
                56: "https://pancakeswap.finance/", //ETH兑BNB
                97: "https://testnet.binance.org/faucet-smart" //水龙头
            };

            const networkId = isBinanceNetwork(this.walletNetworkId)
                ? this.walletNetworkId
                : this.targetNetworkId;

            if (type === 0) {
                window.open(urls[networkId]);
            } else if (type === 1) {
                let url;
                if (isMainnetNetwork(networkId)) {
                    url = "https://www.binance.org/en/bridge"; //SWAP ETH 到 BSC
                }

                if (isTestnetNetwork(networkId)) {
                    url = urls[networkId];
                }

                window.open(url);
            }
        }
    },
    destroyed() {}
};
</script>

<style lang="scss">
#watingEnhanceSwapNew {
    position: relative;

    .close {
        z-index: 1;
        position: absolute;
        top: 24px;
        right: 24px;
    }

    .actionTabs {
        .ivu-tabs-tabpane {
            &.checkPage {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                .tabContent {
                    .contentTitle {
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

                    .contentIcon {
                        text-align: center;
                        margin: 73px auto 54px;
                        img {
                            width: 160px;
                            height: 160px;
                        }
                    }

                    .contentStep {
                        display: flex;
                        flex-direction: column;
                        justify-items: center;
                        align-items: center;

                        .stepBox {
                            max-width: 270px;
                            .stepItem {
                                display: flex;
                                align-items: flex-start;
                                position: relative;

                                &:not(:last-of-type) {
                                    margin-bottom: 12px;
                                }

                                .line {
                                    position: absolute;
                                    background-color: #e5e5e5;
                                    width: 2px;
                                    height: calc(100% + 12px);
                                    left: 11px;
                                    top: 11px;
                                }

                                .stepIcon {
                                    width: 24px;
                                    height: 24px;
                                    margin-right: 8px;
                                    background: white;
                                    border-radius: 50%;
                                    position: relative;
                                    z-index: 1;
                                    margin-top: -5.5px;

                                    &.loading {
                                        animation: rotate 3s linear infinite;
                                    }
                                }

                                .stepInfo {
                                    font-family: Gilroy-Medium;
                                    font-size: 12px;
                                    font-weight: 500;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.33;
                                    letter-spacing: normal;
                                    color: #99999a;

                                    &.active {
                                        font-family: Gilroy-Bold;
                                        color: #5a575c;
                                    }

                                    .subStep {
                                        margin-top: 8px;
                                        .subItem {
                                            display: flex;
                                            align-items: center;

                                            &.active {
                                                .oval {
                                                    background-color: #5a575c;
                                                }

                                                .subStepInfo {
                                                    font-family: Gilroy-Bold;
                                                    color: #5a575c;
                                                }
                                            }

                                            .oval {
                                                width: 8px;
                                                height: 8px;
                                                background-color: #99999a;
                                                margin-right: 8px;
                                                border-radius: 50%;
                                            }

                                            .subStepInfo {
                                                font-family: Gilroy-Medium;
                                                font-size: 12px;
                                                font-weight: bold;
                                                font-stretch: normal;
                                                font-style: normal;
                                                line-height: 1.33;
                                                letter-spacing: normal;
                                                color: #99999a;
                                            }
                                        }

                                        .subStepErrorBox {
                                            margin-top: 8px;
                                            .subStepErrorItem {
                                                font-family: Gilroy-Medium;
                                                font-size: 12px;
                                                font-weight: 500;
                                                font-stretch: normal;
                                                font-style: normal;
                                                line-height: 1.33;
                                                letter-spacing: normal;
                                                color: #df434c;
                                                display: flex;
                                                align-items: center;
                                                cursor: pointer;

                                                .errorIcon {
                                                    width: 16px;
                                                    height: 16px;
                                                    margin-left: 4px;
                                                }
                                            }
                                        }
                                    }

                                    .stepJump {
                                        .jumpInfo {
                                            font-family: Gilroy-Medium;
                                            font-size: 12px;
                                            font-weight: 500;
                                            font-stretch: normal;
                                            font-style: normal;
                                            line-height: 1.33;
                                            letter-spacing: normal;
                                            color: #1a38f8;
                                            display: flex;
                                            align-items: center;
                                            cursor: pointer;
                                            margin-top: 4px;

                                            .jumpIcon {
                                                width: 16px;
                                                height: 16px;
                                                margin-left: 4px;
                                            }
                                        }
                                    }

                                    .stepError {
                                        margin-top: 4px;
                                        font-family: Gilroy-Medium;
                                        font-size: 12px;
                                        font-weight: 500;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.33;
                                        letter-spacing: normal;
                                        color: #df434c;

                                        display: flex;
                                        align-items: center;

                                        &.clickable {
                                            cursor: pointer;
                                        }

                                        .errorIcon {
                                            width: 16px;
                                            height: 16px;
                                            margin-left: 4px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .refreshBtn {
                    position: absolute;
                    bottom: 40px;
                    font-family: Gilroy-Bold;
                    font-size: 12px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: 1.5px;
                    text-align: center;
                    color: #1a38f8;
                    text-transform: uppercase;

                    cursor: pointer;
                    display: flex;
                    align-items: center;

                    img {
                        width: 16px;
                        height: 16px;
                        margin-left: 4px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: $max-phone-width) {
    #watingEnhanceSwapNew {
        .close {
            img {
                width: 26px;
                height: 26px;
            }
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>
