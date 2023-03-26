import { useState } from "react";
import { ethers } from "ethers";
import { usePolybase } from "@polybase/react";
import {
  Button,
  createStyles,
  LoadingOverlay,
  rem,
  ScrollArea,
  Table,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  execAssertTruth,
  settleAndGetAssertionResult,
  execGetAssertionResult,
} from "../../config/oracle.call";
import { PolicyCollectionElement } from "./types";
import { MUMBAI_INSURANCE } from "../../abis/contract.address";
import { Insurance } from "@/abis/insurance";
import { IconX } from "@tabler/icons-react";

type PropsType = {
  userPolicies: PolicyCollectionElement[];
};

const UserPoliciesTable = (props: PropsType) => {
  const ethereum = (window as any).ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const polybase = usePolybase();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const collectionReference = polybase.collection("Policy");

  const claimingInsurance = async (flightNum: string, policyId: string) => {
    setIsLoading(true);
    notifications.show({
      autoClose: false,
      title: "Claiming Policy insurance",
      color: "blue",
      message:
        "We will take a couple of minutes to verify your flight status. Please be patient 🤓",
    });
    try {
      await execAssertTruth(flightNum).then((result) => {
        notifications.show({
          autoClose: 7500,
          title: "Requesting flight data to oracle",
          color: "blue",
          message:
            "Our oracle will provide us with the flight data to update your on-chain policy",
        });
        if (result) {
          setTimeout(async () => {
            await settleAndGetAssertionResult().then(async (receipt) => {
              notifications.show({
                autoClose: 7500,
                title: "Oracle is settling requested data",
                color: "blue",
                message: "Almost there!",
              });
              const resUpdate = await collectionReference
                .record(policyId)
                .call("setPolicyStatus", ["claimed"]);

              if (receipt) {
                await execGetAssertionResult();
                notifications.show({
                  autoClose: 7500,
                  title: "Flight data is on-chain",
                  color: "blue",
                  message:
                    "You can now validate your claim. If your flight was cancelled, you will receive your funds after validating.",
                });
                // si esta funcion se resuelve se llama a handle y luego submitClaim
                // de insurance.sol
              }

              setIsLoading(false);
            });
          }, 120500);
        }
      });
    } catch (error: any) {
      console.log("[ERROR !!] ", error);
      notifications.show({
        autoClose: 7500,
        title: "An error occurred",
        color: "red",
        icon: <IconX size="1.1rem" />,
        message: error.reason || "Please try again later 🫣",
      });
      setIsLoading(false);
    }
  };

  const submitClaim = async (policyId: string) => {
    setIsLoading(true);
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

    try {
      const tx = await insuranceContract.submitClaim(parsedPolicyId);
      console.log(tx);
      console.log(tx.hash);
      const resUpdate = await collectionReference
        .record(policyId)
        .call("setPolicyStatus", ["validated"]);
      console.log(resUpdate);
      notifications.show({
        autoClose: 7500,
        title: "The Policy has been validated",
        color: "blue",
        message:
          "If your flight was cancelled, you will receive your funds automatically.",
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      notifications.show({
        autoClose: 7500,
        title: "An error occurred",
        color: "red",
        icon: <IconX size="1.1rem" />,
        message: error.reason || "Please try again later 🫣",
      });
      setIsLoading(false);
    }
  };

  const rows = props.userPolicies.map((row) => {
    if (row.data.id.length > 16) return null;
    return (
      <tr key={row.data.id}>
        <td className={classes.tableCell}>
          {row.data.departureDateTime.substring(0, 10)}
        </td>
        <td className={classes.tableCell}>{row.data.flightIataNumber}</td>
        <td className={classes.tableCell}>{row.data.departureIataCode}</td>
        <td className={classes.tableCell}>{row.data.arrivalIataCode}</td>
        <td className={classes.tableCell}>${row.data.insuranceCost}.00</td>
        <td className={classes.tableCell}>${row.data.insuredAmount}.00</td>
        <td className={classes.tableCell}>
          {row.data.txHash ? row.data.policyStatus : "Not insured"}
        </td>
        <td className={classes.tableCell}>
          <Button
            fullWidth
            className={classes.button}
            disabled={
              row.data.policyStatus.toLowerCase() === "claimed" ||
              row.data.policyStatus.toLowerCase() === "validated"
            }
            onClick={() => {
              console.log("Claiming...", row.data.flightIataNumber);
              claimingInsurance(row.data.flightIataNumber, row.data.id);
            }}
          >
            {row.data.policyStatus.toLowerCase() === "claimed" ||
            row.data.policyStatus.toLowerCase() === "validated"
              ? "Unavailable"
              : "Claim"}
          </Button>
        </td>
        <td className={classes.tableCell}>
          <Button
            fullWidth
            color="orange"
            className={classes.button}
            disabled={row.data.policyStatus.toLowerCase() !== "claimed"}
            onClick={() => {
              console.log("Submitting claim for...", row.data.flightIataNumber);
              submitClaim(row.data.id);
            }}
          >
            {row.data.policyStatus.toLowerCase() !== "claimed"
              ? "Unavailable"
              : "Validate"}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea
      h="50%"
      mt="2rem"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table px="2rem" miw={700}>
        <LoadingOverlay visible={isLoading} />
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th className={classes.tableCell}>Date</th>
            <th className={classes.tableCell}>Flight #</th>
            <th className={classes.tableCell}>Departure</th>
            <th className={classes.tableCell}>Arrival</th>
            <th className={classes.tableCell}>Insurance Cost</th>
            <th className={classes.tableCell}>Insured Amount</th>
            <th className={classes.tableCell}>Policy Status</th>
            <th className={classes.tableCell}>Action</th>
            <th className={classes.tableCell}>Validate Claim</th>
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

  tableCell: {
    textAlign: "center",
  },

  button: {
    transition: "background-color 150ms ease",
  },
}));
