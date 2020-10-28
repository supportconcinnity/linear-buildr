<template>
    <div id="build">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="buildBox">
                    <div class="actionBody">
                        <div class="actionTitle">Build</div>
                        <div class="actionDesc">
                            Build ℓUSD and earn staking rewards by staking LINA
                        </div>
                        <div class="actionRate">
                            1 LINA =
                            {{
                                formatNumberFromBigNumber(
                                    buildData.LINAPrice,
                                    4
                                )
                            }}
                            ℓUSD
                        </div>

                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.stakeAmount
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
                                    >
                                        <!-- @click.stop="clickBuy" -->
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
                                        type="text"
                                        v-model="buildData.stakeAmount"
                                        placeholder="0"
                                        @on-change="changeStakeAmount"
                                        @on-focus="inputFocus(0)"
                                        @on-blur="inputBlur(0)"
                                        :parser="inputParser"
                                        :formatter="
                                            value =>
                                                floor(
                                                    toNonExponential(value),
                                                    DECIMAL_PRECISION
                                                )
                                        "
                                    />
                                    <!-- :max="formatEtherToNumber(buildData.maxAvaliableLINA)" -->
                                    <!-- <div class="unit">lina</div> -->
                                </div>
                                <!-- <div class="avaliable">Avaliable : 1,000</div> -->
                            </div>

                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.stakeAmount ? '1' : '0'
                                }"
                            >
                                {{ errors.stakeAmount }}
                            </div>
                        </div>
                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.buildAmount
                            }"
                            @click="changeFocusItem(1)"
                        >
                            <div class="itemLeft">
                                <div class="itemIcon">
                                    <img src="@/static/lina_usd.svg" alt="" />
                                </div>
                                <div class="itemType">
                                    <div class="itemTypeTitle">
                                        Build ℓUSD
                                        <Tooltip
                                            max-width="305"
                                            placement="top"
                                            class="tip globalInfoStyle"
                                            content="Amount of ℓUSD built may vary due to block times and price fluctuations in pledge tokens."
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
                                        :class="{ active: activeItemBtn == 1 }"
                                        @click.stop="clickMaxBuildAmount"
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
                                        type="text"
                                        v-model="buildData.buildAmount"
                                        @on-change="changeBuildAmount"
                                        @on-focus="inputFocus(1)"
                                        @on-blur="inputBlur(1)"
                                        placeholder="0"
                                        :parser="inputParser"
                                        :formatter="
                                            value =>
                                                floor(
                                                    toNonExponential(value),
                                                    DECIMAL_PRECISION
                                                )
                                        "
                                    />

                                    <!-- :max="formatEtherToNumber(buildData.maxAvaliablelUSD)" -->
                                    <!-- <div class="unit">ℓUSD</div> -->
                                </div>
                                <!-- <div class="avaliable">Avaliable : 1,000</div> -->
                            </div>
                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.buildAmount ? '1' : '0'
                                }"
                            >
                                {{ errors.buildAmount }}
                            </div>
                        </div>
                        <div
                            class="actionInputItem"
                            :class="{
                                error: errors.PRatio
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
                                        @click.stop="clickTargetRatio"
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
                                        type="text"
                                        v-model="buildData.PRatio"
                                        @on-change="changeRatio"
                                        @on-focus="inputFocus(2)"
                                        @on-blur="inputBlur(2)"
                                        placeholder="0"
                                        :parser="val => inputParser(val, 0)"
                                        :formatter="
                                            value =>
                                                floor(toNonExponential(value))
                                        "
                                    />
                                    <!-- :max="buildData.maxPRatio" -->
                                    <!-- <div class="unit">%</div> -->
                                </div>
                                <!-- <div class="avaliable">Current : 99.73</div> -->
                            </div>
                            <div
                                class="itemErrMsg"
                                :style="{
                                    opacity: errors.PRatio ? '1' : '0'
                                }"
                            >
                                {{ errors.PRatio }}
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
import gasEditor from "@/components/gasEditor";
import { toNonExponential } from "@/common/utils";

import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import {
    storeDetailsData,
    getPriceRates,
    getBuildRatio
} from "@/assets/linearLibrary/linearTools/request";
import { DECIMAL_LENGTH } from "@/assets/linearLibrary/linearTools/constants/flow";

import {
    findParents,
    removeClass,
    addClass,
    openEtherScan
} from "@/common/utils";

import {
    formatEtherToNumber,
    formatNumber,
    formatNumberFromBigNumber
} from "@/assets/linearLibrary/linearTools/format";

import {
    bufferGasLimit,
    DEFAULT_GAS_LIMIT
} from "@/assets/linearLibrary/linearTools/network";

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

import { utils } from "ethers";

import {
    BUILD_PROCESS_SETUP,
    DECIMAL_PRECISION
} from "@/assets/linearLibrary/linearTools/constants/process";

export default {
    name: "build",
    data() {
        return {
            testBox: false, //无用时删除

            toNonExponential, //科学计数法转正常显示 Conversion of scientific counting method to digital text
            actionTabs: "m0", //子页(m0默认,m1执行) Subpages(m0 default, m1 waiting)
            buildData: { stakeAmount: 0, buildAmount: 0, PRatio: 500 }, //build所需数据 Data that build needed to execute

            activeItemBtn: -1, //当前激活按钮 0,1,2 Start with -1

            errors: {
                //错误提示信息
                stakeAmount: "",
                buildAmount: "",
                PRatio: ""
            },

            floor: _.floor, //向下取值

            minPRatio: 500, //最小值(getBuildData会重新计算)

            startComputed: false, //buildAmount默认为0,初始化数据时会触发小于1的错误, 所以需要手动设置触发错误的开始时机

            formatNumber, //千分格式化
            formatNumberFromBigNumber, //大数格千分格式化
            formatEtherToNumber,

            confirmTransactionStep: 0, //当前交易进度
            confirmTransactionStatus: false, //当前交易确认状态
            confirmTransactionHash: "", //当前交易hash
            transactionErrMsg: "", //交易错误信息
            processing: false, // 处理状态, 防止重复点击

            utils, // ethers工具包

            waitProcessArray: [], //等待交易进度组
            waitProcessFlow: null, //flow闭包函数

            DECIMAL_PRECISION,

            gasLimit: 500000
        };
    },
    components: {
        gasEditor
    },
    watch: {
        walletAddress() {},
        errorHandle() {},
        walletDetails() {}
    },
    computed: {
        //build按钮禁止状态
        //Disable build button
        buildDisabled() {
            return this.errorHandle;
        },

        //错误监听
        errorHandle() {
            if (this.startComputed) {
                let errBox = [];

                let stakeAmount = this.buildData.stakeAmount;

                if (isNaN(stakeAmount)) {
                    this.errors.stakeAmount = `You don't have enough amount of LINA.`;
                    errBox.push(true);
                } else if (_.lt(stakeAmount, 0)) {
                    this.errors.stakeAmount = `You don't have enough amount of LINA.`;
                    errBox.push(true);
                } else if (
                    _.gt(
                        _.floor(stakeAmount, DECIMAL_PRECISION),
                        _.floor(
                            utils.formatEther(this.buildData.maxAvaliableLINA),
                            DECIMAL_PRECISION
                        )
                    )
                ) {
                    this.errors.stakeAmount = `You don't have enough amount of LINA.`;
                    errBox.push(true);
                } else {
                    this.errors.stakeAmount = "";
                }

                let buildAmount = this.buildData.buildAmount;

                if (isNaN(buildAmount)) {
                    this.errors.buildAmount = `You can't build the amount of ℓUSD above.`;
                    errBox.push(true);
                } else if (_.lt(buildAmount, 0)) {
                    this.errors.buildAmount = `You can't build the amount of ℓUSD above.`;
                    errBox.push(true);
                } else if (
                    _.gt(
                        _.floor(buildAmount, DECIMAL_PRECISION),
                        _.floor(
                            utils.formatEther(this.buildData.maxAvaliablelUSD),
                            DECIMAL_PRECISION
                        )
                    )
                ) {
                    this.errors.buildAmount = `You can't build the amount of ℓUSD above.`;
                    errBox.push(true);
                } else {
                    this.errors.buildAmount = "";
                }

                let PRatio = _.floor(this.buildData.PRatio),
                    maxPRatio = _.floor(this.buildData.maxPRatio);

                if (_.lt(PRatio, _.floor(this.minPRatio))) {
                    this.errors.PRatio = `The P-Ratio cant be below target ratio.`;
                    errBox.push(true);
                } else if (_.gt(maxPRatio, 0) && _.gt(PRatio, maxPRatio)) {
                    this.errors.PRatio = `The P-Ratio can't be larger than your staking amount of LINA`;
                    errBox.push(true);
                } else {
                    this.errors.PRatio = "";
                }

                return _.includes(errBox, true); //是否包含错误
            } else {
                //默认为错误
                return true;
            }
        },

        walletAddress() {
            return this.$store.state?.wallet?.address;
        },

        walletDetails() {
            return _.clone(this.$store.state?.walletDetails);
        }
    },
    created() {
        this.getBuildData(this.walletAddress).then(res => {
            this.buildData = res;
        });
    },
    methods: {
        //处理lina价格变动
        async handlePriceChange() {
            const priceRates = await getPriceRates(["LINA", "lUSD"]);

            //不等于之前价格则更新对应数据
            if (!this.buildData.priceRates.LINA.eq(priceRates.LINA)) {
                //更新转换率
                this.buildData.priceRates = _.clone(priceRates);

                //更新最大可build的lusd
                const collateralLINA = bnDiv(
                    bnDiv(this.buildData.collateralUSD, priceRates.lUSD),
                    priceRates.LINA
                );
                this.buildData.maxAvaliablelUSD = bnMul(
                    bnMul(
                        bnAdd(this.buildData.maxAvaliableLINA, collateralLINA),
                        priceRates.LINA
                    ),
                    this.buildData.buildRatio
                );

                //更新build的数量
                const buildAmount = toNonExponential(
                    _.floor(this.calclUSD(this.buildData), DECIMAL_PRECISION)
                );
                this.buildData.buildAmount = buildAmount;

                throw {
                    code: 6100004,
                    message: `Your transaction is reverted because the price changes unfavourably. You can build ${buildAmount} ℓUSD, if you want to proceed please click try again below.`
                };
            }
        },

        //防止输入超过指定小数
        inputParser(val, decimal = DECIMAL_PRECISION) {
            try {
                if (
                    !Number(val) ||
                    Number(val) > Number.MAX_SAFE_INTEGER ||
                    Number(val) < Number.MIN_SAFE_INTEGER
                ) {
                    return "0";
                }

                return _.floor(val, decimal).toString();
            } catch (error) {
                return "0";
            }
        },

        /**
         * 获取数据
         */
        async getBuildData(walletAddress) {
            try {
                this.processing = true;
                const {
                    lnrJS: {
                        // LnBuildBurnSystem,
                        LnDebtSystem,
                        LnChainLinkPrices,
                        LnProxyERC20,
                        LnCollateralSystem,
                        LnRewardLocker
                    },
                    utils
                } = lnrJSConnector;

                const results = await Promise.all([
                    LnDebtSystem.GetUserDebtBalanceInUsd(walletAddress),
                    LnProxyERC20.balanceOf(walletAddress),
                    LnRewardLocker.balanceOf(walletAddress),
                    LnCollateralSystem.userCollateralData(
                        walletAddress,
                        utils.formatBytes32String("LINA")
                    ),
                    LnCollateralSystem.MaxRedeemableInUsd(walletAddress),
                    getBuildRatio(),
                    LnCollateralSystem.GetUserTotalCollateralInUsd(
                        walletAddress
                    )
                ]);

                const [
                    amountDebt,
                    avaliableLINA,
                    lockedLINA,
                    stakedLINA,
                    collateralUSD,
                    buildRatio,
                    totalCollateralInUsd
                ] = results.map(val => val);

                const priceRates = await getPriceRates(["LINA", "lUSD"]);

                const LINAPrice = bnDiv(priceRates.LINA, priceRates.lUSD);

                const collateralLINA = bnDiv(collateralUSD, priceRates.LINA);

                // const maxAvaliableLINA = bnAdd(avaliableLINA, collateralLINA);
                const maxAvaliableLINA = avaliableLINA;

                const amountLINA = bnAdd(
                    avaliableLINA,
                    bnAdd(stakedLINA, lockedLINA)
                );

                const maxAvaliablelUSD = bnMul(
                    bnDiv(
                        bnMul(
                            bnAdd(maxAvaliableLINA, collateralLINA),
                            priceRates.LINA
                        ),
                        priceRates.lUSD
                    ),
                    buildRatio
                );

                const beforeCollateralLINA = bnSub(
                    bnDiv(totalCollateralInUsd, priceRates.LINA),
                    collateralLINA
                );

                let buildData = {
                    maxAvaliableLINA,
                    maxAvaliablelUSD,
                    buildAmount: 0,
                    stakeAmount: 0,
                    LINAPrice,

                    amountDebt,
                    amountDebt2lUSD: bnDiv(amountDebt[0], priceRates.lUSD),

                    collateralUSD,
                    collateralLINA,

                    priceRates,

                    buildRatio,

                    amountLINA,
                    amountLINA2lUSD: bnDiv(
                        bnMul(amountLINA, priceRates.LINA),
                        priceRates.lUSD
                    ),

                    stakedLINA,
                    stakedLINA2lUSD: bnDiv(
                        bnMul(bnAdd(stakedLINA, lockedLINA), priceRates.LINA),
                        priceRates.lUSD
                    ),

                    beforeCollateralLINA,
                    beforeCollateralLINA2lUSD: bnDiv(
                        bnMul(beforeCollateralLINA, priceRates.LINA),
                        priceRates.lUSD
                    )
                };

                //计算最大可以build的lUSD
                // buildData.PRatio = 500;
                // buildData.stakeAmount = utils.formatEther(maxAvaliableLINA);
                // buildData.maxAvaliablelUSD = utils.parseEther(
                //     this.calclUSD(buildData).toString()
                // );

                //计算当前Pratio
                buildData.PRatio =
                    !totalCollateralInUsd.isZero() && !amountDebt[0].isZero()
                        ? (totalCollateralInUsd / amountDebt[0]) * 100
                        : 0;

                //计算最大PRatio
                buildData.stakeAmount = utils.formatEther(maxAvaliableLINA);
                const maxPRatio = this.calcPRatio(buildData);
                buildData.maxPRatio = maxPRatio;

                //计算最小PRatio
                this.minPRatio = 100 / utils.formatEther(buildRatio);

                buildData.stakeAmount = 0;
                buildData.buildAmount = 0;

                return buildData;
            } catch (e) {
            } finally {
                this.processing = false;
            }
        },

        //根据LINA和ℓUSD计算pratio
        calcPRatio({
            stakeAmount,
            buildAmount,

            amountDebt2lUSD,
            priceRates,
            stakedLINA2lUSD
        }) {
            try {
                return Number(
                    _.floor(
                        bnMul2N(
                            bnDiv(
                                bnAdd(
                                    bnDiv(
                                        bnMul(
                                            n2bn(stakeAmount),
                                            priceRates.LINA
                                        ),
                                        priceRates.lUSD
                                    ),

                                    stakedLINA2lUSD
                                ),
                                bnAdd(amountDebt2lUSD, n2bn(buildAmount))
                            ),
                            n2bn(100)
                        ),
                        MAX_DECIMAL_LENGTH
                    )
                );

                /*  return (
                    ((stakeAmount * priceRates.LINA + stakedLINA2lUSD) /
                        (amountDebt2lUSD + buildAmount)) *
                    100
                ); */
            } catch (error) {
                return 0;
            }
        },

        //根据LINA和pratio计算ℓUSD
        calclUSD({
            stakeAmount,
            PRatio,

            amountDebt2lUSD,
            stakedLINA2lUSD,
            priceRates
        }) {
            try {
                // if(stakeAmount == maxAvaliableLINA){
                //     return maxAvaliablelUSD;
                // }

                return Number(
                    _.floor(
                        bnSub2N(
                            bnMul(
                                bnDiv(
                                    bnAdd(
                                        bnDiv(
                                            bnMul(
                                                n2bn(stakeAmount),
                                                priceRates.LINA
                                            ),
                                            priceRates.lUSD
                                        ),
                                        stakedLINA2lUSD
                                    ),
                                    n2bn(PRatio)
                                ),
                                n2bn(100)
                            ),
                            amountDebt2lUSD
                        ),
                        MAX_DECIMAL_LENGTH
                    )
                );

                // return (
                // ((stakeAmount * priceRates.LINA + stakedLINA2lUSD) /
                //     PRatio) *
                //     100 -
                // amountDebt2lUSD
                // );
            } catch (error) {
                return 0;
            }
        },

        //根据ℓUSD和pratio计算LINA
        calcLINA({
            buildAmount,
            PRatio,

            priceRates,
            amountDebt2lUSD,
            collateralLINA,
            beforeCollateralLINA
        }) {
            try {
                return Number(
                    _.floor(
                        bnSub2N(
                            bnSub(
                                bnDiv(
                                    bnMul(
                                        n2bn(PRatio),
                                        bnAdd(
                                            n2bn(buildAmount),
                                            amountDebt2lUSD
                                        )
                                    ),
                                    bnMul(n2bn(100), priceRates.LINA)
                                ),
                                beforeCollateralLINA
                            ),
                            collateralLINA
                        ),
                        MAX_DECIMAL_LENGTH
                    )
                );

                // return (
                //     (PRatio * (buildAmount + amountDebt2lUSD)) /
                //         (100 * priceRates.LINA) -
                //     beforeCollateralLINA - collateralLINA
                // );
            } catch (error) {
                return 0;
            }
        },

        //点击最大ℓUSD
        clickMaxBuildAmount() {
            this.startComputed = true; //手动设置开始计算时机
            //设置固定ratio和最大ℓUSD
            this.$set(this.buildData, "PRatio", this.minPRatio);
            this.$set(
                this.buildData,
                "buildAmount",
                formatEtherToNumber(this.buildData.maxAvaliablelUSD)
            );

            //计算lina
            let stakeAmount = this.calcLINA(this.buildData);
            this.$set(this.buildData, "stakeAmount", stakeAmount);
            this.activeItemBtn = 1;
        },

        //点击target
        clickTargetRatio() {
            this.startComputed = true; //手动设置开始计算时机
            //设置固定pratio和最大lina
            this.$set(this.buildData, "PRatio", this.minPRatio);
            this.$set(
                this.buildData,
                "stakeAmount",
                formatEtherToNumber(this.buildData.maxAvaliableLINA)
            );

            //计算ℓUSD
            let buildAmount = this.calclUSD(this.buildData);
            this.$set(this.buildData, "buildAmount", buildAmount);

            this.activeItemBtn = 2;
        },

        //stakeAmount改变事件
        changeStakeAmount(currentValue) {
            this.startComputed = true; //手动设置开始计算时机
            //设置lina和固定pratio
            this.$set(this.buildData, "PRatio", this.minPRatio);

            //计算ℓUSD
            let buildAmount = this.calclUSD(this.buildData);
            this.$set(this.buildData, "buildAmount", buildAmount);
        },

        changeBuildAmount(currentValue) {
            this.startComputed = true; //手动设置开始计算时机
            //lina不变,改变ℓUSD,计算pratio
            let pratio = this.calcPRatio(this.buildData);
            this.$set(this.buildData, "PRatio", pratio);
        },

        //ratio改变事件
        changeRatio(currentValue) {
            this.startComputed = true; //手动设置开始计算时机
            this.$set(
                this.buildData,
                "stakeAmount",
                formatEtherToNumber(this.buildData.maxAvaliableLINA)
            );

            //计算ℓUSD
            let buildAmount;
            // if (currentValue == _.floor(this.buildData.maxPRatio)) {
            //     buildAmount = 0;
            // } else {
            //     buildAmount = this.calclUSD(this.buildData);
            // }

            buildAmount = this.calclUSD(this.buildData);

            this.$set(this.buildData, "buildAmount", buildAmount);
        },

        /**
         * 点击build
         */
        async clickBuild() {
            try {
                if (!this.buildDisabled) {
                    this.processing = true;

                    const {
                        lnrJS: {
                            LnProxyERC20,
                            LnBuildBurnSystem,
                            LnCollateralSystem
                        },
                        utils
                    } = lnrJSConnector;

                    const transactionSettings = {
                        gasPrice: this.$store.state?.gasDetails?.price,
                        gasLimit: this.gasLimit
                    };

                    //取合约地址
                    const LnCollateralSystemAddress =
                        LnCollateralSystem.contract.address;

                    //要抵押的LINA
                    const stakeAmountLINA = n2bn(
                        toNonExponential(
                            _.floor(
                                this.buildData.stakeAmount,
                                DECIMAL_PRECISION
                            )
                        )
                    );

                    //获取之前approve的数量
                    const approveAmount = await LnProxyERC20.allowance(
                        this.walletAddress,
                        LnCollateralSystemAddress
                    );

                    //LINA差值
                    const diffCollateralLINA = bnSub(
                        stakeAmountLINA,
                        approveAmount
                    );

                    //清空之前数据
                    this.waitProcessArray = [];
                    this.confirmTransactionStep = 0;


                    // 1:授权要抵押的LINA数
                    // 如果要抵押的差值大于之前授权的值,要重新approve,才能抵押LINA
                    if (diffCollateralLINA.gt(approveAmount)) {
                        this.waitProcessArray.push(BUILD_PROCESS_SETUP.APPROVE);
                    }
                    //2:抵押指定数量LINA
                    //如果要抵押的LINA不为0
                    if (!stakeAmountLINA.isZero()) {
                        this.waitProcessArray.push(BUILD_PROCESS_SETUP.STAKING);
                    }
                    //3:build指定数量lUSD(如果需要置换lUSD的话)
                    const buildAmount = toNonExponential(
                        _.floor(this.buildData.buildAmount, DECIMAL_PRECISION)
                    );
                    if (buildAmount > 0) {
                        this.waitProcessArray.push(BUILD_PROCESS_SETUP.BUILD);
                    }

                    this.actionTabs = "m1"; //进入等待页

                    this.waitProcessFlow = this.startFlow(stakeAmountLINA);

                    //开始逻辑流处理函数
                    await this.waitProcessFlow();
                }
            } catch (error) {
                this.transactionErrMsg =
                    "Something went wrong, please try again.";
            } finally {
                this.processing = false;
            }
        },

        //开始逻辑流(闭包,可复用)
        startFlow(stakeAmountLINA) {
            return async () => {
                try {
                    this.transactionErrMsg = "";

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.APPROVE
                    ) {
                        await this.startApproveContract(stakeAmountLINA);
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.STAKING
                    ) {
                        await this.startStakingContract(stakeAmountLINA);
                    }

                    if (
                        this.waitProcessArray[this.confirmTransactionStep] ==
                        BUILD_PROCESS_SETUP.BUILD
                    ) {
                        await this.startBuildContract();
                    }
                } catch (error) {
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
                }
            };
        },

        //开始Approve合约调用
        async startApproveContract(approveAmountLINA) {
            this.confirmTransactionStatus = false;

            const {
                lnrJS: { LnCollateralSystem, LnProxyERC20 },
                utils
            } = lnrJSConnector;

            //取合约地址
            const LnCollateralSystemAddress =
                LnCollateralSystem.contract.address;

            const transactionSettings = {
                gasPrice: this.$store.state?.gasDetails?.price,
                gasLimit: this.gasLimit
            };

            //set max number to approve
            const MAX_SAFE_INTEGER = n2bn(Number.MAX_SAFE_INTEGER);

            transactionSettings.gasLimit = await this.getGasEstimateFromApprove(
                LnCollateralSystemAddress,
                MAX_SAFE_INTEGER
            );

            let transaction = await LnProxyERC20.approve(
                LnCollateralSystemAddress,
                MAX_SAFE_INTEGER,
                transactionSettings
            );

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;
                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.APPROVE,
                    value: `Building ${this.confirmTransactionStep + 1} / ${
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

        //开始抵押合约调用
        async startStakingContract(stakeAmountLINA) {
            this.confirmTransactionStatus = false;

            const {
                lnrJS: { LnCollateralSystem },
                utils
            } = lnrJSConnector;

            const transactionSettings = {
                gasPrice: this.$store.state?.gasDetails?.price,
                gasLimit: this.gasLimit
            };

            transactionSettings.gasLimit = await this.getGasEstimateFromStaking(
                stakeAmountLINA
            );

            let transaction = await LnCollateralSystem.Collateral(
                utils.formatBytes32String("LINA"),
                stakeAmountLINA,
                transactionSettings
            );

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;
                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.STAKING,
                    value: `Building ${this.confirmTransactionStep + 1} / ${
                        this.waitProcessArray.length
                    }`
                });

                let status = await utils.waitForTransaction(transaction.hash);

                if (!status) {
                    throw {
                        code: 6100002,
                        message:
                            "Something went wrong while staking your asset, please try again."
                    };
                }

                this.confirmTransactionStep += 1;
            }
        },

        //开始Build合约调用
        async startBuildContract() {
            this.confirmTransactionStatus = false;

            //手动报错,无用时删除
            // this.buildData.priceRates.LINA = this.buildData.priceRates.LINA.add(
            //     n2bn("0.01")
            // );

            //处理价格波动
            await this.handlePriceChange();

            const buildAmountlUSD = _.floor(
                this.buildData.buildAmount,
                DECIMAL_PRECISION
            );

            const {
                lnrJS: { LnBuildBurnSystem },
                utils
            } = lnrJSConnector;

            const transactionSettings = {
                gasPrice: this.$store.state?.gasDetails?.price,
                gasLimit: this.gasLimit
            };

            transactionSettings.gasLimit = await this.getGasEstimateFromBuild(
                buildAmountlUSD,
                maxAvaliablelUSD
            );

            const maxAvaliablelUSD = _.floor(
                formatEtherToNumber(this.buildData.maxAvaliablelUSD),
                DECIMAL_PRECISION
            );

            let transaction;
            if (buildAmountlUSD >= maxAvaliablelUSD) {
                transaction = await LnBuildBurnSystem.BuildMaxAsset(
                    transactionSettings
                );
            } else {
                transaction = await LnBuildBurnSystem.BuildAsset(
                    utils.parseEther(buildAmountlUSD.toString()),
                    transactionSettings
                );
            }

            if (transaction) {
                this.confirmTransactionStatus = true;
                this.confirmTransactionHash = transaction.hash;

                // 发起右下角通知
                this.$pub.publish("notificationQueue", {
                    hash: this.confirmTransactionHash,
                    type: BUILD_PROCESS_SETUP.BUILD,
                    value: `Building ${this.confirmTransactionStep + 1} / ${
                        this.waitProcessArray.length
                    }`
                });

                let status = await utils.waitForTransaction(transaction.hash);

                if (!status) {
                    throw {
                        code: 6100003,
                        message:
                            "Something went wrong while building your ℓUSD, please try again."
                    };
                }

                this.confirmTransactionStep += 1;
            }
        },

        //评估Approve的gas
        async getGasEstimateFromApprove(contractAddress, approveAmountLINA) {
            try {
                const {
                    lnrJS: { LnProxyERC20 },
                    utils
                } = lnrJSConnector;

                if (
                    approveAmountLINA.isZero() ||
                    approveAmountLINA.lt("0") //小于等于0
                ) {
                    throw new Error("invalid approveAmountLINA");
                }

                let gasEstimate = await LnProxyERC20.contract.estimateGas.approve(
                    contractAddress,
                    approveAmountLINA
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.approve);
            }
        },

        //评估Staking的gas
        async getGasEstimateFromStaking(stakeAmountLINA) {
            try {
                const {
                    lnrJS: { LnCollateralSystem },
                    utils
                } = lnrJSConnector;

                if (
                    stakeAmountLINA.isZero() ||
                    stakeAmountLINA.lt("0") //小于等于0
                ) {
                    throw new Error("invalid stakeAmountLINA");
                }

                let gasEstimate = await LnCollateralSystem.contract.estimateGas.Collateral(
                    utils.formatBytes32String("LINA"),
                    stakeAmountLINA
                );

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.staking);
            }
        },

        //评估Build的gas
        async getGasEstimateFromBuild(buildAmountlUSD, maxAvaliablelUSD) {
            try {
                const {
                    lnrJS: { LnBuildBurnSystem },
                    utils
                } = lnrJSConnector;

                if (
                    buildAmountlUSD <= 0 //小于等于0
                ) {
                    throw new Error("invalid buildAmountlUSD");
                }

                let gasEstimate;
                if (buildAmountlUSD >= maxAvaliablelUSD) {
                    gasEstimate = await LnBuildBurnSystem.contract.estimateGas.BuildMaxAsset();
                } else {
                    gasEstimate = await LnBuildBurnSystem.contract.estimateGas.BuildAsset(
                        utils.parseEther(buildAmountlUSD.toString())
                    );
                }

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                return bufferGasLimit(DEFAULT_GAS_LIMIT.build);
            }
        },

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
        clickBuy() {
            window.open(
                "https://app.uniswap.org/#/swap?inputCurrency=0x3e9bc21c9b189c09df3ef1b824798658d5011937&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7"
            );
            this.activeItemBtn = 0;
        },

        //查询hash
        etherscan() {
            openEtherScan(this.confirmTransactionHash);
        },

        //交易状态页面回调方法 回到主页
        goHomePage() {
            this.$store.commit("setCurrentAction", 0);
        },

        //回到默认状态
        //Back to default page
        async setDefaultTab() {
            this.activeItemBtn = -1;
            this.actionTabs = "m0";

            this.waitProcessArray = [];
            this.confirmTransactionStep = 0;
            (this.transactionErrMsg = ""),
                //重新拉取新数据
                (this.buildData = await this.getBuildData(this.walletAddress));
        },

        //重试
        //Retry page
        async tryAgain() {
            this.setDefaultTab();
        }
    }
};
</script>

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
                                        display: flex;
                                        align-items: center;

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
