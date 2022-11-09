import { NewsKeywordBar } from "../NewsKeywordBar";
import React, { useState } from "react";
import { NewsCardProps } from "./types";
import { newsLogApi } from "@/modules/api";

export const NewsCard: React.FC<NewsCardProps> = ({ newsList }) => {
  const [isHovering, setIsHovering] = useState(0);
  const onClickLog = () => {
    newsLogApi(newsList.newsId)
  }
  return (
    <div className="flex flex-col justify-between rounded-xl bg-white/75 ">
      <a href={newsList.link} onClick={onClickLog}>
        <img className="rounded-t-xl w-full h-[150px] object-cover"src={newsList.img} alt="" />
        <div className="py-2 mx-2">{newsList.title}</div>
      </a>
      <NewsKeywordBar keywordList={newsList.keywords} />
      {!isHovering ? "" : ""}
    </div>
  );
};
