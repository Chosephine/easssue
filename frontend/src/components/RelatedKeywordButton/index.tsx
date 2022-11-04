import React from "react"
import { RelatedKeywordButtonProps } from "./types"
export const RelatedKeywordButton: React.FC<RelatedKeywordButtonProps> = ({ content, relSelect, setRelSelect, index }) => {
  const onButtonClick = () => {
    setRelSelect((relSelect === index)? 0 : index)
  }
  return (
    <button className="w-full rounded-full text-white text-md p-2 text-center" style={{backgroundColor: (relSelect === index)? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)", color: (relSelect === index)? "rgb(0, 0 ,0)" : "rgb(255, 255, 255)"}}onClick={onButtonClick}>{content}</button>
  )
}