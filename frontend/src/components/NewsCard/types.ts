type News = {
	newsId : number;
	title : string;
	link : string;
	pubDate : string;
	summary : string[];
	keywords : string[];
	img : string;
}
export interface NewsCardProps {
  newsList: News;
}