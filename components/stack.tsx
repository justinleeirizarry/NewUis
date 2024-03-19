import { useState } from "react";
import { Card } from "@/components/ui/card";

interface StackProps {
  data: string[];
}

const Stack: React.FC<StackProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedLines, setClickedLines] = useState<number[]>([]);

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
    <ul className="relative">
      {data.map((sentence, index) => (
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
                ? 10 * (data.length - 1 - index) - 100
                : 10 * (data.length - 1 - index)
            }px`,
            left: `${10 * index}px`,
            zIndex: clickedLines.includes(index) ? 1 : data.length + 1 - index,
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
  );
};

export default Stack;
