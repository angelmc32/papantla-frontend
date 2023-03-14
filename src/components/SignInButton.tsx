import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import React from "react";

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  if (!address) {
    return <ConnectWallet />;
  }

  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
        Cambiar Red
      </button>
    );
  }

  return <div>SignInButton</div>;
}
