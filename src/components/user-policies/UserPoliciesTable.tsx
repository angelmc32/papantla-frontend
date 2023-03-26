import { useState } from "react";
import { ethers } from "ethers";
import { usePolybase } from "@polybase/react";
import { createStyles, Table, ScrollArea, rem, Button } from "@mantine/core";
import {
  execAssertTruth,
  settleAndGetAssertionResult,
  execGetAssertionResult,
} from "../../config/oracle.call";
import { PolicyCollectionElement } from "./types";
import { MUMBAI_INSURANCE } from "../../abis/contract.address";
import { Insurance } from "@/abis/insurance";
import { getRPCErrorMessage } from "@/utils/ErrorHandlingRPC";

type PropsType = {
  userPolicies: PolicyCollectionElement[];
};

const claimingInsurance = async (flightNum: string) => {
  try {
    await execAssertTruth(flightNum).then((result) => {
      if (result) {
        setTimeout(async () => {
          await settleAndGetAssertionResult().then(async (receipt) => {
            if (receipt) {
              await execGetAssertionResult();
              // si esta funcion se resuelve se llama a handle y luego submitClaim
              // de insurance.sol
            }
          });
        }, 120500);
      }
    });
  } catch (error) {
    console.log("[ERROR !!] ", error);
  }
};

const UserPoliciesTable = (props: PropsType) => {
  const ethereum = (window as any).ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const polybase = usePolybase();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const submitClaim = async (policyId: string) => {
    const parsedPolicyId = ethers.utils.formatBytes32String(policyId);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const signer = provider.getSigner(accounts[0]);
    const insuranceContract = new ethers.Contract(
      MUMBAI_INSURANCE,
      Insurance,
      signer
    );

    const collectionReference = polybase.collection("Policy");
    try {
      const tx = await insuranceContract.submitClaim(parsedPolicyId);
      console.log(tx);
      console.log(tx.hash);
      const resUpdate = await collectionReference
        .record(policyId)
        .call("setPolicyStatus", ["claiming"]);
      console.log(resUpdate);
    } catch (error) {
      console.log(error);
      const errorMsg = getRPCErrorMessage(error);
      console.log(errorMsg);
    }
  };

  const rows = props.userPolicies.map((row) => (
    <tr key={row.data.id}>
      <td>{row.data.flightIataNumber}</td>
      <td>{row.data.departureIataCode}</td>
      <td>{row.data.arrivalIataCode}</td>
      <td>${row.data.insuranceCost}.00</td>
      <td>${row.data.insuredAmount}.00</td>
      <td>{row.data.txHash ? row.data.policyStatus : "Not insured"}</td>
      <td>
        <Button
          fullWidth
          className={classes.button}
          disabled={row.data.policyStatus.toUpperCase() === "claimed"}
          onClick={() => {
            console.log("Claiming...", row.data.flightIataNumber);
            claimingInsurance(row.data.flightIataNumber);
          }}
        >
          Claim
        </Button>
      </td>
      <td>
        <Button
          fullWidth
          color="orange"
          className={classes.button}
          disabled={row.data.policyStatus.toUpperCase() === "claimed"}
          onClick={() => {
            console.log("Submitting claim for...", row.data.flightIataNumber);
            submitClaim(row.data.id);
          }}
        >
          Validate
        </Button>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      h="50%"
      mt="2rem"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table px="2rem" miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Flight Number</th>
            <th>Departure Code</th>
            <th>Arrival Code</th>
            <th>Insurance Cost</th>
            <th>Insured Amount</th>
            <th>Policy Status</th>
            <th>Action</th>
            <th>Validate</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default UserPoliciesTable;

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },

  button: {
    transition: "background-color 150ms ease",
  },
}));
