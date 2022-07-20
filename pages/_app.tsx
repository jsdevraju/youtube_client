import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../app/store";
import Layout from "../app/components/Layout/Layout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Toaster />
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
