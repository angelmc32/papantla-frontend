import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { MantineProvider } from "@mantine/core";
import { circusTheme } from "@/styles/theme";
import { store } from "../store/store";
import Layout from "@/components/layout/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider activeChain="polygon">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={circusTheme}
          >
            <Head>
              <title>Circus | Tus comunidades, en un solo lugar</title>
              <meta name="" content="Tus comunidades, en un solo lugar" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </QueryClientProvider>
      </Provider>
    </ThirdwebProvider>
  );
}
