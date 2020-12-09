<template>
    <div id="appPage">
        <actions></actions>
        <walletDetails></walletDetails>
    </div>
</template>

<script>
import walletDetails from "@/components/appPage/walletDetails";
import actions from "@/components/appPage/actions";

export default {
    name: "appPage",
    components: {
        walletDetails,
        actions
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss">
#appPage {
    display: flex;
    padding: 0 120px 64px;
}

@media only screen and (max-width: $max-phone-width) {
    #appPage {
        display: flex;
        padding: 0 16px 16px 16px;
    }
}
</style>
