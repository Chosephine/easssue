import { KeywordButton } from "../KeywordButton";
import { KeywordBarProps } from "./types";
import React from "react";
export const KeywordBar: React.FC<KeywordBarProps> = ({
  keywordList,
  subSelect,
  setSubSelect,
  setKeywordTitle,
  setKeywordId,
}) => {
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
    </div>
  );
};
