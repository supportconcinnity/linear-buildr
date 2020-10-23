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

        <div v-if="!hasTrack" class="noTrackBox">
            <div class="title">Track Debt</div>
            <div class="context">
                Track your debt over time, with charts via
                <a href="#">
                    Zapper.FR
                    <svg
                        width="12px"
                        height="9px"
                        viewBox="0 0 12 9"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <desc>Created with Lunacy</desc>
                        <path
                            d="M7.8091 0.139803L7.87191 0.195262L11.3678 3.69111C11.6081 3.93143 11.6266 4.30959 11.4232 4.57112L11.3678 4.63392L7.87191 8.12977C7.61156 8.39012 7.18945 8.39012 6.9291 8.12977C6.68878 7.88945 6.67029 7.51129 6.87364 7.24976L6.9291 7.18696L9.44133 4.67418L0.666667 4.67469C0.298477 4.67469 0 4.37621 0 4.00802C0 3.66613 0.25736 3.38435 0.588919 3.34584L0.666667 3.34135L9.132 3.34084L6.9291 1.13807C6.66875 0.877722 6.66875 0.455612 6.9291 0.195262C7.16942 -0.0450605 7.54758 -0.0635469 7.8091 0.139803Z"
                            id="Combined-Shape"
                            fill="#1B05A1"
                            stroke="none"
                        />
                    </svg>
                </a>
            </div>
            <div class="data">
                <div class="li_1">
                    <div class="p_1">
                        0
                    </div>
                    <div class="p_2">
                        Total Issued Debt (ℓUSD)
                    </div>
                </div>
                <div class="line"></div>
                <div class="li_2">
                    <div class="p_1">
                        0
                    </div>
                    <div class="p_2">
                        Total Current Debt (ℓUSD)
                    </div>
                </div>
            </div>
            <div class="chart">
                <echarts
                    :data="line1Data"
                    tooltip
                    area
                    :color="{ lineColor: '#1b05a1', areaColorTop: '#1b05a1' }"
                    formatter="USDT : {a0}-{b0}-{c0}"
                ></echarts>
            </div>
            <div class="table">
                <Table
                    v-if="data1.length != 0"
                    :columns="columns1"
                    :data="data1"
                ></Table>
                <div class="nothing" v-else>
                    <div class="text">
                        <span class="title">No Debts</span> <br />
                        <span class="subject"
                            >You don’t have any debts yet</span
                        >
                    </div>
                    <img src="@/static/line_charts.svg" alt="" />
                </div>
            </div>
        </div>

        <div v-else class="transactionBox"></div>
    </Modal>
</template>

<script>
import _ from "lodash";
import Clipboard from "clipboard";
import echarts from "@/components/echarts/areachart";
import closeSvg from "@/components/svg/close";

export default {
    name: "trackModal",
    data() {
        return {
            trackModal: false,
            hasTrack: false, //有无交易记录
            line1Data: {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                },
                yAxis: {
                    type: "value"
                },
                series: [820, 932, 901, 934, 1290, 1330, 1320]
            },
            columns1: [
                {
                    title: "Your Asset",
                    key: "asset"
                },
                {
                    title: "Issued Debt",
                    key: "issued"
                },
                {
                    title: "Current Debt",
                    key: "current"
                }
            ],
            data1: [
                {
                    asset: "John Brown",
                    issued: 18,
                    current: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    asset: "Jim Green",
                    issued: 24,
                    current: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    asset: "Joe Black",
                    issued: 30,
                    current: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    asset: "Jon Snow",
                    issued: 26,
                    current: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
            ]
        };
    },
    components: {
        echarts,
        closeSvg
    },
    created() {
        //订阅组件改变事件
        this.$pub.subscribe("trackModalChange", (msg, params) => {
            this.trackModal = params;
        });
    },
    watch: {},
    computed: {},
    methods: {
        trackModalChange(status) {
            if (status) {
                //获取交易记录
            } else {
                this.$pub.publish("trackModalCloseEvent");

                //to do list: 清理筛选条件
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

            .noTrackBox {
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
                    height: 120px;
                    display: flex;
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
                    width: 100%;
                    height: 270px;
                }
                .table {
                    width: 100%;
                    height: 200px;
                    .nothing {
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                        border: solid 1px #deddde;
                        padding: 78px 122px;
                        img {
                            float: left;
                            transform: translateY(3px);
                        }
                        .text {
                            float: right;
                            .title {
                                font-family: Gilroy;
                                font-size: 16px;
                                font-weight: bold;
                                line-height: 16px;
                            }
                            .subject {
                                font-family: Gilroy;
                                font-size: 16px;
                                font-weight: normal;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
