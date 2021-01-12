<!-- swap多步 -->

<template>
    <div id="watingEnhanceSwapNew">
        <div class="close" @click.stop="setDefaultTab">
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

            <TabPane name="m1" class="waitingPage">
                <div class="waitTitle">
                    <!-- 切链 -->
                    <template v-if="confirmTransactionChainChanging">
                        <!-- 原始钱包是metamask,目标是bsc钱包 -->
                        <template
                            v-if="
                                sourceWalletType ==
                                    SUPPORTED_WALLETS_MAP.METAMASK &&
                                    targetWalletType ==
                                        SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                            "
                        >
                            Please switch to BSC Wallet
                        </template>

                        <!-- 原始钱包是metamask,目标是metamask钱包 -->
                        <template
                            v-else-if="
                                sourceWalletType ==
                                    SUPPORTED_WALLETS_MAP.METAMASK &&
                                    targetWalletType ==
                                        SUPPORTED_WALLETS_MAP.METAMASK
                            "
                        >
                            Switch to
                            <template v-if="isEthereumNetwork(sourceNetworkId)"
                                >Binance</template
                            >
                            <template
                                v-else-if="isBinanceNetwork(sourceNetworkId)"
                                >Ethereum</template
                            >

                            Network On Metamask
                        </template>

                        <!-- 原始钱包是BSC -->
                        <template
                            v-else-if="
                                sourceWalletType ==
                                    SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                            "
                        >
                            Please switch to Metamask Wallet
                        </template>
                    </template>

                    <!-- 不是切链状态 -->
                    <template v-else>
                        <!-- 已经完成 -->
                        <span
                            v-if="
                                confirmTransactionStep >
                                    waitProcessArray.length - 1
                            "
                            >Congratulations!</span
                        >
                        <!-- 当前有错误 -->
                        <span v-else-if="transactionErrMsg"
                            >Oops! Something went wrong</span
                        >
                        <!-- 没完成,没错误,没确认 -->
                        <span v-else-if="!confirmTransactionStatus">
                            Confirm with
                            <template
                                v-if="
                                    currentWalletType ==
                                        SUPPORTED_WALLETS_MAP.METAMASK
                                "
                            >
                                Metamask
                            </template>

                            <template
                                v-if="
                                    currentWalletType ==
                                        SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                "
                            >
                                BSC Wallet
                            </template>
                        </span>
                        <!-- 没完成,没错误,已确认 -->
                        <span v-else>
                            <template v-if="isMobile">
                                Interacting
                            </template>
                            <template v-else>
                                Interacting with the smart contract
                            </template>
                        </span>
                    </template>
                </div>

                <div class="waitDesc">
                    <!-- 已经完成 -->
                    <span
                        v-if="
                            confirmTransactionStep > waitProcessArray.length - 1
                        "
                    >
                        <!-- 手机端 -->
                        <template v-if="isMobile"
                            >Swap transaction has been processed.</template
                        >
                        <!-- pc端 -->
                        <template v-else
                            >Your transaction has been processed
                            already</template
                        >
                    </span>
                    <!-- 有错误 -->
                    <span class="error" v-else-if="transactionErrMsg">{{
                        transactionErrMsg
                    }}</span>
                    <!-- 没完成没错误且是移动端 -->
                    <span v-else-if="isMobile">
                        Swap transaction is in progress
                    </span>
                </div>

                <div class="waitWalletBox">
                    <!-- 切链 -->
                    <template v-if="confirmTransactionChainChanging">
                        <!-- 原始钱包是metamask,目标是bsc钱包 -->
                        <template
                            v-if="
                                sourceWalletType ==
                                    SUPPORTED_WALLETS_MAP.METAMASK &&
                                    targetWalletType ==
                                        SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                            "
                        >
                            <div class="walletItem">
                                <div class="walletIcon">
                                    <img
                                        class="leftIcon"
                                        src="@/static/transferProgress/wallet_icon.svg"
                                        alt=""
                                    />

                                    <img
                                        class="rightIcon"
                                        src="@/static/metamask.svg"
                                        alt=""
                                    />
                                </div>

                                <div class="walletNetwork">
                                    Metamask
                                </div>

                                <div class="walletAddress">
                                    {{ abbreviateAddress(sourceWalletAddress) }}
                                </div>
                            </div>
                            <img
                                class="walletArrow"
                                src="@/static/transferProgress/arrow_right.svg"
                                alt=""
                            />
                            <div class="walletItem">
                                <div class="walletIcon">
                                    <img
                                        class="leftIcon"
                                        src="@/static/transferProgress/wallet_icon.svg"
                                        alt=""
                                    />

                                    <img
                                        class="rightIcon"
                                        src="@/static/binance.svg"
                                        alt=""
                                    />
                                </div>

                                <div class="walletNetwork">
                                    BSC Chain Wallet
                                </div>

                                <div class="walletAddress">
                                    {{ abbreviateAddress(targetWalletAddress) }}
                                </div>
                            </div>
                        </template>

                        <!-- 原始钱包是metamask,目标是metamask钱包 -->
                        <template
                            v-else-if="
                                sourceWalletType ==
                                    SUPPORTED_WALLETS_MAP.METAMASK &&
                                    targetWalletType ==
                                        SUPPORTED_WALLETS_MAP.METAMASK
                            "
                        >
                            <div class="walletItem">
                                <div class="walletIcon">
                                    <img
                                        class="leftIcon"
                                        src="@/static/metamask.svg"
                                        alt=""
                                    />

                                    <img
                                        class="rightIcon"
                                        src="@/static/ETH.svg"
                                        alt=""
                                    />
                                </div>

                                <div class="walletNetwork">
                                    Metamask
                                </div>

                                <div class="walletAddress">
                                    {{ abbreviateAddress(sourceWalletAddress) }}
                                </div>
                            </div>
                            <img
                                class="walletArrow"
                                src="@/static/transferProgress/arrow_right.svg"
                                alt=""
                            />
                            <div class="walletItem">
                                <div class="walletIcon">
                                    <img
                                        class="leftIcon"
                                        src="@/static/metamask.svg"
                                        alt=""
                                    />

                                    <img
                                        class="rightIcon"
                                        src="@/static/bnb.svg"
                                        alt=""
                                    />
                                </div>

                                <div class="walletNetwork">
                                    BSC Network
                                </div>

                                <div class="walletAddress">
                                    {{ abbreviateAddress(targetWalletAddress) }}
                                </div>
                            </div>
                        </template>

                        <!-- 原始钱包是BSC -->
                        <template
                            v-else-if="
                                sourceWalletType ==
                                    SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                            "
                        >
                            <div class="walletItem">
                                <div class="walletIcon">
                                    <img
                                        class="leftIcon"
                                        src="@/static/metamask.svg"
                                        alt=""
                                    />

                                    <img
                                        class="rightIcon"
                                        src="@/static/ETH.svg"
                                        alt=""
                                    />
                                </div>

                                <div class="walletNetwork">
                                    Metamask
                                </div>

                                <div class="walletAddress">
                                    {{ abbreviateAddress(targetWalletAddress) }}
                                </div>
                            </div>
                        </template>
                    </template>

                    <!-- 不是切链 -->
                    <div class="walletItem" v-else>
                        <div class="walletIcon">
                            <!-- 原始钱包是metamask,目标是bsc钱包 -->
                            <template
                                v-if="
                                    sourceWalletType ==
                                        SUPPORTED_WALLETS_MAP.METAMASK &&
                                        targetWalletType ==
                                            SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                "
                            >
                                <img
                                    v-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.METAMASK
                                    "
                                    class="leftIcon"
                                    src="@/static/metamask.svg"
                                    alt=""
                                />

                                <img
                                    v-else-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                    "
                                    class="leftIcon"
                                    src="@/static/binance.svg"
                                    alt=""
                                />

                                <img
                                    v-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.METAMASK
                                    "
                                    class="rightIcon"
                                    src="@/static/ETH.svg"
                                    alt=""
                                />

                                <img
                                    v-else-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                    "
                                    class="rightIcon"
                                    src="@/static/bnb.svg"
                                    alt=""
                                />
                            </template>

                            <!-- 原始钱包是metamask,目标是metamask钱包 -->
                            <template
                                v-else-if="
                                    sourceWalletType ==
                                        SUPPORTED_WALLETS_MAP.METAMASK &&
                                        targetWalletType ==
                                            SUPPORTED_WALLETS_MAP.METAMASK
                                "
                            >
                                <img
                                    class="leftIcon"
                                    src="@/static/metamask.svg"
                                    alt=""
                                />

                                <img
                                    v-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.METAMASK
                                    "
                                    class="rightIcon"
                                    src="@/static/ETH.svg"
                                    alt=""
                                />

                                <img
                                    v-else-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                    "
                                    class="rightIcon"
                                    src="@/static/bnb.svg"
                                    alt=""
                                />
                            </template>

                            <!-- 原始钱包是BSC -->
                            <template
                                v-else-if="
                                    sourceWalletType ==
                                        SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                "
                            >
                                <img
                                    v-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.METAMASK
                                    "
                                    class="leftIcon"
                                    src="@/static/metamask.svg"
                                    alt=""
                                />

                                <img
                                    v-else-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                    "
                                    class="leftIcon"
                                    src="@/static/binance.svg"
                                    alt=""
                                />

                                <img
                                    v-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.METAMASK
                                    "
                                    class="rightIcon"
                                    src="@/static/ETH.svg"
                                    alt=""
                                />

                                <img
                                    v-if="
                                        currentWalletType ==
                                            SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                    "
                                    class="rightIcon"
                                    src="@/static/bnb.svg"
                                    alt=""
                                />
                            </template>
                        </div>

                        <div class="walletNetwork">
                            <template
                                v-if="
                                    currentWalletType ==
                                        SUPPORTED_WALLETS_MAP.METAMASK
                                "
                                >Metamask</template
                            >

                            <template
                                v-else-if="
                                    currentWalletType ==
                                        SUPPORTED_WALLETS_MAP.BINANCE_CHAIN
                                "
                                >BSC Chain Wallet</template
                            >
                        </div>

                        <div class="walletAddress">
                            {{ abbreviateAddress(walletAddress) }}
                        </div>
                    </div>
                </div>

                <div class="processBar">
                    <div class="itemBox">
                        <div
                            v-for="(item, index) in waitProcessArray"
                            :key="index"
                            class="item"
                        >
                            <div class="imgBox">
                                <transition-group name="img-fade">
                                    <!-- 已经完成的进度 -->
                                    <img
                                        key="1"
                                        v-if="confirmTransactionStep < index"
                                        src="@/static/transferProgress/default.svg"
                                    />

                                    <!-- 未完成,没错误,在当前进度 -->

                                    <template
                                        v-else-if="
                                            confirmTransactionStep == index &&
                                                !transactionErrMsg
                                        "
                                    >
                                        <img
                                            key="2"
                                            class="loading"
                                            src="@/static/transferProgress/loading.svg"
                                        />

                                        <!-- 不是移动端 -->
                                        <template v-if="!isMobile">
                                            <!-- 切链 -->
                                            <template
                                                v-if="
                                                    confirmTransactionChainChanging
                                                "
                                            >
                                                <img
                                                    v-if="
                                                        isEthereumNetwork(
                                                            targetNetworkId
                                                        )
                                                    "
                                                    key="23"
                                                    class="walletType"
                                                    src="@/static/transferProgress/eth_network.svg"
                                                />
                                                <img
                                                    v-if="
                                                        isBinanceNetwork(
                                                            targetNetworkId
                                                        )
                                                    "
                                                    key="24"
                                                    class="walletType"
                                                    src="@/static/transferProgress/bsc_network.svg"
                                                />
                                            </template>

                                            <!-- 不是切链 -->
                                            <template v-else>
                                                <img
                                                    v-if="
                                                        isEthereumNetwork(
                                                            confirmTransactionNetworkId
                                                        )
                                                    "
                                                    key="23"
                                                    class="walletType"
                                                    src="@/static/transferProgress/eth_network.svg"
                                                />
                                                <img
                                                    v-if="
                                                        isBinanceNetwork(
                                                            confirmTransactionNetworkId
                                                        )
                                                    "
                                                    key="24"
                                                    class="walletType"
                                                    src="@/static/transferProgress/bsc_network.svg"
                                                />
                                            </template>
                                        </template>
                                    </template>

                                    <!-- 没完成,当前进度有错误 -->
                                    <img
                                        key="3"
                                        v-else-if="
                                            confirmTransactionStep == index &&
                                                transactionErrMsg
                                        "
                                        src="@/static/transferProgress/failed.svg"
                                    />

                                    <!-- 已完成进度没错误 -->
                                    <img
                                        key="4"
                                        v-else-if="
                                            confirmTransactionStep > index &&
                                                !transactionErrMsg
                                        "
                                        src="@/static/transferProgress/completed.svg"
                                    />

                                    <!-- 已完成进度有错误 -->
                                    <img
                                        key="5"
                                        v-else-if="
                                            confirmTransactionStep > index &&
                                                transactionErrMsg
                                        "
                                        src="@/static/transferProgress/completed_disable.svg"
                                    />
                                </transition-group>
                            </div>
                            <div
                                class="text"
                                :class="{
                                    current: confirmTransactionStep == index
                                }"
                            >
                                {{ item }}
                            </div>

                            <!-- 不是移动端 -->
                            <template v-if="!isMobile">
                                <!-- 当前进度,已确认,没有错误 -->
                                <div
                                    class="view"
                                    v-if="
                                        confirmTransactionStep == index &&
                                            confirmTransactionStatus &&
                                            !transactionErrMsg
                                    "
                                    @click.stop="
                                        openBlockchainBrowser(
                                            confirmTransactionHash,
                                            confirmTransactionNetworkId
                                        )
                                    "
                                >
                                    <template
                                        v-if="
                                            isEthereumNetwork(
                                                confirmTransactionNetworkId
                                            )
                                        "
                                    >
                                        View Etherscan
                                    </template>
                                    <template
                                        v-else-if="
                                            isBinanceNetwork(
                                                confirmTransactionNetworkId
                                            )
                                        "
                                    >
                                        View Bscscan
                                    </template>

                                    <img src="@/static/arrow_right.svg" />
                                </div>
                                <!-- 当前进度有错误 -->
                                <div
                                    v-else-if="
                                        confirmTransactionStep == index &&
                                            transactionErrMsg
                                    "
                                    class="tryAgain"
                                    @click.stop="waitProcessFlow"
                                >
                                    try again
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="dividerBox">
                        <ul>
                            <li
                                v-for="(item, index) in waitProcessArray"
                                :key="index"
                                class="divider"
                                :class="{
                                    has: index < waitProcessArray.length - 1,
                                    active:
                                        confirmTransactionStep > index &&
                                        !transactionErrMsg
                                }"
                                :style="{
                                    left: `calc(100% / ${waitProcessArray.length} /2)`
                                }"
                            ></li>
                        </ul>
                    </div>
                </div>

                <!-- 不是等待切链状态且是移动端的时候 -->
                <div
                    v-if="!confirmTransactionChainChanging && isMobile"
                    class="mobileBtns"
                >
                    <!-- 完成 -->
                    <div
                        class="funcMobileBtn"
                        v-if="
                            confirmTransactionStep > waitProcessArray.length - 1
                        "
                        @click.stop="setDefaultTab"
                    >
                        Done
                    </div>
                    <!-- 错误 -->
                    <div
                        class="funcMobileBtn"
                        v-else-if="transactionErrMsg"
                        @click.stop="waitProcessFlow"
                    >
                        try again
                    </div>
                    <!-- 未确认交易 -->
                    <!-- <div class="funcMobileBtn" v-else-if="!confirmTransactionChainChanging">
                Confirm Contract
            </div> -->

                    <div
                        class="viewMobileBtn"
                        v-if="confirmTransactionStatus"
                        @click.stop="
                            openBlockchainBrowser(
                                confirmTransactionHash,
                                confirmTransactionNetworkId
                            )
                        "
                    >
                        <template
                            v-if="
                                isEthereumNetwork(confirmTransactionNetworkId)
                            "
                        >
                            View Etherscan
                        </template>
                        <template
                            v-else-if="
                                isBinanceNetwork(confirmTransactionNetworkId)
                            "
                        >
                            View Bscscan
                        </template>
                        <img src="@/static/arrow_right.svg" />
                    </div>
                </div>
            </TabPane>
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
import { bn2n, bnSub, n2bn } from "@/common/bnCalc";
import { providers } from "ethers";
import { LinearJs } from "@/assets/linearLibrary/linearJs";
import {
    BUILD_PROCESS_SETUP,
    BUILD_PROCESS_SETUP_MOBILE,
    DECIMAL_PRECISION
} from "@/assets/linearLibrary/linearTools/constants/process";
import {
    formatAddressToByte32,
    formatStringToByte32,
    abbreviateAddress
} from "@/assets/linearLibrary/linearTools/format";
import { BigNumber } from "ethers";
import { lnr } from "@/assets/linearLibrary/linearTools/request/linearData/transactionData";

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
            BUILD_PROCESS_SETUP,
            SUPPORTED_WALLETS_MAP,

            openBlockchainBrowser,
            isEthereumNetwork,
            isBinanceNetwork,
            abbreviateAddress,

            actionTabs: "m0", //m0检查页,m1交易页

            checkStatus: {
                stepIndex: 0, //当前检查步骤
                stepError: "", //错误信息
                stepType: -1, //步骤类型,-1默认,0显示错误文本,1余额不足,2未安装钱包插件,3bsc子步骤

                stepArray: [], //检测进度组

                bscStepIndx: 0, //bsc所在步骤位置
                bscSubStep: ["BNB Tokens"],
                bscstepType: -1 //子步骤类型,-1默认,0只需要购买bnb,1需要购买eth再买bnb
            },

            sourceGasPrice: "",
            targetGasPrice: "",

            freezeFee: "", //
            unfreezeFee: "", //

            frozenBalance: 0,

            // waitProcessArray: [],
            waitProcessArray: [
                "Approve address",
                "Contract on ETH",
                "Contract on BSC"
            ], //等待交易进度组

            waitProcessFlow: Function,
            confirmTransactionStep: 0,
            swapUnfreezeContinue: false,
            freezeSuccessHash: "",
            sourceWalletType: "BinanceChain",
            targetWalletType: "MetaMask",
            sourceNetworkId: "3",
            targetNetworkId: "97",
            confirmTransactionNetworkId: "3",
            sourceWalletAddress: "0x9E2661CC2B535339133652e501766518FA475E71",
            targetWalletAddress: "0x1501794bEB40A9DAff574eEBCFA0049677b5Da32",
            transactionErrMsg: "",
            chainChangedStatus: false,
            confirmTransactionChainChanging: false,
            confirmTransactionStatus: false,

            //调试
            currentWalletType: "BinanceChain"
        };
    },
    watch: {
        // currentWalletType() {},
        hasBinanceWallet() {},
        isMobile() {},
        walletAddress() {},
        walletNetworkId() {}
        // isEthereumNetwork() {},
        // isBinanceNetwork() {}
    },
    computed: {
        // currentWalletType() {
        //     return this.$store.state?.walletType;
        // },

        hasBinanceWallet() {
            return window.BinanceChain;
        },

        walletNetworkId() {
            return this.$store.state?.walletNetworkId;
        },

        // isEthereumNetwork() {
        //     return isEthereumNetwork(this.walletNetworkId);
        // },

        // isBinanceNetwork() {
        //     return isBinanceNetwork(this.walletNetworkId);
        // },

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

            this.checkContract();
        }
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
                //记录gas price
                this.sourceGasPrice =
                    this.$store.state?.sourceGasDetails?.price ||
                    50 * 1000000000;
                this.targetGasPrice =
                    this.$store.state?.targetGasDetails?.price ||
                    50 * 1000000000;

                // this.targetWalletAddress = this.walletAddress;
                // await this.checkContract();
                this.actionTabs = "m1";

                return;

                this.checkStatus.stepIndex = currentStep;
                this.checkStatus.stepError = "";
                this.checkStatus.bscSubStep = ["BNB Tokens"];
                this.checkStatus.bscstepType = -1;
                this.checkStatus.stepType = -1;

                if (currentStep < 1) {
                    await this.checkSounrceBalance();

                    if (this.checkStatus.stepType != -1) {
                        return;
                    }
                }

                if (currentStep < 2) {
                    await this.checkTargetBalace();

                    if (this.checkStatus.stepType != -1) {
                        return;
                    }
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

        async checkContract() {
            try {
                //移动端更换进度设置
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
                        LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge,
                        suffixETH = this.isMobile ? " ETH" : " Ethereum";
                    if (isEthereumNetwork(this.walletNetworkId)) {
                        LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                        // LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                        this.BUILD_PROCESS_SETUP.FREEZE =
                            this.BUILD_PROCESS_SETUP.SWAP + suffixETH;
                        this.BUILD_PROCESS_SETUP.UNFREEZE =
                            this.BUILD_PROCESS_SETUP.SWAP + " BSC";
                    } else if (isBinanceNetwork(this.walletNetworkId)) {
                        LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                        // LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
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
                    this.sourceWalletType = this.currentWalletType;

                    //记录原始网络类型
                    this.sourceNetworkId = this.walletNetworkId;

                    //记录目标网络id
                    this.targetNetworkId = getOtherNetworks(
                        this.walletNetworkId
                    ).join();

                    //记录原始钱包地址
                    this.sourceWalletAddress = this.walletAddress.toLocaleLowerCase();
                }

                this.actionTabs = "m1"; //进入等待页

                this.waitProcessFlow = this.startFlow();

                // //开始逻辑流处理函数
                await this.waitProcessFlow();
            } catch (error) {
                this.frozenBalance = 0;
                console.log(error, "getFrozenBalance error");
            } finally {
                this.processing = false;
            }
        },

        startFlow() {
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

            let LnProxy,
                LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
            if (isEthereumNetwork(this.walletNetworkId)) {
                LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                // LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
            } else if (isBinanceNetwork(this.walletNetworkId)) {
                LnProxy = lnrJSConnector.lnrJS.LinearFinance;
                // LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
            }

            const { utils } = lnrJSConnector;

            //取合约地址
            const LnBridgeAddress = LnBridge.contract.address;

            const transactionSettings = {
                gasPrice: this.sourceGasPrice,
                gasLimit: DEFAULT_GAS_LIMIT.approve
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
                let LnProxy;
                if (isEthereumNetwork(this.walletNetworkId)) {
                    LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                } else if (isBinanceNetwork(this.walletNetworkId)) {
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

            let LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge,
                SETUP,
                suffixETH = this.isMobile ? " ETH" : " Ethereum";
            if (isEthereumNetwork(this.walletNetworkId)) {
                // LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                SETUP = suffixETH;
            } else if (isBinanceNetwork(this.walletNetworkId)) {
                // LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
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

            let transaction = await LnBridge.deposit(
                utils.formatBytes32String("LINA"),
                swapNumber,
                this.targetNetworkId,
                formatAddressToByte32(this.targetWalletAddress),
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

        //评估冻结gas limit
        async getGasEstimateFromFreeze(LnBridge, swapNumber) {
            try {
                if (
                    swapNumber.lte(n2bn("0")) //小于等于0
                ) {
                    throw new Error("invalid freezeAmount");
                }

                const { utils } = lnrJSConnector;

                let gasEstimate = await LnBridge.contract.estimateGas.deposit(
                    utils.formatBytes32String("LINA"),
                    swapNumber,
                    this.targetNetworkId,
                    formatAddressToByte32(this.targetWalletAddress)
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
                // walletStatus = await this.waitChainChange();
                walletStatus = true;
                console.log("手动切换metamask链完成");
            } else {
                walletStatus = true;
            }

            this.confirmTransactionNetworkId = this.walletNetworkId;

            //验证当前网络id是否目标网络id
            // if (this.walletNetworkId != this.targetNetworkId) {
            //     throw {
            //         code: 6100007,
            //         message:
            //             "The network is not correct. Please switch to a valid network"
            //     };
            // }

            //验证钱包地址是否相同
            // if (
            //     this.walletAddress.toLocaleLowerCase() !=
            //     this.sourceWalletAddress
            // ) {
            //     throw {
            //         code: 6100005,
            //         message:
            //             "The wallet address is inconsistent, please confirm and try again"
            //     };
            // }

            if (walletStatus) {
                let LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge,
                    SETUP,
                    suffixETH = this.isMobile ? " ETH" : " Ethereum";
                if (isEthereumNetwork(this.walletNetworkId)) {
                    // LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
                    SETUP = suffixETH;
                } else if (isBinanceNetwork(this.walletNetworkId)) {
                    // LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
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

                    // let processArray = await LnBridge.getPendingProcess(
                    //     this.walletAddress
                    // );

                    let processArray = [];

                    let sourceArray = await lnr.freeZe(
                        this.sourceWalletAddress
                    );
                    let targetArray = await lnr.unfreeze(
                        this.targetWalletAddress
                    );

                    console.log(sourceArray, targetArray);

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

        //检查原始网络余额
        async checkSounrceBalance() {
            let sourceCurrency = isEthereumNetwork(this.walletNetworkId)
                ? "ETH"
                : "BNB";

            const sourceBalance = await lnrJSConnector.provider.getBalance(
                this.walletAddress
            );

            const freezeFee = await this.getFreezeFee();
            console.log(freezeFee, "freezeFee");
            console.log(sourceBalance / 1e18, "sourceBalance");

            if (sourceBalance.lt(n2bn(freezeFee))) {
                if (isBinanceNetwork(this.walletNetworkId)) {
                    await this.checkBinanceBalance(sourceBalance, freezeFee);
                    if (this.checkStatus.bscstepType != -1) {
                        return;
                    }
                }

                this.checkStatus.stepType = 1;
                this.checkStatus.stepError = `Get some ${sourceCurrency} on your wallet`;
                return;
            }
            this.checkStatus.stepIndex++;
        },

        //检查目标网络余额
        async checkTargetBalace() {
            let targetCurrency = isEthereumNetwork(this.targetNetworkId)
                ? "ETH"
                : "BNB";

            const { result } = await api.getWalletBalance(
                this.walletAddress,
                this.targetNetworkId
            );
            let targetBalance = n2bn(result / 1e18);

            let unfreezeFee = isEthereumNetwork(this.targetNetworkId)
                ? 0.1
                : 0.01;

            console.log(unfreezeFee, "unfreezeFee");
            console.log(targetBalance / 1e18, "targetBalance");

            if (targetBalance.lt(n2bn(unfreezeFee))) {
                if (isBinanceNetwork(this.targetNetworkId)) {
                    await this.checkBinanceBalance(targetBalance, unfreezeFee);

                    if (this.checkStatus.bscstepType != -1) {
                        return;
                    }
                }

                this.checkStatus.stepType = 1;
                this.checkStatus.stepError = `Get some ${targetCurrency} on your wallet`;
                return;
            }
            this.checkStatus.stepIndex++;

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
        },

        //检查bsc的eth余额
        async checkBinanceBalance(preBalance, preFee) {
            this.checkStatus.bscSubStep.push("ETH Tokens");

            const ethContractAddress =
                BINANCE_TOKEN_ADDRESS[this.targetNetworkId].ETH;
            const { result } = await api.getTokenBalance(
                this.walletAddress,
                ethContractAddress,
                this.targetNetworkId
            );
            const ethBalance = n2bn(result / 1e18);

            //手续费-余额=相差金额
            const difference = bnSub(n2bn(preFee), preBalance);
            console.log(ethBalance / 1e18, "ethBalance");
            console.log(difference / 1e18, "difference");

            //eth够差额
            if (ethBalance.gte(difference)) {
                this.checkStatus.bscstepType = 0;
            } else {
                //不够差额
                this.checkStatus.bscstepType = 1;
            }

            this.checkStatus.stepType = 3;
            this.checkStatus.stepError = "error";
        },

        //连接钱包
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
                    // if (
                    //     this.checkStatus.stepIndex == 2 &&
                    //     this.targetWalletAddress !=
                    //         this.walletAddress.toLowerCase()
                    // ) {
                    //     throw {
                    //         code: 100003,
                    //         message:
                    //             "The destination wallet address is inconsistent"
                    //     };
                    // }
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
            let type,
                contract = "LnErc20Bridge";
            if (isEthereumNetwork(this.targetNetworkId)) {
                type = SUPPORTED_WALLETS_MAP.METAMASK;
                // contract = "LnErc20Bridge";
            } else if (isBinanceNetwork(this.targetNetworkId)) {
                type = SUPPORTED_WALLETS_MAP.BINANCE_CHAIN;
                // contract = "LnBep20Bridge";
            }

            const signer = new LinearJs.signers[type]();
            this.targetContract = new LinearJs({
                networkId: Number(this.targetNetworkId),
                signer
            });

            return this.targetContract[contract];
        },

        //获取冻结手续费
        async getFreezeFee() {
            let LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
            if (isEthereumNetwork(this.walletNetworkId)) {
                // LnBridge = lnrJSConnector.lnrJS.LnErc20Bridge;
            } else if (isBinanceNetwork(this.walletNetworkId)) {
                // LnBridge = lnrJSConnector.lnrJS.LnBep20Bridge;
            }

            const gasLimit = await this.getGasEstimateFromFreeze(
                LnBridge,
                n2bn(this.swapNumber)
            );

            const fee =
                (unFormatGasPrice(this.sourceGasPrice) * gasLimit) / 1000000000;

            return fee;
        },

        //获取解冻手续费
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

        //评估解冻手续费
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

        //bsc子步骤可点击处理
        subStepClickHandle(type) {
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
            this.$emit("close");
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

            &.waitingPage {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                background-color: white;

                .waitTitle {
                    font-family: Gilroy-Bold;
                    font-size: 32px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.25;
                    letter-spacing: normal;
                    text-align: center;
                    color: #5a575c;
                    // max-width: 550px;
                    width: 100%;
                    margin-top: 228px;
                }

                .waitDesc {
                    width: 100%;
                    max-width: 500px;
                    max-height: 50px;
                    overflow-y: auto;
                    color: #5a575c;
                    font-family: Gilroy-Regular;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    position: absolute;
                    top: 272px;
                    word-break: break-all;

                    .error {
                        color: #df434c;
                    }
                }

                .waitWalletBox {
                    // width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    margin-top: 37px;

                    .walletItem {
                        // padding: 67px 35px 54px;
                        width: 160px;
                        height: 230px;
                        border-radius: 8px;
                        border: solid 1px #e5e5e5;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: center;

                        .walletIcon {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .leftIcon,
                            .rightIcon {
                                width: 40px;
                                height: 40px;
                            }
                        }

                        .walletNetwork {
                            font-family: Gilroy-Bold;
                            font-size: 14px;
                            font-weight: bold;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.29;
                            letter-spacing: normal;
                            color: #5a575c;
                            margin-top: 34px;
                        }

                        .walletAddress {
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

                        .hasBinanceWallet,
                        .notBinanceWallet {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }

                        .hasBinanceWallet {
                            .walletIcon {
                                margin-top: 24px;

                                .wallteLogo {
                                    width: 60px;
                                    height: 60px;
                                }

                                .arrow {
                                    width: 70px;
                                }
                            }

                            .divider {
                                border-top: 1px solid #e5e5e5;
                                margin: 40px 0;
                                position: relative;
                                width: 150%;

                                span {
                                    font-family: Gilroy-Regular;
                                    font-size: 16px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.5;
                                    letter-spacing: normal;
                                    text-align: center;
                                    color: #99999a;
                                    position: absolute;
                                    left: 50%;
                                    background: white;
                                    width: 75px;
                                    transform: translate(-50%, -50%);
                                }
                            }

                            .waitTitle {
                                margin-top: 0px;
                            }
                        }

                        .notBinanceWallet {
                            .walletIcon {
                                margin-top: 52px;
                            }
                        }
                    }

                    .walletArrow {
                        width: 24px;
                        height: 24px;
                        margin: 0 24px;
                    }
                }

                .processBar {
                    width: 100%;
                    max-width: 500px;
                    position: absolute;
                    bottom: 165px;

                    .itemBox {
                        width: 100%;
                        position: absolute;
                        display: flex;
                        justify-content: space-around;
                        z-index: 2;

                        .item {
                            // z-index: 1;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .imgBox {
                                position: relative;
                                width: 40px;
                                height: 40px;
                                margin-bottom: 8px;

                                img {
                                    background-color: white;
                                    border-radius: 50%;
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    transform: translateZ(0);

                                    &.walletType {
                                        width: 16px;
                                        height: 16px;
                                        top: 50%;
                                        left: 50%;
                                        transform: translate(-50%, -50%);
                                    }

                                    &.loading {
                                        animation: rotate 3s linear infinite;
                                    }
                                }
                            }

                            .text {
                                margin-bottom: 4px;
                                font-family: Gilroy-Medium;
                                font-size: 12px;
                                font-weight: 500;
                                font-stretch: normal;
                                font-style: normal;
                                line-height: 1.33;
                                letter-spacing: normal;
                                text-align: center;
                                color: #5a575c;

                                &.current {
                                    font-family: Gilroy-Bold;
                                    font-weight: bold;
                                }
                            }

                            .view,
                            .tryAgain {
                                cursor: pointer;
                                opacity: 0.2;
                                text-align: center;
                                display: flex;
                                font-family: Gilroy-Bold;
                                font-size: 10px;
                                font-weight: bold;
                                font-stretch: normal;
                                font-style: normal;
                                line-height: 1.6;
                                letter-spacing: 1.25px;
                                color: #1a38f8;
                                text-transform: uppercase;

                                transition: opacity $animete-time linear;

                                img {
                                    width: 16px;
                                    height: 16px;
                                }

                                &:hover {
                                    opacity: 1;
                                }
                            }
                        }
                    }

                    .dividerBox {
                        position: relative;
                        z-index: 1;
                        ul {
                            list-style: none;
                            width: 100%;
                            position: relative;
                            display: flex;
                            justify-content: space-around;
                            top: 17.5px;

                            li {
                                flex: 1;
                                position: relative;

                                &.has {
                                    height: 5px;
                                    background-color: #e5e5e5;

                                    &.active {
                                        background-color: #1a38f8;
                                    }
                                }
                            }
                        }
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

        .actionTabs {
            .ivu-tabs-tabpane {
                &.checkPage {
                }

                &.waitingPage {
                    padding: 24px 32px;
                    .waitTitle {
                        text-align: left;
                        font-size: 16px;
                        line-height: 1.5;
                        margin-top: 0;
                    }

                    .waitDesc {
                        text-align: left;
                        top: 48px;
                        left: 32px;
                        font-size: 12px;
                        line-height: 1.33;
                        color: #99999a;
                    }

                    .walletRect {
                        // .step {
                        //     font-size: 10px;
                        //     line-height: 1.6;
                        //     letter-spacing: 1.25px;
                        //     position: absolute;
                        //     bottom: 32px;

                        //     img {
                        //         width: 16px;
                        //         height: 16px;
                        //     }
                        // }
                        .walletIcon {
                            margin-top: 136px;
                            .wallteLogo {
                                width: 80px;
                                height: 80px;

                                &.eth {
                                    margin-left: 13px;
                                }
                            }

                            .arrow {
                                width: 24px;
                                height: 24px;
                                margin: 0 16px;
                            }
                        }

                        .notBinanceWallet {
                            .walletIcon {
                                margin-top: 136px;
                            }
                        }
                    }

                    .processBar {
                        position: absolute;
                        bottom: 0;
                        top: 288px;
                        height: 48px;
                        width: calc(100% - 20px);

                        .itemBox {
                            .item {
                                .imgBox {
                                    width: 24px;
                                    height: 24px;

                                    img {
                                        &.walletType {
                                            width: 9.6px;
                                            height: 9.6px;
                                        }
                                    }
                                }

                                .text {
                                    margin-bottom: 4px;
                                    font-family: Gilroy;
                                    font-size: 10px;
                                    line-height: 1.2;
                                }
                            }
                        }

                        .dividerBox {
                            ul {
                                top: 10.5px;
                                li {
                                    &.has {
                                        height: 3px;
                                    }
                                }
                            }
                        }
                    }

                    .close {
                        img {
                            width: 26px;
                            height: 26px;
                        }
                    }

                    .mobileBtns {
                        padding: 0 32px;
                        position: absolute;
                        bottom: 32px;
                        width: 100%;

                        .funcMobileBtn {
                            width: 100%;
                            font-family: Gilroy-Bold;
                            font-size: 12px;
                            font-weight: bold;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.33;
                            letter-spacing: 1.5px;
                            text-align: center;
                            color: #ffffff;
                            padding: 12px 24px;
                            border-radius: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #1a38f8;
                            text-transform: uppercase;
                        }

                        .viewMobileBtn {
                            margin-top: 17px;
                            font-family: Gilroy-Bold;
                            font-size: 10px;
                            font-weight: bold;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.6;
                            letter-spacing: 1.25px;
                            color: #1a38f8;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-transform: uppercase;
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
