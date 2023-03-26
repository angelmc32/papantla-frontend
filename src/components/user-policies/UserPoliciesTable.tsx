import { useState } from "react";
import { createStyles, Table } from "@mantine/core";
import UserPolicyClaim from "./UserPolicyClaim";
import { PolicyCollectionElement } from "./types";

type PropsType = {
  userPolicies: PolicyCollectionElement[];
};

const UserPoliciesTable = (props: PropsType) => {
  const { classes } = useStyles();
  const [showPolicyDetails, setShowPolicyDetails] = useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const onClickHandler = (index: number) => {
    setSelectedPolicy(props.userPolicies[index]);
    setShowPolicyDetails(true);
  };

  const rows = props.userPolicies.map((element: any, index: number) => (
    <tr
      className={classes.tableRow}
      key={`${element.flight.iataNumber}-${element.departure.scheduledTime}-${index}`}
      onClick={() => onClickHandler(index)}
    >
      <td>{element.departure.scheduledTime}</td>
      <td>
        {element.airline.iataCode} {element.flight.number}
      </td>
      <td>{element.departure.iataCode}</td>
      <td>{element.arrival.iataCode}</td>
    </tr>
  ));

  if (!showPolicyDetails) {
    return (
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Flight Number</th>
            <th>Departing</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  } else {
    return (
      <UserPolicyClaim
        selectedPolicy={selectedPolicy}
        setShowPolicyDetails={setShowPolicyDetails}
      />
    );
  }
};

export default UserPoliciesTable;

const useStyles = createStyles((theme) => ({
  table: {
    backgroundColor: "#fff",
    border: "0.0625rem solid #ced4da",
    borderRadius: "0.75rem",
    listStyle: "none",
    marginTop: "0.5rem",
    padding: "0.5rem",
    width: "100%",
  },
  tableRow: {
    borderRadius: "0.25rem",
    margin: "0.75rem 1rem",
    padding: "0.25rem 1rem",
    "&:hover": {
      backgroundColor: theme.colors.orange[2],
      cursor: "pointer",
    },
  },
}));
