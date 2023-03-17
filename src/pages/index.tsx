import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "@/graphql/generated";
import useLogin from "@/lib/auth/useLogin";

export default function Home() {
  const address = useAddress();
  const { mutate: requestLogin } = useLogin();
  const { data, isLoading, error } = useExplorePublicationsQuery({
    request: {
      sortCriteria: PublicationSortCriteria.TopCollected,
    },
  });

  return (
    <>
      <h1>Hola mundo!</h1>
      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          <h3>{`Conectado con ${address}`}</h3>
          <button onClick={() => requestLogin()}>
            Iniciar Sesión con Lens
          </button>
        </>
      )}
    </>
  );
}
