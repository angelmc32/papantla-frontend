import { FormEvent, useState } from "react";
import { useAuth, usePolybase } from "@polybase/react";
import { v4 as uuidv4 } from "uuid";
import {
  ActionIcon,
  Button,
  Checkbox,
  createStyles,
  Divider,
  Group,
  TextInput,
  Text,
  Paper,
  PaperProps,
  Space,
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconArrowLeft } from "@tabler/icons-react";
import { PolicyCollectionElement } from "./types";

interface IProps extends PaperProps {
  selectedPolicy: PolicyCollectionElement;
  setShowPolicyDetails: (active: boolean) => void;
}

const UserPolicyClaim = (props: IProps) => {
  const polybase = usePolybase();
  const { state: authState } = useAuth();
  const { selectedPolicy, setShowPolicyDetails } = props;
  const { classes } = useStyles();
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const hideForm = () => {
    setShowPolicyDetails(false);
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!authState || !authState.userId) {
      return null;
    }
    if (!selectedPolicy) return null;
    const { arrival, departure, flight, status } = selectedPolicy;
    const policyId = uuidv4();
    const recordData = [
      policyId,
      arrival.iataCode,
      departure.iataCode,
      departure.scheduledTime,
      flight.iataNumber,
      status,
      5,
      50,
      "active",
      authState.userId,
    ];

    const collectionReference = polybase.collection("Policy");

    const res = await collectionReference.create(recordData);
    setShowPolicyDetails(false);
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <div className={classes.modalHeader}>
        <div className={classes.modalBackButton}>
          <ActionIcon
            color="secondary"
            mr="0.5rem"
            onClick={hideForm}
            radius="xl"
            size={32}
            variant="filled"
          >
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          </ActionIcon>
          Back
        </div>
        <Text size="lg" weight={500}>
          Buy Insurance for flight {selectedPolicy?.flight.iataNumber}
        </Text>
      </div>

      <Divider my="xl" />

      <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
        <Stack>
          <Group className={classes.inputsContainer}>
            <DateInput
              className={classes.styledInput}
              label="Email"
              onChange={() => null}
              radius="md"
              value={
                selectedPolicy
                  ? new Date(selectedPolicy?.departure.scheduledTime)
                  : new Date()
              }
            />
            <TextInput
              label="Flight Number"
              className={classes.styledInput}
              onChange={() => null}
              value={selectedPolicy?.flight.iataNumber}
              radius="md"
            />
          </Group>
          <Group className={classes.inputsContainer}>
            <TextInput
              className={classes.styledInput}
              label="Departing from"
              onChange={() => null}
              value={selectedPolicy?.departure.iataCode}
              radius="md"
            />
            <TextInput
              className={classes.styledInput}
              label="Arriving to"
              onChange={() => null}
              value={selectedPolicy?.arrival.iataCode}
              radius="md"
            />
          </Group>
          <Group className={classes.inputsContainer}>
            <TextInput
              className={classes.styledInput}
              label="Policy cost"
              onChange={() => null}
              value="$ 5.00 (DAI)"
              radius="md"
            />
            <TextInput
              className={classes.styledInput}
              label="Covered amount"
              onChange={() => null}
              value="$ 50.00 (DAI)"
              radius="md"
            />
          </Group>
        </Stack>
        <Group className={classes.confirmationContainer}>
          <Checkbox
            label="I accept terms and conditions"
            checked={acceptedTerms}
            mb="1rem"
            onChange={(event) => setAcceptedTerms(!acceptedTerms)}
          />
          <Button
            color="secondary"
            disabled={!acceptedTerms}
            mb="1rem"
            radius="sm"
            type="submit"
          >
            Buy Insurance
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default UserPolicyClaim;

const useStyles = createStyles((theme) => ({
  confirmationContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: "2rem",
    width: "100%",
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
  modalBackButton: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
    left: "0",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  styledInput: {
    width: "40%",
  },
}));
