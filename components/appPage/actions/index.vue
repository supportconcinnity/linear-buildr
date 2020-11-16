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
            <div class="network">{{ networkName }}</div>
            <div
                class="action"
                :class="{ activited: currentAction == 1 }"
                @click="actionChange(1)"
            >
                BUILD
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 2 }"
                @click="actionChange(2)"
            >
                BURN
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 3 }"
                @click="actionChange(3)"
            >
                CLAIM
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 4 }"
                @click="actionChange(4)"
            >
                TRANSFER
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 5 }"
                @click="actionChange(5)"
            >
                SWAP
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
            currentAction: this.$store.state.currentAction //显示不同功能 0homePage 1build 2burn 3claim 4transfer
        };
    },
    watch: {
        currentActionComputed(newVal, oldVal) {
            this.currentAction = this.currentActionComputed;
        },
        networkName() {}
    },
    computed: {
        currentActionComputed() {
            return this.$store.state.currentAction;
        },
        networkName() {
            return this.$store.state?.walletNetworkName;
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
        }
    }
};
</script>

<style lang="scss" scoped>
#actions {
    width: 786px;

    .headerBox {
        height: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .linearBuildrlogo {
            // width: 216px;
            height: 32px;
            cursor: pointer;
        }

        .network {
            padding: 7px 16px;
            border-radius: 16px;
            background-color: rgba(#1b05a1, 0.03);
            text-align: center;
            font-family: Gilroy-Medium;
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
            color: #1b05a1;
        }

        .action {
            padding: 6px 24px;
            color: #1b05a1;
            border-radius: 20px;
            border: solid 1px rgba(#fff, 0);
            cursor: pointer;
            font-family: Gilroy-Bold;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.5px;
            text-align: center;
            transition: $animete-time linear;

            &:hover {
                border-color: #1b05a1;
            }

            &.activited {
                border-color: #1b05a1;
                background: #1b05a1;
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
</style>
