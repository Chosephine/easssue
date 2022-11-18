import React, { useState, useEffect } from 'react';

const PopUpComponent = ({ toggle }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(() => false);
    }, 2000);
  }, []);
  return (
    <>
      <div
        className={`popup border-[1px] border-gray-600 ${
          isLoading ? 'h-[100%]' : ''
        } h-[100%] flex items-center w-[390px]`}
      >
        <div className="flex flex-col m-0  w-[100%] h-[550px]">
          <div className="p-3 w-[100%] flex items-center bg-blue-100">
            <img className="w-10 h-10 " src="biglogo.png" alt="" />
            <h1 className="ml-3 text-xl  ">easssue 있슈</h1>
          </div>
          {isLoading ? (
            <div
              className={`h-[500px] flex justify-center flex-col items-center`}
            >
              <img className="ml-3 h-[30%] w-[30%]" src="spinner.gif" alt="" />
              <h1 className="ml-3 text-xl font-[700]">기사 요약중...</h1>
            </div>
          ) : (
            <div>
              <div className="mt-1 px-3 w-[100%] flex items-center justify-end">
                <h1 className="ml-3 text-md text-slate-600 font-[700] truncate">{`있슈 easssue!`}</h1>
              </div>
              <div className="w-[100%] flex items-center">
                <h2 className="m-3 text-lg font-[700] border-b-2 border-gray-400">
                  키워드 클라우드
                </h2>
              </div>
              <img
                className="word-cloud ml-3 h-[160px] w-[370px]"
                src="wordCloud.png"
                alt="keyword cloud"
              />
              <div className="w-[100%] flex items-center">
                <h2 className="m-3 text-lg font-[700] border-b-2 border-gray-400">
                  기사 요약
                </h2>
              </div>
              {!isLoading && <div className="summary w-[100%] px-2 font-service">
                <div className={`popup-p text-lg ml-1 mb-3`}>{`오른쪽 위 있슈 아이콘을 눌러 사용해보세요`}</div>
                <div className="popup-p text-lg ml-1 mb-3">{`어떤 글이든 중심 키워드를 추출하고`}</div>
                <div className="popup-p text-lg ml-1 mb-3">{`긴 글을 3줄 요약해드립니다`}</div>
              </div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PopUpComponent;
