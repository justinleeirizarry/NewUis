"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Card } from "@/components/ui/card";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedLines, setClickedLines] = useState<number[]>([]);

  const splitSentences = (content: string) =>
    content
      .split(/(?<!\d)\.(?!\d)/)
      .filter(Boolean)
      .reverse(); // Reverse the array here

  const handleClick = (index: number) => {
    setClickedLines((prevClickedLines) => {
      const indexInArray = prevClickedLines.indexOf(index);
      if (indexInArray > -1) {
        return prevClickedLines.filter((_, i) => i !== indexInArray);
      } else {
        return [...prevClickedLines, index];
      }
    });
  };

  return (
    <div className="flex flex-col w-full max-w-4xl py-24 mx-auto">
      {messages.map((message, msgIndex) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? (
            <>User: {message.content}</>
          ) : (
            <ul className="relative">
              {splitSentences(message.content).map((sentence, index, arr) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleClick(index)}
                  className={`absolute left-0 cursor-pointer transition-all duration-300 ease-out ${
                    hoveredIndex === index || clickedLines.includes(index)
                      ? "scale-110"
                      : ""
                  }`}
                  style={{
                    top: `${
                      clickedLines.includes(index)
                        ? 10 * (arr.length - 1 - index) - 100
                        : 10 * (arr.length - 1 - index)
                    }px`, // Adjust `top` to account for reversed order
                    left: `${10 * index}px`,
                    zIndex: clickedLines.includes(index)
                      ? 1
                      : messages.length + 1 - msgIndex,
                  }}
                >
                  <Card
                    className={`flex items-center justify-center bg-white shadow-md p-4 w-[60rem] h-[5rem] ${
                      clickedLines.includes(index)
                        ? "border-green-500/50 shadow-lg"
                        : "border-gray-300"
                    } border-2 rounded-lg transition-transform duration-300 ease-out ${
                      hoveredIndex === index || clickedLines.includes(index)
                        ? "transform scale-1.1"
                        : ""
                    }`}
                  >
                    <span
                      className={`transition-opacity duration-200 ease-linear ${
                        hoveredIndex === index || clickedLines.includes(index)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      {sentence}.
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
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
