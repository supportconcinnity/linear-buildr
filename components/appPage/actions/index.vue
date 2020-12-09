<template>
    <div id="actions">
        <div class="headerBox">
            <a href="/">
                <img
                    class="linearBuildrlogo"
                    src="@/static/linear_buildr_logo.svg"
                    alt=""
                />
            </a>

            <div
                v-for="(item, index) in actions"
                :key="index"
                class="action"
                :class="{
                    activited: currentAction == index + 1,
                    hover: currentHover == index + 1,
                    hit: currentAction != 0 || currentHover != 0
                }"
                @click="actionChange(index + 1)"
                @mouseenter="mouseenter(index + 1)"
                @mouseleave="mouseleave(index + 1)"
            >
                {{ item }}
            </div>

            <div class="mNavigate" v-if="mMenuState">
                <div class="mHead">
                    <div class="mLogo">
                        <img
                            src="@/static/logo-crypto-linear-colour.svg"
                        />
                        Menu
                    </div>
                    <img
                        @click="mHideMenuFun"
                        class="mClose"
                        src="@/static/icon-cancel.svg"
                    />
                </div>
                <div
                    class="mNavigateItem"
                    @click="actionChange(0)"
                    :class="{
                        activited: currentAction == 0
                    }"
                >
                    Home
                </div>
                <div
                    v-for="(item, index) in actions"
                    :key="index"
                    class="mNavigateItem"
                    :class="{
                        activited: currentAction == index + 1
                    }"
                    @click="actionChange(index + 1)"
                >
                    {{ item }}
                </div>
            </div>
        </div>

        <div class="actionsBox">
            <homePage v-if="currentAction == 0"></homePage>
            <build v-else-if="currentAction == 1"></build>
            <burn v-else-if="currentAction == 2"></burn>
            <claim v-else-if="currentAction == 3"></claim>
            <transfer v-else-if="currentAction == 4"></transfer>
            <swap v-else></swap>

            <referralModal></referralModal>
            <transactionModal></transactionModal>
            <trackModal></trackModal>
        </div>
        <notificationQueue> </notificationQueue>
    </div>
</template>

<script>
import homePage from "@/components/appPage/actions/homePage";
import notificationQueue from "@/components/notification/notificationQueue.vue";

import build from "@/components/appPage/actions/build";
import burn from "@/components/appPage/actions/burn";
import claim from "@/components/appPage/actions/claim";
import transfer from "@/components/appPage/actions/transfer";
import swap from "@/components/appPage/actions/swap";

import referralModal from "@/components/appPage/walletDetails/actions/referralModal";
import transactionModal from "@/components/appPage/walletDetails/actions/transactionModal";
import trackModal from "@/components/appPage/walletDetails/actions/trackModal";

export default {
    name: "actions",
    components: {
        homePage,
        build,
        burn,
        claim,
        transfer,
        swap,
        trackModal,
        referralModal,
        notificationQueue,
        transactionModal
    },
    data() {
        return {
            currentAction: this.$store.state.currentAction, //显示不同功能 0homePage 1build 2burn 3claim 4transfer
            currentHover: 0,
            actions: ["build", "burn", "claim", "transfer", "swap"]
        };
    },
    watch: {
        currentActionComputed(newVal, oldVal) {
            this.currentAction = this.currentActionComputed;
        }
    },
    computed: {
        currentActionComputed() {
            return this.$store.state.currentAction;
        },
        mMenuState() {
            return this.$store.state.mMenuState
        }
    },
    methods: {
        //切换功能
        //Switch between features
        actionChange: function(action) {
            this.$store.commit("setCurrentAction", action);
            // this.currentAction = action;

            //关闭 referral transaction track 的 modal
            this.$pub.publish("referralModalCloseEvent");
            this.$pub.publish("transactionModalCloseEvent");
            this.$pub.publish("trackModalCloseEvent");

            this.$pub.publish("referralModalChange", false);
            this.$pub.publish("transactionModalChange", false);
            this.$pub.publish("trackModalChange", false);
            this.$store.commit('setmMenuState', false)
        },

        //鼠标进入离开用于设置hover和activeted时,改变其他元素color
        mouseenter(index) {
            this.currentHover = index;
        },
        mouseleave(index) {
            this.currentHover = 0;
        },
        mHideMenuFun() {
            this.$store.commit('setmMenuState', false)
        }
    }
};
</script>

<style lang="scss" scoped>
#actions {
    width: 786px;
    margin-right: 40px;

    .headerBox {
        height: 120px;
        display: flex;
        align-items: center;

        .linearBuildrlogo {
            vertical-align: middle;
            width: 163px;
            height: 32px;
            cursor: pointer;
            margin-right: 28px;
        }

        .action {
            margin-right: 8px;
            border: solid 1px rgba(#fff, 0);
            cursor: pointer;
            font-family: Gilroy-Bold;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.5px;
            text-align: center;
            transition: $animete-time linear;
            padding: 8px 24px;
            border-radius: 20px;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.33;
            color: #5a575c;

            text-transform: uppercase;

            &.hit {
                color: #99999a;
            }

            &.hover {
                border-color: #1a38f8;
                color: #1a38f8;
            }

            &.activited {
                border-color: #1a38f8;
                background: #1a38f8;
                color: #fff;
            }
        }
    }

    .actionsBox {
        width: 786px;
        height: 840px;
        position: relative;
        overflow: hidden;
        box-shadow: 0px 2px 6px #deddde;
        border-radius: 16px;
    }
}



@media only screen and (max-width: $max-phone-width) {
        
    #actions {
        width: 100%;
        margin-right: 0;

        .headerBox {
            height: 32px;
            display: flex;
            align-items: center;
            margin: 16px 0;

            .linearBuildrlogo {
                vertical-align: middle;
                width: 163px;
                height: 32px;
                cursor: pointer;
                margin-right: 28px;
            }

            .action {
                display: none;
            }
            
            .mNavigate {
                width: 100vw;
                height: 100vh;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 2;
                background-color: #ffffff;
                .mHead {
                    width: 100%;
                    height: 64px;
                    padding: 16px 24px;
                    display: flex;
                    margin-bottom: 44px;
                    .mLogo {
                        font-family: Gilroy-Bold;
                        font-size: 24px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.33;
                        letter-spacing: normal;
                        color: #3c3a3e;
                        img {
                            float: left;
                            margin-right: 10px;
                        }
                    }
                    .mClose {
                        position: fixed;
                        right: 19px;
                        top: 19px;
                    }
                }
                .mNavigateItem {
                    width: 100%;
                    height: 40px;
                    font-family: Gilroy;
                    font-size: 32px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.25;
                    letter-spacing: normal;
                    color: #99999a;
                    padding-left: 56px;
                    margin-bottom: 32px;
                    &.activited {
                        font-size: 56px;
                        color: #1a38f8;
                        height: 64px;
                    }
                }
            }
        }

        .actionsBox {
            width: 100%;
            height: 88vh;
            position: relative;
            overflow: hidden;
            box-shadow: 0px 2px 6px #deddde;
            border-radius: 16px;
        }
    }
}
</style>
