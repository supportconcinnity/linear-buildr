<template>
    <div id="transferSuccess">
        <div class="close" @click="$emit('close')">

            <closeSvg></closeSvg>
        </div>

        <div class="icon">
            <img src="@/static/trumpet.svg" />
        </div>

        <div class="title">Congratulations!</div>

        <div class="descript">Your transaction can not be processed.</div>

        <div class="btns">
            <div class="homepage" @click="$emit('homepage')">
                Go to Homepage
            </div>
        </div>
    </div>
</template>

<script>
import closeSvg from "@/components/svg/close";
export default {
    name: "transferSuccess",
    components: {
        closeSvg
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
#transferSuccess {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .close {
        width: 40px;
        height: 40px;
        right: 24px;
        top: 24px;
        position: absolute;
    }
    .icon {
        width: 160px;
        height: 160px;
        margin: 250px auto 0 auto;
    }

    .title {
        width: 410px;
        height: 40px;
        color: #5a575c;
        font-family: "Gilroy-Bold";
        font-size: 24px;
        font-weight: 400;
        line-height: 40px;
        text-align: center;
        margin: 40px auto 0 auto;
    }

    .descript {
        width: 315px;
        height: 24px;
        color: #5a575c;
        font-family: "Gilroy-Regular";
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        margin: 8px auto 0 auto;
    }
    .btns {
        width: 173px;
        height: 24px;
        display: flex;
        margin: 32px auto 0 auto;
    }
    .homepage {
        flex: 1;
        width: 173px;
        height: 40px;
        border-radius: 20px;
        background: #1b05a1;
        color: #ffffff;
        font-family: "Gilroy-Bold";
        font-size: 12px;
        font-weight: 400;
        line-height: 40px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        cursor: pointer;
        transition: $animete-time linear;

        &:hover {
            background-color: #1f04c6;
        }
    }
}
</style>
