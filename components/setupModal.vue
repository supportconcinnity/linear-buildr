<template>
    <div id="stepModal">
        <Modal
            v-model="stepModal"
            :footer-hide="true"
            :transfer="true"
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
                        <thumbnail
                            style="width: 402px; height: 262px;"
                            thumb="setupModal/1_thumb.png"
                            src="setupModal/1.png"
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
                        <thumbnail
                            style="width: 398px; height: 258px;"
                            thumb="setupModal/2_thumb.png"
                            src="setupModal/2.png"
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
                                    <Tooltip
                                        transfer-class-name="transferTooltip"
                                        transfer
                                        :content="tooltipContent"
                                        offset="0 4"
                                        placement="bottom"
                                        @on-popper-hide="resetTooltipContent"
                                    >
                                        <svg
                                            class="copyBtn BSC_Mainnet"
                                            data-clipboard-text="BSC Mainnet"
                                            data-clipboard-action="copy"
                                            @click="copyConfig('.BSC_Mainnet')"
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            version="1.1"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <desc>Created with Lunacy</desc>
                                            <g id="Icon/Copy">
                                                <path
                                                    d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                    10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                    2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                    2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                    17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                    7.67157 7.67157 7 8.5 7Z"
                                                    transform="translate(2.5 2.5)"
                                                    id="Combined-Shape"
                                                    fill="#5a575c"
                                                    fill-rule="evenodd"
                                                    stroke="none"
                                                />
                                            </g>
                                        </svg>
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">New RPC URL</Col>
                                <Col span="16">
                                    https://bsc-dataseed1.binance.org/
                                    <Tooltip
                                        transfer-class-name="transferTooltip"
                                        transfer
                                        :content="tooltipContent"
                                        offset="0 4"
                                        placement="bottom"
                                        @on-popper-hide="resetTooltipContent"
                                    >
                                        <svg
                                            class="copyBtn RPC_URL1"
                                            data-clipboard-text="https://bsc-dataseed1.binance.org/"
                                            data-clipboard-action="copy"
                                            @click="copyConfig('.RPC_URL1')"
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            version="1.1"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <desc>Created with Lunacy</desc>
                                            <g id="Icon/Copy">
                                                <path
                                                    d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                    10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                    2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                    2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                    17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                    7.67157 7.67157 7 8.5 7Z"
                                                    transform="translate(2.5 2.5)"
                                                    id="Combined-Shape"
                                                    fill="#5a575c"
                                                    fill-rule="evenodd"
                                                    stroke="none"
                                                />
                                            </g>
                                        </svg>
                                    </Tooltip>
                                    or
                                    <span>
                                        (https://bsc-dataseed2.binance.org/<Tooltip
                                            transfer-class-name="transferTooltip"
                                            transfer
                                            :content="tooltipContent"
                                            offset="0 4"
                                            placement="bottom"
                                            @on-popper-hide="
                                                resetTooltipContent
                                            "
                                        >
                                            <svg
                                                class="copyBtn RPC_URL2"
                                                data-clipboard-text="https://bsc-dataseed2.binance.org/"
                                                data-clipboard-action="copy"
                                                @click="copyConfig('.RPC_URL2')"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Lunacy</desc>
                                                <g id="Icon/Copy">
                                                    <path
                                                        d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                        10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                        2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                        2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                        17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                        7.67157 7.67157 7 8.5 7Z"
                                                        transform="translate(2.5 2.5)"
                                                        id="Combined-Shape"
                                                        fill="#5a575c"
                                                        fill-rule="evenodd"
                                                        stroke="none"
                                                    />
                                                </g>
                                            </svg> </Tooltip
                                        >)
                                    </span>
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
                                    >https://bscscan.com/<Tooltip
                                        transfer-class-name="transferTooltip"
                                        transfer
                                        :content="tooltipContent"
                                        offset="0 4"
                                        placement="bottom"
                                        @on-popper-hide="resetTooltipContent"
                                    >
                                        <svg
                                            class="copyBtn Block_URL"
                                            data-clipboard-text="https://bscscan.com/"
                                            data-clipboard-action="copy"
                                            @click="copyConfig('.Block_URL')"
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            version="1.1"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <desc>Created with Lunacy</desc>
                                            <g id="Icon/Copy">
                                                <path
                                                    d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                    10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                    2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                    2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                    17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                    7.67157 7.67157 7 8.5 7Z"
                                                    transform="translate(2.5 2.5)"
                                                    id="Combined-Shape"
                                                    fill="#5a575c"
                                                    fill-rule="evenodd"
                                                    stroke="none"
                                                />
                                            </g>
                                        </svg>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </div>
                        <div class="table">
                            <div class="secondTitle">
                                Option 2: Connect BSC Testnet
                            </div>
                            <Row>
                                <Col span="8">Network Name</Col>
                                <Col span="16"
                                    >BSC Testnet<Tooltip
                                        transfer-class-name="transferTooltip"
                                        transfer
                                        :content="tooltipContent"
                                        offset="0 4"
                                        placement="bottom"
                                        @on-popper-hide="resetTooltipContent"
                                    >
                                        <svg
                                            class="copyBtn BSC_Testnet"
                                            data-clipboard-text="BSC Testnet"
                                            data-clipboard-action="copy"
                                            @click="copyConfig('.BSC_Testnet')"
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            version="1.1"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <desc>Created with Lunacy</desc>
                                            <g id="Icon/Copy">
                                                <path
                                                    d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                    10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                    2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                    2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                    17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                    7.67157 7.67157 7 8.5 7Z"
                                                    transform="translate(2.5 2.5)"
                                                    id="Combined-Shape"
                                                    fill="#5a575c"
                                                    fill-rule="evenodd"
                                                    stroke="none"
                                                />
                                            </g>
                                        </svg>
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">New RPC URL</Col>
                                <Col span="16">
                                    <div>
                                        https://data-seed-prebsc-1-s1.binance.org:8545<Tooltip
                                            transfer-class-name="transferTooltip"
                                            transfer
                                            :content="tooltipContent"
                                            offset="0 4"
                                            placement="bottom"
                                            @on-popper-hide="
                                                resetTooltipContent
                                            "
                                        >
                                            <svg
                                                class="copyBtn RPC_URL3"
                                                data-clipboard-text="https://data-seed-prebsc-1-s1.binance.org:8545"
                                                data-clipboard-action="copy"
                                                @click="copyConfig('.RPC_URL3')"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Lunacy</desc>
                                                <g id="Icon/Copy">
                                                    <path
                                                        d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                        10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                        2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                        2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                        17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                        7.67157 7.67157 7 8.5 7Z"
                                                        transform="translate(2.5 2.5)"
                                                        id="Combined-Shape"
                                                        fill="#5a575c"
                                                        fill-rule="evenodd"
                                                        stroke="none"
                                                    />
                                                </g>
                                            </svg>
                                        </Tooltip>
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
                                    >https://testnet.bscscan.com/<Tooltip
                                        transfer-class-name="transferTooltip"
                                        transfer
                                        :content="tooltipContent"
                                        offset="0 4"
                                        placement="bottom"
                                        @on-popper-hide="resetTooltipContent"
                                    >
                                        <svg
                                            class="copyBtn Block_Explorer_URL"
                                            data-clipboard-text="https://testnet.bscscan.com/"
                                            data-clipboard-action="copy"
                                            @click="
                                                copyConfig(
                                                    '.Block_Explorer_URL'
                                                )
                                            "
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            version="1.1"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <desc>Created with Lunacy</desc>
                                            <g id="Icon/Copy">
                                                <path
                                                    d="M12.9947 2.33562C12.91 1.03154 11.8255 0 10.5 0L2.5 0L2.33562 0.00531768C1.03154 0.0899613 0 1.17452 0 2.5L0 10.5L0.00531768
                                                    10.6644C0.0899613 11.9685 1.17452 13 2.5 13L4.44938 13L4.44938 12L2.5 12L2.35554 11.9931C1.59489 11.9204 1 11.2797 1 10.5L1 2.5L1.00687
                                                    2.35554C1.07955 1.59489 1.7203 1 2.5 1L10.5 1L10.6445 1.00687C11.4051 1.07955 12 1.7203 12 2.5L12 4.69901L13 4.69901L13 2.5L12.9947
                                                    2.33562ZM16.5 6L8.5 6C7.11929 6 6 7.11929 6 8.5L6 16.5C6 17.8807 7.11929 19 8.5 19L16.5 19C17.8807 19 19 17.8807 19 16.5L19 8.5C19 7.11929
                                                    17.8807 6 16.5 6ZM8.5 7L16.5 7C17.3284 7 18 7.67157 18 8.5L18 16.5C18 17.3284 17.3284 18 16.5 18L8.5 18C7.67157 18 7 17.3284 7 16.5L7 8.5C7
                                                    7.67157 7.67157 7 8.5 7Z"
                                                    transform="translate(2.5 2.5)"
                                                    id="Combined-Shape"
                                                    fill="#5a575c"
                                                    fill-rule="evenodd"
                                                    stroke="none"
                                                />
                                            </g>
                                        </svg>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div class="picture">
                        <div class="p_1">
                            <thumbnail
                                style="width:187px;height:240px;margin: 0 auto;"
                                thumb="setupModal/3_thumb.png"
                                src="setupModal/3.png"
                            />
                        </div>
                        <div class="p_2">
                            <thumbnail
                                style="width:187px;height:240px;margin: 0 auto;"
                                thumb="setupModal/4_thumb.png"
                                src="setupModal/4.png"
                            />
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

export default {
    components: {
        closeSvg
    },
    name: "stepModal",
    data() {
        return {
            stepModal: false, //教程弹窗
            tooltipContent: "Copy to clipboard"
        };
    },
    watch: {},
    computed: {},
    methods: {
        show() {
            this.stepModal = true;
        },
        //测试复制文字
        copyConfig(str) {
            var that = this;
            var clipboarda = new Clipboard(str);

            clipboarda.on("success", function(e) {
                that.tooltipContent = "Copied";
                e.clearSelection();
            });

            clipboarda.on("error", function(e) {
                that.tooltipContent = "Error";
            });
        },
        //重置复制提示框的文本
        resetTooltipContent() {
            var that = this;
            setTimeout(function() {
                that.tooltipContent = "Copy to clipboard";
            }, 300);
        }
    },
    mounted() {},
    destroyed() {}
};
</script>

<style lang="scss" scoped>
body {
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
                        padding: 0 50px;
                        overflow-y: hidden;

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
                            overflow-y: scroll;
                            height: 648px;

                            .copyBtn {
                                cursor: pointer;
                                width: 16px;
                                height: 16px;

                                &:hover {
                                    #Combined-Shape {
                                        fill: #1a38f8;
                                        stroke: #1a38f8;
                                    }
                                }
                            }

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

                        .transferTooltip {
                            z-index: 10001 !important;

                            &[x-placement="top"] {
                                .ivu-tooltip-arrow {
                                    border-right: 1px solid #1a38f8;
                                    border-bottom: 1px solid #1a38f8;
                                }
                            }

                            &[x-placement^="bottom"] {
                                .ivu-tooltip-arrow {
                                    border-left: 1px solid #1a38f8;
                                    border-top: 1px solid #1a38f8;
                                }
                            }

                            &[x-placement="left"] {
                                .ivu-tooltip-arrow {
                                    border-top: 1px solid #1a38f8;
                                    border-right: 1px solid #1a38f8;
                                }
                            }

                            &[x-placement^="right"] {
                                .ivu-tooltip-arrow {
                                    border-left: 1px solid #1a38f8;
                                    border-bottom: 1px solid #1a38f8;
                                }
                            }

                            .ivu-tooltip-arrow {
                                transform: rotate(45deg);
                                width: 10px;
                                height: 10px;
                                background: white;
                                border: none;
                            }

                            .ivu-tooltip-inner {
                                width: 100%;
                                background-color: #fff;
                                font-family: Gilroy-Medium;
                                font-size: 12px;
                                line-height: 16px;
                                font-weight: 500;
                                color: #5a575c;
                                padding: 10px 16px;
                                border: 1px solid #1a38f8;
                                box-shadow: 0 2px 12px 0 #deddde;
                                border-radius: 8px;
                                overflow: hidden;
                                text-align: left;
                                word-break: keep-all;
                                white-space: break-spaces;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
