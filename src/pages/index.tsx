import { Container, createStyles } from "@mantine/core";
import FlightSearchbar from "@/components/home/FlightSearchbar";

export default function Home() {
  const { classes } = useStyles();

  return (
    <Container className={classes.homeContainer} fluid={true}>
      <FlightSearchbar />
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  homeContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
