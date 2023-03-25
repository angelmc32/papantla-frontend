import { MouseEvent, useState } from "react";
import { createStyles, TextInput, TextInputProps } from "@mantine/core";
import { IconPlaneArrival, IconPlaneDeparture } from "@tabler/icons-react";
import { AIRPORT_DATA } from "../../../data/airport-data";

const CityInputAutocomplete = (props: InputProps) => {
  const { inputType, ...rest } = props;
  const { classes } = useStyles();
  const [state, setState] = useState<IStateInterface>({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    searchParam: string
  ) => {
    const userInput = event.currentTarget.value;

    if (event.currentTarget.value.length) {
      const filteredSuggestions: IAirportElement[] = AIRPORT_DATA.filter(
        (airport) => {
          if (!airport.municipality) return null;
          else
            return (
              airport.municipality
                .toLowerCase()
                .indexOf(userInput.toLowerCase()) > -1
            );
        }
      );

      setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: event.currentTarget.value,
      });
    } else {
      setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: event.currentTarget.value,
      });
    }
  };

  const onClickHandler = (event: MouseEvent<HTMLLIElement>) => {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText,
    });
    return null;
  };

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
    propertyName: string
  ) => {
    const { activeSuggestion, filteredSuggestions } = state;

    // User pressed the enter key
    if (event.keyCode === 13) {
      let selection: IAirportElement = filteredSuggestions[activeSuggestion];
      setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: selection[propertyName as keyof IAirportElement],
      });
    }
    // User pressed the up arrow
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setState((prevState) => ({
        ...prevState,
        activeSuggestion: activeSuggestion - 1,
      }));
    }
    // User pressed the down arrow
    else if (event.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      } else
        setState((prevState) => ({
          ...prevState,
          activeSuggestion: activeSuggestion + 1,
        }));
    }
  };

  let suggestionsListComponent;

  if (state.showSuggestions && state.userInput) {
    if (state.filteredSuggestions.length < 10) {
      suggestionsListComponent = (
        <ul className={classes.list}>
          {/* <li className="suggestion-active" key={-1} onClick={onClickHandler}>
            {state.userInput}
          </li> */}
          {state.filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === state.activeSuggestion) {
              className = "activeSuggestion";
            }

            return (
              <li
                className={`${classes.listElement} ${className}`}
                key={index}
                onClick={onClickHandler}
              >
                {`${suggestion["municipality"]}: ${suggestion["name"]} (${suggestion["iata_code"]})`}
              </li>
            );
          })}
        </ul>
      );
    } else {
      if (typeof state.userInput === "string" && state.userInput.length < 8) {
        suggestionsListComponent = (
          <ul className={classes.list}>
            <li className="suggestion-active" key={0} onClick={onClickHandler}>
              {state.userInput}
            </li>
            <li className="uk-text-danger" key={1}>
              Buscando, continua escribiendo...
            </li>
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <ul className={classes.list}>
            <li className="suggestion-active" key={0} onClick={onClickHandler}>
              {state.userInput}
            </li>
            <li className="uk-text-danger" key={1}>
              No se encuentra en el catálogo, intenta otra palabra...
            </li>
          </ul>
        );
      }
    }
  }

  return (
    <>
      <TextInput
        label={
          inputType === "departure_city" ? "Departing city" : "Arrival city"
        }
        icon={
          inputType === "departure_city" ? (
            <IconPlaneDeparture size="1.1rem" stroke={1.5} />
          ) : (
            <IconPlaneArrival size="1.1rem" stroke={1.5} />
          )
        }
        onChange={(event) => onChangeHandler(event, "departure_city")}
        radius="sm"
        size="md"
        value={state.userInput}
        {...rest}
      />
      {suggestionsListComponent}
    </>
  );
};

export default CityInputAutocomplete;

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

interface InputProps extends TextInputProps {
  inputType?: string;
}

const useStyles = createStyles((theme) => ({
  list: {
    backgroundColor: "#fff",
    border: "0.0625rem solid #ced4da",
    borderRadius: "0.75rem",
    listStyle: "none",
    marginTop: "0.5rem",
    padding: "0.5rem",
    width: "100%",
  },
  listElement: {
    borderRadius: "0.25rem",
    margin: "0.75rem 1rem",
    padding: "0.25rem 1rem",
    "&:hover": {
      backgroundColor: theme.colors.orange[2],
      cursor: "pointer",
    },
  },
}));
