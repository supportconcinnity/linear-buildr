<template>
    <div id="homePage">
        <div class="title">Welcome to Buildr</div>
        <div class="context">
            Our native token LINA is staked in our collateral pool to build
            ℓUSD. The collateral pool enables infinite liquidity and no
            slippage.
        </div>
        <div class="actionsBox">
            <div class="boxItem" @click="isMobile && btnClick(1)">
                <div class="imgBox">
                    <img src="@/static/LINA_logo.svg"  />
                </div>
                <div class="boxContext">
                    Buy LINA <br />
                    on other platform
                </div>
                <div
                    class="btn"
                    :class="{ isMobile }"
                    @click="!isMobile && btnClick(1)"
                >
                    BUY LINA <Icon type="ios-arrow-round-forward" />
                </div>
            </div>
            <div class="boxItem" @click="isMobile && btnClick(2)">
                <div class="imgBox">
                    <img src="@/static/currency/lUSD.svg"  />
                </div>
                <div class="boxContext">
                    Stake LINA <br />
                    Build ℓUSD
                </div>
                <div
                    class="btn"
                    :class="{ isMobile }"
                    @click="!isMobile && btnClick(2)"
                >
                    Build ℓUSD
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { openBuyLINA } from "@/common/utils";

export default {
    name: "homePage",
    data() {
        return {};
    },
    watch: {
        isMobile() {}
    },
    computed: {
        isMobile() {
            return this.$store.state?.isMobile;
        }
    },
    methods: {
        btnClick(type) {
            if (type == 1) {
                openBuyLINA();
            } else {
                this.$store.commit("setCurrentAction", 1);
                this.$router.push("build")
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

                img {
                    width: 100%;
                    height: 100%;
                }
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

            &:not(.isMobile) {
                &:hover {
                    background-color: #7eb5ff;
                }
            }
        }
    }
}

@media only screen and (max-width: $max-phone-width) {
    #homePage {
        width: 100%;
        height: 88vh !important;
        background: #fff;
        text-align: center;
        padding: 163px 0 0 0;

        .title {
            font-family: Gilroy-Bold;
            font-size: 24px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.33;
            letter-spacing: normal;
            text-align: center;
            color: #5a575c;
        }

        .context {
            font-family: Gilroy;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.33;
            letter-spacing: normal;
            text-align: center;
            color: #99999a;

            margin: 9px 60px;
        }

        .actionsBox {
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 0;
            bottom: 6.39999999984vw;
            padding: 0 6.39999999984vw;
            width: 100%;

            .boxItem {
                position: relative;
                width: 35.9999999991vw;
                height: 35.9999999991vw;
                transition: $animete-time linear;
                padding: 0 0 0 0;
                border-radius: 4px;
                border: solid 1px #deddde;
                display: flex;
                flex-direction: column;
                align-items: center;

                .imgBox {
                    width: 10.6666666664vw;
                    height: 10.6666666664vw;
                    margin: 27px 50px 0 50px;
                    img {
                        width: 10.6666666664vw;
                        height: 10.6666666664vw;
                    }
                }

                .boxContext {
                    display: none;
                }

                &:hover {
                    box-shadow: 0 2px 12px 0 #e5e5e5;
                }
            }

            .btn {
                width: 100%;
                height: 48px;
                position: absolute;
                bottom: 14px;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                background: #fff;
                text-transform: uppercase;
                cursor: pointer;
                transition: $animete-time linear;
                font-family: Gilroy-Bold;
                font-size: 12px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.33;
                letter-spacing: 1.5px;
                text-align: center;
                color: #1a38f8;
                &:nth-child(1) {
                    padding-left: 10px;
                }
                .ivu-icon {
                    font-size: 27px;
                    margin-left: 0px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
