import React, { useRef, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
const Main = () => {
  useEffect(() => {}, []);
  return (
    <>
      <section className="section02 scale-125 panel">
        <main className="main flex-col">
          <div className='flex'>

          <div className="flex justify-center w-full flex-col mr-[4rem] font-service">
            <div className="text-[1.5rem] border-gray-400 border-b-2">
              책상앞에서 세상을 알다마다요
            </div>
            <div className="font-title h-full flex justify-center items-end text-[6rem] pb-2">
              <div>{'있슈'}</div> <div className='text-[4rem]'>easssue</div>
            </div>
          </div>
          <img className="logo w-[180px] h-[180px] hover:cursor-pointer" src="biglogo.png" alt="" />
          </div>
          <div className='text-end mr-[-2px] text-blue-400 hover:cursor-pointer'>
            확장프로그램 설치하기 ↗
          </div>
          {/* <div className='mt-3 flex'>
            <div className='text-blue-500'>SSAFY</div>
            <div className='ml-3 mr-1'>{" D102 "}</div>
            <div >라임물</div>
            <div className='mx-1'>:</div>
            <div className='mr-1'>ㅇㅇㅇ</div>
            <div className='mr-1'>ㅇㅇㅇ</div>
            <div className='mr-1'>ㅇㅇㅇ</div>
            <div className='mr-1'>ㅇㅇㅇ</div>
            <div className='mr-1'>ㅇㅇㅇ</div>
            <div className='mr-1'>ㅇㅇㅇ</div>
          </div> */}
          {/* <div class="scroll-down">Scroll down<div class="arrow"></div></div> */}
        </main>

      </section>
    </>
  );
};

export default Main;
