import { useEffect, useState, FC } from 'react'
import { NewsCard } from "../NewsCard"
import { KeywordBar } from "../KeywordBar"
import { RelatedKeywordBar } from "../RelatedKeywordBar"
import { getNews } from '@/modules/api'
import { newsResponse } from './types'
export const NewsBoard : FC = () => {
  const [subSelect, setSubSelect] = useState(-1)
  const [relSelect, setRelSelect] = useState(0)
  const [keywordTitle, setKeywordTitle] = useState("인기 & 추천")
  const [newsObject, setNewsObject] = useState<newsResponse>({page: 0, last: false, newsList: []})
  const keywords = ["인기", "네이버", "비트코인", "이청아", "제페토"]
  const userKeywords = ["SSAFY", "카카오", "메타버스", "남궁민", "블록체인"]
  useEffect(() => {
    getNews(0).then((data) => {
      setNewsObject(data)
      console.log(newsObject)
    })
  },[])
  return (
    <div>
      <KeywordBar keywordList={userKeywords} subSelect={subSelect} setSubSelect={setSubSelect} setKeywordTitle={setKeywordTitle}/>
      <div className="bg-black/50 rounded-lg my-4 mx-2 p-4">
        <div className="text-white text-xl">{keywordTitle}</div>
        <div>
          <RelatedKeywordBar keywordList={keywords} relSelect={relSelect} setRelSelect={setRelSelect}/>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {newsObject.newsList.map((list) => {
            return (
              <NewsCard newsList={list} />
            )
          })}
        </div>
      </div>
    </div>
    
  )
}