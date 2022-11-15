import React, { useRef, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
import styled from 'styled-components';
import Main from './pages/Main';
gsap.registerPlugin(ScrollTrigger);
export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause',
      scroller: '.container',
    });

    gsap.to('.orange p', {
      scrollTrigger: '.orange',
      duration: 0.2,
      delay: 2,
      rotation: 360,
    });

    gsap.to('.red', {
      scrollTrigger: {
        trigger: '.red p',
        markers: true,
        scrub: true,
        // toggleActions: 'restart pause reverse pause',
      },
      duration: 3,
      backgroundColor: '#FFA',
      ease: 'power3',
    });

    gsap.to('.yoyo p', {
      scrollTrigger: '.yoyo',
      scale: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2',
    });
  }, []);
  return (
    <>
      <div className="container">
        <section className="panel">
          <h1>Pair with CSS Scroll Snapping</h1>
        </section>

        <section className="panel orange">
          <p>This element will spin.</p>
        </section>

        <section className="panel red">
          <p>This background color will change</p>
        </section>

        <section className="panel blue yoyo">
          <p>Yoyo Text!</p>
        </section>

        <section className="panel">
          <h1>Pair with CSS Scroll Snapping</h1>
        </section>
      </div>
    </>
  );
}
