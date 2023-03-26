import { useState } from "react";
import { createStyles, Table, ScrollArea, rem, Button } from "@mantine/core";
import {
  execAssertTruth,
  settleAndGetAssertionResult,
  execGetAssertionResult,
} from "../../config/oracle.call";

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
    position: "relative",
    transition: "background-color 150ms ease",
  },
}));

interface UserPoliciesTableProps {
  data: {
    flightNum: string;
    departCode: string;
    arrivCode: string;
    insuranceCost: number;
    insuredAmount: number;
    policyStatus: string;
  }[];
}

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

export function UserPoliciesTable({ data }: UserPoliciesTableProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.flightNum}>
      <td>{row.flightNum}</td>
      <td>{row.departCode}</td>
      <td>{row.arrivCode}</td>
      <td>{row.insuranceCost}</td>
      <td>{row.insuredAmount}</td>
      <td>{row.policyStatus}</td>
      <td>
        <Button
          fullWidth
          className={classes.button}
          disabled={row.policyStatus.toUpperCase() === "claimed"}
          onClick={() => {
            console.log("Claiming...", row.flightNum);
            claimingInsurance(row.flightNum);
          }}
        >
          Claim
        </Button>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Flight Number</th>
            <th>Departure Code</th>
            <th>Arrival Code</th>
            <th>Insurance Cost</th>
            <th>Insured Amount</th>
            <th>Policy Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
