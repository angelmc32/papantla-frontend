export const OracleData = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_outbox",
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
        indexed: false,
        internalType: "uint32",
        name: "destinationDomain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "recipient",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "SentMessage",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightId",
        type: "string",
      },
    ],
    name: "assertTruth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "assertionId",
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
    name: "getAssertion",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bool",
                name: "arbitrateViaEscalationManager",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "discardOracle",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "validateDisputers",
                type: "bool",
              },
              {
                internalType: "address",
                name: "assertingCaller",
                type: "address",
              },
              {
                internalType: "address",
                name: "escalationManager",
                type: "address",
              },
            ],
            internalType:
              "struct OptimisticOracleV3Interface.EscalationManagerSettings",
            name: "escalationManagerSettings",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "asserter",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "assertionTime",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "settled",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "currency",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "expirationTime",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "settlementResolution",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "domainId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "identifier",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "bond",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "callbackRecipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "disputer",
            type: "address",
          },
        ],
        internalType: "struct OptimisticOracleV3Interface.Assertion",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_destinationDomain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_recipient",
        type: "bytes32",
      },
    ],
    name: "getAssertionResult",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleAndGetAssertionResult",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
