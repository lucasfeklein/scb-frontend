"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <title>IAssistente</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Crie um chatbot com Inteligência Artificial treinada pelo seu website e ofereça atendimento personalizado e eficiente para seus clientes. Lide com várias perguntas e solicitações simultâneas. Experimente agora a revolução da IA no atendimento ao cliente!"
        />
        <link rel="icon" href="/images/favicon.ico" />
      </head>

      <body className="dark:bg-slate-900">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
