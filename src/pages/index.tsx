import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "@/graphql/generated";
import Head from "next/head";

export default function Home() {
  const { data, isLoading, error } = useExplorePublicationsQuery({
    request: {
      sortCriteria: PublicationSortCriteria.TopCollected,
    },
  });

  return (
    <>
      <Head>
        <title>Explorens | Tus comunidades, en un solo lugar</title>
        <meta name="" content="Tus comunidades, en un solo lugar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hola mundo!</h1>
      </main>
    </>
  );
}
