import polybase from "../config/polybase";
import { Auth } from "@polybase/auth";
import { useAppSelector } from "../store/store";

export default function Home() {
  const authState = useAppSelector((state) => state.polybaseAuth);

  const createRecord = async () => {
    const recordData = ["test-user-1", "User Name"];

    const collectionReference = polybase.collection("User");

    const res = await collectionReference.create(recordData);
  };

  return (
    <>
      <h1>Hola mundo!</h1>
      {!authState.publicKey ? (
        <p>Debes iniciar sesión</p>
      ) : (
        <button onClick={createRecord}>Crear usuario test</button>
      )}
    </>
  );
}
