import { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/index.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>IAssitente</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
