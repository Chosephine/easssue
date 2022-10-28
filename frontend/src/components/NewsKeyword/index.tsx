import React from "react"
import { NewsKeywordProps } from "./types"
export const NewsKeyword: React.FC<NewsKeywordProps> = ({content}) => {
  return (
    <div className="bg-black/50 rounded-full text-white text-md p-1 text-center">{content}</div>
  )
}