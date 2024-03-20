import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StackProps {
  data: string[];
  mode: "togglePosition" | "moveToBack";
}

const Stack = ({ data, mode }: StackProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedLines, setClickedLines] = useState<number[]>([]);
  const [stackOrder, setStackOrder] = useState<number[]>([]);
  const [isMovedToBack, setIsMovedToBack] = useState<boolean[]>([]);

  useEffect(() => {
    setStackOrder(data.map((_, index) => index));
    setIsMovedToBack(new Array(data.length).fill(false));
  }, [data]);

  const handleClick = (index: number) => {
    setClickedLines((current) =>
      mode === "togglePosition"
        ? current.includes(index)
          ? current.filter((item) => item !== index)
          : [...current, index]
        : current
    );

    if (mode === "moveToBack") {
      setIsMovedToBack((current) => {
        const newMovedToBack = [...current];
        newMovedToBack[index] = !newMovedToBack[index];
        return newMovedToBack;
      });

      setStackOrder((current) => {
        const indexToRemove = current.indexOf(index);
        return [
          ...current.slice(0, indexToRemove),
          ...current.slice(indexToRemove + 1),
          index,
        ];
      });
    }
  };

  const renderItem = (index: number, sentence: string) => {
    const isHovered = hoveredIndex === index;
    const isClicked = clickedLines.includes(index);
    const isMoved = isMovedToBack[index];
    const orderIndex =
      mode === "moveToBack" ? stackOrder.indexOf(index) : index;
    const topValue =
      10 * (data.length - 1 - orderIndex) + (isClicked ? -100 : 100);
    const textOpacity = isHovered && !isClicked ? 100 : 0;

    return (
      <li
        key={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => handleClick(index)}
        className={cn(
          "absolute left-0 cursor-pointer transition-all duration-300 ease-out",
          { "scale-110": isHovered || isClicked }
        )}
        style={{
          top: `${topValue}px`,
          left: `${10 * orderIndex}px`,
          zIndex: isClicked ? 1 : data.length + 1 - orderIndex,
        }}
      >
        <Card
          className={cn(
            "flex items-center justify-center shadow-md p-4 w-full min-h-[5rem] border-2 rounded-lg transition-transform duration-300 ease-out",
            {
              "bg-white border border-black shadow-lg": !isClicked && !isMoved,
              " bg-cyan-500 shadow-lg": isClicked || isMoved,
              "transform scale-1.1": isHovered || isClicked,
            }
          )}
        >
          <span
            className={`transition-opacity duration-200 ease-linear`}
            style={{ opacity: `${textOpacity}%` }}
          >
            {sentence}.
          </span>
        </Card>
      </li>
    );
  };

  return (
    <ul className="relative">
      {data.map((sentence, index) => renderItem(index, sentence))}
    </ul>
  );
};

export default Stack;
