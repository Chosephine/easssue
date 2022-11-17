import React from "react";
import NewsCard from "../components/NewsCard"
const News = () => {
  const colors = ["blue", "green", "yellow", "purple"]
  return (
    <>
    <section className="panel">
      <div className='news-board flex w-[100%] justify-center items-center'>
        <div className='news-container h-[50vh] w-[40vw] grid grid-cols-2 gap-4 bg-black/25 rounded-lg p-4 border-2 border-black'>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        </div>
        <div className='news-p ml-10 text-[1.4rem] font-service'>
          와이티엔~
        </div>
      </div>
    </section>
    </>
  )
}

export default News;