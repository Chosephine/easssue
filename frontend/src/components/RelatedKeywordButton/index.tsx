import React from "react";
import { RelatedKeywordButtonProps } from "./types";
export const RelatedKeywordButton: React.FC<RelatedKeywordButtonProps> = ({
  content,
  relSelect,
  setRelSelect,
  index,
}) => {
  const onButtonClick = () => {
    setRelSelect(relSelect === index ? -1 : index);
  };
  return (
    <button
      className="w-full rounded-full text-white text-base p-1 text-center"
      style={{
        backgroundColor:
          relSelect === index
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(0, 0, 0, 0.25)",
            color: relSelect === index ? "rgb(255, 255 ,255)" : "rgb(255, 255, 255)",
            fontSize: (content.length > 7) ? "0.875rem" : "1.2rem", 
            lineHeight: "1.75rem",
      }}
      onClick={onButtonClick}
    >
      {content}
    </button>
  );
};
