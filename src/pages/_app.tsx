import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AuthProvider, PolybaseProvider } from "@polybase/react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { circusTheme } from "@/styles/theme";
import { store } from "../store/store";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { auth, polybase } from "../config/polybase";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider activeChain="mumbai">
      <PolybaseProvider polybase={polybase}>
        <AuthProvider auth={auth} polybase={polybase}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={circusTheme}
              >
                <Head>
                  <title>Papantla | Para voladores más seguros</title>
                  <meta name="" content="Tus comunidades, en un solo lugar" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Layout>
                  <Notifications />
                  <Component {...pageProps} />
                </Layout>
              </MantineProvider>
            </QueryClientProvider>
          </Provider>
        </AuthProvider>
      </PolybaseProvider>
    </ThirdwebProvider>
  );
}
