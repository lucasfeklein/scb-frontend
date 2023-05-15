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
import { Loader2 } from "lucide-react";

function CreateChatbot() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (company) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      await api.post(
        "/widget",
        { companyId: company.id, website: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      return false;
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {({ company, toggleReady }) => {
        return (
          <>
            <h2 className="size mb-6 text-2xl font-medium">Dashboard</h2>
            <div className="flex gap-6 ">
              <Card
                className={
                  (company.isReady || isLoading) &&
                  `relative cursor-not-allowed bg-${
                    company.isReady ? "green" : "blue"
                  }-50`
                }
              >
                {company.isReady && (
                  <span className="absolute -bottom-2 -right-2 z-50 text-4xl">
                    ✅
                  </span>
                )}
                {isLoading && (
                  <span className="absolute -bottom-4 -right-4 z-50 text-4xl">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  </span>
                )}
                <CardHeader>
                  <CardTitle>1 - Crie o seu chatbot</CardTitle>
                  <CardDescription>
                    Cole a página inicial do seu site abaixo para criar o seu
                    chatbot e clique em enviar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const processedCompany = await handleSubmit(company);
                      if (processedCompany) {
                        toggleReady();
                      }
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      value={company.website ? company.website : url}
                      onChange={handleUrlChange}
                      placeholder="https://example.com/"
                      disabled={company.isReady}
                    />
                    <Button
                      variant="secondary"
                      className="shrink-0"
                      type="submit"
                      disabled={company.isReady}
                    >
                      Enviar
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2 - Adicione o chatbot ao seu site</CardTitle>
                  <CardDescription>
                    Copie e cole o script abaixo no seu site para adicionar o
                    chatbot.
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
          </>
        );
      }}
    </DashboardLayout>
  );
}

export default CreateChatbot;
