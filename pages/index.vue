<template>
    <div id="mainPage">
        <div class="container">
            <landingPage v-if="!walletAddress"></landingPage>
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
        return {};
    },
    watch: {
        walletAddress() {}
    },
    computed: {
        walletAddress() {
           return this.$store.state?.wallet?.address;
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
#mainPage {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background: #fafafa;

    .container {
        margin: 0 auto;
        width: 1440px;
    }
}
</style>
