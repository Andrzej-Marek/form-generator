import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalHead from "@components/head/GlobalHead";
import SiteLayout from "@layout/siteLayout";
import { ModalProvider } from "src/context/modal/ModalProvider";
import { ManagedModal } from "src/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ModalProvider>
        <ManagedModal />
        <SiteLayout>
          <GlobalHead />
          <Component {...pageProps} />
        </SiteLayout>
      </ModalProvider>
    </>
  );
}

export default MyApp;
