import React, { useRef, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
import styled from 'styled-components';
import Main from './pages/Main';
import Dash from './pages/DashBoard'
import Keyword from './pages/keyword'
export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause',
      scroller: '.container',
    });
    const searchResult = gsap.utils.toArray('.search-result')
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
    gsap.fromTo(
      '.radar',
      {
        opacity: 0,
        x: '150vw',
      },
      {
        scrollTrigger: '.dash',
        trigger: '.radar',
        marker: true,
        duration: 2,
        delay: 0.5,
        opacity: 1,
        x: '0',
        ease: 'power3',
      }
    );
    gsap.fromTo(
      '.heatmap',
      {
        opacity: 0,
        x: '-50vw',
      },
      {
        scrollTrigger: '.dash',
        trigger: '.heatmap',
        marker: true,
        duration: 2,
        delay: 0.5,
        opacity: 1,
        x: '0',
        ease: 'power3',
      }
    );
    
    gsap.fromTo(searchResult,{
      opacity: 0,
    },{scrollTrigger: '.keyword',
    trigger: '.key-input',
      marker: true,
      duration: 2,
      delay: 0.5,
      opacity: 1,
      x: '0',
      ease: 'power3',
    })
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
        <Dash/>
        <Keyword/>

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
