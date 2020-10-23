<template>
    <div class="notification" :class="{normal: status == 0, success: status == 1, error: status == 2}">
        <div class="statusIcon">
            <template v-if="status == 0">
                <i-circle
                :size="40"
                :trail-width="4"
                :stroke-width="4"
                :percent="mintPercent"
                stroke-linecap="square"
                stroke-color="#1b05a1"
                >
                </i-circle>
            </template>
            <template v-if="status == 1">
                <img
                    src="@/static/completed.svg"
                    alt=""
                />
            </template>
            <template v-if="status == 2">
                <img
                    src="@/static/failed.svg"
                    alt=""
                />
            </template>
        </div>
        <div class="text" v>
            <div class="title">Category</div>
            <div class="description" v-if="status == 0">Transaction in progress…</div>
            <div class="description" v-if="status == 1">Transaction Completed.<span @click="openEtherScan">view</span></div>
            <div class="description" v-if="status == 2">Transaction Failed.<span @click="openEtherScan">view</span></div>
            
        </div>
        <div class="btns">
            <Icon type="ios-close" @click="close" />
        </div>
    </div>
</template>

<script>
// 

export default {
    name: "nitification",
    data() {
        return {
            mintPercent: 0, //等待进度
            mintPercentTimeId: 0, //等待进度计时器ID
        };
    },
    props: {
        // 交易hash, 操作类型, 价值和单位
        hash: '',
        type: '',
        value: '',
        unit: '',
    },
    created() {
    },
    watch: {
        mintPercentFunc() {},
    },
    mounted() {
        this.onListen()
    },
    computed: {
        networkName() {
            return ''//this.$store.state?.walletNetworkName;
        },
        mintPercentFunc() {
            this.mintPercentTimeId = setInterval(() => {
                this.mintPercent++;
            }, 50);
        },
        destroyed() {
            clearInterval(this.mintPercentTimeId);
        },
        status() {
            let status = this.hash % 2 == 0 ? 1: 2
            if(status === 0) {
                status = 2
            } else {
                status = status 
            }
            status = 0
            return status
        }
    },
    methods: {
        async onListen() {
        

        },
        async close() {
            this.$emit('closeNotification', this.hash)
        },
        /**
         * 打开etherscan查询tx
         */
        openEtherScan() {
            let href = `https://${
                this.networkName === "MAINNET" ? "" : this.networkName + "."
            }etherscan.io/tx/${this.hash}`;

            window.open(href, "_blank");
        },
    }
};
</script>

<style lang="scss">

.notification {
    width: 100%;
    min-height: 64px;
    margin-bottom: 20px;
    border: solid 1px #1b05a1;
    box-shadow: 0 2px 6px 0 #deddde;
    border-radius: 5px;
    display: flex;
    background: #fff;
    
    &.normal {
        background: #fff;
    }
    &.success {
    }
    &.error {
        border: solid 1px #df434c;
    }

    .statusIcon {
        width: 64px;
        height: 64px;
        line-height: 64px;
        svg,
        img {
            width: 40px;
            height: 40px;
            margin: 12px 0 0 12px;
        }
    }
    .text {
        flex: 1;
        padding: 17px 0 0 0;
        .title {
            height: 16px;
            font-family: Gilroy;
            font-size: 12px;
            font-weight: 500;
        }
        .description {
            height: 16px;
            font-family: Gilroy;
            font-size: 12px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            color: #c6c4c7;
        }
    }
    .btns {
        width: 34px;
        line-height: 64px;
        i {
            transform: translateY(5px);
            color: #deddde;
            font-size: 30px;
            cursor: pointer;
            &:hover {
                color: #1b05a1;
            }
        }
    }

}

</style>
