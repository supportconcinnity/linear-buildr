import PubSub from "pubsub-js";
import { storeDetailsData } from "@/assets/linearLibrary/linearTools/request";

export default async function({ store }) {
    PubSub.subscribe("onWalletAccountChange", (msg, wallet) => {
        //设置siger放到selectedWallet的onMetamaskAccountChange

        //存储数据
        storeDetailsData();
    });
}
