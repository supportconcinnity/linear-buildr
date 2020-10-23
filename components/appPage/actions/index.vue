<template>
    <div id="actions">
        <div class="headerBox">
            <img
                class="linearBuildrlogo"
                src="@/static/linear_buildr_logo.svg"
                alt=""
            />
            <div
                class="action"
                :class="{ activited: currentAction == 1 }"
                @click="actionChange(1)"
            >
                Build
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 2 }"
                @click="actionChange(2)"
            >
                Burn
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 3 }"
                @click="actionChange(3)"
            >
                Claim
            </div>
            <div
                class="action"
                :class="{ activited: currentAction == 4 }"
                @click="actionChange(4)"
            >
                Transfer
            </div>
        </div>

        <div class="actionsBox">
            <homePage v-if="currentAction == 0"></homePage>
            <build v-else-if="currentAction == 1"></build>
            <burn v-else-if="currentAction == 2"></burn>
            <claim v-else-if="currentAction == 3"></claim>
            <transfer v-else></transfer>

            <referralModal></referralModal>
            <transactionModal></transactionModal>
            <trackModal></trackModal>
        </div>
        <notificationQueue> </notificationQueue>
    </div>
</template>

<script>
import homePage from "@/components/appPage/actions/homePage";
import notificationQueue from "@/components/notification/notificationQueue.vue"

import build from "@/components/appPage/actions/build";
import burn from "@/components/appPage/actions/burn";
import claim from "@/components/appPage/actions/claim";
import transfer from "@/components/appPage/actions/transfer";

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
        }
    },
    computed: {
        currentActionComputed() {
            console.log(this.$store.state.currentAction);
            return this.$store.state.currentAction;
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
            widows: 216px;
            height: 40px;
            cursor: pointer;
        }

        .action {
            color: #c6c4c7;
            font-family: Gilroy;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: $animete-time linear;

            &:hover,
            &.activited {
                color: #1b05a1;
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
