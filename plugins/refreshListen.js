/**
 * 用于循环更新钱包面板数据
 * */

import PubSub from "pubsub-js";
import { storeDetailsData } from "@/assets/linearLibrary/linearTools/request";
import config from "@/config/common"


export default async function({ store }) {
    PubSub.subscribe("onWalletDetailsLoopRefreshStart", async msg => {
        try {
            const loopRefresh = () => {
                //是否继续
                if (store.state.walletDetailsLoopRefreshStatus) {
                    setTimeout(async () => {
                        //防止重复更新
                        if (store.state.wallet.status != 0) {
                            //等待更新完毕
                            await storeDetailsData(store, store.state.wallet.address);
                        }

                        loopRefresh();
                    }, config.walletDetailsRefreshTimeout);
                }
            };

            if (store.state.wallet.address) {
                store.commit("setLoopRefreshStatus", true);
                loopRefresh();
            }
        } catch (error) {
            console.log(error, "onWalletDetailsLoopRefreshStart");
        }
    });

    PubSub.subscribe("onWalletDetailsLoopRefreshStop", async msg => {
        store.commit("setLoopRefreshStatus", false);
    });
}
