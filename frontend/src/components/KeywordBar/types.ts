export interface KeywordBarProps {
  keywordList: { kwdId: number; kwdName: string }[];
  subSelect: number;
  setSubSelect: Function;
  setKeywordTitle: Function;
  setKeywordId: Function;
  setKeywordModalOpen: Function;
}