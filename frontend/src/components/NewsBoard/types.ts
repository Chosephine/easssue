type News = {
	newsId : number;
	title : string;
	link : string;
	pubDate : string;
	summary : string[];
	keywords : string[];
	img : string;
}

export interface newsResponse {
  page : number;
	last : boolean;
	newsList: News[];
	
}

export interface newsBoardProps {
	setKeywordModalOpen: Function;
}
