import React from "react";
import NewsCard from "../components/NewsCard"
const News = () => {
  const colors = ["blue", "green", "yellow", "purple"]
  return (
    <>
    <section className="panel">
      <div className='dash flex w-[100%] justify-center items-center'>
        <div className='news-container h-[40vh] w-[30vw] flex flex-wrap border-2 border-black'>
          {colors.map((color, index)=>{
            // <NewsCard bgColor={color}></NewsCard>
          })}

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