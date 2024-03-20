"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Stack from "@/components/stack";
import { Card } from "@/components/ui/card";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedLines, setClickedLines] = useState<number[]>([]);

  const splitSentences = (content: string) =>
    content.split(/(?<!\d)\.(?!\d)/).filter(Boolean);

  return (
    <div className="flex flex-col w-full max-w-4xl py-24 mx-auto ">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? (
            <div className="border-2 border-black rounded-lg p-12">
              <h1 className="text-3xl font-black">
                {message.content.toUpperCase()}
              </h1>
            </div>
          ) : (
            <div>
              <Stack
                data={splitSentences(message.content)}
                mode="togglePosition"
              />
            </div>
          )}
        </div>
      ))}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
      >
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          className="w-full text-black"
        />
      </form>
    </div>
  );
}
