import { FormEvent, useState } from "react";
import { ethers } from "ethers";
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
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconArrowLeft } from "@tabler/icons-react";
import { MUMBAI_INSURANCE, MUMBAI_USDC } from "../../abis/contract.address";
import { Insurance } from "@/abis/insurance";
import { ERC20_ABI } from "@/abis/ERC20_ABI";
import { AirportSchedule } from "./types";

interface IProps extends PaperProps {
  selectedFlight: AirportSchedule | null;
  setShowFlightDetails: (active: boolean) => void;
}

const FlightInsuranceForm = (props: IProps) => {
  const ethereum = (window as any).ethereum;
  const polybase = usePolybase();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const { state: authState } = useAuth();
  const { selectedFlight, setShowFlightDetails } = props;
  const { classes } = useStyles();
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const hideForm = () => {
    setShowFlightDetails(false);
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!authState || !authState.userId) {
      return null;
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const signer = provider.getSigner(accounts[0]);
    const insuranceContract = new ethers.Contract(
      MUMBAI_INSURANCE,
      Insurance,
      signer
    );
    if (!selectedFlight) return null;
    const { arrival, departure, flight, status } = selectedFlight;
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
    setShowFlightDetails(false);
    console.log(res);

    const tx = await insuranceContract.issueInsurance(
      flight.iataNumber,
      authState.userId,
      5000000,
      policyId
    );
    console.log(tx.hash);
    const resUpdate = await collectionReference
      .record(policyId)
      .call("setTxHash", [tx.hash]);
    console.log(resUpdate);
  };

  const approveERC20 = async (event: FormEvent) => {
    event.preventDefault();
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const signer = provider.getSigner(accounts[0]);
    const USDCContract = new ethers.Contract(MUMBAI_USDC, ERC20_ABI, signer);
    const approveHash = await USDCContract.approve(MUMBAI_INSURANCE, 50, {
      gasLimit: 320000,
    });
    console.log(approveHash);
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
          Buy Insurance for flight {selectedFlight?.flight.iataNumber}
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
                selectedFlight
                  ? new Date(selectedFlight?.departure.scheduledTime)
                  : new Date()
              }
            />
            <TextInput
              label="Flight Number"
              className={classes.styledInput}
              onChange={() => null}
              value={selectedFlight?.flight.iataNumber}
              radius="md"
            />
          </Group>
          <Group className={classes.inputsContainer}>
            <TextInput
              className={classes.styledInput}
              label="Departing from"
              onChange={() => null}
              value={selectedFlight?.departure.iataCode}
              radius="md"
            />
            <TextInput
              className={classes.styledInput}
              label="Arriving to"
              onChange={() => null}
              value={selectedFlight?.arrival.iataCode}
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

      <Button color="secondary" onClick={approveERC20} mb="1rem" radius="sm">
        Approve USDC
      </Button>
    </Paper>
  );
};

export default FlightInsuranceForm;

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
