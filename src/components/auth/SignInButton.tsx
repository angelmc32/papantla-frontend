import { useEffect } from "react";
import { Auth } from "@polybase/auth";
import { SignerResponse } from "@polybase/client";
import { useAuth, usePolybase } from "@polybase/react";
import { Button, createStyles } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  AuthStateInterface,
  clearUser,
  setUser,
} from "../../store/slices/polybaseAuthSlice";

const SignInButton = () => {
  const polybase = usePolybase();
  const { auth, state, loading } = useAuth();
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();

  const login = async () => {
    const res = await auth.signIn();
    polybase.signer(async (data: string) => {
      return {
        h: "eth-personal-sign",
        sig: (await auth.ethPersonalSign(data)) || "",
      };
    });
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

  if (!state?.publicKey) {
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
