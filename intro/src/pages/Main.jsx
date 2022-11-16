import React, { useRef, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
const Main = () => {
  useEffect(() => {}, []);
  return (
    <>
      <section className="section02 panel">
        <main className="main flex h-[150px]">
          <div className="block text-6xl">있슈 <span className=''>easssue</span></div>
          <img className="logo w-[200px] h-[200px]" src="biglogo.png" alt="" />
        </main>
      </section>
    </>
  );
};

export default Main;
