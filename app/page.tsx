"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Card } from "@/components/ui/card";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedLines, setClickedLines] = useState<number[]>([]); // Track clicked lines

  const handleClick = (index: number) => {
    if (!clickedLines.includes(index)) {
      setClickedLines([...clickedLines, index]); // Add line index to clickedLines state
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl py-24 mx-auto">
      {messages.map((m, index) =>
        m.role === "user" ? (
          <div key={m.id} className="whitespace-pre-wrap">
            User: {m.content}
          </div>
        ) : (
          <ul key={index} className="relative">
            {m.content.split(/(?<!\d)\.(?!\d)/).map((sentence, sIndex) => {
              const trimmedSentence = sentence.trim();
              if (!trimmedSentence) return null;

              const isHovered = sIndex === hoveredIndex;
              const isClicked = clickedLines.includes(sIndex); // Check if line is clicked
              return (
                <li
                  key={sIndex}
                  onMouseEnter={() => setHoveredIndex(sIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleClick(sIndex)} // Handle click event
                  className="absolute left-0 cursor-pointer" // Add cursor-pointer for visual feedback
                  style={{
                    top: `${sIndex * 25}px`,
                    zIndex: isHovered ? 100 : 10 + sIndex,
                  }}
                >
                  <Card className="flex items-center justify-center bg-white shadow-md p-4 w-full">
                    {/* Display checkmark for clicked lines */}
                    {isClicked && <span className="mr-2">✓</span>}
                    <span
                      className={`transition-opacity duration-200 ease-linear ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {trimmedSentence}.
                    </span>
                  </Card>
                </li>
              );
            })}
          </ul>
        )
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
