import React, { useRef, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
import styled from 'styled-components';
import Main from './pages/Main';
export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause',
      scroller: '.container',
    });
    gsap.fromTo(
      '.main',
      {
        opacity: 0,
        x: '-50vw',
      },
      {
        scrollTrigger: '.section02',
        trigger: '.main img',
        marker: true,
        duration: 1,
        delay: 1,
        opacity: 1,
        x: '0',
        ease: 'power3',
      }
    );
    gsap.to('.orange p', {
      scrollTrigger: '.orange',
      duration: 0.2,
      delay: 2,
      makers: true,
      rotation: 360,
    });

    gsap.to('.red', {
      scrollTrigger: {
        trigger: '.red p',
        markers: true,
        scrub: true,
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
        <Main />
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
        <Main />
      </div>
    </>
  );
}
