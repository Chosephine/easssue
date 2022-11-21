import React, { useRef, useEffect } from 'react';
import ScrollDown from '../components/ScrollDown';
const End = () => {
  useEffect(() => {}, []);
  const gotoExtension = () => {
    return (window.location.href =
      'https://chrome.google.com/webstore/detail/%EC%9E%88%EC%8A%88-easssue/cmnmdjpabceejnbkdlijepkmcdpdohjl?hl=ko&');
  };
  return (
    <>
      <section className="section02-end panel">
        <main className="main yoyo flex-col">
          <div className="flex">
            <div className="flex justify-center w-full flex-col mr-[4rem] font-service">
              <div className="text-[1.5rem] border-gray-400 border-b-2">
                책상 앞에서 세상을 알다
              </div>
              <div className="font-title h-full flex justify-center items-end text-[6rem] pb-2">
                <div>{'있슈'}</div> <div className="text-[4rem]">easssue</div>
              </div>
            </div>
            <img
              onClick={gotoExtension}
              className="logo w-[180px] h-[180px] hover:cursor-pointer"
              src="biglogo.png"
              alt=""
            />
          </div>
          <div
            onClick={gotoExtension}
            className="text-end mr-[-2px] text-blue-400 hover:cursor-pointer"
          >
            확장프로그램 설치하기 ↗
          </div>
          <div className="mt-3 font-[600] flex">
            <div className="text-blue-500">SSAFY</div>
            <div className="ml-3 mr-1">{' D102 '}</div>
            <div>라임물</div>
            <div className="mx-1">:</div>
            <div className="mr-1">김효은</div>
            <div className="mr-1">엄성현</div>
            <div className="mr-1">임소연</div>
            <div className="mr-1">전효인</div>
            <div className="mr-1">지승영</div>
            <div className="mr-1">한유빈</div>
          </div>
        </main>
      </section>
    </>
  );
};

export default End;
