import { Icon } from "@iconify/react";
import Markdown from "markdown-to-jsx";
import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaUserAlt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

function App() {
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

  useEffect(() => {
    ws.current = new WebSocket(
      "ws:localhost:8000?hostname=scb-frontend.vercel.app"
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
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="border-gray-300 chatSize bottom-full right-0 mb-5 flex h-screen w-screen flex-col justify-between overflow-hidden rounded-lg rounded-t-lg border bg-white shadow-lg">
      <div className="border-gray-300 bg-blue-500 mb-2 border-b p-4 text-white">
        <p className="text-lg font-bold">Dynamic Bot</p>
      </div>
      <div
        className="chatHistorySize mb-2 overflow-y-auto px-2"
        ref={chatHistoryRef}
      >
        <div className="mb-3 flex flex-row">
          <span className="mr-2">
            <FaRobot className="text-xl" />
          </span>
          <p className="bg-gray-200 rounded-bl-lg rounded-br-lg rounded-tr-lg px-2 py-2">
            Olá! Como posso ajudar?
          </p>
        </div>
        {chatHistory.map((message, index) => (
          <div key={index} className="text-gray-700">
            {(message.user || message.chatbot) && (
              <div>
                {message.user && (
                  <div className="mb-3 flex flex-row justify-end">
                    <p className="bg-blue-500 rounded-bl-lg rounded-br-lg rounded-tl-lg px-2 py-2 text-white">
                      {message.user}
                    </p>
                    <span className="ml-2">
                      <FaUserAlt className="text-xl" />
                    </span>
                  </div>
                )}

                <div className="mb-3 flex flex-row">
                  <span className="mr-2">
                    <FaRobot className="text-xl" />
                  </span>
                  {message.chatbot ? (
                    <Markdown className="prose bg-gray-200 rounded-bl-lg rounded-br-lg rounded-tr-lg px-2 py-2">
                      {message.chatbot}
                    </Markdown>
                  ) : (
                    <div className="prose bg-gray-200 rounded-bl-lg rounded-br-lg rounded-tr-lg px-2 py-2">
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
            className="bg-gray-100 text-gray-700 focus:shadow-outline mt-2 w-full resize-none rounded border py-2 pl-4 pr-11 shadow focus:outline-none"
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
            className="bg-blue-500 hover:bg-blue-700 absolute bottom-2 right-2 rounded px-2 py-2 text-xl font-bold text-white"
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
