import { NewsKeywordBar } from "../NewsKeywordBar";
import React, { useState } from "react";
import { NewsCardProps } from "./types";
import { newsLogApi } from "@/modules/api";
import "moment/locale/ko";
import moment from 'moment'

export const NewsCard: React.FC<NewsCardProps> = ({ newsList }) => {
  const [isHovering, setIsHovering] = useState(0);
  const onClickLog = () => {
    newsLogApi(newsList.newsId)
  }

  return (
    <div className="flex flex-col justify-between rounded-xl h-full bg-white/75 ">
      <a href={newsList.link} onClick={onClickLog}>
        <img className="rounded-t-xl w-full h-[150px] object-cover"src={newsList.img} alt="" />
        <div className="py-2 text-base mx-2">{newsList.title}</div>
      </a>
      <div className="py-2 text-md mx-2">{moment(newsList.pubDate).fromNow()}</div>
      <NewsKeywordBar keywordList={newsList.keywords} />
      {!isHovering ? "" : ""}
    </div>
  );
};
