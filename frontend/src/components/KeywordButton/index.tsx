import React from "react";
import { KeywordButtonProps } from "./types";
export const KeywordButton: React.FC<KeywordButtonProps> = ({
  content,
  setSubSelect,
  subSelect,
  index,
  setKeywordTitle,
  setKeywordId,
}) => {
  const onButtonClick = () => {
    setSubSelect(subSelect === index ? -1 : index);
    setKeywordTitle(subSelect === index ? "인기 & 추천" : content);
    setKeywordId(subSelect === index ? -1 : index);
  };
  return (
    <button
      className="w-full rounded-full text-white text-xl p-1 text-center"
      style={{
        backgroundColor:
          subSelect === index
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(0, 0, 0, 0.25)",
        color: subSelect === index ? "rgb(255, 255 ,255)" : "rgb(255, 255, 255)",
        fontSize: (content.length > 7) ? "0.875rem" : "1.2rem", lineHeight: "1.75rem",
      }}
      onClick={onButtonClick}
    >
      {content}
    </button>
  );
};
