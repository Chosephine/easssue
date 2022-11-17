import { KeywordButton } from "../KeywordButton";
import { KeywordBarProps } from "./types";
import React from "react";
export const KeywordBar: React.FC<KeywordBarProps> = ({
  keywordList,
  subSelect,
  setSubSelect,
  setKeywordTitle,
  setKeywordId,
  setKeywordModalOpen
}) => {
  const onKeywordClick = () => {
    setKeywordModalOpen(true)
  }
  return (
    <div className="grid grid-cols-8">
      {keywordList.map(
        (item: { kwdId: number; kwdName: string }, index: number) => {
          return (
            <div key={index} className="m-2">
              <KeywordButton
                content={item.kwdName}
                subSelect={subSelect}
                setSubSelect={setSubSelect}
                index={item.kwdId}
                setKeywordTitle={setKeywordTitle}
                setKeywordId={setKeywordId}
              />
            </div>
          );
        }
      )}
      <div className="m-2 justify-self-center">
      <button className="flex w-full rounded-full p-1 bg-black/25 h-[36px] justify-center items-center" onClick={onKeywordClick}>
        <button className="mx-2"  >
          <img src="kwd_add.svg" style={{width: 16, height: 16}} alt="" />
        </button>
      </button>   
      </div>
    </div>
  );
};
