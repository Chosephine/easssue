import { NewsKeywordBar } from "../NewsKeywordBar";
import React, { useState } from "react";
import { NewsCardProps } from "./types";
import { newsLogApi } from "@/modules/api";
import "moment/locale/ko";
import moment from "moment";

export const NewsCard: React.FC<NewsCardProps> = ({ newsList }) => {
  const [isHovering, setIsHovering] = useState(0)
  const onClickLog = () => {
    newsLogApi(newsList.newsId);
  };

  return (
    <>
      <div
        className="flex flex-col justify-between rounded-xl h-full bg-white/75 "
        onMouseOut={() => setIsHovering(()=>0)}
      >
        <a href={newsList.link} onClick={onClickLog} target="_blank">
          {!isHovering ? (
            <img
              className="rounded-t-xl w-full h-[150px] object-cover object-center"
              src={newsList.img}
              alt=""
              onMouseOver={() => setIsHovering(()=>1)}
              onMouseOut={() => setIsHovering(()=>0)}
            />
          ) : (
            <div
              className="flex flex-col justify-between h-full bg-black/75 rounded-t-xl w-full h-[150px]"
              onMouseOver={() => setIsHovering(()=>1)}
              onMouseOut={() => setIsHovering(()=>0)}
            >
              <div className="text-white text-base text-ellipsis line-clamp-5 m-2">
                {newsList.summary[0]}
              </div>
            </div>
          )}

          <div className="py-2 text-base mx-2">{newsList.title}</div>
        </a>
        <div className="py-2 text-md mx-2" onMouseOver={() => setIsHovering(()=>0)}>
          {moment(newsList.pubDate).fromNow()}
        </div>
        <NewsKeywordBar keywordList={newsList.keywords} />
      </div>
    </>
  );
};
