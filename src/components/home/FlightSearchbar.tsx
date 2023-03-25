import { MouseEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ActionIcon,
  Button,
  createStyles,
  Grid,
  Tabs,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import CityInputAutocomplete from "./CityInputAutocomplete";
import FlightsTable from "./FlightsTable";

const getFlights = async () => {
  const response = await axios.get(
    `https://aviation-edge.com/v2/public/flights?key=${[
      process.env.NEXT_PUBLIC_AVIATION_API_KEY,
    ]}&limit=10`
  );
  return response.data;
};

const getFlightByNumber = async (flightNumber: string) => {
  const response = await axios.get(
    `https://aviation-edge.com/v2/public/timetable?key=${process.env.NEXT_PUBLIC_AVIATION_API_KEY}&flight_num=${flightNumber}`
  );
  return response.data;
};

const getAirportSchedule = async () => {
  const response = await axios.get(
    `https://aviation-edge.com/v2/public/timetable?key=${process.env.NEXT_PUBLIC_AVIATION_API_KEY}&iataCode=MEX&status=scheduled&type=departure&limit=30`
  );
  return response.data;
};

const FlightSearchbar = (props: TextInputProps) => {
  const { classes } = useStyles();
  const [value, setValue] = useState<Date | null>(null);
  const [flightNumber, setFlightNumber] = useState<string>("");

  const {
    data: airportSchedule,
    isLoading: isLoadingAirportSchedule,
    refetch: refetchAirportSchedule,
  } = useQuery<any>({
    queryKey: ["airport-schedules"],
    queryFn: () => getAirportSchedule(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: flightData,
    isLoading: isLoadingflightData,
    refetch: refetchflightData,
  } = useQuery<any>({
    queryKey: ["flight-data", flightNumber],
    queryFn: () => getFlightByNumber(flightNumber),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onClickHandler = async (event: MouseEvent) => {
    const res = await refetchflightData();
  };

  const handleAirportScheduleQuery = async () => {
    const res = await refetchAirportSchedule();
  };

  const handleFlightQuery = async () => {
    const res = await refetchflightData();
  };

  return (
    <Tabs
      className={classes.contentContainer}
      color="secondary"
      variant="pills"
      radius="xl"
      defaultValue="lucky"
    >
      <Tabs.List className={classes.tabsContainer}>
        <Tabs.Tab value="flight_number">Flight Number</Tabs.Tab>
        <Tabs.Tab value="date_and_cities">Date and Cities</Tabs.Tab>
        <Tabs.Tab value="lucky">I&apos;m lucky</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel className={classes.tabContent} value="flight_number" pt="xl">
        <TextInput
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          onChange={(event) => setFlightNumber(event.target.value)}
          placeholder="Search flights"
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color="secondary"
              onClick={onClickHandler}
              variant="filled"
            >
              <IconArrowRight size="1.1rem" stroke={1.5} />
            </ActionIcon>
          }
          rightSectionWidth={42}
          value={flightNumber}
          {...props}
        />
        {flightData && (
          <div className={classes.tableContainer}>
            <FlightsTable airportFlightsSchedule={flightData} />
          </div>
        )}
      </Tabs.Panel>

      <Tabs.Panel
        className={classes.tabContent}
        value="date_and_cities"
        pt="xl"
      >
        <Grid className={classes.styledGrid} grow>
          <Grid.Col span={3}>
            <DateInput
              label="Date"
              maw={400}
              mx="auto"
              onChange={setValue}
              placeholder="Date input"
              radius="sm"
              size="md"
              value={value}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <CityInputAutocomplete inputType="departure_city" />
          </Grid.Col>
          <Grid.Col span={3}>
            <CityInputAutocomplete inputType="arrival_city" />
          </Grid.Col>
          <Grid.Col className={classes.buttonContainer} span={1}>
            <Button
              className={classes.searchButton}
              color="secondary"
              size="md"
            >
              Search
            </Button>
          </Grid.Col>
        </Grid>
      </Tabs.Panel>

      <Tabs.Panel className={classes.tabContent} value="lucky" pt="xl">
        <Button
          className={classes.searchButton}
          color="secondary"
          onClick={handleAirportScheduleQuery}
          mb="2rem"
        >
          Search
        </Button>
        {airportSchedule && (
          <div className={classes.tableContainer}>
            <FlightsTable airportFlightsSchedule={airportSchedule} />
          </div>
        )}
      </Tabs.Panel>
    </Tabs>
  );
};

export default FlightSearchbar;

const useStyles = createStyles((theme) => ({
  buttonContainer: {
    alignItems: "end",
    display: "flex",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  searchButton: {
    marginBottom: "1px",
    marginLeft: "0.5rem",
  },
  styledGrid: {
    width: "75%",
  },
  tableContainer: {
    width: "50%",
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  tabContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
}));

interface IAirportElement {
  ident?: string;
  type?: string;
  name?: string;
  elevation_ft?: number;
  continent?: string;
  iso_country?: string;
  iso_region?: string;
  municipality?: string;
  gps_code?: string | number;
  iata_code?: string | number;
  local_code?: string | number;
  coordinates?: string | number;
}

interface IStateInterface {
  activeSuggestion: number;
  filteredSuggestions: IAirportElement[];
  showSuggestions: boolean;
  userInput: string | number | undefined;
}
