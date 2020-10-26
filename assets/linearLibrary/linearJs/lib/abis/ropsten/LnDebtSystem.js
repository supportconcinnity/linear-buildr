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
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newFactor',
        type: 'uint256'
      }
    ],
    name: 'PushDebtLog',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAddr',
        type: 'address'
      }
    ],
    name: 'UpdateAddressStorage',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'debtProportion',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'debtFactor',
        type: 'uint256'
      }
    ],
    name: 'UpdateUserDebtLog',
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
    name: 'MAX_DEL_PER_TIME',
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
    name: 'debtCurrentIndex',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'feeSystem',
    outputs: [
      {
        internalType: 'contract LnFeeSystem',
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
    name: 'lastCloseAt',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    name: 'lastDebtFactors',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'lastDeletTo',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
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
    name: 'userDebtState',
    outputs: [
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
    inputs: [ { internalType: 'uint256', name: 'index', type: 'uint256' } ],
    name: 'SetLastCloseFeePeriodAt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint256', name: '_factor', type: 'uint256' } ],
    name: 'PushDebtFactor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      {
        internalType: 'uint256',
        name: '_debtProportion',
        type: 'uint256'
      }
    ],
    name: 'UpdateUserDebt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      {
        internalType: 'uint256',
        name: '_debtProportion',
        type: 'uint256'
      },
      { internalType: 'uint256', name: '_factor', type: 'uint256' }
    ],
    name: 'UpdateDebt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'GetUserDebtData',
    outputs: [
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
    inputs: [],
    name: 'LastSystemDebtFactor',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'GetUserCurrentDebtProportion',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'GetUserDebtBalanceInUsd',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  }
];