export const Insurance = [
  // update
  {
    inputs: [
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "address",
        name: "_inbox",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "claimId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
    ],
    name: "ClaimAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "claimId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
    ],
    name: "ClaimRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "claimTimestamp",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "claimId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
    ],
    name: "ClaimSubmitted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "insuredEvent",
        type: "string",
      },
      {
        internalType: "address",
        name: "insuredAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "insuredAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "fligthId",
        type: "string",
      },
    ],
    name: "issueInsurance",
    outputs: [
      {
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "insurer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "insuredEvent",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "insuredAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "insuredAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fligthInsured",
        type: "string",
      },
    ],
    name: "PolicyIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "origin",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "sender",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "ReceivedMessage",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "policyId",
        type: "bytes32",
      },
    ],
    name: "submitClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currency",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "insuranceClaims",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "insurancePolicies",
    outputs: [
      {
        internalType: "bool",
        name: "claimInitiated",
        type: "bool",
      },
      {
        internalType: "string",
        name: "insuredEvent",
        type: "string",
      },
      {
        internalType: "address",
        name: "insuredAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "insuredAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "fligthId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastSender",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_EVENT_DESCRIPTION_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
