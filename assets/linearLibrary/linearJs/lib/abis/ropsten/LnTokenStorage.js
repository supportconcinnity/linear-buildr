export default [
  {
    inputs: [
      { internalType: 'address', name: '_admin', type: 'address' },
      { internalType: 'address', name: '_operator', type: 'address' }
    ],
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
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'OperatorUpdated',
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
    inputs: [],
    name: 'admin',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ { internalType: 'address', name: '', type: 'address' } ],
    name: 'balanceOf',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
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
    name: 'operator',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
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
    inputs: [
      { internalType: 'address', name: '_opperator', type: 'address' }
    ],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenOwner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'setAllowance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'setBalanceOf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];