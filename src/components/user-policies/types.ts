export interface PolicyCollectionElement {
  block: { hash: string };
  data: {
    arrivalIataCode: string;
    departureDateTime: string;
    departureIataCode: string;
    flightIataNumber: string;
    flightStatus: string;
    id: string;
    insuranceCost: number;
    insuredAmount: number;
    policyStatus: string;
    publicKey: {
      alg: string;
      crv: string;
      kty: string;
      use: string;
      x: string;
      y: string;
    };
    userId: string;
  };
}
