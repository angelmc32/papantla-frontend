import { useEffect } from "react";
import { Button, createStyles } from "@mantine/core";
import { Auth } from "@polybase/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  AuthStateInterface,
  clearUser,
  setUser,
} from "../../store/slices/polybaseAuthSlice";

const auth = typeof window !== "undefined" ? new Auth() : null;

const SignInButton = () => {
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();
  const userPublicKey = useAppSelector((state) => state.polybaseAuth.publicKey);

  const login = async () => {
    const res = await auth?.signIn({ force: true });
    const authData: AuthStateInterface = {
      email: res?.email || null,
      publicKey: res?.publicKey || null,
      type: res?.type || null,
      userId: res?.userId || null,
    };
    dispatch(setUser(authData));
  };

  const logout = async () => {
    await auth?.signOut();
    dispatch(clearUser());
  };

  if (!userPublicKey) {
    return (
      <Button
        className={classes.button}
        color="secondary"
        onClick={login}
        variant="filled"
      >
        Login
      </Button>
    );
  } else {
    return (
      <Button
        className={classes.button}
        color="gray.0"
        onClick={logout}
        variant="outline"
      >
        Logout
      </Button>
    );
  }
};

export default SignInButton;

const useStyles = createStyles((theme) => ({
  button: {
    fontSize: theme.fontSizes.md,
  },
}));
