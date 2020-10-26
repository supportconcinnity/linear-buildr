<template>
    <div id="homePage">
        <div class="title">Welcome to Buildr</div>
        <div class="context">
            Our native token LINA is staked in our collateral pool to build ℓUSD. The collateral pool enables infinite liquidity and no slippage.
        </div>
        <div class="actionsBox">
            <div class="buyLINABox">
                <div class="imgBox">
                    <img src="@/static/LINA_logo.svg" alt="" />
                </div>
                <div class="context">
                    Buy LINA <br />
                    from other platforms
                </div>
                <div class="btn">BUY LINA →</div>
                 <!-- @click="btnClick(1)" -->
            </div>
            <div class="buildBox">
                <div class="imgBox">
                    <img src="@/static/lina_usd.svg" alt="" />
                </div>
                <div class="context">
                    Stake LINA <br />
                    and Build ℓUSD
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
                window.open("https://app.uniswap.org/#/swap?inputCurrency=0x3e9bc21c9b189c09df3ef1b824798658d5011937&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7");
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

    .title {
        color: #5a575c;
        font-family: Gilroy;
        font-size: 32px;
        line-height: 32px;
        font-weight: 700;
        padding-top: 200px;
        margin-bottom: 9px;
    }

    .context {
        width: 400px;
        color: #c6c4c7;
        font-family: Gilroy-Regular;
        font-size: 14px;
        font-weight: 400;
        margin: 0 auto 48px;
    }

    .actionsBox {
        display: flex;
        justify-content: center;

        .buyLINABox,
        .buildBox {
            position: relative;
            width: 188px;
            height: 300px;
            border-radius: 8px;
            border: solid 1px #deddde;
            transition: $animete-time linear;

            .imgBox {
                width: 80px;
                height: 80px;
                margin: 54px auto 16px;
                border-radius: 50%;
                border: solid 1px #deddde;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .context {
                width: 100%;
                text-align: center;
            }

            &:hover {
                box-shadow: 0px 2px 6px #deddde;
                border-color: white;

                .btn {
                    background-color: #1f04c6;
                }
            }
        }

        .buyLINABox {
            margin-right: 12px;

            img {
                width: 78px;
            }
        }

        .buildBox {
            margin-left: 12px;

            img {
                width: 35px;
            }
        }

        .btn {
            width: 100%;
            height: 48px;
            position: absolute;
            bottom: 0px;
            line-height: 48px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            background: #1b05a1;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #ffffff;
            font-family: Gilroy;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: $animete-time linear;
        }
    }
}
</style>
