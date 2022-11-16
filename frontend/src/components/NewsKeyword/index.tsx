import React from "react"
import { NewsKeywordProps } from "./types"
export const NewsKeyword: React.FC<NewsKeywordProps> = ({content}) => {
  return (
    <div className="bg-black/50 rounded-full h-8 text-white p-1 text-center my-2 justify-center text-ellipsis line-clamp-1" style={{fontSize: (content.length > 5) ? "0.875rem" : "1.2rem", lineHeight: "1.5rem"}}>{content}</div>
  )
}