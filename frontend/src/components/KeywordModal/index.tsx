import React from "react";
import { KeywordModalProps } from "./types";
import { KeywordIndex } from "../Modals/Keywords/KeywordComponent";

export const KeywordModal: React.FC<KeywordModalProps> = ({ setKeywordModalOpen }) => {
  const onCloseClick = () => {
    setKeywordModalOpen(false)
  }
  return (
    <>
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/75">
        <div className="p-2 z-50 h-1/2 w-1/2 absolute top-1/4 left-1/4 bg-white rounded-lg">
        <div className="text-xl">
              키워드
            <button className="absolute right-2" onClick={onCloseClick}>
              X
            </button>
          </div>
        <KeywordIndex />
        // 버튼 컴포넌트 만들어서 put 요청 보낼것
        <button className="absolute bottom-0 right-0">저장쓰</button>
        </div>
      </div>
    </>
  )
}