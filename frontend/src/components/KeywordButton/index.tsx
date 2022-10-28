import React from "react"
import { KeywordButtonProps } from "./types"
export const KeywordButton: React.FC<KeywordButtonProps> = ({ content }) => {
  return (
    <button className="w-full bg-black/50 rounded-full text-white text-md p-2 text-center">{content}</button>
  )
}