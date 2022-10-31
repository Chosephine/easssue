import { NewsKeywordBar } from "../NewsKeywordBar"
import { useState } from "react";

export const NewsCard = () => {
  const keywords = ["키워드1", "키워드2", "키워드3"]
  const [isHovering, setIsHovering] = useState(0);
  return (
    <div className="rounded-xl p-4 bg-white/75">
      <img src="newspaper.png" alt="" />
      <div className="py-2 mx-1">뉴스 제목</div>
      <NewsKeywordBar keywordList={keywords}/>
      { !isHovering ? ("") : ("")}      
    </div>
  )
}