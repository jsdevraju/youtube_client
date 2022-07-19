import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../app/store";
import Layout from "../app/components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
