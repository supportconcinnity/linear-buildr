<template>
    <div
        id="notification"
        :class="{
            normal: status == 0,
            success: status == 1,
            error: status == 2
        }"
    >
        <div class="statusIcon">
            <div class="icon">
                <img
                    v-if="status == 0"
                    class="loading"
                    src="@/static/transferProgress/loading.svg"
                />
                <img
                    v-if="status == 1"
                    src="@/static/transferProgress/completed.svg"
                    alt=""
                />
                <img
                    v-if="status == 2"
                    src="@/static/transferProgress/failed.svg"
                    alt=""
                />
            </div>
        </div>
        <div class="text" v>
            <div class="title">
                {{ handleTypeName }}
                <template v-if="status == 1">Completed</template
                ><template v-if="status == 2">Failed</template>
            </div>
            <div class="description">
                {{ value }} &nbsp;
                <span @click="openBlockchainScan(hash)">view</span>
            </div>
        </div>
        <div class="btns">
            <Icon type="ios-close" @click="close" />
        </div>

        <div
            class="loadingBar"
            :class="{ error: status == 2, loading: status == 0 }"
        >
            <div class="slider"></div>
        </div>
    </div>
</template>

<script>
import lnrJSConnector from "@/assets/linearLibrary/linearTools/lnrJSConnector";
import { openBlockchainScan } from "@/common/utils";

export default {
    name: "notification",
    data() {
        return {
            status: 0,
            openBlockchainScan,
        };
    },
    props: {
        // 交易hash, 操作类型, 当前步骤提示和单位
        hash: "",
        type: "",
        value: "",
        unit: "" //暂无用,无用时删除
    },
    watch: {
        handleTypeName() {}
    },
    computed: {
        //处理操作名
        handleTypeName() {
            let typeName = this.type;
            if(typeName == 'Claiming Rewards'){
                return "Claim";
            }

            if ([1, 2].includes(this.status)) {
                //去掉开头的Confirm
                typeName = typeName.replace(/^Confirm/i, "");
            }
            return typeName;
        }
    },
    created() {
        this.onListen();
    },
    methods: {
        async onListen() {
            try {
                // this.status = this.unit;  //测试用,无用时删除
                const status = await lnrJSConnector.utils.waitForTransaction(
                    this.hash
                );

                if (status === null) {
                    this.status = 0;
                } else if (status) {
                    this.status = 1;
                } else {
                    this.status = 2;
                }
            } catch (error) {
                this.status = 2;
            } finally {
                clearInterval(this.waitPercentTimeId);
            }
        },
        async close() {
            this.$emit("closeNotification", this.hash);
        }
    }
};
</script>

<style lang="scss">
#notification {
    width: 100%;
    min-height: 64px;
    box-shadow: 0 2px 6px 0 #deddde;
    border-radius: 4px;
    display: flex;
    background: #fff;
    padding: 14px 16px;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    position: relative;
    overflow: hidden;

    .statusIcon {
        margin-right: 8px;
        .icon {
            img {
                width: 32px;
                height: 32px;
                vertical-align: middle;
            }

            .loading {
                animation: rotate 3s linear infinite;
            }
        }
    }
    .text {
        flex: 1;

        .title {
            font-family: Gilroy;
            font-size: 12px;
            font-weight: bold;
            line-height: 16px;
            color: #5a575c;
        }
        .description {
            font-family: Gilroy;
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
            color: #c1c1c1;

            span {
                opacity: 0.2;
                font-family: Gilroy;
                font-size: 10px;
                font-weight: bold;
                line-height: 16px;
                letter-spacing: 1.25px;
                color: #1b05a1;
                transition: $animete-time linear;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
    .btns {
        width: 20px;
        i {
            color: #deddde;
            font-size: 30px;
            cursor: pointer;
            transition: $animete-time linear;
            &:hover {
                color: #1b05a1;
            }
        }
    }

    .loadingBar {
        height: 6px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #1b05a1;
        overflow: hidden;

        &.error {
            background-color: #df434c;
        }

        .slider {
            position: relative;
            width: 100%;
            height: 100%;
            left: -100%;
            background-color: #fff;
        }

        &.loading {
            .slider {
                animation: loop 4s linear infinite;
            }
        }
    }
}

@keyframes loop {
    /* 修改背景定位 */
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
}
</style>
