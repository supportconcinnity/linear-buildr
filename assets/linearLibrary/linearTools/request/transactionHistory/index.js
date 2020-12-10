import linearData from "@/assets/linearLibrary/linearTools/request/linearData/transactionData";
import flatten from "lodash/flatten";
import _ from "lodash";

export const PAGINATION_INDEX = 10;

export const TRANSACTION_EVENTS = [
    "Build",
    "Burn",
    "Claim",
    "Stake",
    "Unstake",
    "Transfer",
    "Referral",
    "Swap",
    "Swap"
];

export const fetchTransactionHistory = async (
    walletAddress,
    blockChain = undefined
) => {
    try {
        const [
            Build,
            burned,
            feesClaimed,
            collaterals,
            redeemCollaterals,
            transfers,
            referrals,
            freeZes,
            unfreezes
        ] = await Promise.all([
            linearData.lnr.minted({ account: walletAddress, blockChain }),
            linearData.lnr.burned({ account: walletAddress, blockChain }),
            linearData.lnr.feesClaimed({ account: walletAddress, blockChain }),
            linearData.lnr.collateral({ account: walletAddress, blockChain }),
            linearData.lnr.redeemCollateral({
                account: walletAddress,
                blockChain
            }),
            linearData.lnr.transfer({ from: walletAddress, blockChain }),
            linearData.lnr.referral({ to: walletAddress, blockChain }),
            linearData.lnr.freeZe({ account: walletAddress, blockChain }),
            linearData.lnr.unfreeze({ account: walletAddress, blockChain })
        ]);

        if (!blockChain) {
            blockChain = $nuxt.$store.state?.currentGraphApi;
        }

        let netWork = "testNet";
        let walletNetworkId = $nuxt.$store.state?.walletNetworkId;
        if (walletNetworkId == 1 || walletNetworkId == 56) {
            netWork = "mainNet";
        }

        const mergedArray = flatten(
            [
                Build,
                burned,
                feesClaimed,
                collaterals,
                redeemCollaterals,
                transfers,
                referrals,
                freeZes,
                unfreezes
            ].map((eventType, i) => {
                return eventType.map(event => {
                    event.value
                        ? (event.value = _.floor(event.value, 2))
                        : null;
                    event.amount
                        ? (event.amount = _.floor(event.amount, 2))
                        : null;
                    event.rewardslusd
                        ? (event.rewardslusd = _.floor(event.rewardslusd, 2))
                        : null;
                    event.rewardsLina
                        ? (event.rewardsLina = _.floor(event.rewardsLina, 2))
                        : null;
                    return event.type
                        ? { chain: blockChain, net: netWork, ...event }
                        : {
                              chain: blockChain,
                              net: netWork,
                              type: TRANSACTION_EVENTS[i],
                              ...event
                          };
                });
            })
        );

        //所有类型的交易记录按时间戳降序排序
        const orderData = mergedArray.sort(function(record1, record2) {
            return record2.timestamp - record1.timestamp;
        });

        return orderData;
    } catch (e) {
        console.log(e, "fetchTransactionHistory error");
    }
};
