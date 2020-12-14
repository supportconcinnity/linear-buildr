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
        <svg
            class="closeBtn"
            @click="transactionModal = false"
            width="40px"
            height="40px"
            viewBox="-1 -1 42 42"
        >
            <defs>
                <path
                    d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                    id="path_1"
                />
                <clipPath id="clip_1">
                    <use xlink:href="#path_1" />
                </clipPath>
            </defs>
            <g id="Icon-Button/Cancel">
                <g id="Setup/Icon-Button/Outline">
                    <g id="Oval">
                        <g clip-path="url(#clip_1)">
                            <use
                                id="round"
                                xlink:href="#path_1"
                                fill="none"
                                stroke="#DEDDDE"
                                stroke-width="1.5"
                            />
                        </g>
                    </g>
                </g>
                <g id="Icon/Arrow-Left" transform="translate(8 8)">
                    <path
                        d="M8.5 0C8.74546 0 8.94961 0.176875 8.99194 0.410124L9 0.5L9 8L16.5 8C16.7761 8 17 8.22386 17 8.5C17 8.74546 16.8231 8.94961 16.5899 8.99194L16.5 9L9 9L9 16.5C9 16.7761 8.77614 17 8.5 17C8.25454 17 8.05039 16.8231 8.00806 16.5899L8 16.5L8 9L0.5 9C0.223858 9 0 8.77614 0 8.5C0 8.25454 0.176875 8.05039 0.410124 8.00806L0.5 8L8 8L8 0.5C8 0.223858 8.22386 0 8.5 0Z"
                        transform="matrix(0.70710677 0.70710677 -0.70710677 0.70710677 12 -0.020814896)"
                        id="shape"
                        fill="#1B05A1"
                        stroke="none"
                    />
                </g>
            </g>
        </svg>

        <div
            v-if="transactionHistoryData.length != 0 || gettingData"
            class="transactionBox"
        >
            <div class="title">Transaction History</div>

            <div class="filterMenu">
                <div class="box">
                    <Select
                        class="chainSelect"
                        :class="{ hasFilter: filters.chainType }"
                        v-model="filters.chainType"
                        placeholder="All Chains"
                    >
                        <Option value="ethereum" label="Ethereum">
                            <img src="@/static/ETH.svg" alt="" />
                            <span>Ethereum</span>
                        </Option>
                        <Option value="binance" label="Binance">
                            <img src="@/static/bnb.svg" alt="" />
                            <span> Binance</span>
                        </Option>
                    </Select>

                    <DatePicker
                        :value="dateValue"
                        class="dateDropdown"
                        :class="{
                            hasFilter:
                                filters.dateRange.length != 0 &&
                                filters.dateRange[0] != '' &&
                                filters.dateRange[1] != ''
                        }"
                        @on-change="dateRangeChange"
                        format="yyyy/MM/dd"
                        type="daterange"
                        placement="bottom-end"
                        placeholder="All Dates"
                        :options="options1"
                        transfer
                    >
                    </DatePicker>

                    <Dropdown
                        trigger="click"
                        class="typeDropdown"
                        :class="{
                            hasFilter: filters.transactionType.length != 0
                        }"
                    >
                        <div
                            class="typeBtn"
                            v-if="filters.transactionType.length == 0"
                        >
                            <span>All Types</span
                            ><Icon type="ios-arrow-down"></Icon>
                        </div>
                        <div
                            class="typeBtnSelected"
                            v-else-if="filters.transactionType.length == 1"
                        >
                            {{ filters.transactionType[0] }}
                        </div>
                        <div class="typeBtnSelected" v-else>
                            {{ filters.transactionType.length }} Selected
                        </div>
                        <DropdownMenu slot="list">
                            <CheckboxGroup v-model="filters.transactionType">
                                <Checkbox label="Build">
                                    Build
                                </Checkbox>
                                <Checkbox label="Burn">
                                    Burn
                                </Checkbox>
                                <Checkbox label="Claim">
                                    Claim
                                </Checkbox>
                                <Checkbox label="Transfer">
                                    Transfer
                                </Checkbox>
                                <Checkbox label="Stake">
                                    Stake
                                </Checkbox>
                                <Checkbox label="Unstake">
                                    Unstake
                                </Checkbox>
                                <Checkbox label="Referral">
                                    Referral
                                </Checkbox>
                                <Checkbox label="Swap">
                                    Swap
                                </Checkbox>
                            </CheckboxGroup>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown
                        trigger="click"
                        class="amountDropdown"
                        :class="{
                            hasFilter:
                                filters.amountRange.from ||
                                filters.amountRange.to
                        }"
                    >
                        <div
                            class="amountBtn"
                            v-if="
                                filters.amountRange.from ||
                                    filters.amountRange.to
                            "
                        >
                            From
                            {{
                                filters.amountRange.from
                                    ? filters.amountRange.from
                                    : 0
                            }}
                            to
                            {{
                                filters.amountRange.to
                                    ? filters.amountRange.to
                                    : 0
                            }}
                        </div>
                        <div class="amountBtnSelected" v-else>
                            <span>All Amount</span
                            ><Icon type="ios-arrow-down"></Icon>
                        </div>
                        <DropdownMenu slot="list">
                            <span>From:</span>
                            <InputNumber
                                :max="999999999999"
                                :min="0"
                                v-model="filters.amountRange.from"
                            ></InputNumber>
                            <span>To:</span>
                            <InputNumber
                                :max="999999999999"
                                :min="0"
                                v-model="filters.amountRange.to"
                            ></InputNumber>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div
                    class="clearFiltersBtn"
                    :class="{
                        hasFilter:
                            filters.chainType ||
                            filters.dateRange.length != 0 ||
                            filters.transactionType.length != 0 ||
                            filters.amountRange.from ||
                            filters.amountRange.to
                    }"
                    @click="clearFilters"
                >
                    {{ filterNum > 1 ? "CLEAR ALL" : "CLEAR" }}
                </div>
            </div>

            <div class="customTable">
                <div class="tabelHeader">
                    <div class="th sort chain">
                        Smart Chain
                    </div>
                    <div class="th sort date">
                        Date
                    </div>
                    <div class="th sort type">
                        Type
                    </div>
                    <div class="th sort amount">
                        Amount
                    </div>
                    <div class="th sort viewInBrowser"></div>
                </div>

                <div v-if="tableData.length" class="hasData">
                    <div class="tableBody">
                        <div
                            class="tr"
                            v-for="(row, index) in tableData"
                            :key="index"
                        >
                            <div class="td chain">
                                <template
                                    v-if="row.chain == BLOCKCHAIN.ETHEREUM"
                                >
                                    <img src="@/static/ETH.svg" />
                                </template>
                                <template v-if="row.chain == BLOCKCHAIN.BINANCE">
                                    <img src="@/static/logo-wallet-bsc.svg" />
                                </template>
                                {{ row.chain }}
                            </div>
                            <div class="td date">
                                {{ row.date }}
                            </div>
                            <div class="td type">
                                {{ row.type }}
                            </div>
                            <div class="td amount">
                                <span>{{ row.amount }}</span>
                            </div>
                            <div class="td viewInBrowser">
                                <a :href="row.hash" target="_blank">VIEW →</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="notData">
                    Not Data
                </div>

                <Spin size="large" fix v-if="gettingData"></Spin>
            </div>

            <div class="pageBox">
                <Page
                    :total="totalData"
                    @on-change="pageChange"
                    :current="currentPage"
                    :page-size="defaultPageSize"
                    size="small"
                />
                <!-- <Page total="100" @on-change="pageChange" :current="currentPage" :page-size="defaultPageSize" size="small"/> -->
            </div>
        </div>

        <div v-else class="noTransactionBox">
            <img src="@/static/no_transaction.svg" alt="" />
            <div class="title">No Transactions</div>
            <div class="context">You have not made any transactions yet</div>
            <div class="buildBtn" @click="toBuild()">Build ℓUSD</div>
        </div>
    </Modal>
</template>

<script>
import {
    fetchTransactionHistory,
    TRANSACTION_EVENTS
} from "@/assets/linearLibrary/linearTools/request/transactionHistory";
import { format } from "date-fns";
import {
    BLOCKCHAIN
} from "@/assets/linearLibrary/linearTools/network";
import { formatNumber } from "@/assets/linearLibrary/linearTools/format";
import { getBrowserUrlBase } from "@/assets/linearLibrary/linearJs/contractSettings";

export default {
    name: "transactionModal",
    data() {
        return {
            transactionModal: false,
            gettingData: true,
            dateValue: [], //时间区间数组
            filters: {
                chainType: null,
                dateRange: [],
                transactionType: [],
                amountRange: { from: 0, to: 0 }
            }, //筛选条件：当前选择的链0all 1eth 2bsc 交易类型 时间区间 金额区间
            currentPage: 1, //当前所在页数
            defaultPageSize: 10, //每页显示数据条数
            transactionHistoryData: [], //交易记录数据
            //显示表格日期,大于今天的日期禁用
            options1: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                }
            },

            tableData: [],

            BLOCKCHAIN
        };
    },
    created() {
        //订阅组件改变事件
        this.$pub.subscribe("transactionModalChange", (msg, params) => {
            this.transactionModal = params;
            if (params) {
                this.gettingData = true;
                this.fetchTransactionHistoryClick();
            }
        });
    },
    watch: {
        currentPageData() {
            var that = this;
            var type = "",
                amount = "",
                date = "",
                hash = "",
                tempData = [];

            if (this.currentPageData.length == 0) {
                that.$nextTick(function() {
                    this.tableData = tempData;
                });
                return null;
            }

            this.currentPageData.map(function(item, index, ary) {
                type = item.type;
                date = format(item.timestamp, "d MMM yyyy kk:mm");

                let baseUrl = getBrowserUrlBase({blockChain: item.chain,netWork: item.net});
                hash = baseUrl + item.hash;

                if (
                    item.type == "Build" ||
                    item.type == "Unstake" ||
                    item.type == "Burn" ||
                    item.type == "Stake" ||
                    item.type == "Swap"||
                    item.type == "Referral"||
                    item.type == "Transfer"
                ) {
                    amount = item.symbol + formatNumber(item.value) + " " + item.source;
                }
                else if (item.type == "Claim") {
                    let rewardslusd = "";
                    let rewardsLina = "";
                    if (
                        item.rewardslusd != undefined ||
                        item.rewardslusd != 0
                    ) {
                        rewardslusd = formatNumber(item.rewardslusd) + " ℓUSD";
                    }
                    if (!item.rewardsLina || item.rewardsLina != 0) {
                        rewardsLina = formatNumber(item.rewardsLina) + " LINA";
                    }
                    amount = "+" + rewardsLina + "&\n" + "+" + rewardslusd;
                } else {
                    return null;
                }

                tempData.push({
                    chain: item.chain,
                    type: type,
                    amount: amount,
                    date: date,
                    hash: hash
                });
            });

            that.$nextTick(function() {
                this.tableData = tempData;
            });
        },
        filterTransactionHistoryData() {}
    },
    computed: {
        //根据筛选条件计算交易数据
        filterTransactionHistoryData() {
            var that = this;
            this.currentPage = 1; //每次筛选数据都将当前分页改为1

            //筛选交易记录
            var filterTransactionHistoryData = this.transactionHistoryData.filter(
                function(record) {
                    var {
                        chainType,
                        transactionType,
                        dateRange,
                        amountRange
                    } = that.filters;

                    //在不在筛选的链中
                    if (chainType != null && chainType != record.chain) {
                        return false;
                    }

                    //在不在筛选的类型中 筛选数组为空则表示显示全部
                    if (
                        transactionType.length != 0 &&
                        !transactionType.includes(record.type)
                    ) {
                        return false;
                    }

                    //在不在筛选的金额范围内
                    if (amountRange.from || amountRange.to) {
                        if (
                            record.value < amountRange.from ||
                            record.value > amountRange.to
                        )
                            return false;
                        if (
                            record.amount < amountRange.from ||
                            record.amount > amountRange.to
                        )
                            return false;
                        if (
                            record.fromAmount < amountRange.from ||
                            record.fromAmount > amountRange.to
                        )
                            return false;
                        if (
                            record.rewardslusd < amountRange.from ||
                            record.rewardslusd > amountRange.to
                        ) {
                            if (
                                record.rewardsLina < amountRange.from ||
                                record.rewardsLina > amountRange.to
                            )
                                return false;
                        }
                    }

                    //在不在筛选的时间范围内,  iview日期区间是以两个日期的零点算，所以大的日期要加多一天的毫秒数
                    if (
                        dateRange.length != 0 &&
                        (record.timestamp < Date.parse(dateRange[0]) ||
                            record.timestamp >
                                Date.parse(dateRange[1]) + 86400000)
                    ) {
                        return false;
                    }

                    //符合以上所有筛选条件则保留
                    return true;
                }
            );
            return filterTransactionHistoryData;
        },
        //筛选后的数据总数
        totalData() {
            return this.filterTransactionHistoryData.length;
        },
        //当前分页的数据
        currentPageData() {
            return this.filterTransactionHistoryData.slice(
                (this.currentPage - 1) * this.defaultPageSize,
                this.currentPage * this.defaultPageSize,
                this.currentPage
            );
        },
        //筛选条件数量
        filterNum() {
            var filterNum = 0;
            for (let key in this.filters) {
                switch (key) {
                    case "chainType":
                        if (this.filters[key]) filterNum++;
                        break;
                    case "dateRange":
                        if (
                            this.filters[key].length != 0 &&
                            this.filters[key][0] != "" &&
                            this.filters[key][0] != ""
                        ) {
                            filterNum++;
                        }
                        break;
                    case "transactionType":
                        if (this.filters[key].length != 0) {
                            filterNum++;
                        }
                        break;
                    case "amountRange":
                        if (this.filters[key].from || this.filters[key].to) {
                            filterNum++;
                        }
                        break;
                }
            }

            return filterNum;
        },
        //网络类型
        walletNetworkId(){
            return this.$store.state.walletNetworkId;
        }
    },
    methods: {
        transactionModalChange(status) {
            if (status) {
                //获取交易记录
                this.transactionHistoryData = [];
            } else {
                this.$pub.publish("transactionModalCloseEvent");
                this.clearFilters();

                //to do list: 清理筛选条件
            }
        },
        //获取交易记录
        async fetchTransactionHistoryClick() {
            let ethData = await fetchTransactionHistory(
                this.$store.state?.wallet?.address,
                BLOCKCHAIN.ETHEREUM
            );
            let bscData = await fetchTransactionHistory(
                this.$store.state?.wallet?.address,
                BLOCKCHAIN.BINANCE
            );

            this.transactionHistoryData = [...ethData,...bscData];
            this.transactionHistoryData = this.transactionHistoryData.sort(function(record1, record2) {
                return record2.timestamp - record1.timestamp;
             });

            this.gettingData = false;
        },
        //日期范围改变
        dateRangeChange(dateRange) {
            this.filters.dateRange = dateRange;
        },
        //当前分页改变
        pageChange(currentPage) {
            this.currentPage = currentPage;
        },
        //清除筛选条件数据
        clearFilters() {
            this.filters = {
                chainType: null,
                transactionType: [],
                dateRange: [],
                amountRange: { from: 0, to: 0 }
            };
            this.dateValue = [];
            this.currentPag = 1;
        },
        //打开build功能
        toBuild() {
            this.transactionModal = false;
            this.$store.commit("setCurrentAction", 1);
        }
    }
};
</script>

<style lang="scss">
body {
    .ivu-date-picker-transfer {
        font-family: Gilroy;
    }
}

#transactionModal {
    $animete-time: 0.2s;

    .ivu-modal-wrap {
        position: absolute;

        .ivu-modal-body {
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0px 2px 6px #deddde;
            position: relative;
            padding: 64px 93px 0;
            height: 100%;
            overflow: hidden;

            .closeBtn {
                z-index: 1;
                position: absolute;
                top: 24px;
                right: 24px;
                cursor: pointer;

                #round,
                #shape {
                    transition: fill $animete-time linear;
                }

                &:hover {
                    #round {
                        stroke: #1b05a1;
                        fill: #1b05a1;
                    }

                    #shape {
                        fill: white;
                    }
                }
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
                    font-family: Gilroy-Bold;
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
                }

                .buildBtn:hover {
                    background-color: #1f04c6;
                }
            }

            .transactionBox {
                .title {
                    color: #5a575c;
                    font-family: Gilroy-Bold;
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 40px;
                    text-align: center;
                }

                .filterMenu {
                    display: flex;
                    justify-content: space-between;
                    margin: 32px 0;


                    .box {
                        display: flex;
                        justify-content: space-between;
                        padding-left: 16px;

                        .chainSelect,
                        .dateDropdown,
                        .typeDropdown {
                            margin-right: 8px;
                        }

                        .chainSelect {
                            width: 100px;

                            .ivu-select-selection {
                                border: 1px solid #e5e5e5;
                                box-shadow: none !important;

                                span {
                                    font-family: Gilroy-Medium;
                                    font-size: 12px;
                                    font-weight: 500;
                                    color: #99999a;
                                }

                                .ivu-icon:before {
                                    line-height: 32px;
                                    content: "\f116";
                                    color: #cacaca;
                                }
                            }

                            .ivu-select-dropdown {
                                .ivu-select-dropdown-list {
                                    .ivu-select-item {
                                        display: flex;
                                        align-items: center;
                                        font-family: Gilroy;
                                        font-size: 12px;
                                        color: #515a6e;

                                        img {
                                            width: 24px;
                                            margin-right: 8px;
                                        }
                                    }
                                }
                            }

                            &.hasFilter {
                                .ivu-select-selection {
                                    border: 1px solid #1b05a1;

                                    span {
                                        color: #5a575c;
                                    }
                                }
                            }
                        }

                        .dateDropdown {
                            font-family: Gilroy-Medium;

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
                                    font-size: 12px;
                                    line-height: 32px;
                                    border: 1px solid #e5e5e5;
                                    border-radius: 4px;
                                    color: #99999a;
                                }

                                input::-webkit-input-placeholder {
                                    color: #99999a;
                                }
                                input:-ms-input-placeholder {
                                    color: #99999a;
                                }
                                input:-moz-placeholder {
                                    color: #99999a;
                                }
                                input::-moz-placeholder {
                                    color: #99999a;
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
                            font-family: Gilroy-Medium;

                            .ivu-dropdown-rel {
                                .typeBtn,
                                .typeBtnSelected {
                                    width: 103px;
                                    height: 32px;
                                    font-size: 12px;
                                    line-height: 32px;
                                    border: 1px solid #e5e5e5;
                                    border-radius: 4px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    padding: 0 8px;
                                    color: #99999a;
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
                            font-family: Gilroy-Medium;

                            .ivu-dropdown-rel {
                                .amountBtn,
                                .amountBtnSelected {
                                    width: 144px;
                                    height: 32px;
                                    font-size: 12px;
                                    //line-height: 32px;
                                    border: 1px solid #e5e5e5;
                                    border-radius: 4px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    padding: 0 8px;
                                    color: #99999a;
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
                    }

                    .clearFiltersBtn {
                        width: 166px;
                        color: #1b05a1;
                        opacity: 0.2;
                        font-family: Gilroy;
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 32px;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        cursor: not-allowed;
                        text-align: center;

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
                            font-family: Gilroy;
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

            .customTable {
                .tabelHeader {
                    min-height: 34px;
                    display: flex;
                    padding: 0 6px;

                    .th {
                        flex: 1;
                        font-family: Gilroy-Medium;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: 16px;
                        color: #99999a;
                        display: flex;
                        align-items: center;
                        padding: 5px;
                        border-bottom: 1px solid #f6f5f6;

                        &:first-of-type {
                            padding-left: 16px;
                        }

                        &:last-of-type {
                            padding-right: 16px;
                        }
                    }
                }

                .hasData {
                    .tableBody {
                        overflow-y: auto;
                        overflow-x: unset;
                        padding: 0 6px 6px;

                        .tr {
                            display: flex;
                            align-items: center;
                            transition: $animete-time linear;
                            min-height: 48px;
                            cursor: default;
                            border-bottom: 1px solid #f6f5f6;
                            margin-top: 0px;

                            &:hover {
                                box-shadow: 0 2px 6px 0 #deddde;
                                border-color: white;
                            }

                            .td {
                                flex: 1;
                                font-family: Gilroy-Medium;
                                font-size: 12px;
                                font-weight: 500;
                                line-height: 16px;
                                color: #5a575c;
                                padding: 5px;
                                height: 100%;
                                word-break: break-all;

                                &:first-of-type {
                                    padding-left: 16px;
                                }

                                &:last-of-type {
                                    text-align: center;

                                    a {
                                        color: #1b05a1;
                                        font-family: Gilroy-Bold;
                                        font-weight: bold;
                                        padding-right: 16px;
                                        opacity: 0.2 !important;
                                    }

                                    a:hover {
                                        opacity: 1 !important;
                                    }
                                }
                            }

                            .chain {
                                display: flex;
                                align-items: center;
                                text-transform: capitalize;
                                img {
                                    width: 16px;
                                    margin-right: 8px;
                                }
                            }

                            .amount {
                                span {
                                    white-space: pre-wrap;
                                }
                            }
                        }
                    }
                }

                .notData {
                    min-height: 48px;
                    text-align: center;
                    font-family: Gilroy;
                    font-size: 14px;
                    line-height: 48px;
                    color: #c1c1c1;
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
