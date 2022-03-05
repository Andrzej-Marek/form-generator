import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalHead from "@components/head/GlobalHead";
import SiteLayout from "@layout/siteLayout";
import { ModalProvider } from "src/context/modal/ModalProvider";
import { ManagedModal } from "src/context";
import { ApolloProvider } from "@apollo/client";
import client from "src/apollo-client";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ModalProvider>
        <ManagedModal />
        <SiteLayout>
          <GlobalHead />
          <Component {...pageProps} />
        </SiteLayout>
      </ModalProvider>
      <Toaster />
    </ApolloProvider>
  );
}

export default MyApp;
