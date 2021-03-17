<template>
    <div id="mainPage">
        <maintenance v-if="enableMaintenance" />
        <div v-else class="container">
            <landingPage v-if="!walletAddress"></landingPage>
            <appPage v-else></appPage>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import landingPage from "@/components/landingPage";
import appPage from "@/components/appPage";
import maintenance from "@/components/maintenance";

export default {
    components: {
        landingPage,
        appPage,
        maintenance
    },
    name: "mainPage",
    data() {
        return {
            windowScreen: { //窗口
                width: 0,
                height: 0,
            },
            mobileWidth: 414, //移动端布局
            isMobile: window.innerWidth <= 414,

            enableMaintenance: process.env.ENABLE_MAINTENANCE === "TRUE"
        };
    },
    watch: {
        walletAddress() {}
    },
    computed: {
        walletAddress() {
           return this.$store.state?.wallet?.address;
        }
    },
    methods: {
        //获取窗口数据
        getWindowScreen: _.throttle(function () {
            this.windowScreen = {
                width: window.innerWidth,
                height: window.innerHeight,
            }

            this.isMobile = this.windowScreen.width <= this.mobileWidth;
            this.$store.commit('setIsMobile', this.isMobile);
        }, 50),
        copyFun(str) {
            var that = this;
            var clipboarda = new Clipboard(str);
            function success(e) {
                that.$Notice.success({
                    title: "Copied",
                    duration: 1
                });
                e.clearSelection();
                clipboarda.off("success", success)
            }
            clipboarda.on("success", success);
        }
    },
    mounted() {
        this.$store.commit('setIsMobile', this.isMobile);

        //监视窗口变化
        window.addEventListener("resize", this.getWindowScreen, false);

    },
    destroyed() {
        //window.removeEventListener("resize", this.getWindowScreen, false);
    }
};
</script>

<style lang="scss" scoped>
#mainPage {
    width: 100vw;
    min-height: 100vh;
    overflow: auto;
    background: #fafafa;

    .container {
        margin: 0 auto;
        width: 1440px;
    }

}

@media only screen and (max-width: $max-phone-width) {
    #mainPage {
        overflow: visible;
        .container {
            width: 100vw;
        }
    }
}
</style>
