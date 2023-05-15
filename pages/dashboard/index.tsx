import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { api } from "@/services/api";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function CreateChatbot() {
  const [url, setUrl] = useState("");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const { data } = await api.post(
        "/company",
        { website: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setUrl("");
  };

  return (
    <DashboardLayout>
      <h2 className="size mb-6 text-2xl font-medium">Dashboard</h2>
      <div className="flex gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle>Crie o seu chatbot</CardTitle>
            <CardDescription>
              Cole a página inicial do seu site abaixo para criar o seu chatbot
              e clique em enviar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com/"
              />
              <Button variant="secondary" className="shrink-0" type="submit">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adicione o chatbot ao seu site</CardTitle>
            <CardDescription>
              Copie e cole o script abaixo no seu site para adicionar o chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                value={`<script src="https://pub-2517a1c0fa894c8a94a8080903a74481.r2.dev/chat.js"></script>`}
                readOnly
              />
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `<script src="https://pub-2517a1c0fa894c8a94a8080903a74481.r2.dev/chat.js"></script>`
                  );

                  alert("copied url");
                }}
              >
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default CreateChatbot;
