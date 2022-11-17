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
      <div className="flex w-full rounded-full p-1 bg-black/25 h-[36px] justify-center items-center">
        <button className="mx-2" style={{width: 28, height: 28}} onClick={onKeywordClick}>
          <img src="kwd_add.svg" alt="" />
        </button>
      </div>   
      </div>
    </div>
  );
};
