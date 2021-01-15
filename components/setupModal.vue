<template>
    <div id="stepModal">
        <Modal
            v-model="stepModal"
            :footer-hide="true"
            :transfer="false"
            :closable="false"
            :mask="true"
            class="stepModal"
        >
            <div class="close">
                <closeSvg @click.native="stepModal = false"></closeSvg>
            </div>
            <div class="title">Setup MetaMask to connect to BSC Mainnet</div>
            <div class="context">
                <div class="step step1">
                    <div class="num">01</div>
                    <div class="text">
                        <p>
                            Click on the MetaMask logo then click on expand
                            view.
                        </p>
                    </div>
                    <div class="picture">
                        <img
                            style="width: 402px; height: 262px;"
                            src="@/static/setupModal/1.png"
                        />
                    </div>
                </div>
                <div class="step step2">
                    <div class="num">02</div>
                    <div class="text">
                        <p>
                            Click on the Ethereum Mainnet tab to add the Binanne
                            Smart Chain network. Scroll down until you find
                            Custom RPC
                        </p>
                    </div>
                    <div class="picture">
                        <img
                            style="width: 398px; height: 258px;"
                            src="@/static/setupModal/2.png"
                        />
                    </div>
                </div>
                <div class="step step3">
                    <div class="num">03</div>
                    <div class="text">
                        Enter in the BSC mainnet details as follows:

                        <div class="table">
                            <div class="secondTitle">
                                Option 1: Connect BSC Mainnet
                            </div>
                            <Row>
                                <Col span="8">Network Name</Col>
                                <Col span="16"
                                    >BSC Mainnet
                                    <!-- <copySvg
                                        @click.native="copyFun('.BSC_Mainnet')"
                                        class="BSC_Mainnet"
                                        data-clipboard-action="copy"
                                        :data-clipboard-text="'BSC Mainnet'"
                                    /> -->

                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        data-clipboard-action="copy" 
                                        @click="copyFun('.BSC_Mainnet')" 
                                        class="BSC_Mainnet"
                                        :data-clipboard-text="'BSC Mainnet'" 
                                        width="16" height="16" viewBox="0 0 16 16">
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#99999A">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z" transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">New RPC URL</Col>
                                <Col span="16">
                                    https://bsc-dataseed1.binance.org/<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-clipboard-action="copy"
                                        @click="copyFun('.RPC_URL1')"
                                        class="RPC_URL1"
                                        :data-clipboard-text="
                                            'https://bsc-dataseed1.binance.org/'
                                        "
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#99999A">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path
                                                                    d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z"
                                                                    transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    or
                                    <span
                                        >(https://bsc-dataseed2.binance.org/<svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            data-clipboard-action="copy"
                                            @click="copyFun('.RPC_URL2')"
                                            class="RPC_URL2"
                                            :data-clipboard-text="
                                                'https://bsc-dataseed2.binance.org/'
                                            "
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                        >
                                            <g fill="none" fill-rule="evenodd">
                                                <g fill="#99999A">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path
                                                                        d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z"
                                                                        transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"
                                                                    />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g></svg
                                        >)</span
                                    >
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">ChainID</Col>
                                <Col span="16"
                                    >56
                                    <span
                                        >(or 0x38 if 56 doesn’t work)</span
                                    ></Col
                                >
                            </Row>
                            <Row>
                                <Col span="8">Symbol</Col>
                                <Col span="16">BNB</Col>
                            </Row>
                            <Row>
                                <Col span="8">Block Explorer URL</Col>
                                <Col span="16"
                                    >https://bscscan.com/<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-clipboard-action="copy"
                                        @click="copyFun('.Block_URL')"
                                        class="Block_URL"
                                        :data-clipboard-text="
                                            'https://bscscan.com/'
                                        "
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#99999A">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path
                                                                    d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z"
                                                                    transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g></svg
                                ></Col>
                            </Row>
                        </div>
                        <div class="table">
                            <div class="secondTitle">
                                Option 2: Connect BSC Testnet
                            </div>
                            <Row>
                                <Col span="8">Network Name</Col>
                                <Col span="16"
                                    >BSC Testnet<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-clipboard-action="copy"
                                        @click="copyFun('.BSC_Testnet')"
                                        class="BSC_Testnet"
                                        :data-clipboard-text="'BSC Testnet'"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#99999A">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path
                                                                    d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z"
                                                                    transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">New RPC URL</Col>
                                <Col span="16">
                                    <div>
                                        https://data-seed-prebsc-1-s1.binance.org:8545<svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            data-clipboard-action="copy"
                                            @click="copyFun('.RPC_URL3')"
                                            class="RPC_URL3"
                                            :data-clipboard-text="
                                                'https://data-seed-prebsc-1-s1.binance.org:8545'
                                            "
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                        >
                                            <g fill="none" fill-rule="evenodd">
                                                <g fill="#99999A">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <g>
                                                                    <path
                                                                        d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z"
                                                                        transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"
                                                                    />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">ChainID</Col>
                                <Col span="16">97</Col>
                            </Row>
                            <Row>
                                <Col span="8">Symbol</Col>
                                <Col span="16">BNB</Col>
                            </Row>
                            <Row>
                                <Col span="8">Block Explorer URL</Col>
                                <Col span="16"
                                    >https://explorer.binance.org/smart-testnet<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-clipboard-action="copy"
                                        @click="copyFun('.Block_Explorer_URL')"
                                        class="Block_Explorer_URL"
                                        :data-clipboard-text="
                                            'https://explorer.binance.org/smart-testnet'
                                        "
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g fill="#99999A">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path
                                                                    d="M12.667 5.667c.92 0 1.666.746 1.666 1.666v5.334c0 .92-.746 1.666-1.666 1.666H7.333c-.92 0-1.666-.746-1.666-1.666V7.333c0-.92.746-1.666 1.666-1.666zm0 .666H7.333c-.552 0-1 .448-1 1v5.334c0 .552.448 1 1 1h5.334c.552 0 1-.448 1-1V7.333c0-.552-.448-1-1-1zm-4-4.666c.883 0 1.606.687 1.663 1.557l.003.11v1.465h-.666V3.333c0-.52-.397-.947-.904-.995l-.096-.005H3.333c-.52 0-.947.397-.995.904l-.005.096v5.334c0 .52.397.947.904.995l.096.005h1.3v.666h-1.3c-.883 0-1.606-.687-1.663-1.557l-.003-.11V3.334c0-.883.687-1.606 1.557-1.663l.11-.003h5.333z"
                                                                    transform="translate(-555 -892) translate(208 120) translate(135 770) translate(212 2)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g></svg
                                ></Col>
                            </Row>
                        </div>
                    </div>
                    <div class="picture">
                        <div class="p_1">
                            <img src="@/static/setupModal/3.png" />
                        </div>
                        <div class="p_2">
                            <img src="@/static/setupModal/4.png" />
                        </div>
                    </div>
                </div>
                <div class="step step4">
                    <div class="num">04</div>
                    <div class="text">
                        Click Save. The BSC mainnet / BSC Testnet is connected
                        with your Metamask Wallet.
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import _ from "lodash";
import Clipboard from "clipboard";
import closeSvg from "@/components/svg/close";
import copySvg from "@/components/svg/copy";

export default {
    components: {
        closeSvg,
        copySvg
    },
    name: "stepModal",
    data() {
        return {
            stepModal: false //教程弹窗
        };
    },
    watch: {},
    computed: {},
    methods: {
        copyFun(str) {
            var that = this;
            var clipboarda = new Clipboard(str);
            function success(e) {
                that.$Notice.success({
                    title: "Copied",
                    duration: 1
                });
                e.clearSelection();
                clipboarda.off("success", success);
            }
            clipboarda.on("success", success);
        },
        show() {
            this.stepModal = true;
        }
    },
    mounted() {},
    destroyed() {}
};
</script>

<style lang="scss" scoped>
#stepModal {
    .stepModal {
        /deep/.ivu-modal-wrap {
            display: flex;
            align-items: center;
            justify-content: center;

            .ivu-modal {
                width: 1024px !important;
                max-width: 100vw !important;
                height: 784px;
                top: 0 !important;

                .ivu-modal-content {
                    height: 100%;
                    padding: 40px 0;
                    border-radius: 16px;

                    .ivu-modal-body {
                        height: 724px;
                        overflow-y: scroll;
                        padding: 0 50px;

                        .close {
                            position: absolute;
                            right: 40px;
                            top: 40px;
                        }

                        .title {
                            margin: 0 0 36px 0;
                            font-family: Gilroy-bold;
                            font-size: 32px !important;
                            font-weight: bold;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.25;
                            letter-spacing: normal;
                            color: #5a575c;
                        }

                        .context {
                            font-family: Gilroy;
                            font-size: 14px;
                            .step {
                                display: flex;
                                .num {
                                    width: 25px;
                                    margin-right: 16px;
                                    font-family: Gilroy-bold;
                                    font-size: 24px;
                                    font-weight: bold;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.33;
                                    letter-spacing: normal;
                                    color: #1a38f8;
                                    position: relative;
                                    &::before {
                                        position: absolute;
                                        width: 3px;
                                        height: 227px;
                                        border-left: dashed 1px #c3c3c3;
                                        content: "";
                                        display: block;
                                        transform: translate3d(12px, 31px, 0);
                                    }
                                }
                                .text {
                                    flex: 1;
                                    font-family: Gilroy;
                                    font-size: 16px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 24px;
                                    letter-spacing: normal;
                                    color: #5a575c;
                                    .table {
                                        float: left;
                                        margin: 24px 0 0 40px;
                                        &:nth-child(1) {
                                            margin-bottom: 20px;
                                        }
                                        .secondTitle {
                                            margin: 0 0 16px 0;
                                            font-family: Gilroy-bold;
                                            font-size: 16px;
                                            font-weight: bold;
                                            font-stretch: normal;
                                            font-style: normal;
                                            line-height: 1.5;
                                            letter-spacing: normal;
                                            color: #1a38f8;
                                        }
                                        .ivu-row {
                                            line-height: 18px;
                                            margin: 0 0 16px 0;
                                            .ivu-col:nth-child(1) {
                                                font-family: Gilroy;
                                                font-size: 14px;
                                                font-weight: bold;
                                                font-stretch: normal;
                                                font-style: normal;
                                                line-height: 1.29;
                                                letter-spacing: normal;
                                                color: #5a575c;
                                            }
                                            .ivu-col:nth-child(2) {
                                                font-family: Gilroy;
                                                font-size: 14px;
                                                font-weight: normal;
                                                font-stretch: normal;
                                                font-style: normal;
                                                line-height: 1.29;
                                                letter-spacing: normal;
                                                color: #5a575c;
                                                span {
                                                    color: #99999a;
                                                }
                                                svg {
                                                    vertical-align: middle;
                                                }
                                            }
                                        }
                                    }
                                }
                                .picture {
                                    width: 402px;
                                    text-align: center;
                                    .p_1 {
                                        margin: 73px 0 42px 0;
                                    }
                                }
                            }
                            .step1 {
                                margin: 0 0 20px 0;
                            }
                            .step1,
                            .step2 {
                                .text p {
                                    max-width: 315px;
                                }
                            }
                            .step3 {
                                margin: 0 0 10px 0;
                                .picture {
                                    width: 375px;
                                }
                                .num::before {
                                    height: 575px;
                                }
                            }
                            .step4 {
                                .num::before {
                                    display: none;
                                }
                                margin: 0 0 20px 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
