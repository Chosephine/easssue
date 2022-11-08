import React from "react";
import { KeywordModalProps } from "./types";
import { KeywordIndex } from "../Modals/Keywords/KeywordComponent";
import { KeywordModalSaveBtn } from "./SaveBtn";

export const KeywordModal: React.FC<KeywordModalProps> = ({ setKeywordModalOpen }) => {
  const onCloseClick = () => {
    setKeywordModalOpen(false)
  }
  return (
    <>
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/75 p-4">
        <div className="p-2 z-50 h-1/2 w-1/2 absolute top-1/4 left-1/4 bg-white rounded-lg">
        <div className="text-xl">
              키워드
            <button className="absolute right-2" onClick={onCloseClick}>
              X
            </button>
          </div>
        <KeywordIndex />
        <KeywordModalSaveBtn setKeywordModalOpen={setKeywordModalOpen}/>
        </div>
      </div>
    </>
  )
}