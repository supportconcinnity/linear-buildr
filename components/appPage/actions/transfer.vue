<template>
    <div id="transfer">
        <Tabs v-model="actionTabs" class="actionTabs">
            <TabPane name="m0">
                <div class="transferBox">
                    <div class="transferMain">
                        <div class="text">
                            <div class="title">Transfer</div>
                            <div class="descript">
                                 Transfer different currencies to specified
                                wallet address
                            </div>
                        </div>
                        <div
                            class="from actionInputItem"
                            :class="{
                                error: errors.amountMsg,
                                showDropdown
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
                            <div
                                class="arrow"
                                @click.stop="showDropdownFun"
                                :class="{ showDropdown }"
                                @mouseenter="dropdownHover = true"
                                @mouseleave="dropdownHover = false"
                            >
                                <img
                                    v-show="showDropdown || dropdownHover"
                                    src="@/static/arrow.svg"
                                    alt=""
                                />
                                <img
                                    v-show="!showDropdown && !dropdownHover"
                                    src="@/static/arrow_gray.svg"
                                    alt=""
                                />
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
                                                    currency[selected].avaliable
                                                "
                                                type="text"
                                                v-model="transferNumber"
                                                placeholder="0"
                                                @on-change="changeAmount"
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

                            <div class="dropdown" v-if="showDropdown">
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
                                            {{
                                                item.name == "lUSD"
                                                    ? "ℓUSD"
                                                    : item.name
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="someWrong"
                            :style="{
                                opacity: errors.amountMsg ? '1' : '0'
                            }"
                        >
                            {{ errors.amountMsg }}
                        </div>

                        <div
                            class="to actionInputItem"
                            :class="{
                                error:
                                    walletError && this.transferToAddress != ''
                            }"
                        >
                            <div class="li_1">
                                <div class="iconBox">
                                    <div class="icon">
                                        <img src="@/static/wallet.svg" alt="" />
                                    </div>
                                </div>
                                <div class="midle">
                                    <div class="p_1">
                                        From
                                        <span>{{ walletAddressEllipsis }}</span>
                                        to
                                    </div>
                                </div>
                            </div>
                            <div class="li_2">
                                <Input
                                    type="text"
                                    ref="itemInput1"
                                    v-model="transferToAddress"
                                    @on-focus="inputFocus(1)"
                                    @on-blur="inputBlur(1)"
                                    placeholder="Please enter the wallet address …"
                                />
                            </div>
                        </div>
                        <div
                            class="someWrong"
                            v-if="walletError && this.transferToAddress != ''"
                        >
                            Please input a valid address.
                        </div>

                        <gasEditor></gasEditor>
                    </div>

                    <div
                        class="transferBtn"
                        :class="{ disabled: transferDisabled || walletError }"
                        @click="onSend"
                    >
                        TRANSFER NOW
                    </div>
                </div>
            </TabPane>
            <TabPane name="m1">
                <div class="waitingBox">
                    <wating
                        v-if="actionTabs == 'm1'"
                        v-model="confirmTransactionStatus"
                        @etherscan="etherscan"
                        @homepage="homepage"
                    ></wating>
                </div>
            </TabPane>
            <TabPane name="m2">
                <div class="successBox">
                    <success @homepage="homepage" @close="close"></success>
                </div>
            </TabPane>
            <TabPane name="m3">
                <div class="failBox">
                    <wrong
                        @again="again"
                        @close="close"
                        @homepage="homepage"
                    ></wrong>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import {
    toNonExponential,
    openBlockchainScan,
    findParents,
    removeClass,
    addClass
} from "@/common/utils";

import _ from "lodash";
import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import { storeDetailsData } from "@/assets/linearLibrary/linearTools/request";
import gasEditor from "@/components/gasEditor";
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

export default {
    name: "transfer",
    data() {
        return {
            toNonExponential,
            actionTabs: "m0", //子页(m0默认,m1等待,m2成功,m3错误)
            showDropdown: false,
            selected: 0,
            processing: false, //交易按钮防抖
            transferNumber: null,
            transferToAddress: "",
            ethGasLimit: 0,

            dropdownHover: false,

            confirmTransactionStatus: true,
            confirmTransactionHash: "",

            errors: {
                amountMsg: ""
            }
        };
    },
    watch: {
        walletAddress() {},
        walletAddressEllipsis() {},
        isEthereumNetwork() {},
        isBinanceNetwork() {},
        walletNetworkId() {}
    },
    computed: {
        //transfer按钮禁止状态
        transferDisabled() {
            return (
                _.lte(this.transferNumber, 0) ||
                this.processing ||
                !this.transferToAddress
            );
        },
        walletError() {
            if (/^0x[a-fA-F0-9]{40}$/.test(this.transferToAddress)) {
                return false;
            }
            return true;
        },
        walletAddressEllipsis() {
            if (this.$store.state?.wallet?.address) {
                return this.$store.state.wallet.address.substring(0, 7) + "...";
            }
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
                    if (key == "ETH") img = require("@/static/ETH_logo.svg");
                    if (key == "BNB")
                        img = require("@/static/currency/lBNB.svg");
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
            return this.currency[this.selected];
        },

        canSendEthAmount() {
            return (
                this.currency[this.selected].avaliable -
                lnrJSConnector.utils.formatEther(
                    this.$store.state?.gasDetails?.price.toString()
                ) *
                    this.ethGasLimit
            );
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
    async created() {
        const currency = isEthereumNetwork
            ? "ETH"
            : isBinanceNetwork
            ? "BNB"
            : "ETH";
        //获取ETH gas limit评估
        let ethGasLimit = await this.getGasEstimate(
            currency,
            lnrJSConnector.utils.parseEther("1"),
            this.walletAddress
        );

        this.ethGasLimit = ethGasLimit;
    },
    components: {
        gasEditor
    },
    mounted() {
        document.documentElement.addEventListener("click", () => {
            this.showDropdown = false;
        });
    },
    methods: {
        async selectCurrencyFun(index) {
            this.errors.amountMsg = "";
            this.selected = index;
            this.transferNumber = 0;
        },
        async onSend() {
            if (this.transferDisabled) return;

            this.processing = true;
            this.confirmTransactionStatus = false;

            let selectedAssetKind = this.currency[this.selected].name,
                sendAmount = this.transferNumber,
                selectedAssetMaxValue = this.currency[this.selected].avaliable,
                recieveAddress = this.transferToAddress;

            if (
                Number(selectedAssetMaxValue) > 0 &&
                Number(selectedAssetMaxValue) >= Number(sendAmount)
            ) {
                try {
                    //获取gas评估
                    const gasLimit = await this.getGasEstimate(
                        selectedAssetKind,
                        sendAmount,
                        recieveAddress
                    );

                    const transactionSettings = {
                        gasPrice: this.$store.state?.gasDetails?.price,
                        gasLimit: gasLimit
                    };

                    sendAmount = lnrJSConnector.utils.parseEther(
                        sendAmount.toString()
                    );

                    this.actionTabs = "m1";

                    let transaction = await this.sendTransaction(
                        selectedAssetKind,
                        sendAmount,
                        recieveAddress,
                        transactionSettings
                    );

                    if (transaction) {
                        this.confirmTransactionStatus = true;
                        this.confirmTransactionHash = transaction.hash;

                        // 发起右下角通知
                        this.$pub.publish("notificationQueue", {
                            hash: this.confirmTransactionHash,
                            type: "Transfer",
                            value: formatNumber(
                                lnrJSConnector.utils.formatEther(sendAmount)
                            ),
                            unit: this.selectedAssetKind
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
                    this.processing = false;
                }
            }

            this.processing = false;
        },

        //发起链上交易
        sendTransaction(currency, amount, destination, settings) {
            if (!currency) return null;
            if (currency === "LINA") {
                let LnProxy;
                if (this.isEthereumNetwork) {
                    LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                } else if (this.isBinanceNetwork) {
                    LnProxy = lnrJSConnector.lnrJS.LnProxyBEP20;
                }

                return LnProxy.transfer(destination, amount, settings);
            } else if (["ETH", "BNB"].includes(currency)) {
                return lnrJSConnector.signer.sendTransaction({
                    value: amount,
                    to: destination,
                    ...settings
                });
            } else {
                return lnrJSConnector.lnrJS[currency].transfer(
                    destination,
                    amount,
                    settings
                );
            }
        },

        //评估gas
        async getGasEstimate(currency, amount, destination) {
            try {
                if (!currency || !amount || !destination) return;
                if (amount > this.selectedAssetMaxValue)
                    //大于最大余额
                    throw new Error("input.error.balanceTooLow");
                if (!Number(amount))
                    throw new Error("input.error.invalidAmount");

                let gasEstimate;

                const amountBN = lnrJSConnector.utils.parseEther(
                    amount.toString()
                );

                if (currency === "LINA") {
                    let LnProxy;
                    if (this.isEthereumNetwork) {
                        LnProxy = lnrJSConnector.lnrJS.LnProxyERC20;
                    } else if (this.isBinanceNetwork) {
                        LnProxy = lnrJSConnector.lnrJS.LnProxyBEP20;
                    }
                    gasEstimate = await LnProxy.contract.estimateGas.transfer(
                        destination,
                        amountBN
                    );
                } else if (["ETH", "BNB"].includes(currency)) {
                    if (amount === this.selectedAssetMaxValue) {
                        //不能转全部eth,需要留手续费
                        throw new Error("input.error.balanceTooLow");
                    }
                    gasEstimate = await lnrJSConnector.provider.estimateGas({
                        value: amountBN,
                        to: destination
                    });
                } else {
                    gasEstimate = await lnrJSConnector.lnrJS[
                        currency
                    ].contract.estimateGas.transfer(destination, amountBN);
                }

                return bufferGasLimit(gasEstimate);
            } catch (e) {
                console.log(e);
                return bufferGasLimit(DEFAULT_GAS_LIMIT.exchange);
            }
        },
        showDropdownFun() {
            setTimeout(() => {
                this.showDropdown = !this.showDropdown;
            }, 1);
        },
        //点击最大
        async clickMaxAmount() {
            if (["ETH", "BNB"].includes(this.currency[this.selected].name)) {
                if (this.canSendEthAmount <= 0) {
                    this.transferNumber = this.currency[
                        this.selected
                    ].avaliable;
                    this.errors.amountMsg = `You don\`t have enought balance of ${
                        this.currency[this.selected].name
                    }.`;
                    return;
                }

                this.errors.amountMsg = "";
                this.transferNumber = this.canSendEthAmount;
            } else {
                this.transferNumber = this.currency[this.selected].avaliable;
            }
        },
        changeAmount(amount) {
            if (
                ["ETH", "BNB"].includes(this.currency[this.selected].name) &&
                amount > this.canSendEthAmount
            ) {
                this.errors.amountMsg = `You don\`t have enought balance of ${
                    this.currency[this.selected].name
                }.`;
            } else {
                this.errors.amountMsg = "";
            }
        },
        //获取焦点
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
        //交易状态页面回调方法 打开etherscan
        etherscan() {
            openBlockchainScan(this.confirmTransactionHash);
        },
        //交易状态页面回调方法 回到主页
        homepage() {
            this.$store.commit("setCurrentAction", 0);
        },
        //交易状态页面回调方法 close
        close() {
            this.actionTabs = "m0";
        },
        //交易状态页面回调方法 again
        again() {
            this.actionTabs = "m0";
        }
    }
};
</script>

<style lang="scss">
#transfer {
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

                .transferBox,
                .waitingBox,
                .successBox,
                .failBox {
                    width: 100%;
                    height: 100%;
                }

                .transferBox {
                    position: relative;

                    .transferMain {
                        height: 100%;
                        padding: 64px 193px 0;
                        display: flex;
                        flex-direction: column;

                        .text {
                            .title {
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
                            .descript {
                                margin-top: 8px;
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
                            text-align: center;
                        }
                        .from,
                        .to {
                            width: 400px;
                            height: 120px;
                            border-radius: 8px;
                            border: 1px solid #deddde;
                            transition: $animete-time linear;
                            box-shadow: 0 0 0 #deddde;

                            &:hover,
                            &.active {
                                box-shadow: 0 2px 12px #deddde;
                                border-color: white;
                            }
                        }
                        .from {
                            margin-top: 116px;
                            display: flex;
                            position: relative;
                            align-items: center;
                            padding: 40px 24px;

                            &.error {
                                border-color: #df434c;
                            }

                            > .iconBox {
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
                                    background-color: #fff;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                            > .midle {
                                flex: 1;
                                flex-direction: column;
                                > div {
                                    width: 100%;
                                }
                                .p_1 {
                                    font-family: Gilroy-Bold;
                                    font-size: 16px;
                                    font-weight: bold;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.5;
                                    letter-spacing: normal;
                                    color: #5a575c;
                                }
                                .p_2 {
                                    color: #1a38f8;
                                    opacity: 0.2;
                                    cursor: pointer;
                                    transition: $animete-time linear;
                                    font-family: Gilroy-Bold;
                                    font-size: 12px;
                                    font-weight: bold;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.33;
                                    letter-spacing: 1.5px;
                                    color: #1a38f8;
                                    align-self: flex-start;

                                    &:hover {
                                        opacity: 1;
                                    }
                                }
                            }
                            > .arrow {
                                width: 24px;
                                height: 24px;
                                cursor: pointer;
                                transition: $animete-time linear;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }

                                &.showDropdown {
                                    transform: rotate(180deg);
                                }
                            }
                            > .value {
                                width: 220px;
                                flex-direction: column;
                                padding-right: 15px;
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
                                                    font-stretch: normal;
                                                    font-style: normal;
                                                    line-height: 1.25;
                                                    letter-spacing: normal;

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

                            &.showDropdown {
                                border: solid 1px #1a38f8;
                                box-shadow: 0 2px 12px 0 rgba(26, 56, 248, 0.25);
                            }

                            .dropdown {
                                position: absolute;
                                left: 0;
                                top: calc(100% + 4px);
                                width: 400px;
                                background: #fff;
                                box-shadow: 0 2px 12px 0 #deddde;
                                z-index: 1;
                                border-radius: 8px;
                                border: 1px solid #deddde;
                                transition: box-shadow $animete-time linear;
                                display: flex;
                                flex-direction: column;
                                padding: 8px 0;

                                .dropdownItem {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    cursor: pointer;
                                    padding: 16px 24px;

                                    .iconBox {
                                        .icon {
                                            margin-right: 16px;
                                            width: 40px;
                                            height: 40px;
                                            img {
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }
                                    }
                                    .midle {
                                        flex: 1;
                                        font-family: Gilroy-Bold;
                                        font-size: 16px;
                                        font-weight: bold;
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.5;
                                        letter-spacing: normal;
                                        color: #5a575c;
                                    }

                                    &:hover {
                                        .midle {
                                            color: #1a38f8;
                                        }
                                    }

                                    &.activity {
                                        background: rgba(#7eb5ff, 0.1);

                                        .midle {
                                            color: #1a38f8;
                                        }
                                    }
                                }
                            }
                        }
                        .to {
                            margin-top: 24px;
                            padding: 24px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            margin-bottom: 24px;
                            &.error {
                                border-color: #df434c;
                            }
                            .li_1 {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .iconBox {
                                    margin-right: 16px;
                                    .icon {
                                        width: 40px;
                                        height: 40px;
                                        line-height: 40px;
                                        border-radius: 100%;
                                        background-color: #fff;
                                        vertical-align: middle;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
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
                                        font-stretch: normal;
                                        font-style: normal;
                                        line-height: 1.5;
                                        letter-spacing: normal;
                                        color: #5a575c;
                                        span {
                                            padding: 5px 16px;
                                            color: #c6c4c7;
                                            margin: 0 8px;
                                            border-radius: 12px;
                                            background-color: #f6f5f6;
                                            font-family: Gilroy-Medium;
                                            font-size: 12px;
                                            font-weight: 500;
                                            font-stretch: normal;
                                            font-style: normal;
                                            line-height: 1.33;
                                            letter-spacing: normal;
                                            color: #99999a;
                                        }
                                    }
                                }
                            }
                            .li_2 {
                                line-height: 1;
                                .ivu-input-wrapper {
                                    input {
                                        border: none;
                                        box-shadow: none;
                                        outline: none;
                                        color: #5a575c;
                                        font-family: Gilroy-Bold;
                                        font-size: 14px;
                                        font-weight: bold;
                                        font-stretch: normal;
                                        font-style: normal;
                                        letter-spacing: normal;
                                        padding: 0;
                                        height: unset;
                                        line-height: 1;

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
                            letter-spacing: 1.25px;
                        }
                    }

                    .transferBtn {
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
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.33;

                        &:hover {
                            &:not(.disabled) {
                                background-color: #7eb5ff;
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
