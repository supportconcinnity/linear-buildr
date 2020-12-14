export default [
  {
    inputs: [ { internalType: 'address', name: 'admin', type: 'address' } ],
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
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_currency',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_userTotal',
        type: 'uint256'
      }
    ],
    name: 'CollateralLog',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Paused',
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
        internalType: 'bytes32',
        name: '_currency',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_userTotal',
        type: 'uint256'
      }
    ],
    name: 'RedeemCollateral',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Unpaused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minCollateral',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'close',
        type: 'bool'
      }
    ],
    name: 'UpdateTokenSetting',
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
    name: 'buildBurnSystem',
    outputs: [
      {
        internalType: 'contract LnBuildBurnSystem',
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
    name: 'candidate',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
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
  { stateMutability: 'payable', type: 'receive', payable: true },
  {
    inputs: [ { internalType: 'bool', name: '_paused', type: 'bool' } ],
    name: 'setPaused',
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
    name: 'getSystemTotalCollateralInUsd',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'getUserTotalCollateralInUsd',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'bytes32', name: '_currency', type: 'bytes32' }
    ],
    name: 'getUserCollateral',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'getUserCollaterals',
    outputs: [
      { internalType: 'bytes32[]', name: '', type: 'bytes32[]' },
      { internalType: 'uint256[]', name: '', type: 'uint256[]' }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'isSatisfyTargetRatio',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'maxRedeemableInUsd',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'bytes32', name: '_currency', type: 'bytes32' }
    ],
    name: 'maxRedeemable',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: 'user', type: 'address' } ],
    name: 'maxCanBuildAsset',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'bytes32', name: '_currency', type: 'bytes32' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'collateralAndBuild',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'bytes32', name: '_currency', type: 'bytes32' } ],
    name: 'burnAndRedeemMax',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: '_currency', type: 'bytes32' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'burnAndRedeem',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'collateralEthAndBuild',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'payable',
    type: 'function',
    payable: true
  },
  {
    inputs: [ { internalType: 'uint256', name: '_amount', type: 'uint256' } ],
    name: 'burnAndRedeemETH',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'burnAssetToTarget',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];