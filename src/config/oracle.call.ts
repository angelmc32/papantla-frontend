import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { OracleData } from "@/abis/oracle.data.check";

const eventName = "SentMessage";

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.NEXT_PUBLIC_PRIVATE_PAPANTLA_KEY as string, // Your wallet's private key (only required for write operations)
  "Goerli" // Optimism
);

export const oracleConnection = async () => {
  // Connect to your smart contract using the contract address
  const contract = await sdk.getContract(
    "0x5837d7635e7E9bf06245A75Ccd00A9a486Dd0b72",
    OracleData as any
  );
  return contract;
};

// getAssertionResult Mumbai contract 0x0000000000000000000000005837d7635e7e9bf06245a75ccd00a9a486dd0b72
// 1
export const execAssertTruth = async (flightId: string) => {
  const contract = await oracleConnection();
  const { receipt } = await contract.call("assertTruth", flightId);

  console.log(receipt.blockHash);
  return receipt;
};

// 2 se llama 2 minutos despues de la funcion execAssertTruth
export const settleAndGetAssertionResult = async () => {
  console.log("calling...");
  const contract = await oracleConnection();
  const { receipt } = await contract.call("settleAndGetAssertionResult");

  console.log(receipt.blockHash);
  return receipt;
};

// 3 solo se puede llamar despues de la funcion settleAndGetAssertionResult
export const execGetAssertionResult = async () => {
  console.log("calling...");
  const contract = await oracleConnection();
  // esta funcion envia el resultado a insurance.handle
  const { receipt } = await contract.call(
    "getAssertionResult",
    80001, // destination domain - optimism 10 ? (AMC): Chain Id is for Mumbai testnet
    "0x0000000000000000000000005837d7635e7E9bf06245A75Ccd00A9a486Dd0b72" // insurance address
  );
  console.log(receipt);
  // const events = await contract.events.getEvents(eventName);
  // console.log(events);
  return receipt;
};
