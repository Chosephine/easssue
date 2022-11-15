import React, { useRef, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
gsap.registerPlugin(ScrollTrigger);
const Main = () => {
  const app = useRef();
  useEffect(() => {
    // Target the two specific elements we have asigned the animate class
    gsap.to('section', {
      y: '50vh',
      x: '50vw',
      duration: 2,
      ease: 'power3.in', //https://greensock.com/docs/v3/Eases
      delay: 0.1,
      opacity: 1,
      scrollTrigger: {
        trigger: '.logo',
        markers: true,
        scrub: 1,
        // pin:true,
        start: 'top center',
        end: 'bottom top',
      },
    });
  }, []);
  return (
    <>
      <section className="section02" >
        <img
          className="logo"
          style={{ width: '100px', height: '100px' }}
          src="biglogo.png"
          alt=""
        />
      </section>
    </>
  );
};

export default Main;
