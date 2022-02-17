import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalHead from "@components/head/GlobalHead";
import SiteLayout from "@layout/siteLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SiteLayout>
        <GlobalHead />
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}

export default MyApp;
