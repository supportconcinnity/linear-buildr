<template>
    <div id="gasEditor">
        <div class="editInfo">
            <div class="infoLeft">
                <span class="editTitle">
                    <template v-if="isEthereumNetwork || forceBTH">
                        Ethereum Network Fee
                    </template>
                    <template v-else-if="isBinanceNetwork || forceBSC">
                        Binance Smart Chain fee
                    </template>
                </span>
                <span class="editBtn" @click="gasEditorModal = true"
                    ><svg width="16px" height="16px" viewBox="0 0 16 16">
                        <g>
                            <path
                                d="M1.3334 0L2.6668 0C3.40322 0 4.0002 0.596984 4.0002 1.3334L4.0002 9.82349C4.0002 10.0555 3.93967 10.2835 3.82459 10.4849L2.579 12.6653C2.32307 13.1133 1.67713 13.1133 1.4212 12.6653L0.175608 10.4849C0.0605293 10.2835 0 10.0555 0 9.82349L0 1.3334C0 0.596984 0.596984 0 1.3334 0ZM3.3335 1.3334C3.3335 0.965192 3.03501 0.6667 2.6668 0.6667L1.3334 0.6667C0.965192 0.6667 0.6667 0.965192 0.6667 1.3334L0.6667 9.82349C0.6667 9.93949 0.696965 10.0535 0.754504 10.1542L2.0001 12.3346L3.2457 10.1542C3.30324 10.0535 3.3335 9.93949 3.3335 9.82349L3.3335 1.3334Z"
                                transform="matrix(0.70710677 0.70710677 -0.70710677 0.70710677 11.182764 1.8231096)"
                                fill="#deddde"
                                fill-rule="evenodd"
                                stroke="none"
                            />
                        </g></svg
                    >EDIT</span
                >
            </div>
            <div class="infoRight">
                <span class="price">{{ price }}</span>
                <span class="unit">
                    <template v-if="isEthereumNetwork || forceBTH">
                        GWEI
                    </template>
                    <template v-else-if="isBinanceNetwork || forceBSC">
                        BNB
                    </template>
                </span>
            </div>
        </div>

        <Modal
            v-model="gasEditorModal"
            :footer-hide="true"
            :closable="false"
            :transfer="false"
            :mask="false"
            scrollable
            fullscreen
            class-name="vertical-center-modal"
            class="gasEditorModal"
            @on-visible-change="gasEditorModalChange"
        >
            <div class="header">
                <div class="closeBtn" @click="gasEditorModal = false">
                    <closeSvg></closeSvg>
                </div>
            </div>

            <div class="content">
                <div class="contentTitle">Edit</div>
                <div class="contentDesc">
                    Adjust the gas price (GWEI) below to set the transaction
                    speed by recommended ones or entering manually
                </div>

                <div class="selections">
                    <div
                        class="selectionItem"
                        @click="selectedTypeChange(NETWORK_SPEEDS_TO_KEY.SLOW)"
                        :class="{
                            active: selectedType == NETWORK_SPEEDS_TO_KEY.SLOW
                        }"
                    >
                        <div class="itemSpeed">
                            {{ NETWORK_SPEEDS_TO_KEY.SLOW | capitalize }}
                        </div>

                        <div class="itemNumBox">
                            {{ networkSpeeds.SLOW.price }}
                        </div>

                        <div class="itemTime">
                            {{ networkSpeeds.SLOW.time }} mins
                        </div>
                    </div>

                    <div
                        class="selectionItem"
                        @click="
                            selectedTypeChange(NETWORK_SPEEDS_TO_KEY.MEDIUM)
                        "
                        :class="{
                            active: selectedType == NETWORK_SPEEDS_TO_KEY.MEDIUM
                        }"
                    >
                        <div class="itemSpeed">
                            {{ NETWORK_SPEEDS_TO_KEY.MEDIUM | capitalize }}
                        </div>

                        <div class="itemNumBox">
                            {{ networkSpeeds.MEDIUM.price }}
                        </div>

                        <div class="itemTime">
                            {{ networkSpeeds.MEDIUM.time }} mins
                        </div>
                    </div>

                    <div
                        class="selectionItem"
                        @click="selectedTypeChange(NETWORK_SPEEDS_TO_KEY.FAST)"
                        :class="{
                            active: selectedType == NETWORK_SPEEDS_TO_KEY.FAST
                        }"
                    >
                        <div class="itemSpeed">
                            {{ NETWORK_SPEEDS_TO_KEY.FAST | capitalize }}
                        </div>

                        <div class="itemNumBox">
                            {{ networkSpeeds.FAST.price }}
                        </div>

                        <div class="itemTime">
                            {{ networkSpeeds.FAST.time }} mins
                        </div>
                    </div>
                </div>

                <div
                    class="custom"
                    :class="{
                        active: selectedType == NETWORK_SPEEDS_TO_KEY.CUSTOM
                    }"
                    @click="customPriceFocus"
                >
                    <div class="leftRect">
                        <div class="icon">
                            <template v-if="isEthereumNetwork">
                                <img src="@/static/ETH.svg" />
                            </template>
                            <template v-else-if="isBinanceNetwork">
                                <img src="@/static/bnb_yellow.svg" />
                            </template>
                        </div>

                        <div class="desc">
                            <div class="descTop">
                                <template v-if="isEthereumNetwork">
                                    Ethereum Network Fee
                                </template>
                                <template v-else-if="isBinanceNetwork">
                                    Binance Smart Chain fee
                                </template>
                            </div>
                            <div class="unit">GWEI</div>
                        </div>
                    </div>

                    <InputNumber
                        class="rightNum"
                        ref="num"
                        :min="0"
                        :max="10000"
                        v-model="customPrice"
                        placeholder="0"
                        :formatter="value => `${parseInt(value)}`"
                    ></InputNumber>
                </div>

                <Spin size="large" fix v-if="speedLoading"></Spin>
            </div>

            <div
                class="confirm"
                :class="{ disabled: disabledConfirmBtn }"
                @click="confirmGas"
            >
                CONFIRM
            </div>
        </Modal>
    </div>
</template>

<script>
import _ from "lodash";
import closeSvg from "@/components/svg/close";

import {
    getNetworkSpeeds,
    formatGasPrice,
    unFormatGasPrice,
    isEthereumNetwork,
    isBinanceNetwork
} from "@/assets/linearLibrary/linearTools/network";
import { NETWORK_SPEEDS_TO_KEY } from "@/assets/linearLibrary/linearTools/constants/network";
import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";

export default {
    data() {
        return {
            price: unFormatGasPrice(this.$store.state?.gasDetails?.price), //当前选中的gas
            gasEditorModal: false, //设置弹窗
            selectedType: this.$store.state?.gasDetails?.type, //当前选择类型
            networkSpeeds: { SLOW: {}, MEDIUM: {}, FAST: {} }, //网络速度
            speedLoading: false, //加载状态
            customPrice: null, //自定义的gas
            NETWORK_SPEEDS_TO_KEY //速度类型
        };
    },
    props: {
        forceBTH: false,
        forceBSC: false,
    },
    filters: {
        capitalize(val) {
            if (_.isNull(val)) {
                return;
            } else {
                return _.capitalize(val);
            }
        }
    },
    components: {
        closeSvg
    },
    async created() {
        //获取数据
        await this.getNetworkSpeeds();

        //初始化当前数据
        if (this.$store.state?.gasDetails?.status == -1) {
            this.setGasDetails(this.price, this.selectedType);
        } else {
            this.gasEditorModalChange(true);
        }
    },
    watch: {
        selectedTypeChangeListener() {},
        isEthereumNetwork() {},
        isBinanceNetwork() {},
        walletNetworkId() {}
    },

    computed: {
        //监听选择类型改变
        selectedTypeChangeListener() {
            if (this.selectedType != "CUSTOM") {
                this.customPrice = null;
            }
            return;
        },

        disabledConfirmBtn() {
            return this.selectedType == "CUSTOM" && _.lte(this.customPrice, 0);
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
        //获取网络速度
        async getNetworkSpeeds() {
            try {
                this.speedLoading = true;

                await getNetworkSpeeds()
                    .then(res => {
                        this.networkSpeeds = res;

                        this.selectedType = this.$store.state?.gasDetails?.type;

                        //判断赋值
                        if (this.selectedType == NETWORK_SPEEDS_TO_KEY.CUSTOM) {
                            this.price = this.customPrice = unFormatGasPrice(
                                this.$store.state?.gasDetails?.price
                            );
                        } else {
                            this.price = this.networkSpeeds[
                                this.selectedType
                            ].price;
                        }
                    })
                    .finally(() => {
                        this.speedLoading = false;
                    });
            } catch (error) {
                console.log(error);
            }
        },

        //gas设置窗口改变事件
        async gasEditorModalChange(status) {
            //每次显示时都重新获取最新的数据
            if (status) {
                //重新获取选中项
                this.selectedType = this.$store.state?.gasDetails?.type;

                await this.getNetworkSpeeds();

                const gwei = unFormatGasPrice(
                    this.$store.state?.gasDetails?.price
                );

                //如果price发生变化时,更新数据
                if (this.price != gwei) {
                    this.setGasDetails(this.price, this.selectedType);
                }
            }
        },

        //选择类型改变
        selectedTypeChange(type) {
            this.selectedType = type;
        },

        //自定义gas输入框获取焦点事件
        customPriceFocus() {
            this.selectedTypeChange("CUSTOM");
            this.$nextTick(() => {
                this.$refs.num.$el.querySelector("input").focus();
            });
        },

        //确认gas
        confirmGas() {
            if (!this.disabledConfirmBtn) {
                let price;

                //获取price
                if (this.selectedType == "CUSTOM") {
                    price = this.customPrice;
                } else {
                    price = this.networkSpeeds[this.selectedType].price;
                }

                //防止为null
                if (price == null) {
                    this.customPrice = price = 0;
                }

                this.price = price;

                this.setGasDetails(price, this.selectedType);

                this.gasEditorModal = false;
            }
        },

        //设置gas
        setGasDetails(price, type) {
            this.$store.commit("setGasDetails", {
                price: formatGasPrice(price),
                type,
                status: 1
            });
        }
    }
};
</script>

<style lang="scss">
#gasEditor {
    width: 100%;

    .editInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .infoLeft {
            display: flex;
            .editTitle {
                color: #5a575c;
                font-family: Gilroy;
                font-size: 16px;
                line-height: 24px;
            }

            .editBtn {
                margin-left: 8px;
                width: 62px;
                height: 24px;
                border-radius: 12px;
                border: solid 1px #deddde;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: #1b05a1;
                font-family: Gilroy;
                font-size: 10px;
                font-weight: 700;
                line-height: 16px;
                text-transform: uppercase;
                letter-spacing: 1.25px;

                &,
                * {
                    transition: $animete-time linear;
                }

                &:hover {
                    // color: #1b05a1;
                    border-color: #1b05a1;

                    // img {
                    //     filter: drop-shadow(red 80px 0);
                    // }
                }

                svg {
                    path {
                        fill: #1b05a1;
                    }
                }
            }
        }

        .infoRight {
            display: flex;
            align-items: center;
            .price {
                color: #5a575c;
                font-family: Gilroy;
                font-size: 16px;
                line-height: 32px;
            }

            .unit {
                margin-left: 9px;
                color: #5a575c;
                font-family: "Gilroy-Regular";
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
            }
        }
    }

    .gasEditorModal {
        .ivu-modal {
            .ivu-modal-body {
                position: relative;
                padding: 0;
                height: 100%;

                .header {
                    position: absolute;
                    top: 24px;
                    right: 24px;

                    .closeBtn {
                    }
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 64px 193px;

                    .contentTitle {
                        color: #5a575c;
                        font-family: Gilroy;
                        font-size: 32px;
                        font-weight: 700;
                        line-height: 40px;
                    }

                    .contentDesc {
                        margin-top: 8px;
                        color: #c6c4c7;
                        font-family: "Gilroy-Regular";
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 18px;
                        text-align: center;
                    }

                    @mixin selectedBox {
                        border-radius: 8px;
                        border: solid 1px #deddde;
                        cursor: pointer;
                        transition: $animete-time linear;

                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        &:hover {
                            border-color: white;
                            box-shadow: 0px 2px 12px #deddde;
                        }

                        &.active {
                            border-color: #1b05a1;
                            box-shadow: 0px 2px 12px #deddde;
                        }
                    }

                    .selections {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        margin-top: 124px;

                        .selectionItem {
                            @include selectedBox;
                            flex: 1;
                            padding: 37px 15px;

                            &:nth-child(2) {
                                margin: 0 17px;
                            }

                            .itemSpeed {
                                color: #1b05a1;
                                font-family: Gilroy;
                                font-size: 14px;
                                font-weight: 700;
                                line-height: 18px;
                            }

                            .itemNumBox {
                                margin-top: 8px;
                                color: #5a575c;
                                font-family: Gilroy;
                                font-size: 32px;
                                font-weight: 700;
                                line-height: 40px;
                            }

                            .itemTime {
                                color: #c6c4c7;
                                font-family: "Gilroy-Regular";
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 18px;
                            }
                        }
                    }

                    .custom {
                        @include selectedBox;
                        width: 100%;
                        margin-top: 17px;
                        padding: 39px 24px;
                        flex-direction: row;

                        .leftRect {
                            display: flex;
                            align-items: center;
                            flex: 1;

                            .icon {
                                width: 40px;
                                height: 40px;
                                border: solid 1px #deddde;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-radius: 50%;
                                margin-right: 16px;
                            }

                            .desc {
                                .descTop {
                                    color: #5a575c;
                                    font-family: Gilroy;
                                    font-size: 16px;
                                    font-weight: 700;
                                    line-height: 24px;
                                }

                                .unit {
                                    color: #c6c4c7;
                                    font-family: Gilroy;
                                    font-size: 12px;
                                    font-weight: 500;
                                    line-height: 16px;
                                }
                            }
                        }

                        .rightNum {
                            box-shadow: none;
                            border: none;

                            width: 100px;

                            .ivu-input-number-handler-wrap {
                                display: none;
                            }

                            .ivu-input-number-input {
                                padding: 0;
                                color: #5a575c;
                                font-family: Gilroy;
                                font-size: 32px;
                                font-weight: 700;
                                line-height: 40px;
                                text-align: right;

                                &::placeholder {
                                    color: #c6c4c7;
                                }
                            }
                        }
                    }
                }

                .confirm {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    cursor: pointer;
                    height: 80px;
                    line-height: 80px;
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
                        opacity: 0.2;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
}
</style>
