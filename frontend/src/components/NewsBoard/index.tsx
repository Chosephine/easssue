import { NewsCard } from "../NewsCard"
import { KeywordBar } from "../KeywordBar"
import { RelatedKeywordBar } from "../RelatedKeywordBar"
import { useState, useEffect } from "react"
export const NewsBoard = () => {
  const [subSelect, setSubSelect] = useState(-1)
  const [relSelect, setRelSelect] = useState(0)
  const [keywordTitle, setKeywordTitle] = useState("인기 & 추천")
  const keywords = ["인기", "네이버", "비트코인", "이청아", "제페토"]
  const userKeywords = ["SSAFY", "카카오", "메타버스", "남궁민", "블록체인"]
  return (
    <div>
      <KeywordBar keywordList={userKeywords} subSelect={subSelect} setSubSelect={setSubSelect} setKeywordTitle={setKeywordTitle}/>
      <div className="bg-black/50 rounded-lg my-4 mx-2 p-4">
        <div className="text-white text-xl">{keywordTitle}</div>
        <div>
          <RelatedKeywordBar keywordList={keywords} relSelect={relSelect} setRelSelect={setRelSelect}/>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>        
          <NewsCard/>
          <NewsCard/>
        </div>
      </div>
    </div>
    
  )
}