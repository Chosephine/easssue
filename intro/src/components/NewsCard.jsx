import React from 'react';

const NewsCard = ({ bgColor,title,keywords }) => {
  return (
    <>
      <div className="news-card border-[1px] border-gray-300 shadow-md flex flex-col justify-between rounded-xl h-full bg-white/75 relative">
        <a target="_blank">
          <div
            className="rounded-t-xl w-full h-[180px] object-cover object-center mb-2"
          />
          <div className={`flex flex-col justify-between ${bgColor} rounded-t-xl w-full h-[180px] absolute top-0 p-2`}>
            <div className="text-white text-xl text-ellipsis line-clamp-4 m-2"></div>
          </div>

          <div className=" text-xl mx-2 font-[800] text-ellipsis line-clamp-2 h-[56px]">
            {title}
          </div>
        </a>
        <div>
          <div className="text-sm mx-2 text-right">{'1시간 전'}</div>
          <div className="grid grid-cols-3">
              {keywords.map((keyword, index) =>{
             return <div className="mx-1">
               <div key={index}
                className="bg-black/50 text-[0.875rem] rounded-full h-8 text-white p-1 text-center my-2 justify-center text-ellipsis line-clamp-1"
              >
                {keyword}
              </div>
            </div>
              })}
              
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
