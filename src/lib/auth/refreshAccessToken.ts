import { fetcher } from "@/graphql/auth-fetcher";
import {
  RefreshDocument,
  RefreshMutation,
  RefreshMutationVariables,
} from "../../graphql/generated";
import { readAccessToken, setAccessToken } from "./helpers";

export default async function refreshAccessToken() {
  const currentRefreshToken = readAccessToken()?.refreshToken;

  if (!currentRefreshToken) {
    return null;
  }

  const result = await fetcher<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: currentRefreshToken,
      },
    }
  )();

  const { accessToken, refreshToken: newRefreshToken } = result.refresh;

  setAccessToken(accessToken, newRefreshToken);

  return accessToken as string;
}
