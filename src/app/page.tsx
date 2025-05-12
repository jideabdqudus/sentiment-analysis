"use client";
import { useState } from "react";
import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { Prompts } from "@/components/prompts";
import { Messages } from "@/components/messages";

interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [probability, setProbability] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: content }),
      });
      if (!res.ok) throw new Error("Failed to analyze sentiment");
      const data = await res.json();
      setProbability(data.confidence);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.result,
        type: "assistant",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setInputValue("");
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I had trouble analyzing that. Please try again.",
        type: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const clearStates = () => {
    setMessages([]);
    setProbability(0);
    setInputValue("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <Header onReset={clearStates} />

      <div className="flex-1 flex items-center justify-center w-full">
        <Messages messages={messages} probability={probability} />
      </div>

      <div className="w-full max-w-4xl px-4">
        {messages.length === 0 && <Prompts onSelect={handleSendMessage} />}
      </div>

      <Chat
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
      />
    </main>
  );
}
