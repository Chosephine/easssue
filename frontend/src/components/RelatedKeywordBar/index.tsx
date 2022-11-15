import { RelatedKeywordButton } from "../RelatedKeywordButton"
import { RelatedKeywordBarProps } from "./types"
import React from "react"
export const RelatedKeywordBar: React.FC<RelatedKeywordBarProps> = ({keywordList, relSelect, setRelSelect}) => {
  return (
    <div className="grid grid-cols-8 my-2">
    {keywordList.map((item: any, index: any) => {
      return (
      <div key={index} className="m-2">
        <RelatedKeywordButton content={item} index={index} relSelect={relSelect} setRelSelect={setRelSelect}/>
      </div>
      ) 
    })}
    </div>
  )
}