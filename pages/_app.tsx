import { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/index.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>IAssistente</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Crie um chatbot com Inteligência Artificial treinada pelo seu website e ofereça atendimento personalizado e eficiente para seus clientes. Lide com várias perguntas e solicitações simultâneas. Experimente agora a revolução da IA no atendimento ao cliente!"
        />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
