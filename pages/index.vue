<template>
    <div id="mainPage">
        <div class="container">
            <landingPage v-if="!selectedWallet"></landingPage>
            <appPage v-else></appPage>
        </div>
    </div>
</template>

<script>
import landingPage from "@/components/landingPage";
import appPage from "@/components/appPage";

export default {
    components: {
        landingPage,
        appPage
    },
    name: "mainPage",
    data() {
        return {
            selectedWallet: false, //没选择钱包显示landding页，选择显示app页
        };
    },
    watch: {
        walletType() {
            this.selectedWallet = true;
        }
    },
    computed: {
        walletType() {
            return this.$store.state.walletType;
        }
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
#mainPage {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background: #FAFAFA;

    .container {
        margin: 0 auto;
        width: 1440px;
    }
}
</style>
