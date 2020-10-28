import linearData from '@/assets/linearLibrary/linearTools/request/linearData/transactionData';
import flatten from 'lodash/flatten';
import _ from "lodash";

export const PAGINATION_INDEX = 10;

export const TRANSACTION_EVENTS = [
	'Build',
	'Burn',
	'Claim',
	'Stake',
	'Unstake',
	'Transfer',
	'Referral',
];

export const fetchTransactionHistory = async walletAddress => {
	try {
		const [
			Build,
			burned,
			feesClaimed,
			collaterals,
			redeemCollaterals,
			transfers,
			referrals,
		] = await Promise.all([
			linearData.lnr.minted({ account: walletAddress }),
			linearData.lnr.burned({ account: walletAddress }),
			linearData.lnr.feesClaimed({ account: walletAddress }),
			linearData.lnr.collateral({ account: walletAddress }),
			linearData.lnr.redeemCollateral({ account: walletAddress }),
			linearData.lnr.transfer({ from: walletAddress }),
			linearData.lnr.referral({ to: walletAddress }),
		]);

		//referrals 这里记得加上去
		const mergedArray = flatten(
			[Build, burned, feesClaimed, collaterals, redeemCollaterals, transfers, referrals]
				.map((eventType, i) => {
					return eventType.map(event => {
						event.value?event.value = _.floor(event.value,2):null;
						event.amount?event.amount = _.floor(event.amount,2):null;
						event.rewardslusd?event.rewardslusd = _.floor(event.rewardslusd,2):null;
						event.rewardsLina?event.rewardsLina = _.floor(event.rewardsLina,2):null;
						return event.type ? { chain: "Ethereum", ...event } : { chain: "Ethereum", type: TRANSACTION_EVENTS[i], ...event };
					});
				})
		);

		//所有类型的交易记录按时间戳降序排序
		const orderData = mergedArray.sort( function(record1, record2) {
			return record2.timestamp - record1.timestamp;
		});

		return orderData;
	} catch (e) {
        console.log(e, 'fetchTransactionHistory error')
	}
};