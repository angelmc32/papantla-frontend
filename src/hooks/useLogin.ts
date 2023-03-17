import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useAuthenticateMutation } from "../graphql/generated";
import generateChallenge from "../lib/auth/generateChallenge";
import { setAccessToken } from "../lib/auth/helpers";

export default function useLogin() {
  const address = useAddress();
  const sdk = useSDK();
  const { mutateAsync: sendSignedMessage } = useAuthenticateMutation();

  async function login() {
    if (!address) return;

    const { challenge } = await generateChallenge(address);

    const signature = await sdk?.wallet.sign(challenge.text);

    const { authenticate } = await sendSignedMessage({
      request: {
        address,
        signature,
      },
    });

    const { accessToken, refreshToken } = authenticate;

    setAccessToken(accessToken, refreshToken);
  }

  return useMutation(login);
}
