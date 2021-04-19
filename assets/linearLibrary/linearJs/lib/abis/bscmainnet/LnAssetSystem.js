export default [
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
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'AssetAdded',
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
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'AssetRemoved',
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
    name: 'CandidateChanged',
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
    name: 'StorageAddressUpdated',
    type: 'event'
  },
  {
    inputs: [ { internalType: 'address', name: '_admin', type: 'address' } ],
    name: '__LnAddressStorage_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_admin', type: 'address' } ],
    name: '__LnAdminUpgradeable_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_admin', type: 'address' } ],
    name: '__LnAssetSystem_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract ILnAsset',
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'addAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'assetNumber',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function'
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
    type: 'function'
  },
  {
    inputs: [ { internalType: 'bytes32', name: 'name', type: 'bytes32' } ],
    name: 'getAddress',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'name', type: 'bytes32' },
      { internalType: 'string', name: 'reason', type: 'string' }
    ],
    name: 'getAddressWithRequire',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAssetAddresses',
    outputs: [ { internalType: 'address[]', name: '', type: 'address[]' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '', type: 'address' } ],
    name: 'mAddress2Names',
    outputs: [ { internalType: 'bytes32', name: '', type: 'bytes32' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'bytes32', name: '', type: 'bytes32' } ],
    name: 'mAddrs',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    name: 'mAssetList',
    outputs: [
      { internalType: 'contract ILnAsset', name: '', type: 'address' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'bytes32', name: 'name', type: 'bytes32' } ],
    name: 'removeAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
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
    inputs: [],
    name: 'totalAssetsInUsd',
    outputs: [ { internalType: 'uint256', name: 'rTotal', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'name', type: 'bytes32' },
      { internalType: 'address', name: 'dest', type: 'address' }
    ],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32[]', name: 'names', type: 'bytes32[]' },
      {
        internalType: 'address[]',
        name: 'destinations',
        type: 'address[]'
      }
    ],
    name: 'updateAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];