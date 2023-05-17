import { Icon } from "@iconify/react";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([{ user: "", chatbot: "" }]);
  const chatHistoryRef = useRef(null);
  const ws = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "44px";
    e.target.style.height = e.target.scrollHeight + "px";
    e.target.style.overflowY =
      e.target.scrollHeight > 120 ? "scroll" : "hidden";
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0 && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          user: message,
          chatbot: "",
        },
      ]);
      setMessage("");
    }
  };

  const handleTextareaBlur = (e) => {
    e.target.style.height = "44px";
  };

  const hostname =
    router.query.hostname === "localhost"
      ? "scb-frontend.vercel.app"
      : router.query.hostname;

  useEffect(() => {
    if (hostname) {
      ws.current = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}?hostname=${hostname}`
      );
      ws.current.onopen = () => {
        console.log("Connected to WebSocket server.");
      };
      ws.current.onmessage = (event) => {
        const response = event.data;
        let i = 0;
        const intervalId = setInterval(() => {
          setChatHistory((prevChatHistory) => {
            const updatedHistory = [...prevChatHistory];
            updatedHistory[updatedHistory.length - 1].chatbot = response.slice(
              0,
              i + 1
            );
            return updatedHistory;
          });
          i++;
          if (i === response.length) clearInterval(intervalId);
        }, 20); // adjust the delay as needed
      };
      ws.current.onclose = () => {
        console.log("Disconnected from WebSocket server.");
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [hostname]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const chatbotTextClasses =
    "prose rounded-bl-lg rounded-br-lg rounded-tr-lg bg-gray-100 p-4 mr-8";

  return (
    <div className="flex h-screen w-screen flex-col justify-between overflow-hidden bg-white">
      <div className="mb-2 border-b border-gray-300 bg-blue-600 p-4 text-white">
        <p className="text-lg font-bold">IAssistente</p>
      </div>
      <div className="mb-2 h-full overflow-y-auto p-6" ref={chatHistoryRef}>
        <div className="mb-3 flex flex-row">
          <p className={chatbotTextClasses}>Olá! Como posso ajudar?</p>
        </div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            {(message.user || message.chatbot) && (
              <div>
                {message.user && (
                  <div className="overflow-wrap mb-3 flex flex-row flex-wrap justify-end break-words">
                    <p className="ml-6 max-w-sm rounded-bl-lg rounded-br-lg rounded-tl-lg bg-blue-600 p-4 text-white">
                      {message.user}
                    </p>
                  </div>
                )}

                <div className="mb-3 flex flex-row">
                  {message.chatbot ? (
                    <Markdown className={chatbotTextClasses}>
                      {message.chatbot}
                    </Markdown>
                  ) : (
                    <div className={chatbotTextClasses}>
                      <ThreeDots width={30} height={30} color="#808080" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <div className="relative mx-4 mb-4">
          <textarea
            className="focus:shadow-outline mt-2 w-full resize-none rounded border bg-gray-100 py-2 pl-4 pr-11 text-gray-600 shadow focus:outline-none"
            id="message-input"
            placeholder="Type your message here"
            value={message}
            onChange={handleMessageChange}
            onBlur={handleTextareaBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                sendMessage(e);
              }
            }}
            style={{ height: "44px", maxHeight: "120px" }}
          ></textarea>
          <button
            className="absolute bottom-2 right-2 rounded bg-blue-600 px-2 py-2 text-xl font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            <Icon icon="fe:paper-plane" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
