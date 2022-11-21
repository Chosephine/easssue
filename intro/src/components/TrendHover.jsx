import React from 'react';

const TrendHover = () =>{
  const trend = ["있슈","easssue","이슈 트래킹","워드 클라우드","키워드","chrome","SSAFY","라임물","빅데이터","익스텐션"]
  return (
    <>
    <div className=" trend-unit max-w-[360px]" style={{width: 'calc(100% - 32px)'}}>
      <div
        className="ml-8 p-2 bg-black/25 rounded-xl w-[15vw]"
      >
        {trend.map((value, index) => {
          return (
            <div key={index}>
              <div className="text-lg text-white">
                <span className="font-black inline-block text-center w-[20px]">
                  {" "}
                  {index + 1}{" "}
                </span>{" "}
                <a href={`https://www.google.com/search?q=${value}`}>
                  {" "}
                  &nbsp; {value}
                </a>
              </div>
            </div>

          );
        })}
      </div>
      </div>
    </>
  )
}

export default TrendHover;