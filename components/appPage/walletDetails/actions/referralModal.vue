<template>
    <Modal
        id="referralModal"
        v-model="referralModal"
        :footer-hide="true"
        :closable="false"
        :transfer="false"
        :mask="false"
        scrollable
        fullscreen
        @on-visible-change="referralModalChange"
    >
        <div class="closeBtn" @click="referralModal = false">
            <closeSvg></closeSvg>
        </div>

        <Tabs v-model="referralTabs" class="referralTabs">
            <TabPane name="m0" class="m0">
                <div class="content">
                    <div class="contentTitle">Earn LINA with friends</div>
                    <div class="contentDesc">
                        You and your friend will receive 5 LINA tokens after
                        your friend has added your referral code and complete 5
                        transactions.
                    </div>
                    <div class="youCodeBox">
                        <div class="icon">
                            <img src="@/static/referral.svg" />
                        </div>
                        <div class="title">Your referral code</div>
                        <div class="code">{{ referralCode.self_code }}</div>
                        <div
                            :class="[copyStatusStyle]"
                            class="copyBtn"
                            :data-clipboard-text="referralCode.self_code"
                            data-clipboard-action="copy"
                            @click="copyYouCode"
                        >
                            <img src="@/static/copy_hover.svg" />Copy to
                            Clipboard
                        </div>
                    </div>

                    <div class="dashLine"></div>

                    <div
                        class="referralCodeBox"
                        :class="{
                            error: codeInputErrorMsg,
                            hasCode: addCodeFinish
                        }"
                        @click="codeInputFocus"
                    >
                        <div class="info">
                            Enter referral code

                            <Tooltip
                                class="tip"
                                placement="top"
                                content="You can only submit referral code once"
                            >
                                <img src="@/static/info.svg" />
                            </Tooltip>
                        </div>
                        <input
                            :disabled="loading"
                            v-if="!addCodeFinish"
                            type="text"
                            class="codeInput"
                            ref="codeInput"
                            v-model="referralCode.referral_code"
                            placeholder="eg: 019fGa0"
                            @input="codeInputChange"
                        />

                        <div v-else class="codeInput">
                            {{ referralCode.referral_code }}
                        </div>

                        <div
                            class="itemErrMsg"
                            :style="{
                                opacity: codeInputErrorMsg ? '1' : '0'
                            }"
                        >
                            {{ codeInputErrorMsg }}
                        </div>
                    </div>
                </div>

                <div
                    v-show="!addCodeFinish"
                    class="submitBtn"
                    :class="{ disabled: disabledSubmitBtn }"
                    @click="checkReferralCode"
                >
                    Submit referral code
                </div>
            </TabPane>

            <TabPane name="m1" class="m1">
                <div class="icon"><img src="@/static/success.svg" /></div>
                <div class="title">
                    You are adding {{ referralCode.referral_code }}. Are you
                    sure?
                </div>
                <div class="desc">You can only submit referral code once.</div>
                <div class="btns">
                    <div class="back" @click="referralTabs = 'm0'">
                        No, go back
                    </div>
                    <div
                        class="confirm"
                        :class="{ disabled: disabledSubmitBtn }"
                        @click="submitReferralCode"
                    >
                        Yes, I confirm
                    </div>
                </div>
            </TabPane>
        </Tabs>
        <Spin size="large" fix v-if="loading"></Spin>
    </Modal>
</template>

<script>
import _ from "lodash";
import Clipboard from "clipboard";
import api from "@/api";
import closeSvg from "@/components/svg/close";

export default {
    name: "referralModal",
    components: {
        closeSvg
    },
    data() {
        return {
            referralTabs: "m0",

            referralModal: false,

            referralCode: { self_code: "--------", referral_code: "" },

            addCodeFinish: false,

            codeInputErrorMsg: "",

            loading: false,

            wallet: "0x1501794bEB40A9DAff574eEBCFA0049677123456",

            copyStatus: 0
        };
    },
    created() {
        //订阅组件改变事件
        this.$pub.subscribe("referralModalChange", (msg, params) => {
            this.referralModal = params;
        });
    },
    watch: {
        disabledSubmitBtn() {}
    },
    computed: {
        //提交按钮禁止
        disabledSubmitBtn() {
            return (
                this.referralCode.referral_code?.length != 8 ||
                this.codeInputErrorMsg ||
                this.loading
            );
        },

        copyStatusStyle() {
            switch (this.copyStatus) {
                case 1:
                    return "success";
                case -1:
                    return "error";
                default:
                    return "";
            }
        }
    },
    methods: {
        /**
         * 窗口打开关闭事件
         */
        referralModalChange(status) {
            if (status) {
                this.loading = true;

                console.log(api,'api');
                api.getReferralCode(this.wallet)
                    .then(res => {
                        if (_.has(res, "data")) {
                            this.referralCode = res.data;
                            this.addCodeFinish =
                                this.referralCode.referral_code != null;
                        }
                    })
                    .catch(err => {
                        this.codeInputErrorMsg = _.has(err.data, "msg")
                            ? err.data.msg
                            : "unknown error";
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.$pub.publish("referralModalCloseEvent");

                _.delay(() => {
                    this.referralTabs = "m0";
                    this.codeInputErrorMsg = "";
                }, 200);
            }
        },

        /**
         * 复制自己的code
         */
        copyYouCode() {
            var clipboarda = new Clipboard(".copyBtn");
            clipboarda.on("success", e => {
                e.clearSelection();
                this.copyStatus = 1;
            });
            clipboarda.on("error", function(e) {
                this.copyStatus = -1;
            });

            _.delay(() => {
                this.copyStatus = 0;
            }, 200);
        },

        /**
         * code输入框自动获取焦点
         */
        codeInputFocus() {
            //未添加时
            if (!this.addCodeFinish) {
                this.$nextTick(() => {
                    this.$refs.codeInput.focus();
                });
            }
        },

        /**
         * 输入code改变事件
         */
        codeInputChange(e) {
            if (
                this.referralCode.referral_code &&
                this.referralCode.referral_code?.length != 8
            ) {
                this.codeInputErrorMsg = "The referral code is 8 characters";
            } else if (
                this.referralCode.self_code == this.referralCode.referral_code
            ) {
                this.codeInputErrorMsg = "can't add self referral code";
            } else {
                this.codeInputErrorMsg = "";
            }
        },

        /**
         * 检查code是否有效
         */
        checkReferralCode() {
            if (!this.disabledSubmitBtn) {
                this.loading = true;
                api.checkReferralCode(
                    this.wallet,
                    this.referralCode.referral_code
                )
                    .then(res => {
                        this.referralTabs = "m1";
                    })
                    .catch(err => {
                        this.codeInputErrorMsg = _.has(err.data, "msg")
                            ? err.data.msg
                            : "unknown error";
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },

        /**
         * 确认添加code
         */
        submitReferralCode() {
            if (!this.disabledSubmitBtn) {
                this.loading = true;
                api.addReferralCode(
                    this.wallet,
                    this.referralCode.referral_code
                )
                    .then(res => {
                        this.addCodeFinish = true;
                    })
                    .catch(err => {
                        this.codeInputErrorMsg = _.has(err.data, "msg")
                            ? err.data.msg
                            : "unknown error";
                    })
                    .finally(() => {
                        this.loading = false;
                        this.referralTabs = "m0";
                    });
            }
        }
    }
};
</script>

<style lang="scss">
#referralModal {
    .ivu-modal-wrap {
        position: absolute;

        .ivu-modal-body {
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0px 2px 6px #deddde;
            position: relative;
            padding: 0;
            height: 100%;
            overflow: hidden;

            .closeBtn {
                z-index: 1;
                position: absolute;
                top: 24px;
                right: 24px;
            }

            .referralTabs {
                height: 100%;

                .ivu-tabs-bar {
                    display: none;
                }

                .ivu-tabs-content {
                    height: 100%;
                }

                .m0 {
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
                            text-align: center;
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

                        .youCodeBox {
                            margin-top: 33px;
                            border-radius: 8px;
                            background: rgba($color: #1b05a1, $alpha: 0.03);
                            width: 100%;
                            padding: 47px 40px 40px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .title {
                                color: #5a575c;
                                font-family: Gilroy;
                                font-size: 16px;
                                font-weight: 700;
                                line-height: 24px;
                                text-align: center;
                                margin: 16px 0 8px;
                            }

                            .code {
                                color: #5a575c;
                                font-family: Gilroy;
                                font-size: 32px;
                                font-weight: 700;
                                line-height: 40px;
                                text-align: center;
                            }

                            .copyBtn {
                                margin-top: 44px;
                                padding: 8px 16px;
                                border-radius: 16px;
                                border: solid 1px #deddde;
                                display: flex;
                                align-items: center;
                                color: #1b05a1;
                                font-family: Gilroy;
                                font-size: 10px;
                                font-weight: 700;
                                line-height: 16px;
                                text-transform: uppercase;
                                letter-spacing: 1.25px;
                                cursor: pointer;

                                transition: $animete-time linear;

                                img {
                                    margin-right: 10px;
                                }

                                &:hover {
                                    border-color: #1b05a1;
                                }

                                &.success {
                                    border-color: greenyellow;
                                }

                                &.error {
                                    border-color: #df434c;
                                }
                            }
                        }

                        .dashLine {
                            margin: 48px 0;
                            width: 786px;
                            display: inline-block;
                            height: 1px;
                            border: 1px dashed #deddde;
                        }

                        .referralCodeBox {
                            width: 100%;
                            padding: 23px 80px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            border-radius: 8px;
                            border: solid 1px #deddde;
                            transition: $animete-time linear;
                            position: relative;

                            &.hasCode {
                                background: rgba($color: #1b05a1, $alpha: 0.03);
                                border: none;
                            }

                            &:hover {
                                &:not(.hasCode) {
                                    box-shadow: 0px 2px 12px #deddde;
                                }

                                &:not(.error) {
                                    border-color: white;
                                }
                            }

                            &.error {
                                border-color: #df434c;
                            }

                            .info {
                                color: #5a575c;
                                font-family: Gilroy;
                                font-size: 16px;
                                font-weight: 700;
                                line-height: 24px;
                                text-align: center;
                                display: flex;

                                .tip {
                                    margin-left: 8px;

                                    .ivu-tooltip-rel {
                                        transition: $animete-time linear;
                                        opacity: 0.2;
                                        &:hover {
                                            opacity: 1;
                                        }
                                        img {
                                            vertical-align: middle;
                                        }
                                    }

                                    .ivu-tooltip-popper {
                                        &[x-placement="top"] {
                                            .ivu-tooltip-arrow {
                                                border-right: 1px solid #dedede;
                                                border-bottom: 1px solid #dedede;
                                            }
                                        }

                                        &[x-placement^="bottom"] {
                                            .ivu-tooltip-arrow {
                                                border-left: 1px solid #dedede;
                                                border-top: 1px solid #dedede;
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
                                            background-color: #fff;
                                            font-family: Gilroy;
                                            font-size: 12px;
                                            font-weight: 500;
                                            line-height: 16px;
                                            color: #5a575c;
                                            padding: 10px 16px;
                                            border: 1px solid #dedede;
                                            box-shadow: none;
                                            border-radius: 16px;
                                        }
                                    }
                                }
                            }

                            .codeInput {
                                margin-top: 8px;
                                width: 100%;
                                font-family: Gilroy;
                                font-size: 32px;
                                font-weight: 700;
                                line-height: 40px;
                                color: #5a575c;
                                border: none;
                                box-shadow: none;
                                text-align: center;
                                outline: none;

                                &::placeholder {
                                    color: #c6c4c7;
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
                        }
                    }

                    .submitBtn {
                        cursor: pointer;
                        width: 100%;
                        position: absolute;
                        bottom: 0;
                        height: 80px;
                        background: #1b05a1;
                        color: #ffffff;
                        font-family: Gilroy;
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 80px;
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
                            opacity: 0.1;
                            cursor: not-allowed;
                        }
                    }
                }

                .m1 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .title {
                        color: #5a575c;
                        font-family: Gilroy;
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 32px;
                        text-align: center;
                        margin: 40px 0 8px;
                    }

                    .desc {
                        color: #5a575c;
                        font-family: "Gilroy-Regular";
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        text-align: center;
                    }

                    .btns {
                        margin-top: 32px;
                        display: flex;
                        .back,
                        .confirm {
                            font-family: Gilroy;
                            font-size: 12px;
                            font-weight: 700;
                            line-height: 16px;
                            text-align: center;
                            text-transform: uppercase;
                            letter-spacing: 1.5px;
                            border-radius: 20px;
                            padding: 13px 25px 11px;
                            cursor: pointer;
                            margin: 0 8px;
                        }

                        .back {
                            border: solid 1px #1b05a1;
                            color: #1b05a1;
                        }

                        .confirm {
                            color: white;
                            background: #1b05a1;

                            &:hover {
                                &:not(.disabled) {
                                    background-color: #1f04c6;
                                }
                            }

                            &.disabled {
                                opacity: 0.1;
                                cursor: not-allowed;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
