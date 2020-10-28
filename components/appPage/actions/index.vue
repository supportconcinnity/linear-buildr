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
            <div class="network">{{networkName}}</div>
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
import notificationQueue from "@/components/notification/notificationQueue.vue"

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
        networkName() {
        },
    },
    computed: {
        currentActionComputed() {
            return this.$store.state.currentAction;
        },
        networkName() {
            return this.$store.state?.walletNetworkName;
        },
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
            width: 216px;
            height: 40px;
            cursor: pointer;
        }

        .network {
            width: 77px;
            height: 32px;
            border-radius: 16px;
            background-color: rgba(27,5,161,0.03);

            font-family: Gilroy;
            font-size: 12px;
            line-height: 32px;
            text-align: center;
            font-weight: 500;
            color: #1b05a1;
        }

        .action {
            width: 85px;
            height: 40px;
            color: #1b05a1;
            opacity: .2;
            border-radius: 20px;
            border: solid 1px #FAFAFA;
            font-family: Gilroy;
            font-size: 12px;
            font-weight: 700;
            line-height: 40px;
            text-align: center;
            cursor: pointer;

            &:hover {
                opacity: 1;
                color: #1b05a1;
                border-color: #1b05a1;
            }

            &.activited {
                opacity: 1;
                color: #fff!important;
                background: #1b05a1;
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
