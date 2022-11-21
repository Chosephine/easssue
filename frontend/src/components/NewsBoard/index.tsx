import { useEffect, useState, FC } from "react";
import { NewsCard } from "../NewsCard";
import { KeywordBar } from "../KeywordBar";
import { RelatedKeywordBar } from "../RelatedKeywordBar";
import { getNews, getKeyWordNews, getRecommendNews, getRecommendKeywords } from "@/modules/api";
import { newsBoardProps, newsResponse } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/store";
export const NewsBoard: FC<newsBoardProps> = ({setKeywordModalOpen}) => {
  const [subSelect, setSubSelect] = useState(-1);
  const [relSelect, setRelSelect] = useState(-1);
  const [keywordTitle, setKeywordTitle] = useState("인기 & 추천");
  const [keywordId, setKeywordId] = useState(-1);
  const [pageNum, setPageNum] = useState(0);
  const [relList, setRelList] = useState([{ kwdName :"인기"}]);
  const [recommendList, setRecommendList] = useState([{ kwdName :"인기"}]);
  const [newsObject, setNewsObject] = useState<newsResponse>({
    page: 0,
    last: false,
    newsList: [],
  });
  const keywords = ["인기", "네이버", "비트코인", "이청아", "제페토"];
  const userKeywords = ["SSAFY", "카카오", "메타버스", "남궁민", "블록체인"];
  const { subScribeKwdList } = useSelector((state: RootState) => {
    return {
      subScribeKwdList: state.persistedReducer.keyWordReducer.subScribeKwdList,
    };
  });
  useEffect(() => {
    getNews(0).then((data) => {
      getRecommendKeywords().then((data:any) => {
        setRelList(data.kwdList)
        setRecommendList(data.kwdList)
        }
      )
      setNewsObject(data);
    });
  }, []);
  useEffect(() => {
    setPageNum(0)
    fetchArticle(0)
  }, [keywordTitle]);
  useEffect(() => {
    setPageNum(0)
    fetchRelArticle(0)
  }, [relSelect])
  useEffect(() => {
    if(relSelect === -1){
      fetchArticle(pageNum)
    }
    else {
      fetchRelArticle(pageNum)
    }
  }, [pageNum])
  useEffect(() => {
  },[relList])
  const onPageClick = () => {
    setPageNum((pageNum + 1) % 10)

  }
  const fetchArticle = (pageNum:number) => {
    if(subSelect === -1) {
      getNews(pageNum).then((data) => {
        if (data.newsList.length === 0) {
          setPageNum(0)
        }
        if (recommendList.length > 1){
          setRelList(recommendList)
        }
        setNewsObject(data);
        setRelSelect(-1)
      });
    }
    else {
      getKeyWordNews(subSelect, pageNum).then((data) => {
        if (data.newsList.length === 0) {
          setPageNum(0)
        }
        setNewsObject(data);
        setRelList(data.kwdList)
        setRelSelect(-1)
      });
    }
  }

  const fetchRelArticle = (pageNum:number) => {
    if(relSelect === -1) {
      if(subSelect === -1) {
        getNews(pageNum).then((data) => {
          if (data.newsList.length === 0) {
            setPageNum(0)
          }
          setNewsObject(data);
          setRelSelect(-1)
        });
      }
      else {
        getKeyWordNews(subSelect, pageNum).then((data) => {
          if (data.newsList.length === 0) {
            setPageNum(0)
          }
          setNewsObject(data);
        });
      } 
    }
    else {
      getRecommendNews(relSelect, pageNum).then((data) => {
        if (data.newsList.length === 0) {
          setPageNum(0)
        }
        setNewsObject(data);
      });
    }
  }
  return (
    <div>
      <KeywordBar
        keywordList={subScribeKwdList}
        subSelect={subSelect}
        setSubSelect={setSubSelect}
        setKeywordTitle={setKeywordTitle}
        setKeywordId={setKeywordId}
        setKeywordModalOpen={setKeywordModalOpen}
      />
      <div className="bg-black/25 rounded-lg my-4 mx-2 p-4 relative">
        <div className="text-white mx-2 text-2xl">{keywordTitle}</div>
        <div>
          <RelatedKeywordBar
            keywordList={relList}
            relSelect={relSelect}
            setRelSelect={setRelSelect}
          />
          <button className="mx-2 absolute top-4 right-2" onClick={onPageClick}>
          <img className="m-auto" style={{width: 28, height: 28}} src="refresh.svg" />
        </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {newsObject.newsList.map((list, index) => {
            return (
              <div key={index}>
                <NewsCard newsList={list} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
