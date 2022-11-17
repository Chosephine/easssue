import React, { useRef, useEffect,useState } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
import styled from 'styled-components';
import Main from './pages/Main';
import Dash from './pages/DashBoard';
import Keyword from './pages/keyword';
import Popup from './pages/PopUp';
export default function App() {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = ()=>{
    setToggle(()=>!toggle)
  }
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause',
      scroller: '.container',
    });
    const searchResult = gsap.utils.toArray('.search-result');
    const summary = gsap.utils.toArray('.popup-p');
    gsap.fromTo(
      '.main',
      {
        opacity: 0,
        x: '-50vw',
      },
      {
        scrollTrigger: '.section02',
        trigger: '.main img',
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
        duration: 2,
        delay: 0.5,
        opacity: 1,
        x: '0',
        ease: 'power3',
      }
    );
    gsap.fromTo(
      '.key-input',{
        x:'-40vw'
      },{
        scrollTrigger: '.keyword',
        trigger: '.key-input',
        x:'0'
      }
    )
    gsap.fromTo(
      '.keyword-text',{
        y:'-30vh',
        opacity: 0,
      },{
        scrollTrigger: '.keyword',
        trigger: '.key-input',
        duration:1,
        opacity: 1,
        delay: 0.5,
        y:'0'
      }
    )
    gsap.fromTo(
      searchResult,
      {
        opacity: 0,
        y:'-100px'
      },
      {
        scrollTrigger: '.keyword',
        trigger: '.key-input',
        stagger:0.3,
        duration: 2,
        delay: 0.5,
        opacity: 1,
        x: '0',
        y: '0',
        ease: 'power3',
      }
    );
    gsap.fromTo(
      summary,
      {
        opacity: 0,
        y:'-100px'
      },
      {
        scrollTrigger: '.summary',
        trigger: '.summary',
        stagger:0.3,
        duration: 2,
        delay: 0.5,
        opacity: 1,
        x: '0',
        y: '0',
        ease: 'power3',
      }
    );
    gsap.to('.red', {
      scrollTrigger: {
        trigger: '.red p',
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
      <div className={`container overflow-hidden overflow-y-scroll `}>
        <Main />
        <Dash />
        <Keyword />
        <Popup toggle={toggle} toggleHandler={toggleHandler}/>

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
