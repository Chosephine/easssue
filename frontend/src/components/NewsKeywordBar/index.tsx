import { NewsKeyword } from "../NewsKeyword"
import { NewsKeywordBarProps } from "./types"
import React from "react"
export const NewsKeywordBar: React.FC<NewsKeywordBarProps> = ({keywordList}) => {
  return (
    <div className="grid grid-cols-3">
    {keywordList.map((item: any, index: any) => {
      return (
      <div key={index} className="mx-1">
        <NewsKeyword content={item}/>
      </div>
      ) 
    })}
    </div>
  )
}
