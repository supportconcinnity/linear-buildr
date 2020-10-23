<template>
    <div class="nitificationQueue" ref="nitificationQueue">
        <div class="notificationBox">
            <div v-for="(item, index) in queue" :key="index">
                <notification :hash="item.hash" :type="item.type" :value="item.value" :unit="item.unit" @closeNotification="removeNotification(index)"> </notification>
            </div>
        </div>
    </div>
</template>

<script>
import notification from "@/components/notification/notification.vue"

export default {
    name: "nitificationQueue",
    data() {
        return {
            queue: []
        };
    },
    components: {
        notification
    },
    created() {
        this.$pub.subscribe("notificationQueue", async (msg, data) => {
            let hasData = false
            for(let i=0; i<this.queue.length; i++) {
                let item = this.queue[i]
                if(item.hash == data.hash) {
                    item.hash = data.hash
                    item.type = data.type
                    item.value = data.value
                    item.unit = data.unit
                    hasData = true
                }
            }

            if(!hasData) {
                this.queue.unshift(data)
                console.log(this.queue, 'subscribe queue')
            }

            this.$nextTick(()=>{
                this.$refs.nitificationQueue.scrollTop = 99999;
            })
        });

    },
    methods: {
        removeNotification(index) {
            this.queue.splice(index, 1)

        }
    }
};
</script>

<style lang="scss">
.nitificationQueue {
    position: fixed;
    width: 374px;
    height: auto;
    max-height: 60vh;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow-y: scroll;
    ::-webkit-scrollbar-thumb {

    }
    &::-webkit-scrollbar-track-piece {
        background: #fff;
    }
    .notificationBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}


</style>
