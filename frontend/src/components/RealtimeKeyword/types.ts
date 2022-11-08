type keyword = {
  keyword_dtm: string;
  keyword_sq: number;
  keyword_name: string;
  keyword_service: string;
  create_dtm: string;
  mod_dtm: string;
  ctgr_cd: string;
  count: number;
  score: number;
}
export interface KeywordResponse {
  [k : number]: keyword;
}