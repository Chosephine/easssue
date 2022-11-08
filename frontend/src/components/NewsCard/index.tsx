import { NewsKeywordBar } from "../NewsKeywordBar";
import React, { useState } from "react";
import { NewsCardProps } from "./types";

export const NewsCard: React.FC<NewsCardProps> = ({ newsList }) => {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <div className="rounded-xl p-4 bg-white/75">
      <a href={newsList.link}>
        <img src={newsList.img} alt="" />
        <div className="py-2 mx-1">{newsList.title}</div>
      </a>
      <NewsKeywordBar keywordList={newsList.keywords} />
      {!isHovering ? "" : ""}
    </div>
  );
};
