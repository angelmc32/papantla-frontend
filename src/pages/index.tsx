import { useSelector, useDispatch } from "react-redux";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import type { RootState } from "../store/store";
import { setDefaultProfile } from "../store/slices/lensSlice";

export default function Home() {
  const profile = useSelector((state: RootState) => state.lens.profile);
  const dispatch = useDispatch();
  const address = useAddress();

  return (
    <>
      <h1>Hola mundo!</h1>
      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          <h3>{`Conectado con ${address}`}</h3>
        </>
      )}
    </>
  );
}
