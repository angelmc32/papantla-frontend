export interface AirportSchedule {
  airline: { iataCode: string; icaoCode: string; name: string };
  arrival: {
    actualRunway: string;
    actualTime: string;
    baggage: string;
    delay: string;
    estimatedRunway: string;
    estimatedTime: string;
    gate: string;
    iataCode: string;
    icaoCode: string;
    scheduledTime: string;
    terminal: string;
  };
  codeshared: {
    airline: { iataCode: string; icaoCode: string; name: string };
    flight: {
      iataNumber: string;
      icaoNumber: string;
      number: string;
    };
  };
  departure: {
    actualRunway: string;
    actualTime: string;
    baggage: null;
    delay: string;
    estimatedRunway: string;
    estimatedTime: string;
    gate: string;
    iataCode: string;
    icaoCode: string;
    scheduledTime: string;
    terminal: string;
  };
  flight: { iataNumber: string; icaoNumber: string; number: string };
  status: string;
  type: string;
}

export interface Flight {
  aircraft: {
    iataCode: string;
    icao24: string;
    icaoCode: string;
    regNumber: string;
  };
  airline: { iataCode: string; icaoCode: string };
  arrival: { iataCode: string; icaoCode: string };
  departure: { iataCode: string; icaoCode: string };
  flight: { iataNumber: string; icaoNumber: string; number: string };
  geography: {
    altitude: number;
    direction: number;
    latitude: number;
    longitude: number;
  };
  speed: {
    horizontal: number;
    isGround: number;
    vspeed: number;
  };
  status: string;
  system: {
    squawk: any;
    updated: number;
  };
}
