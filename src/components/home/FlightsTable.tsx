import { useState } from "react";
import { createStyles, Table } from "@mantine/core";
import { AirportSchedule } from "./types";
import FlighInsuranceForm from "./FlightInsuranceForm";

type PropsType = {
  airportFlightsSchedule: AirportSchedule[];
};

const FlightsTable = (props: PropsType) => {
  const { classes } = useStyles();
  const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
  const [selectedFlight, setSelectedFlight] = useState<AirportSchedule | null>(
    null
  );

  const onClickHandler = (index: number) => {
    setSelectedFlight(props.airportFlightsSchedule[index]);
    setShowFlightDetails(true);
  };

  const rows = props.airportFlightsSchedule.map(
    (element: AirportSchedule, index: number) => (
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
    )
  );

  if (!showFlightDetails) {
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
      <FlighInsuranceForm
        selectedFlight={selectedFlight}
        setShowFlightDetails={setShowFlightDetails}
      />
    );
  }
};

export default FlightsTable;

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
