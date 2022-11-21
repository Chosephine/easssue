import React from "react";
import NewsCard from "../components/NewsCard"
const News = () => {
  const colors = ["bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200"]
  const title = ["싸피 구미 캠퍼스", "D102 자율 프로젝트", "뉴스 정보는" ,"있슈 easssue!"]
  const keywords = [["SSAFY", "구미", "전복"],["라임물","익스텐션", "빅데이터"],["세줄요약","키워드","워드클라우드"],["지금","바로","설치해보세요"],]
  return (
    <>
    <section className="panel">
      <div className='news-board flex w-[100%] justify-center items-center'>
        <div className='news-container scale-75 w-[40vw] grid grid-cols-2 gap-4  rounded-lg p-4 '>
        {colors.map((bgColor, index)=>{
          return <NewsCard key={index} bgColor={bgColor} title={title[index]} keywords={keywords[index]}/>
        })}
        </div>
        <div className='news-p text-[35px] font-service'>
          키워드별로 뉴스를 받아볼 수 있어요
        </div>
      </div>
    </section>
    </>
  )
}

export default News;