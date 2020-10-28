<template>
    <Modal
        id="trackModal"
        v-model="trackModal"
        :footer-hide="true"
        :closable="false"
        :transfer="false"
        :mask="false"
        scrollable
        fullscreen
        @on-visible-change="trackModalChange"
    >
        <div class="closeBtn" @click="trackModal = false">
            <closeSvg></closeSvg>
        </div>

        <div class="transactionBox">
            <div class="title">Track Debt</div>
            <div class="context">
                Track your debt over time, with charts
            </div>
            <div class="data">
                <div class="li_1">
                    <div class="p_1">
                        {{ formatNumber(debtData.issuedDebt) }}
                    </div>
                    <div class="p_2">
                        Total Issued Debt (ℓUSD)
                    </div>
                </div>
                <div class="line"></div>
                <div class="li_2">
                    <div class="p_1">
                        {{ formatNumber(debtData.currentDebt) }}
                    </div>
                    <div class="p_2">
                        Total Current Debt (ℓUSD)
                    </div>
                </div>
            </div>
            <div class="chart">
                <trackchart
                    key="1"
                    v-if="!hasTrackData"
                    :data="emptyData"
                    :color="{
                        lineColor: '#fff',
                        areaColorTop: '#fff'
                    }"
                    :title="'Total Current Debt\n(ℓUSD)'"
                ></trackchart>

                <trackchart
                    key="2"
                    v-else
                    :data="trackData"
                    tooltip
                    area
                    :color="{
                        lineColor: '#1b05a1',
                        areaColorTop: '#1b05a1'
                    }"
                    :formatter="`ℓUSD : {c0}`"
                    :title="'Total Current Debt\n(ℓUSD)'"
                ></trackchart>
            </div>
            <div class="table">
                <Table
                    v-if="trackTableData.length != 0"
                    :columns="trackTableColumn"
                    :data="trackTableData"
                    max-height="210"
                >
                    <template slot-scope="{ row }" slot="name">
                        <img :src="tokenIcon[row.name]" /> {{ row.name }}
                    </template>

                    <template slot-scope="{ row }" slot="balance">
                        {{ formatNumber(row.balance) }} ℓUSD
                    </template>

                    <template slot-scope="{ row }" slot="valueUSD">
                        $ {{ formatNumber(row.valueUSD) }} USD
                    </template>
                </Table>
                <div class="nothing" v-else>
                    <img src="@/static/line_charts.svg" alt="" />
                    <div class="text">
                        <span class="title">No Debts</span> <br />
                        <span class="subject"
                            >You don’t have any debts yet</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <Spin fix v-if="loading"> </Spin>
    </Modal>
</template>

<script>
import _ from "lodash";
import trackchart from "@/components/echarts/trackchart";
import closeSvg from "@/components/svg/close";
import { format } from "date-fns";
import { formatEtherToNumber } from "@/assets/linearLibrary/linearTools/format";
import { tokenIcon } from "@/common/options";

import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import exchangeData from "@/assets/linearLibrary/linearTools/request/linearData/exchangeData";
import { CRYPTO_CURRENCY_TO_KEY } from "@/assets/linearLibrary/linearTools/constants/currency";

import {
    getExchangeRates,
    getBalances
} from "@/assets/linearLibrary/linearTools/request";

import {
    formatNumber
} from "@/assets/linearLibrary/linearTools/format";

import { fetchTrackDebt } from "@/assets/linearLibrary/linearTools/request/trackDebt";

export default {
    name: "trackModal",
    data() {
        return {
            trackModal: false,
            hasTrackData: false, //有无图表记录

            trackData: {
                xAxis: {
                    data: ["", "", ""]
                },
                series: [0, 0, 0]
            },

            debtData: {'issuedDebt': 0, 'currentDebt': 0},

            emptyData: {
                xAxis: {
                    data: _.map([0, 0, 0, 0], (item, index) =>
                        format(
                            new Date().getTime() + index * 24 * 60 * 60 * 1000,
                            "d MMM yy"
                        )
                    )
                },
                series: [0, 0, 0, 0]
            },

            trackTableColumn: [
                {
                    title: "Your Asset",
                    key: "name",
                    slot: "name",
                    className: "cellAsset"
                },
                {
                    title: "Balance",
                    key: "balance",
                    slot: "balance"
                },
                {
                    title: "Current Debt",
                    key: "valueUSD",
                    slot: "valueUSD"
                }
            ],

            trackTableData: [],

            formatNumber,
            tokenIcon,

            loading: false
        };
    },
    components: {
        trackchart,
        closeSvg
    },
    watch: {
        walletAddress() {}
    },
    computed: {
        walletAddress() {
            return this.$store.state?.wallet?.address;
        }
    },
    created() {
        //订阅组件改变事件
        this.$pub.subscribe("trackModalChange", (msg, params) => {
            this.trackModal = params;
        });
    },
    methods: {
        openSocial(slug) {
            switch (slug) {
                case 0:
                    window.open("https://t.me/joinchat/Tb3iAhuMZsyfspxhEWQLvw");
                    break;
                case 1:
                    window.open("https://www.linkedin.com/company/linearfinance/");
                    break;
                case 2:
                    window.open("https://medium.com/@linear.finance");
                    break;
                case 3:
                    window.open("https://twitter.com/LinearFinance");
                    break;
                default:
                    break;
            }
        },

        trackModalChange(status) {
            try {
                this.debtData = {'issuedDebt': 0, 'currentDebt': 0};
                this.trackTableData = [];

                if (status) {
                    this.loading = true;
                    //获取交易记录
                    this.getTrackData()
                        .then(res => {
                            //有图表数据
                            if (!_.isEmpty(res.chartData)) {
                                this.trackData = {
                                    xAxis: {
                                        data: _.map(
                                            res.chartData,
                                            item => format(item[0], "MMM d") 
                                        )
                                    },
                                    series: _.map(
                                        res.chartData,
                                        item => formatNumber(item[1]) ?? 0
                                    )
                                };

                                this.hasTrackData = true;
                            }

                            //表格数据
                            this.trackTableData =  res.tableData ?? [];

                            this.debtData = res.debet;
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    this.hasTrackData = false;
                    this.$pub.publish("trackModalCloseEvent");
                }
            } catch (e) {
                console.error(e, "trackModalChange err");
            }
        },

        async getTrackData() {
            try {
                const {
                    lnrJS: {
                        lUSD,
                        lBTC,
                        lETH
                    }
                } = lnrJSConnector;

                let trackData = await fetchTrackDebt(this.walletAddress);

                const results = await Promise.all([
                    lUSD.balanceOf(this.walletAddress),
                    lBTC.balanceOf(this.walletAddress),
                    lETH.balanceOf(this.walletAddress)
                ]);

                let lUSDBalance = formatEtherToNumber(results[0]);
                let lBTCBalance = formatEtherToNumber(results[1]);
                let lETHBalance = formatEtherToNumber(results[2]);

                const [
                    lBTCPrice,
                    lETHPrice
                ] = await Promise.all([
                    exchangeData.exchange.pricesLast({source: "lBTC"}),
                    exchangeData.exchange.pricesLast({source: "lETH"})
                ]);

                let tableData = [];

                if (lUSDBalance > 0) tableData.push({name: "ℓUSD", balance: lUSDBalance, valueUSD: lUSDBalance});
                if (lBTCBalance > 0) tableData.push({name: "ℓBTC", balance: lBTCBalance, valueUSD: _.floor(lBTCBalance * lBTCPrice[0].currentPrice, 2)});
                if (lETHBalance > 0) tableData.push({name: "ℓETH", balance: lETHBalance, valueUSD: _.floor(lETHBalance * lETHPrice[0].currentPrice, 2)});

                return {
                    'chartData': trackData.currentDebt,
                    'tableData': tableData,
                    'debet': {'issuedDebt': trackData.issuedDebt, 'currentDebt': trackData.currentDebt[trackData.currentDebt.length - 1][1]}
                };
            } catch (e) {
                console.error(e, "getTrackData err");
            }
        }
    }
};
</script>

<style lang="scss">
#trackModal {
    .ivu-modal-wrap {
        position: absolute;

        .ivu-modal-body {
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0px 2px 6px #deddde;
            position: relative;
            padding: 46px 143px 0;
            height: 100%;
            overflow: hidden;

            .closeBtn {
                z-index: 1;
                position: absolute;
                top: 24px;
                right: 24px;
            }

            .transactionBox {
                display: flex;
                flex-direction: column;
                align-items: center;

                .title {
                    letter-spacing: normal;
                    color: #5a575c;
                    margin: 0 0 8px;
                    font-family: Gilroy;
                    font-size: 32px;
                    font-weight: bold;
                }

                .context {
                    font-family: Gilroy;
                    font-size: 14px;
                    font-weight: normal;
                    letter-spacing: normal;
                    color: #5a575c;
                    margin-bottom: 32px;
                    color: #c6c4c7;
                    a {
                        color: #1b05a1;
                    }
                }

                .data {
                    width: 100%;
                    display: flex;
                    margin-bottom: 40px;
                    .li_1,
                    .li_2 {
                        flex: 1;
                        text-align: center;
                        .p_1 {
                            font-family: Gilroy;
                            font-size: 32px;
                            font-weight: bold;
                        }
                        .p_2 {
                            font-family: Gilroy;
                            font-size: 14px;
                            font-weight: normal;
                        }
                    }
                    .line {
                        width: 2px;
                        height: 59px;
                        border: solid 1px #deddde;
                    }
                }
                .chart {
                    position: relative;
                    width: 786px;
                    height: 270px;
                }
                .table {
                    width: 100%;
                    height: 200px;
                    margin-top: 5px;

                    .ivu-table {
                        .ivu-table-header {
                            [class^="ivu-table-column-"] {
                                background-color: #fafafa;
                                font-family: Gilroy;
                                font-size: 12px;
                                font-weight: bold;
                                line-height: 16px;
                                color: #5a575c;
                                border-color: #f6f5f6;
                            }
                        }

                        .ivu-table-tbody {
                            .ivu-table-row {
                                [class^="ivu-table-column-"] {
                                    height: 56px;
                                    border-color: #f6f5f6;
                                }
                                .ivu-table-cell-slot {
                                    font-family: Gilroy;
                                    font-size: 12px;
                                    font-weight: 500;
                                    line-height: 16px;
                                    color: #5a575c;
                                }
                                .cellAsset {
                                    .ivu-table-cell-slot {
                                        display: flex;
                                        align-items: center;
                                        font-size: 16px;
                                        font-weight: bold;
                                        line-height: 24px;

                                        img {
                                            width: 32px;
                                            height: auto;
                                            vertical-align: middle;
                                            margin-right: 8px;
                                        }
                                    }
                                }
                            }
                        }

                        &::before {
                            content: none;
                        }
                    }

                    .nothing {
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                        border: solid 1px #deddde;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        img {
                            margin-right: 16px;
                            vertical-align: middle;
                        }
                        .text {
                            .title {
                                font-family: Gilroy;
                                font-size: 16px;
                                font-weight: bold;
                                line-height: 24px;
                                color: #5a575c;
                            }
                            .subject {
                                font-family: Gilroy;
                                font-size: 16px;
                                line-height: 24px;
                                color: #5a575c;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
