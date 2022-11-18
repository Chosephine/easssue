export interface KeywordModalProps {
  setKeywordModalOpen: Function;  
  isLogin : boolean;
}

export interface userKeywordListProps extends KeywordModalProps{
  mode : boolean;
}

export interface ModeProps {
  mode : boolean;
}