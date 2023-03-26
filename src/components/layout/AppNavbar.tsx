import { useIsAuthenticated } from "@polybase/react";
import {
  Box,
  Burger,
  Button,
  createStyles,
  Divider,
  Drawer,
  Header,
  Flex,
  Group,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import SignInButton from "../auth/SignInButton";

const AppNavbar = () => {
  const [isLoggedIn, loading] = useIsAuthenticated();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  return (
    <Box>
      <Header height={56}>
        <Group
          className={classes.container}
          position="apart"
          sx={{ height: "56px" }}
        >
          <Group>
            <Link className={classes.logoLink} href="/">
              papantla <span className={classes.icon}>🪁</span>
            </Link>
          </Group>
          <Group className={classes.hiddenMobile}>
            <Link className={classes.link} href="/how-it-works">
              How it works
            </Link>
            <Link className={classes.link} href="/about">
              About Us
            </Link>
            {isLoggedIn && (
              <Link className={classes.link} href="/user-policies">
                My Policies
              </Link>
            )}
            <SignInButton />
          </Group>

          <Burger
            color={theme.white}
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        padding="md"
        position="right"
        size="100%"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <Flex direction="column">
          <a href="#" className={classes.drawerLink}>
            Inicio
          </a>
          <a href="#" className={classes.drawerLink}>
            Comunidades
          </a>
          <a href="#" className={classes.drawerLink}>
            Eventos
          </a>

          <Divider
            my="md"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group
            className={classes.buttonContainer}
            position="center"
            grow
            pb="xl"
            px="md"
          >
            <Button
              className={classes.drawerButton}
              color="primary"
              variant="outline"
            >
              Ingresar
            </Button>
            <Button
              className={classes.drawerButton}
              color="secondary"
              variant="filled"
            >
              Registro
            </Button>
          </Group>
        </Flex>
      </Drawer>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  button: {
    fontSize: theme.fontSizes.md,
  },

  buttonContainer: {
    margin: "1rem",
  },

  container: {
    backgroundColor: theme.colors.primary,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },

  drawerButton: {
    fontSize: theme.fontSizes.lg,
  },

  drawerLink: {
    color: theme.black,
    fontSize: theme.fontSizes.lg,
    margin: "1rem 2rem",
    textDecoration: "none",
  },

  icon: {
    fontSize: "28px",
    marginBottom: "6px",
    marginLeft: "6px",
  },

  logoLink: {
    alignItems: "center",
    color: theme.white,
    display: "flex",
    fontSize: "1.25rem",
    fontWeight: 700,
    height: "100%",
    textDecoration: "none",
  },

  link: {
    alignItems: "center",
    color: theme.white,
    display: "flex",
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    "&:hover": {
      color: theme.colors.secondary[6],
    },
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default AppNavbar;
