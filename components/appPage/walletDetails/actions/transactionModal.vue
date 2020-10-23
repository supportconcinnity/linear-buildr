<template>
    <Modal
        id="transactionModal"
        v-model="transactionModal"
        :footer-hide="true"
        :closable="false"
        :transfer="false"
        :mask="false"
        scrollable
        fullscreen
        @on-visible-change="transactionModalChange"
    >
        <div class="closeBtn" @click="transactionModal = false">
            <closeSvg></closeSvg>
        </div>

        <div v-if="!hasTransaction" class="noTransactionBox">
            <img src="@/static/no_transaction.svg" alt="" />
            <div class="title">No Transactions</div>
            <div class="context">You haven’t made any transaction yet</div>
            <div class="buildBtn" @click="buildClick">Build ℓUSD</div>
        </div>

        <div v-else class="transactionBox"></div>
    </Modal>
</template>

<script>
import { format } from "date-fns";
import closeSvg from "@/components/svg/close";

export default {
    name: "transactionModal",
    components: {
        closeSvg
    },
    data() {
        return {
            transactionModal: false,
            hasTransaction: false //有无交易记录
        };
    },
    created() {
        //订阅组件改变事件
        this.$pub.subscribe("transactionModalChange", (msg, params) => {
            this.transactionModal = params;
        });
    },
    watch: {},
    computed: {},
    methods: {
        transactionModalChange(status) {
            if (status) {
                //获取交易记录
                this.transactionHistoryData = [];
            } else {
                this.$pub.publish("transactionModalCloseEvent");

                //to do list: 清理筛选条件
            }
        },
        //打开 build 功能
        buildClick() {
            this.$store.commit("setCurrentAction", 1);

            this.$pub.publish("transactionModalChange", false);
            this.$pub.publish("transactionModalCloseEvent");
        }
    }
};
</script>

<style lang="scss">
#transactionModal {
    .ivu-modal-wrap {
        position: absolute;

        .ivu-modal-body {
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0px 2px 6px #deddde;
            position: relative;
            padding: 64px 143px 0;
            height: 100%;
            overflow: hidden;

            .closeBtn {
                z-index: 1;
                position: absolute;
                top: 24px;
                right: 24px;
            }

            .noTransactionBox {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 125px;
                    margin-top: 188px;
                }

                .title {
                    font-family: Gilroy;
                    font-size: 24px;
                    font-weight: bold;
                    letter-spacing: normal;
                    color: #5a575c;
                    margin: 40px 0 8px;
                }

                .context {
                    font-family: Gilroy;
                    font-size: 16px;
                    font-weight: normal;
                    letter-spacing: normal;
                    color: #5a575c;
                    margin-bottom: 32px;
                }

                .buildBtn {
                    width: 134px;
                    height: 40px;
                    border-radius: 20px;
                    background-color: #1b05a1;
                    font-family: Gilroy;
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 40px;
                    letter-spacing: 1.5px;
                    text-align: center;
                    color: #ffffff;
                    cursor: pointer;
                    transition: $animete-time linear;

                    &:hover {
                        background-color: #1f04c6;
                    }
                }
            }

            .transactionBox {
                .title {
                    color: #5a575c;
                    font-family: Gilroy;
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 40px;
                    text-align: center;
                }

                .filterMenu {
                    display: flex;
                    justify-content: space-between;
                    margin: 32px 0;

                    .dateDropdown {
                        * {
                            box-shadow: none !important;
                        }

                        .ivu-date-picker-rel {
                            .ivu-input-suffix {
                                cursor: pointer;

                                i:before {
                                    line-height: 32px;
                                    content: "\f116";
                                    color: #cacaca;
                                }
                            }

                            input {
                                width: 144px;
                                height: 32px;
                                line-height: 32px;
                                border: 1px solid #cacaca;
                                border-radius: 4px;
                                color: #cacaca;
                            }
                        }

                        &.hasFilter {
                            input {
                                border: 1px solid #1b05a1;
                                color: #5a575c;
                            }
                        }
                    }

                    .typeDropdown {
                        .ivu-dropdown-rel {
                            .typeBtn,
                            .typeBtnSelected {
                                width: 103px;
                                height: 32px;
                                line-height: 32px;
                                border: 1px solid #cacaca;
                                border-radius: 4px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                padding: 0 8px;
                                margin: 0 10px;
                                color: #cacaca;
                                cursor: pointer;

                                img {
                                    width: 20px;
                                    margin-top: 12px;
                                    display: inline-block;
                                }
                            }

                            .typeBtnSelected {
                                justify-content: center;
                            }
                        }

                        .ivu-select-dropdown {
                            width: 144px;
                            left: 0;
                            padding-left: 6px;

                            .ivu-checkbox-group {
                                display: flex;
                                flex-direction: column;

                                .ivu-checkbox-wrapper {
                                    margin: 4px 0;

                                    img {
                                        width: 16px;
                                        margin: 0 2px 0 3px;
                                    }
                                }
                            }
                        }

                        &.hasFilter {
                            .ivu-dropdown-rel {
                                .typeBtn,
                                .typeBtnSelected {
                                    border: 1px solid #1b05a1;
                                    color: #5a575c;
                                }
                            }
                        }
                    }

                    .amountDropdown {
                        .ivu-dropdown-rel {
                            .amountBtn,
                            .amountBtnSelected {
                                width: 144px;
                                height: 32px;
                                line-height: 32px;
                                border: 1px solid #cacaca;
                                border-radius: 4px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                padding: 0 8px;
                                margin: 0 10px;
                                color: #cacaca;
                                cursor: pointer;
                            }
                        }

                        .ivu-select-dropdown {
                            width: 190px;
                            padding: 16px 24px;

                            .ivu-dropdown-menu {
                                display: flex;
                                flex-direction: column;

                                .ivu-input-number {
                                    width: 100%;
                                }
                            }
                        }

                        &.hasFilter {
                            .ivu-dropdown-rel {
                                .amountBtn,
                                .amountBtnSelected {
                                    border: 1px solid #1b05a1;
                                    color: #5a575c;
                                }
                            }
                        }
                    }

                    .clearFiltersBtn {
                        color: #1b05a1;
                        opacity: 0.2;
                        font-family: Gilroy;
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 32px;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        cursor: not-allowed;

                        &.hasFilter {
                            opacity: 1;
                            cursor: pointer;
                        }
                    }
                }
            }

            .ivu-table-wrapper {
                .ivu-table {
                    .ivu-table-header {
                        color: #5a575c;
                        font-family: Gilroy;
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 16px;

                        th {
                            background: #fff;
                        }
                    }

                    .ivu-table-body {
                        overflow-x: hidden;

                        .ivu-table-row {
                            color: #5a575c;
                            font-family: Gilroy-Medium;
                            font-size: 12px;
                            font-weight: 400;

                            .viewInBrowser {
                                color: #1b05a1;
                                font-family: Gilroy;
                                font-size: 12px;
                                font-weight: 700;
                                text-transform: uppercase;
                                letter-spacing: 1.5px;
                                opacity: 0.2;
                                float: right;
                            }

                            .viewInBrowser:hover {
                                opacity: 1;
                            }
                        }
                    }
                }
            }

            .pageBox {
                width: 100%;
                margin-top: 32px;
                text-align: center;

                .ivu-page {
                    .ivu-page-item {
                        border: 1px solid #cacaca;

                        a {
                            color: #cacaca;
                        }
                    }

                    .ivu-page-item:hover {
                        &:not(.ivu-page-item-active) {
                            border: 1px solid #1b05a1;

                            a {
                                color: #1b05a1;
                            }
                        }
                    }

                    .ivu-page-item-active {
                        border-color: #1b05a1;
                        background-color: #1b05a1;

                        a {
                            color: #fff;
                        }
                    }

                    .ivu-page-item-jump-next,
                    .ivu-page-item-jump-prev {
                        a {
                            i {
                                color: #cacaca;
                            }
                        }
                    }

                    .ivu-page-item-jump-next:hover,
                    .ivu-page-item-jump-prev:hover {
                        a {
                            i {
                                color: #1b05a1;
                            }
                        }
                    }

                    .ivu-page-prev,
                    .ivu-page-next {
                        a {
                            i {
                                color: #cacaca;
                            }
                        }
                    }

                    .ivu-page-prev:hover,
                    .ivu-page-next:hover {
                        &:not(.ivu-page-disabled) {
                            a {
                                i {
                                    color: #1b05a1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
