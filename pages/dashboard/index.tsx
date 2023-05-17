import DashboardLayout from "@/components/Dashboard/DashboardLayout";
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
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";

function CreateChatbot() {
  const [url, setUrl] = useState("");
  const [urlsArray, setUrlsArray] = useState<
    Array<{ url: string; isSelected: boolean }>
  >([]);
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
      setIsLoading(false);
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return false;
    }
  };

  const handleCrawler = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/fetch-urls", {
        params: { website: url },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { urls } = response.data;
      const transformedArray = urls.map((url) => ({
        url: url,
        isSelected: true,
      }));

      setUrlsArray(transformedArray);

      setUrl("");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleInput = (index) => {
    setUrlsArray((prevUrlsArray) => {
      const updatedArray = [...prevUrlsArray];
      updatedArray[index].isSelected = !updatedArray[index].isSelected;
      return updatedArray;
    });
  };

  return (
    <DashboardLayout>
      {({ company, toggleReady }) => {
        return (
          <>
            <h2 className="size mb-6 text-2xl font-medium">Dashboard</h2>
            <div className="flex gap-6 ">
              <Card>
                <CardHeader>
                  <CardTitle>1 - Buscar todas páginas do seu site</CardTitle>
                  <CardDescription>
                    Copie e cole a página inicial do seu site para buscarmos
                    todas as páginas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="https://exemplo.com.br"
                      value={url}
                      onChange={handleUrlChange}
                    />
                    <Button
                      variant="secondary"
                      className="shrink-0"
                      onClick={handleCrawler}
                    >
                      Buscar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={
                  company.isReady && "relative cursor-not-allowed bg-green-50 "
                }
              >
                {company.isReady && (
                  <span className="absolute -bottom-2 -right-2 z-50 text-4xl">
                    ✅
                  </span>
                )}

                <CardHeader>
                  <CardTitle>2 - Crie o seu chatbot</CardTitle>
                  <CardDescription>
                    Selecione as páginas que você deseja e aperte Criar.
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
                    <Button
                      variant="secondary"
                      className="shrink-0"
                      type="submit"
                      disabled={company.isReady || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Carregando...
                        </>
                      ) : (
                        "Criar"
                      )}
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
            {urlsArray.length > 0 && (
              <div className="mt-5 px-6">
                <p className="text-2xl font-bold">
                  {urlsArray.length} links encontrados:
                </p>
                {urlsArray.map((urlObj, index) => (
                  <div key={index} className="flex items-center border-b py-3">
                    <input
                      type="checkbox"
                      checked={urlObj.isSelected}
                      onChange={() => handleInput(index)}
                      className="h-4 w-4"
                    />
                    <label className="ml-3">{urlObj.url}</label>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      }}
    </DashboardLayout>
  );
}

export default CreateChatbot;
