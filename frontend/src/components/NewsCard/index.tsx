import { NewsKeywordBar } from "../NewsKeywordBar";
import React, { useState } from "react";
import { NewsCardProps } from "./types";
import { newsLogApi } from "@/modules/api";
import "moment/locale/ko";
import moment from "moment";

export const NewsCard: React.FC<NewsCardProps> = ({ newsList }) => {
  const [isHovering, setIsHovering] = useState(0);
  const onClickLog = () => {
    newsLogApi(newsList.newsId);
  };

  return (
    <>
      <div
        className="flex flex-col justify-between rounded-xl h-full bg-white/75 relative"
        onMouseOut={() => setIsHovering(() => 0)}
      >
        <a href={newsList.link} onClick={onClickLog} target="_blank">
          <img
            className="rounded-t-xl w-full h-[180px] object-cover object-center mb-2"
            src={newsList.img}
            alt=""
            onMouseOver={() => setIsHovering(() => 1)}
            onMouseOut={() => setIsHovering(() => 0)}
          />
          <div
            className="flex flex-col justify-between h-full bg-black/75 rounded-t-xl w-full h-[180px] absolute top-0 p-2"
            onMouseOver={() => setIsHovering(() => 1)}
            onMouseOut={() => setIsHovering(() => 0)}
            style={{ opacity: isHovering ? 1 : 0 }}
          >
            <div className="text-white text-xl text-ellipsis line-clamp-4 m-2">
              {newsList.summary[0]}
            </div>
          </div>

          <div className=" text-xl mx-2 font-bold text-ellipsis line-clamp-2 h-[56px]">
            {newsList.title}
          </div>
        </a>
        <div>
          <div
            className="text-sm mx-2 text-right"
            onMouseOver={() => setIsHovering(() => 0)}
          >
            {moment(newsList.pubDate).fromNow()}
          </div>
          <NewsKeywordBar keywordList={newsList.keywords} />
        </div>
      </div>
    </>
  );
};
