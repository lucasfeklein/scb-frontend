import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { api } from "@/services/api";
import { useState } from "react";

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
        { name: url, website: url },
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
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="mb-4 text-xl font-bold">Digite sua URL</h2>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/"
            className="rounded-l-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-r-md bg-primary px-4 py-2 text-white"
          >
            Enviar
          </button>
        </form>

        <input
          type="text"
          value={"https://pub-2517a1c0fa894c8a94a8080903a74481.r2.dev/chat.js"}
          className="rounded-l-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={async () => {
            await navigator.clipboard.writeText(
              "https://pub-2517a1c0fa894c8a94a8080903a74481.r2.dev/chat.js"
            );

            alert("copied url");
          }}
        />
      </div>
    </DashboardLayout>
  );
}

export default CreateChatbot;
