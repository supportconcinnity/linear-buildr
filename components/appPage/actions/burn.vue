<template>
    <div id="burn">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="burnBox">
                    <div class="actionBody">
                        <div class="actionTitle">Burn</div>
                        <div class="actionDesc">
                            Burn ℓUSD to unlock staked LINA
                        </div>
                        <div class="actionRate">
                            1 LINA = {{ floor(burnData.LINA2USD, 4) }} ℓUSD
                        </div>
                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.unStakeMsg
                            }"
                            @click="changeFocusItem(0)"
                        >
                            <div class="itemLeft">
                                <div class="itemIcon">
                                    <img src="@/static/LINA_logo.svg" alt="" />
                                </div>
                                <div class="itemType">
                                    <div class="itemTypeTitle">
                                        Unstake LINA
                                        <Tooltip
                                            max-width="305"
                                            placement="top"
                                            class="tip globalInfoStyle"
                                            content="Amount of LINA unstaked may vary due to block times and price fluctuations in pledge tokens."
                                            offset="0 4"
                                        >
                                            <img
                                                src="@/static/info.svg"
                                                alt=""
                                            />
                                        </Tooltip>
                                    </div>
                                    <div
                                        class="itemTypeBtn"
                                        :class="{ active: activeItemBtn == 0 }"
                                        @click="clickUnstakeMax"
                                    >
                                        Max
                                    </div>
                                </div>
                            </div>
                            <div class="itemRight">
                                <div class="inputRect">
                                    <InputNumber
                                        class="input"
                                        ref="itemInput0"
                                        :min="0"
                                        :max="100000000000"
                                        type="text"
                                        v-model="inputData.unStake"
                                        placeholder="0"
                                        @on-change="changeUnStake"
                                        @on-focus="inputFocus(0)"
                                        @on-blur="inputBlur(0)"
                                        :formatter="
                                            value =>
                                                floor(value, DECIMAL_PRECISION)
                                        "
                                    />
                                </div>
                            </div>

                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.unStakeMsg ? '1' : '0'
                                }"
                            >
                                {{ errors.unStakeMsg }}
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
                                    <div class="itemTypeTitle">Burn</div>
                                    <div
                                        class="itemTypeBtn"
                                        :class="{ active: activeItemBtn == 1 }"
                                        @click="clickBurnMax"
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
                                        :max="100000000000"
                                        type="text"
                                        v-model="inputData.amount"
                                        @on-change="changeAmount"
                                        @on-focus="inputFocus(1)"
                                        @on-blur="inputBlur(1)"
                                        placeholder="0"
                                        :formatter="
                                            value =>
                                                floor(value, DECIMAL_PRECISION)
                                        "
                                    />
                                </div>
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
                                        :min="0"
                                        :max="100000000000"
                                        type="text"
                                        v-model="inputData.ratio"
                                        @on-change="changeRatio"
                                        @on-focus="inputFocus(2)"
                                        @on-blur="inputBlur(2)"
                                        :placeholder="
                                            inputData.ratio == 0 ? '0' : 'N/A'
                                        "
                                        :formatter="value => floor(value, 0)"
                                    />
                                </div>
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
                        class="burnBtn"
                        :class="{ disabled: burnDisabled }"
                        @click="clickBurn"
                    >
                        BURN NOW
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
                    @tryAgain="waitTryAgain"
                    @close="setDefaultTab"
                ></watingEnhance>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import _ from "lodash";
import gasEditor from "@/components/gasEditor";
import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";

import {
    findParents,
    removeClass,
    addClass,
    toNonExponential
} from "@/common/utils";

import {
    bufferGasLimit,
    DEFAULT_GAS_LIMIT,
    isBinanceNetwork,
    isEthereumNetwork
} from "@/assets/linearLibrary/linearTools/network";

import {
    formatEtherToNumber,
    formatNumber
} from "@/assets/linearLibrary/linearTools/format";

import { BigNumber, utils } from "ethers";

import {
    bnAdd,
    bnSub,
    bnMul,
    bnDiv,
    bnAdd2N,
    bnSub2N,
    bnMul2N,
    bnDiv2N,
    MAX_DECIMAL_LENGTH,
    n2bn
} from "@/common/bnCalc";

import {
    storeDetailsData,
    getPriceRates,
    getBuildRatio
} from "@/assets/linearLibrary/linearTools/request";

import {
    BUILD_PROCESS_SETUP,
    DECIMAL_PRECISION
} from "@/assets/linearLibrary/linearTools/constants/process";

export default {
    name: "burn",
    data() {
        return {
            DECIMAL_PRECISION,
            toNonExponential, //科学计数法转正常显示 Conversion of scientific counting method to digital text
            formatEtherToNumber,
            floor: _.floor, //向下取整
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误) Subpages(m0 default, m1 waiting)
            processing: false, //burn按钮防抖

            activeItemBtn: -1, //当前激活按钮 0 unstack max, 1 burn max

            confirmTransactionStep: 0, //当前交易进度
            confirmTransactionStatus: false, //当前交易确认状态
            confirmTransactionHash: "", //当前交易hash
            transactionErrMsg: "", //交易错误信息
            waitProcessArray: [], //等待交易进度组
            waitProcessFlow: Function, //flow闭包函数

            //输入框展示数据
            inputData: {
                unStake: null,
                amount: null,
                ratio: 0
            },

            //真实操作数据
            actionDatas: {
                unStake: BigNumber.from("0"),
                amount: BigNumber.from("0"),
                ratio: 0
            },

            errors: {
                unStakeMsg: "",
                amountMsg: "",
                ratioMsg: ""
            },

            burnData: {
                LINA: 0,
                LINA2USD: 0,
                staked: 0,
                lock: 0,
                lUSD: 0,
                debt: 0,
                targetRatio: 500,
                currentRatio: 0
            }
        };
    },
    components: {
        gasEditor
    },
    async created() {
        this.getBurnData(this.walletAddress);
    },
    watch: {
        walletAddress() {},
        isEthereumNetwork() {},
        isBinanceNetwork() {},
        walletNetworkId() {}
    },
    computed: {
        //burn按钮禁止状态
        burnDisabled() {
            return (
                (_.lte(this.inputData.unStake, 0) &&
                    _.lte(this.inputData.amount, 0)) ||
                this.errors.unStakeMsg ||
                this.errors.amountMsg ||
                this.errors.ratioMsg ||
                this.processing ||
                !this.burnData.staked
            );
        },

        walletAddress() {
            return this.$store.state?.wallet?.address;
        },

        isEthereumNetwork() {
            return isEthereumNetwork(this.walletNetworkId);
        },

        isBinanceNetwork() {
            return isBinanceNetwork(this.walletNetworkId);
        },

        walletNetworkId() {
            return this.$store.state?.walletNetworkId;
        }
    },
    methods: {
        //获取数据
        async getBurnData(walletAddress) {
            try {
                this.processing = true;

                let LnProxy;
                if (this.isEthereumNetwork) {
                    LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                } else if (this.isBinanceNetwork) {
                    LnProxy = lnrJSConnector.lnrJS.LnProxyBEP20;
                }

                const {
                    lnrJS: {
                        LnCollateralSystem,
                        lUSD,
                        LnDebtSystem,
                        LnRewardLocker
                    },
                    utils
                } = lnrJSConnector;

                const LINABytes = utils.formatBytes32String("LINA");

                const results = await Promise.all([
                    LnCollateralSystem.userCollateralData(
                        walletAddress,
                        LINABytes
                    ), //LINA抵押数量
                    LnRewardLocker.balanceOf(walletAddress),
                    lUSD.balanceOf(walletAddress), //lUSD余额
                    LnCollateralSystem.GetUserTotalCollateralInUsd(
                        walletAddress
                    ), //个人全部抵押物兑lUSD,用于计算pratio
                    getBuildRatio(), //目标抵押率
                    LnProxy.balanceOf(walletAddress), //LINA余额
                    LnDebtSystem.GetUserDebtBalanceInUsd(walletAddress) //总债务
                ]);

                const [
                    stakingLina,
                    lockLina,
                    amountlUSD,
                    totalCollateralInUsd,
                    buildRatio,
                    avaliableLINA,
                    amountDebt
                ] = results.map(formatEtherToNumber);

                let currentRatioPercent = BigNumber.from("0");

                if (results[3].gt("0") && results[6][0].gt("0")) {
                    currentRatioPercent = bnMul(
                        bnDiv(results[3], results[6][0]),
                        utils.parseEther("100")
                    );
                }

                const targetRatioPercent = 100 / buildRatio; //目标抵押率

                const priceRates = await getPriceRates(["LINA", "lUSD"]);

                const LINAPrice = priceRates.LINA / priceRates.lUSD;
                const LINAPriceBN = bnDiv(priceRates.LINA, priceRates.lUSD);

                this.burnData.LINA = _.floor(avaliableLINA, 2);
                this.burnData.LINABN = results[5];

                this.burnData.LINA2USD = _.floor(LINAPrice, 2);
                this.burnData.LINA2USDBN = LINAPriceBN;

                this.burnData.staked = _.floor(stakingLina, 2);
                this.burnData.stakedBN = results[0];

                this.burnData.lock = _.floor(lockLina, 2);
                this.burnData.lockBN = results[1];

                this.burnData.lUSD = _.floor(amountlUSD, 2);
                this.burnData.lUSDBN = results[2];

                this.burnData.debt = _.floor(amountDebt[0], 2);
                this.burnData.debtBN = results[6][0];

                this.burnData.targetRatio = targetRatioPercent;
                this.burnData.currentRatio = formatEtherToNumber(
                    currentRatioPercent
                );
                this.burnData.currentRatioBN = currentRatioPercent;

                //获取当前抵押率
                this.inputData.ratio = this.burnData.currentRatio;
            } catch (e) {
                console.log(e, "getBurnData err");
            } finally {
                this.processing = false;
            }
        },

        //点击 burn
        async clickBurn() {
            if (!this.burnDisabled) {
                try {
                    this.processing = true;

                    //清空之前数据
                    this.waitProcessArray = [];
                    this.confirmTransactionStep = 0;

                    if (this.actionDatas.amount.gt("0")) {
                        //需要先burn
                        this.waitProcessArray.push(BUILD_PROCESS_SETUP.BURN);
                    }

                    if (this.actionDatas.unStake.gt("0")) {
                        this.waitProcessArray.push(
                            BUILD_PROCESS_SETUP.UNSTAKING
                        );
                    }

                    this.actionTabs = "m1"; //进入等待页

                    this.waitProcessFlow = this.startFlow();

                    //开始逻辑流处理函数
                    await this.waitProcessFlow(this.confirmTransactionStep);
                } catch (e) {
                    console.log(e);
                    this.actionTabs = "m3"; //进入错误页
                    this.processing = false;
                }
            }

            this.processing = false;
        },

        //开始逻辑流
        startFlow() {
            return async currentStep => {
                try {
                    this.transactionErrMsg = "";

                    if (
                        this.waitProcessArray[currentStep] ==
                        BUILD_PROCESS_SETUP.BURN
                    ) {
                        await this.burn(this.actionDatas.amount);
                        currentStep++;
                    }

                    if (
                        this.waitProcessArray[currentStep] ==
                        BUILD_PROCESS_SETUP.UNSTAKING
                    ) {
                        if (currentStep != 0) {
                            const priceRates = await getPriceRates([
                                "LINA",
                                "lUSD"
                            ]);

                            const currentLINAPrice = bnDiv(
                                priceRates.LINA,
                                priceRates.lUSD
                            ); //最新LINA汇率

                            if (currentLINAPrice.lt(this.burnData.LINA2USDBN)) {
                                let fallRate = bnDiv(
                                    bnSub(
                                        this.burnData.LINA2USDBN,
                                        currentLINAPrice
                                    ),
                                    this.burnData.LINA2USDBN
                                );

                                this.actionDatas.unStake = bnSub(
                                    this.actionDatas.unStake,
                                    bnMul(this.actionDatas.unStake, fallRate)
                                );
                            }
                        }

                        await this.unstake(this.actionDatas.unStake);
                        currentStep++;
                    }

                    //全部执行完毕显示成功
                    // this.confirmTransactionStep += 1;
                } catch (error) {
                    console.log(error, "startFlow");
                    //自定义错误
                    if (
                        _.has(error, "code") &&
                        [6100004, 6100005].includes(error.code)
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

        //burn
        async burn(burnAmount) {
            const {
                lnrJS: { LnBuildBurnSystem },
                utils
            } = lnrJSConnector;

            this.confirmTransactionStatus = false;

            const burnGasLimit = await this.getBurnGasEstimate(burnAmount);

            let transaction = await LnBuildBurnSystem.BurnAsset(burnAmount, {
                gasPrice: this.$store.state?.gasDetails?.price,
                gasLimit: burnGasLimit
            });

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;

                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.BURN,
                    value: `Burn ${this.confirmTransactionStep + 1} / ${
                        this.waitProcessArray.length
                    }`
                });

                let status = await utils.waitForTransaction(transaction.hash);

                if (!status) {
                    throw {
                        code: 6100004,
                        message:
                            "Something went wrong while burn ℓUSD, please try again."
                    };
                }

                //成功后累加当前进度
                this.confirmTransactionStep += 1;
            }
        },

        //unstake
        async unstake(unstakeAmount) {
            const {
                lnrJS: { LnCollateralSystem },
                utils
            } = lnrJSConnector;

            this.confirmTransactionStatus = false;

            const unstakeGasLimit = await this.getUnstakeGasEstimate(
                unstakeAmount
            );

            let transaction = await LnCollateralSystem.Redeem(
                utils.formatBytes32String("LINA"),
                unstakeAmount,
                {
                    gasPrice: this.$store.state?.gasDetails?.price,
                    gasLimit: unstakeGasLimit
                }
            );

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;

                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.UNSTAKING,
                    value: `Burn ${this.confirmTransactionStep + 1} / ${
                        this.waitProcessArray.length
                    }`
                });

                //等待交易结果返回
                let status = await utils.waitForTransaction(transaction.hash);

                if (!status) {
                    throw {
                        code: 6100005,
                        message:
                            "Something went wrong while unstaking your asset, please try again."
                    };
                }

                //成功后累加当前进度
                this.confirmTransactionStep += 1;
            }
        },

        //评估 burn gas
        async getBurnGasEstimate(burnAmount) {
            try {
                const {
                    lnrJS: { LnBuildBurnSystem },
                    utils
                } = lnrJSConnector;

                let gasEstimate = await LnBuildBurnSystem.contract.estimateGas.BurnAsset(
                    burnAmount
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                console.log(e);
                return bufferGasLimit(DEFAULT_GAS_LIMIT.burn);
            }
        },

        //评估 unstake gas
        async getUnstakeGasEstimate(unstakeAmount) {
            try {
                const {
                    lnrJS: { LnCollateralSystem },
                    utils
                } = lnrJSConnector;

                let gasEstimate = await LnCollateralSystem.contract.estimateGas.Redeem(
                    utils.formatBytes32String("LINA"),
                    unstakeAmount
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                console.log(e);
                return bufferGasLimit(DEFAULT_GAS_LIMIT.unstake);
            }
        },

        async waitTryAgain() {
            await this.waitProcessFlow(this.confirmTransactionStep);
        },

        //重置错误信息
        resetErrorsMsg() {
            this.errors = {
                unStakeMsg: "",
                amountMsg: "",
                ratioMsg: ""
            };
        },

        //重置输入框状态
        resetInputData() {
            //输入框展示数据
            this.inputData = {
                unStake: null,
                amount: null,
                ratio: 0
            };

            //真实操作数据
            this.actionDatas = {
                unStake: BigNumber.from("0"),
                amount: BigNumber.from("0"),
                ratio: 0
            };
        },

        //改变激活元素
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

        test() {
            let overStaked = bnMul(
                this.burnData.stakedBN,
                bnDiv(
                    bnSub(
                        this.burnData.currentRatioBN,
                        utils.parseEther(this.burnData.targetRatio.toString())
                    ),
                    this.burnData.currentRatioBN
                )
            );
        },

        //点击 Unstake Max 取回本金，不够lUSD就报错
        clickUnstakeMax() {
            this.activeItemBtn = 0;
            this.unstakeMax = true;
            this.resetErrorsMsg();
            this.resetInputData();

            if (this.burnData.stakedBN.eq("0")) {
                this.errors.unStakeMsg =
                    "There is no LINA staked on the contract.";
                return;
            }

            if (this.burnData.lockBN.eq("0")) {
                //没有lock lina
                if (
                    this.burnData.lUSDBN.eq("0") &&
                    this.burnData.debtBN.gt("0")
                ) {
                    this.errors.unStakeMsg =
                        "You don't have enough amount of ℓUSD.";
                    return;
                }

                if (this.burnData.lUSDBN.gte(this.burnData.debtBN)) {
                    //lUSD大于债务
                    //lUSD足够还清债务则销毁债务数量的lUSD则可取回所有LINA
                    this.inputData.unStake = formatEtherToNumber(
                        this.burnData.stakedBN
                    );
                    this.inputData.amount = formatEtherToNumber(
                        this.burnData.debtBN
                    );
                    this.inputData.ratio = null;

                    this.actionDatas.unStake = this.burnData.stakedBN;
                    this.actionDatas.amount = this.burnData.debtBN;
                    this.actionDatas.ratio = null;
                } else {
                    //lUSD不足还清债务则报错
                    this.errors.unStakeMsg =
                        "You don't have enough amount of ℓUSD.";
                }
            } else {
                //有lock lina
                //计算当前价格的lock lina能生成多少lusd
                let lockLINAToLUSDBN = this.burnData.lockBN.mul(
                    this.burnData.LINA2USDBN
                );
                let lockLINAToBuildLUSDBN = this.burnData.lockBN
                    .mul(this.burnData.LINA2USDBN)
                    .div(
                        utils.parseEther(
                            (this.burnData.targetRatio / 100).toString()
                        )
                    );

                if (this.burnData.debtBN.lte(lockLINAToBuildLUSDBN)) {
                    //债务 <= lockLINAToLUSDBN 时，则可以直接解锁所有stake lina
                    this.inputData.unStake = formatEtherToNumber(
                        this.burnData.stakedBN
                    );
                    this.inputData.amount = formatEtherToNumber(
                        this.burnData.debtBN
                    );
                    this.inputData.ratio = formatEtherToNumber(
                        bnDiv(lockLINAToLUSDBN, this.burnData.debtBN)
                    );

                    this.actionDatas.unStake = this.burnData.stakedBN;
                    this.actionDatas.amount = formatEtherToNumber(
                        this.burnData.debtBN
                    );
                    this.actionDatas.ratio = bnDiv(
                        lockLINAToLUSDBN,
                        this.burnData.debtBN
                    );
                } else {
                    let stakeDebt = this.burnData.debtBN.sub(
                        lockLINAToBuildLUSDBN
                    ); //取回所有stake所需还的债务

                    if (this.burnData.lUSDBN.gte(stakeDebt)) {
                        //lUSD足够还清债务则销毁债务数量的lUSD则可取回所有LINA
                        this.inputData.unStake = formatEtherToNumber(
                            this.burnData.stakedBN
                        );
                        this.inputData.amount = formatEtherToNumber(stakeDebt);
                        this.inputData.ratio =
                            formatEtherToNumber(
                                lockLINAToLUSDBN.div(lockLINAToBuildLUSDBN)
                            ) * 100;

                        this.actionDatas.unStake = this.burnData.stakedBN;
                        this.actionDatas.amount = stakeDebt;
                        this.actionDatas.ratio = bnDiv(
                            lockLINAToLUSDBN,
                            lockLINAToBuildLUSDBN
                        );
                    } else {
                        //lUSD不足还清债务则报错
                        this.errors.unStakeMsg =
                            "You don't have enough amount of ℓUSD.";
                    }
                }
            }
        },

        //点击 Burn Max 销毁lUSD，取回能取回的最大本金
        clickBurnMax() {
            this.activeItemBtn = 1;
            this.resetErrorsMsg();
            this.resetInputData();

            if (this.burnData.stakedBN.eq("0")) {
                this.errors.amountMsg =
                    "There is no LINA staked on the contract.";
                return;
            }

            if (this.burnData.lUSDBN.eq("0")) {
                this.errors.amountMsg = "You don't have enough amount of ℓUSD.";
                return;
            }

            if (this.burnData.lUSDBN.gte(this.burnData.debtBN)) {
                //lUSD >= debt
                this.inputData.unStake = formatEtherToNumber(
                    this.burnData.stakedBN
                );
                this.inputData.amount = formatEtherToNumber(
                    this.burnData.debtBN
                );
                this.inputData.ratio = null;

                this.actionDatas.unStake = this.burnData.stakedBN;
                this.actionDatas.amount = this.burnData.debtBN;
                this.actionDatas.ratio = null;
            } else {
                //lUSD < debt
                this.inputData.amount = formatEtherToNumber(
                    this.burnData.lUSDBN
                );
                this.actionDatas.amount = this.burnData.lUSDBN;

                let ratioAfterBurn = BigNumber.from("0");

                //lUSD不足还清所有债务，则计算销毁所有lUSD后的抵押率，大于目标则解锁大于部分，小于等于则不解锁LINA
                ratioAfterBurn = bnMul(
                    bnDiv(
                        bnMul(
                            bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                            this.burnData.LINA2USDBN
                        ),
                        bnSub(this.burnData.debtBN, this.burnData.lUSDBN)
                    ),
                    utils.parseEther("100")
                );

                if (
                    ratioAfterBurn.gt(
                        utils.parseEther(this.burnData.targetRatio.toString())
                    )
                ) {
                    //销毁后大于 target ratio
                    let allCanUnstakeAfterBurn = bnMul(
                        bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                        bnDiv(
                            bnSub(
                                ratioAfterBurn,
                                utils.parseEther(
                                    this.burnData.targetRatio.toString()
                                )
                            ),
                            ratioAfterBurn
                        )
                    );

                    if (allCanUnstakeAfterBurn.lte(this.burnData.stakedBN)) {
                        // <= stake
                        this.inputData.unStake = formatEtherToNumber(
                            allCanUnstakeAfterBurn
                        );
                        this.actionDatas.unStake = allCanUnstakeAfterBurn;
                    } else {
                        // > stake
                        this.inputData.unStake = formatEtherToNumber(
                            this.burnData.stakedBN
                        );
                        this.actionDatas.unStake = this.burnData.stakedBN;
                    }
                } else {
                    //销毁后小于等于 target ratio
                    this.inputData.unStake = 0;
                    this.actionDatas.unStake = BigNumber.from("0");
                }
                // let pratioAfterBurnAndStake = bnMul(
                //                                 bnDiv(
                //                                     bnMul(
                //                                         bnSub(
                //                                             bnAdd(
                //                                                 this.burnData.stakedBN,
                //                                                 this.burnData.lockBN
                //                                             ),
                //                                             this.actionDatas.unStake
                //                                         ),
                //                                         this.burnData.LINA2USDBN
                //                                     ),
                //                                     bnSub(
                //                                         this.burnData.debtBN,
                //                                         this.burnData.lUSDBN
                //                                     )
                //                                 ),
                //                                 utils.parseEther('100')
                //                             );

                // this.inputData.ratio = formatEtherToNumber(pratioAfterBurnAndStake);
                // this.actionDatas.ratio = pratioAfterBurnAndStake;

                this.inputData.ratio = this.burnData.targetRatio;
                this.actionDatas.ratio = utils.parseEther(
                    this.burnData.targetRatio.toString()
                );
            }
        },

        //点击target
        clickTargetRatio() {
            this.activeItemBtn = 2;
            this.resetErrorsMsg();
            this.resetInputData();

            //没有债务
            if (this.burnData.debtBN.eq("0")) {
                this.errors.ratioMsg = "There is no debt.";
                return;
            }

            if (
                this.burnData.currentRatioBN.gt(
                    utils.parseEther(this.burnData.targetRatio.toString())
                )
            ) {
                //下调抵押率，当前抵押率大于目标抵押率，销毁LINA到抵押率刚好
                let needUnstake = bnMul(
                    bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                    bnDiv(
                        bnSub(
                            this.burnData.currentRatioBN,
                            utils.parseEther(
                                this.burnData.targetRatio.toString()
                            )
                        ),
                        this.burnData.currentRatioBN
                    )
                );

                this.inputData.unStake = formatEtherToNumber(needUnstake);
                this.inputData.amount = formatEtherToNumber(0);
                this.inputData.ratio = this.burnData.targetRatio;

                this.actionDatas.unStake = needUnstake;
                this.actionDatas.amount = BigNumber.from("0");
                this.actionDatas.ratio = this.burnData.targetRatio;
            } else if (
                this.burnData.currentRatioBN.lt(
                    utils.parseEther(this.burnData.targetRatio.toString())
                )
            ) {
                //上调抵押率，看当前抵押率上调到目标抵押率需要还多少债务，如果lUSD余额大于等于要还的则销毁，低于则报错
                let retainlUSD = BigNumber.from("0"),
                    burnlUSD = BigNumber.from("0"); //上调抵押率需要保留/销毁多少lUSD

                retainlUSD = bnDiv(
                    bnMul(
                        bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                        this.burnData.LINA2USDBN
                    ),
                    utils.parseEther(
                        (this.burnData.targetRatio / 100).toString()
                    )
                );

                burnlUSD = bnSub(this.burnData.debtBN, retainlUSD);

                if (this.burnData.lUSDBN.lt(burnlUSD)) {
                    this.errors.ratioMsg =
                        "You don't have enough amount of ℓUSD.";
                }

                this.inputData.unStake = 0;
                this.inputData.amount = formatEtherToNumber(burnlUSD);
                this.inputData.ratio = this.burnData.targetRatio;

                this.actionDatas.unStake = BigNumber.from("0");
                this.actionDatas.amount = burnlUSD;
                this.actionDatas.ratio = utils.parseEther(
                    this.burnData.targetRatio.toString()
                );
            } else {
                //抵押率刚好则不动
                this.inputData.unStake = 0;
                this.inputData.amount = 0;
                this.inputData.ratio = this.burnData.currentRatio;
            }
        },

        //输入要解锁LINA数量
        changeUnStake(unstakedAmount) {
            this.resetErrorsMsg();
            this.resetInputData();

            if (this.burnData.stakedBN.eq("0")) {
                this.errors.unStakeMsg =
                    "There is no LINA staked on the contract.";
                return;
            }

            if (!unstakedAmount) {
                this.errors.unStakeMsg =
                    "You can't unstake the amount of LINA above.";
                return;
            } else {
                this.errors.unStakeMsg = "";
            }

            //一个LINA都解锁不了
            if (
                utils
                    .parseEther(unstakedAmount.toString())
                    .gt(this.burnData.stakedBN)
            ) {
                this.inputData.unStake = unstakedAmount;
                this.errors.unStakeMsg =
                    "You can't unstake the amount of LINA above.";
                return;
            }

            //一个LINA都解锁不了
            if (
                this.burnData.lUSDBN.eq("0") &&
                this.burnData.currentRatioBN.lte(
                    utils.parseEther(this.burnData.targetRatio.toString())
                )
            ) {
                this.inputData.unStake = unstakedAmount;
                this.errors.unStakeMsg =
                    "You don't have enough amount of ℓUSD.";
                return;
            }

            //没有债务直接解锁
            if (this.burnData.debtBN.eq("0")) {
                this.inputData.unStake = unstakedAmount;
                this.actionDatas.unStake = utils.parseEther(
                    unstakedAmount.toString()
                );

                return;
            }

            //当前价格的lock lina能生成多少lusd
            let lockLINAToBuildLUSDBN = bnDiv(
                bnMul(this.burnData.lockBN, this.burnData.LINA2USDBN),
                utils.parseEther((this.burnData.targetRatio / 100).toString())
            );
            //取回所有stake所需还的债务
            let stakeDebt = bnSub(this.burnData.debtBN, lockLINAToBuildLUSDBN);

            let allCanUnstakeAfterBurn = BigNumber.from("0");

            //判断输入的值是否超过能解锁的最大LINA
            //够lUSD还债，则可以解锁所有LINA
            if (this.burnData.lUSDBN.gte(stakeDebt)) {
                allCanUnstakeAfterBurn = this.burnData.stakedBN;
            } else {
                //lUSD不足还清所有债务，则计算销毁所有lUSD后的抵押率，大于目标则解锁大于部分，小于等于则不解锁LINA
                let ratioAfterBurn = bnMul(
                    bnDiv(
                        bnMul(
                            bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                            this.burnData.LINA2USDBN
                        ),
                        bnSub(this.burnData.debtBN, this.burnData.lUSDBN)
                    ),
                    utils.parseEther("100")
                );

                //销毁所有lUSD后抵押率不超过目标抵押率，则不能解锁LINA
                if (
                    ratioAfterBurn.lte(
                        utils.parseEther(this.burnData.targetRatio.toString())
                    )
                ) {
                    this.inputData.unStake = unstakedAmount;
                    this.errors.unStakeMsg =
                        "You don't have enough amount of ℓUSD.";
                    return;
                }

                //用销毁所有lUSD后超额的抵押率算
                allCanUnstakeAfterBurn = bnMul(
                    bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                    bnDiv(
                        bnSub(
                            ratioAfterBurn,
                            utils.parseEther(
                                this.burnData.targetRatio.toString()
                            )
                        ),
                        ratioAfterBurn
                    )
                );
            }

            if (
                utils
                    .parseEther(unstakedAmount.toString())
                    .gt(allCanUnstakeAfterBurn)
            ) {
                this.inputData.unStake = unstakedAmount;
                this.errors.unStakeMsg =
                    "You don't have enough amount of ℓUSD.";
                return;
            }

            let overStaked = bnMul(
                bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                bnDiv(
                    bnSub(
                        this.burnData.currentRatioBN,
                        utils.parseEther(this.burnData.targetRatio.toString())
                    ),
                    this.burnData.currentRatioBN
                )
            );
            if (overStaked.lt("0")) {
                overStaked = BigNumber.from("0");
            }

            let needFixRatio = BigNumber.from("0");

            //需要先修复抵押率
            if (
                this.burnData.currentRatioBN.lt(
                    utils.parseEther(this.burnData.targetRatio.toString())
                )
            ) {
                let retainlUSD = bnDiv(
                    bnMul(
                        bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                        this.burnData.LINA2USDBN
                    ),
                    utils.parseEther(
                        (this.burnData.targetRatio / 100).toString()
                    )
                );

                needFixRatio = bnSub(this.burnData.debtBN, retainlUSD);
            }

            let needBurnAmount = BigNumber.from("0");

            if (utils.parseEther(unstakedAmount.toString()).gt(overStaked)) {
                needBurnAmount = bnDiv(
                    bnMul(
                        bnSub(
                            utils.parseEther(unstakedAmount.toString()),
                            overStaked
                        ),
                        this.burnData.LINA2USDBN
                    ),
                    utils.parseEther(
                        (this.burnData.targetRatio / 100).toString()
                    )
                );
            }

            this.inputData.unStake = unstakedAmount;
            this.actionDatas.unStake = utils.parseEther(
                unstakedAmount.toString()
            );

            this.inputData.amount = formatEtherToNumber(
                bnAdd(needBurnAmount, needFixRatio)
            );
            this.actionDatas.amount = bnAdd(needBurnAmount, needFixRatio);

            if (
                utils
                    .parseEther(unstakedAmount.toString())
                    .eq(this.burnData.stakedBN)
            ) {
                this.inputData.ratio = null;
                this.actionDatas.ratio = BigNumber.from("0");
            } else {
                let ratioAfterAction = bnMul(
                    bnDiv(
                        bnMul(
                            bnSub(
                                bnAdd(
                                    this.burnData.stakedBN,
                                    this.burnData.lockBN
                                ),
                                this.actionDatas.unStake
                            ),
                            this.burnData.LINA2USDBN
                        ),
                        bnSub(this.burnData.debtBN, this.actionDatas.amount)
                    ),
                    utils.parseEther("100")
                );

                this.inputData.ratio = formatEtherToNumber(ratioAfterAction);
                this.actionDatas.ratio = ratioAfterAction;

                //this.inputData.ratio = this.burnData.targetRatio;
                //this.actionDatas.ratio = utils.parseEther(this.burnData.targetRatio.toString());
            }
        },

        //输入要销毁lUSD数量
        changeAmount(burnAmount) {
            this.resetErrorsMsg();
            this.resetInputData();

            if (!burnAmount || this.burnData.lUSDBN.eq("0")) {
                this.errors.amountMsg = "You can't burn the amount of ℓUSD.";
                return;
            }

            if (this.burnData.debtBN.eq("0")) {
                this.errors.amountMsg = "There is no debt.";
                return;
            }

            if (
                utils.parseEther(burnAmount.toString()).gt(this.burnData.debtBN)
            ) {
                this.inputData.amount = burnAmount;
                this.errors.amountMsg =
                    "The amount of ℓUSD is larger than your debt.";
                this.inputData.ratio = null;
                return;
            }

            if (
                utils.parseEther(burnAmount.toString()).gt(this.burnData.lUSDBN)
            ) {
                this.inputData.amount = burnAmount;
                this.errors.amountMsg = "You don't have enough amount of ℓUSD.";
                this.inputData.ratio = null;
                return;
            }

            let ratioAfterBurnInputAmount = bnMul(
                bnDiv(
                    bnMul(
                        bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                        this.burnData.LINA2USDBN
                    ),
                    bnSub(
                        this.burnData.debtBN,
                        utils.parseEther(burnAmount.toString())
                    )
                ),
                utils.parseEther("100")
            );

            ////用输入的lUSD销毁后超额的抵押率算，不超过目标抵押率，则不能解锁LINA
            if (
                ratioAfterBurnInputAmount.lte(
                    utils.parseEther(this.burnData.targetRatio.toString())
                )
            ) {
                this.inputData.unStake = 0;
                this.inputData.amount = burnAmount;
                this.inputData.ratio = formatEtherToNumber(
                    ratioAfterBurnInputAmount
                );

                this.actionDatas.unStake = BigNumber.from("0");
                this.actionDatas.amount = BigNumber.from(burnAmount.toString());
                this.actionDatas.ratio = ratioAfterBurnInputAmount;

                return;
            }

            //用输入的lUSD销毁后超额的抵押率算
            let allCanUnstakedLINAAfterBurn = bnMul(
                bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                bnDiv(
                    bnSub(
                        ratioAfterBurnInputAmount,
                        utils.parseEther(this.burnData.targetRatio.toString())
                    ),
                    ratioAfterBurnInputAmount
                )
            );

            if (allCanUnstakedLINAAfterBurn.gt(this.burnData.stakedBN)) {
                allCanUnstakedLINAAfterBurn = this.burnData.stakedBN;
            }

            // let pratioAfterBurnAndStake = bnMul(
            //                                 bnDiv(
            //                                     bnMul(
            //                                         bnSub(
            //                                             bnAdd(
            //                                                 this.burnData.stakedBN,
            //                                                 this.burnData.lockBN
            //                                             ),
            //                                             allCanUnstakedLINAAfterBurn
            //                                         ),
            //                                         this.burnData.LINA2USDBN
            //                                     ),
            //                                     bnSub(
            //                                         this.burnData.debtBN,
            //                                         utils.parseEther(burnAmount.toString())
            //                                     )
            //                                 ),
            //                                 utils.parseEther('100')
            //                             );

            this.inputData.unStake = formatEtherToNumber(
                allCanUnstakedLINAAfterBurn
            );
            this.actionDatas.unStake = allCanUnstakedLINAAfterBurn;

            this.inputData.amount = burnAmount;
            this.actionDatas.amount = utils.parseEther(burnAmount.toString());

            //this.inputData.ratio = formatEtherToNumber(pratioAfterBurnAndStake);
            //this.actionDatas.ratio = pratioAfterBurnAndStake;
            this.inputData.ratio = this.burnData.targetRatio;
            this.actionDatas.ratio = utils.parseEther(
                this.burnData.targetRatio.toString()
            );
        },

        //输入想调成的抵押率
        changeRatio(ratioAmount) {
            this.resetErrorsMsg();
            this.resetInputData();

            if (this.burnData.debtBN.eq("0")) {
                this.errors.ratioMsg = "There is no debt.";
                return;
            }

            if (ratioAmount == 0) {
                this.inputData.unStake = 0;
                this.inputData.amount = 0;
                this.inputData.ratio = ratioAmount;
                this.errors.ratioMsg =
                    "The P-Ratio cant be below target ratio.";
                return;
            } else if (ratioAmount == this.burnData.currentRatio) {
                //ratioAmount 等于 targetRatio，不需要操作
                this.inputData.unStake = 0;
                this.inputData.amount = 0;
                this.inputData.ratio = ratioAmount;
                return;
            } else if (
                (this.burnData.targetRatio > this.burnData.currentRatio &&
                    ratioAmount < this.burnData.currentRatio) ||
                (this.burnData.targetRatio < this.burnData.currentRatio &&
                    ratioAmount < this.burnData.targetRatio)
            ) {
                //ratioAmount 不允许小于 targetRatio 与 currentRatio 之间较小那个
                this.inputData.unStake = 0;
                this.inputData.amount = 0;
                this.inputData.ratio = ratioAmount;
                this.errors.ratioMsg = "The P-Ratio is too low.";
                return;
            }

            let maxRatioAfterBurnMax = BigNumber.from("0");

            if (this.burnData.lUSDBN.lt(this.burnData.debtBN)) {
                maxRatioAfterBurnMax = bnMul(
                    bnDiv(
                        bnMul(
                            bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                            this.burnData.LINA2USDBN
                        ),
                        bnSub(this.burnData.debtBN, this.burnData.lUSDBN)
                    ),
                    utils.parseEther("100")
                );
            }

            if (
                !maxRatioAfterBurnMax.eq("0") &&
                utils
                    .parseEther(ratioAmount.toString())
                    .gt(maxRatioAfterBurnMax)
            ) {
                this.errors.ratioMsg =
                    "The P-Ratio can't be larger than your staking amount of LINA.";
                return;
            }

            if (ratioAmount > this.burnData.currentRatio) {
                //上调抵押率，计算lUSD，LINA为0，调整抵押率最大为无限大，也就是销毁所有lUSD
                //计算达成 ratioAmount 时，抵押的LINA价值多少lUSD
                let retainlUSD = bnDiv(
                    bnMul(
                        bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                        this.burnData.LINA2USDBN
                    ),
                    utils.parseEther((ratioAmount / 100).toString())
                );
                let burnlUSD = bnSub(this.burnData.debtBN, retainlUSD); //债务 - 抵押的LINA价值多少lUSD = 需要销毁的lUSD

                this.inputData.unStake = 0;
                this.actionDatas.unStake = BigNumber.from("0");

                this.inputData.amount = formatEtherToNumber(burnlUSD);
                this.actionDatas.amount = burnlUSD;

                this.inputData.ratio = ratioAmount;
                this.actionDatas.ratio = BigNumber.from(ratioAmount.toString());
            } else if (
                ratioAmount < this.burnData.currentRatio &&
                ratioAmount >= this.burnData.targetRatio
            ) {
                if (
                    this.burnData.lockBN.gt("0") &&
                    this.burnData.stakedBN.eq("0")
                ) {
                    this.errors.ratioMsg =
                        "Please reduce the P-Ratio through build.";
                    return;
                }

                //有lock lina时，在burn页面，抵押率最低只能调整到取回超额的stake lina
                if (
                    this.burnData.lockBN.gt("0") &&
                    this.burnData.stakedBN.gt("0")
                ) {
                    let overStaked = bnMul(
                        bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                        bnDiv(
                            bnSub(
                                this.burnData.currentRatioBN,
                                utils.parseEther(
                                    this.burnData.targetRatio.toString()
                                )
                            ),
                            this.burnData.currentRatioBN
                        )
                    );

                    if (overStaked.gt(this.burnData.stakedBN)) {
                        overStaked = this.burnData.stakedBN;
                    }

                    let pratioMinAfterUnstake = bnDiv(
                        bnMul(
                            bnSub(
                                bnAdd(
                                    this.burnData.stakedBN,
                                    this.burnData.lockBN
                                ),
                                overStaked
                            ),
                            this.burnData.LINA2USDBN
                        ),
                        this.burnData.currentRatioBN
                    );

                    if (
                        utils
                            .parseEther(ratioAmount.toString())
                            .lt(pratioMinAfterUnstake)
                    ) {
                        this.inputData.unStake = 0;
                        this.inputData.amount = 0;
                        this.inputData.ratio = ratioAmount;
                        this.errors.ratioMsg = "Can not set this P-Ratio.";
                        return;
                    }
                }

                //下调抵押率，lUSD为0，计算LINA
                //计算达成 ratioAmount 时，需要抵押多少LINA
                let retainStake = bnDiv(
                    bnMul(
                        utils.parseEther((ratioAmount / 100).toString()),
                        this.burnData.debtBN
                    ),
                    this.burnData.LINA2USDBN
                );

                //已抵押的LINA - 需要抵押多少LINA = 达成 ratioAmount 需要解锁的LINA
                let unStake = bnSub(
                    bnAdd(this.burnData.stakedBN, this.burnData.lockBN),
                    retainStake
                );

                this.inputData.unStake = formatEtherToNumber(unStake);
                this.actionDatas.unStake = unStake;

                this.inputData.amount = 0;
                this.actionDatas.amount = BigNumber.from("0");

                this.inputData.ratio = ratioAmount;
                this.actionDatas.ratio = BigNumber.from(ratioAmount.toString());
            }
        },

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
            this.actionTabs = "m0";
            this.activeItemBtn = -1;

            this.getBurnData(this.walletAddress);

            this.resetInputData();
        },

        //重试
        tryAgain() {
            this.actionTabs = "m0";
        }
    }
};
</script>

<style lang="scss">
#burn {
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

                .burnBox,
                .waitingBox,
                .successBox,
                .wrongBox {
                    width: 100%;
                    height: 100%;
                }

                .burnBox {
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

                                    img {
                                        width: 100%;
                                        height: 100%;
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

                                        .tip {
                                            margin-left: 8px;

                                            img {
                                                margin-top: -3px;
                                            }
                                        }
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

                    .burnBtn {
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
