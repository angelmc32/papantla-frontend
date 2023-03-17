import { useSelector, useDispatch } from "react-redux";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import {
  PublicationSortCriteria,
  useDefaultProfileQuery,
  useExplorePublicationsQuery,
} from "@/graphql/generated";
import useLogin from "@/hooks/useLogin";
import type { RootState } from "../store/store";
import { setDefaultProfile } from "../store/slices/lensSlice";

export default function Home() {
  const profile = useSelector((state: RootState) => state.lens.profile);
  const dispatch = useDispatch();
  const address = useAddress();
  const { mutate: requestLogin } = useLogin();
  // const { data, isLoading, error } = useExplorePublicationsQuery({
  //   request: {
  //     sortCriteria: PublicationSortCriteria.TopCollected,
  //   },
  // });
  const { data, isLoading, error } = useDefaultProfileQuery({
    request: {
      ethereumAddress: address,
    },
  });

  const lensLogin = () => {
    requestLogin();
    if (!data) {
      console.log(":(");
      return;
    }
    dispatch(setDefaultProfile(data.defaultProfile));
  };

  return (
    <>
      <h1>Hola mundo!</h1>
      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          <h3>{`Conectado con ${address}`}</h3>
          {!profile ? (
            <button onClick={() => lensLogin()}>Iniciar Sesión con Lens</button>
          ) : (
            <p>Hola {profile.handle}</p>
          )}
        </>
      )}
    </>
  );
}
