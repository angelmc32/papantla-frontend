import { useCollection, usePolybase, useRecord } from "@polybase/react";
import { useQuery } from "@tanstack/react-query";
import { useIsAuthenticated } from "@polybase/react";
import { useAuth } from "@polybase/react";

const MyPolicies = () => {
  const polybase = usePolybase();
  const { state: authState, loading: loadingAuthState } = useAuth();
  const [isLoggedIn, loadingIsLoggedIn] = useIsAuthenticated();
  // const {
  //   data: userPolicy,
  //   error: userPolicyError,
  //   loading: loadingPolicy,
  // } = useRecord(
  //   polybase.collection("Policy").record("1d7271ee-331e-417e-80ca-4223fe294e6e")
  // );
  // const {
  //   data: userPolicies,
  //   error: userPoliciesError,
  //   loading: loadingPolicies,
  // } = useCollection(polybase.collection("Policy"));
  // console.log(userPolicies);
  const collectionReference = polybase.collection("Policy");
  // console.log(authState);

  const listRecordsWithFilter = async () => {
    if (!authState || !authState.userId) {
      return null;
    }
    const res = await collectionReference
      .where("userId", "==", authState?.userId)
      .get();
    console.log(res.data);
    return res.data;
  };

  const {
    data: userPolicies,
    isLoading: isLoadingUserPolicies,
    error: userPoliciesError,
  } = useQuery<any>({
    queryKey: ["user-policies"],
    queryFn: () => listRecordsWithFilter(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

  console.log(userPolicies);

  return (
    <>
      <h2>My Insured Flights</h2>
      {isLoggedIn ? "Aquí van los vuelos" : "Not logged in"}
      {isLoadingUserPolicies && <p>Loading...</p>}
      {userPolicies && userPolicies[0].data.id}
      {userPoliciesError && <p>Error loading policies</p>}
    </>
  );
};

export default MyPolicies;

interface IPolicy {
  id: string;
  publicKey: string;
  arrivalIataCode: string;
  departureIataCode: string;
  departureDateTime: string;
  flightIataNumber: string;
  flightStatus: string;
  insuranceCost: number;
  insuredAmount: number;
  policyStatus: string;
  txHash?: string;
}
