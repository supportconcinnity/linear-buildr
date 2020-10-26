export default [
  {
    inputs: [ { internalType: 'address', name: '_admin', type: 'address' } ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldAdmin',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address'
      }
    ],
    name: 'AdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeUsd',
        type: 'uint256'
      }
    ],
    name: 'ExchangeFee',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lUSDAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'linaRewards',
        type: 'uint256'
      }
    ],
    name: 'FeesClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      }
    ],
    name: 'RewardCollateral',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldCandidate',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newCandidate',
        type: 'address'
      }
    ],
    name: 'candidateChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address'
      }
    ],
    name: 'updateCachedAddress',
    type: 'event'
  },
  {
    inputs: [],
    name: 'FEE_DUMMY_ADDRESS',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'LockTime',
    outputs: [ { internalType: 'uint64', name: '', type: 'uint64' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'OnePeriodSecs',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'becomeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'candidate',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'collateralSystem',
    outputs: [
      {
        internalType: 'contract LnCollateralSystem',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'curRewardPeriod',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'startingDebtFactor',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'feesToDistribute',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'feesClaimed', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'rewardsToDistribute',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardsClaimed',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'debtSystem',
    outputs: [
      {
        internalType: 'contract LnDebtSystem',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'exchangeSystemAddress',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'preRewardPeriod',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'startingDebtFactor',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'feesToDistribute',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'feesClaimed', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'rewardsToDistribute',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardsClaimed',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'rewardDistributer',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'rewardLocker',
    outputs: [
      {
        internalType: 'contract LnRewardLocker',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'address', name: '_candidate', type: 'address' }
    ],
    name: 'setCandidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '', type: 'address' } ],
    name: 'userLastClaimedId',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    name: 'userPeriodDebt',
    outputs: [
      { internalType: 'uint256', name: 'PeriodID', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'debtProportion',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'debtFactor', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_exchangeSystem',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_rewardDistri',
        type: 'address'
      }
    ],
    name: 'Init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_address', type: 'address' } ],
    name: 'setExchangeSystemAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint256', name: 'feeUsd', type: 'uint256' } ],
    name: 'addExchangeFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint256', name: 'reward', type: 'uint256' } ],
    name: 'addCollateralRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract LnAddressStorage',
        name: '_addressStorage',
        type: 'address'
      }
    ],
    name: 'updateAddressCache',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'switchPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feePeriodDuration',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'uint256', name: 'index', type: 'uint256' } ],
    name: 'recentFeePeriods',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'startingDebtFactor',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'feesToDistribute',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'feesClaimed', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'rewardsToDistribute',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardsClaimed',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      {
        internalType: 'uint256',
        name: 'debtProportion',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'debtFactor', type: 'uint256' }
    ],
    name: 'RecordUserDebt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: 'account', type: 'address' } ],
    name: 'isFeesClaimable',
    outputs: [ { internalType: 'bool', name: 'feesClaimable', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: 'user', type: 'address' } ],
    name: 'feesAvailable',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'claimFees',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];