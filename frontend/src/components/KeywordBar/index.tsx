import { KeywordButton } from "../KeywordButton"
import { KeywordBarProps } from "./types"
import React from "react"
export const KeywordBar: React.FC<KeywordBarProps> = ({keywordList, subSelect, setSubSelect, setKeywordTitle}) => {
  return (
    <div className="grid grid-cols-8">
    {keywordList.map((item: any, index: any) => {
      return (
      <div key={index} className="m-2">
        <KeywordButton content={item} subSelect={subSelect} setSubSelect={setSubSelect} index={index} setKeywordTitle={setKeywordTitle}/>
      </div>
      ) 
    })}
    </div>
  )
}
