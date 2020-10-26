<template>
    <div><notificationQueue> </notificationQueue></div>
</template>

<script>
//通知测试页, 无用时删除本页

import { BUILD_PROCESS_SETUP } from "@/assets/linearLibrary/linearTools/constants/process";
import notificationQueue from "@/components/notification/notificationQueue.vue";
export default {
    components: {
        notificationQueue
    },
    name: "",
    data() {
        return {};
    },
    mounted() {
        this.$pub.publish("notificationQueue", {
            hash: "0x11111111111",
            type: BUILD_PROCESS_SETUP.APPROVE,
            value: "Building 1/4",
            unit: 0
        });

        this.$pub.publish("notificationQueue", {
            hash: "0x11111111111",
            type: BUILD_PROCESS_SETUP.STAKING,
            value: "Building 2/4",
            unit: 1
        });

        this.$pub.publish("notificationQueue", {
            hash: "0x11111111111",
            type: BUILD_PROCESS_SETUP.UNSTAKING,
            value: "Building 3/4",
            unit: 2
        });

        setTimeout(() => {
            this.$pub.publish("notificationQueue", {
                hash: "0x11111111111",
                type: BUILD_PROCESS_SETUP.BURN,
                value: "Building 4/4",
                unit: 0
            });
        }, 1500);
    }
};
</script>

<style lang="scss" scoped></style>
