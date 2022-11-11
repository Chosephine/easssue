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
      className="w-full rounded-full text-white text-base p-1 text-center"
      style={{
        backgroundColor:
          subSelect === index
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.5)",
        color: subSelect === index ? "rgb(0, 0 ,0)" : "rgb(255, 255, 255)",
      }}
      onClick={onButtonClick}
    >
      {content}
    </button>
  );
};
