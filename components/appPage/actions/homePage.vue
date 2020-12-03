<template>
    <div id="homePage">
        <div class="title">Welcome to Buildr</div>
        <div class="context">
            Our native Linear Token (LINA) serves the purpose of staking in our
            collateral pool with infinite liquidity and no slippage
        </div>
        <div class="actionsBox">
            <div class="boxItem">
                <div class="imgBox">
                    <img src="@/static/LINA_logo.svg" alt="" />
                </div>
                <div class="boxContext">
                    Buy LINA <br />
                    on other platform
                </div>
                <div class="btn">
                    BUY LINA <Icon type="ios-arrow-round-forward" />
                </div>
                <!-- @click="btnClick(1)" -->
            </div>
            <div class="boxItem">
                <div class="imgBox">
                    <img src="@/static/lina_usd.svg" alt="" />
                </div>
                <div class="boxContext">
                    Stake LINA <br />
                    Build ℓUSD
                </div>
                <div class="btn" @click="btnClick(2)">Build ℓUSD</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "homePage",
    data() {
        return {};
    },
    methods: {
        btnClick: function(type) {
            if (type == 1) {
                window.open(
                    "https://app.uniswap.org/#/swap?inputCurrency=0x3e9bc21c9b189c09df3ef1b824798658d5011937&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7"
                );
            } else {
                this.$store.commit("setCurrentAction", 1);
            }
        }
    }
};
</script>

<style lang="scss">
#homePage {
    width: 786px;
    height: 840px !important;
    background: #fff;
    text-align: center;
    padding: 200px 193px 207px;

    .title {
        font-family: Gilroy-bold;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: normal;
        color: #5a575c;
    }

    .context {
        font-family: Gilroy-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: center;
        color: #99999a;

        margin: 9px 0 48px;
    }

    .actionsBox {
        display: flex;
        justify-content: space-between;

        .boxItem {
            position: relative;
            width: 188px;
            height: 300px;
            transition: $animete-time linear;
            padding: 56px 0 0;
            border-radius: 8px;
            border: solid 1px #e5e5e5;
            display: flex;
            flex-direction: column;
            align-items: center;

            .imgBox {
                width: 80px;
                height: 80px;
                margin-bottom: 16px;
            }

            .boxContext {
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.29;
                letter-spacing: normal;
                text-align: center;
                color: #5a575c;
                font-family: Gilroy-Regular;
                cursor: default;
            }

            &:hover {
                box-shadow: 0 2px 12px 0 #e5e5e5;
            }
        }

        .btn {
            width: 100%;
            height: 48px;
            position: absolute;
            bottom: 0px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            background: #1a38f8;
            text-transform: uppercase;
            cursor: pointer;
            transition: $animete-time linear;
            font-family: Gilroy-bold;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: 2px;
            text-align: center;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;

            .ivu-icon {
                font-size: 27px;
                margin-left: 12px;
                font-weight: bold;
            }

            &:hover {
                background-color: #7eb5ff;
            }
        }
    }
}
</style>
