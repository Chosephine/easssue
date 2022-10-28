import { NewsCard } from "../NewsCard"
import { KeywordBar } from "../KeywordBar"
export const NewsBoard = () => {
  const keywords = ["인기", "네이버", "비트코인", "이청아", "제페토"]
  const userKeywords = ["SSAFY", "카카오", "메타버스", "남궁민", "블록체인"]
  return (
    <div>
      <KeywordBar keywordList={userKeywords}/>
      <div className="bg-black/50 rounded-lg my-4 mx-2 p-4">
        <div className="text-white text-xl">인기 & 추천</div>
        <div>
          <KeywordBar keywordList={keywords}/>
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