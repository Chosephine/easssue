import React, { useRef, useEffect,useState } from 'react';
import { gsap, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //https://www.youtube.com/watch?v=_-_JCocqNbw
import styled from 'styled-components';
import Main from './pages/Main';
import Dash from './pages/DashBoard';
import Keyword from './pages/keyword';
import Popup from './pages/PopUp';
import News from './pages/News'
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
    const newsCard = gsap.utils.toArray('.news-card');
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
        scrollTrigger: '.pop-pop',
        trigger: '.word-cloud',
        stagger:0.3,
        duration: 2,
        delay: 5,
        opacity: 1,
        x: '0',
        y: '0',
        ease: 'power3',
      }
    );
    gsap.fromTo(
      '.news-container',{
        y:'-30vh',
        opacity: 0,
      },{
        scrollTrigger: '.news-board',
        trigger: '.news-container',
        duration:1,
        opacity: 1,
        delay: 0.5,
        y:'0'
      }
    )
    gsap.fromTo('.news-p',{
      opacity:0
    },{
      duration:2,
      opacity: 1
    })
    gsap.fromTo(
      newsCard,
      {
        opacity: 0,
        y:'-100px'
      },
      {
        scrollTrigger: '.news-board',
        trigger: '.news-container',
        stagger:0.4,
        duration: 2,
        delay: 0.8,
        opacity: 1,
        x: '0',
        y: '0',
        ease: 'power3',
      }
    );
    // gsap.to('.red', {
    //   scrollTrigger: {
    //     trigger: '.red p',
    //     scrub: true,
    //   },
    //   duration: 3,
    //   backgroundColor: '#FFA',
    //   ease: 'power3',
    // });

    // gsap.to('.yoyo p', {
    //   scrollTrigger: '.yoyo',
    //   scale: 2,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'power2',
    // });
  }, []);
  return (
    <>
      <div className={`container overflow-hidden overflow-y-scroll `}>
        <Main />
        <Keyword />
        <News/>
        <Dash />
        <Popup toggle={toggle} toggleHandler={toggleHandler}/>
        <Main />
      </div>
    </>
  );
}
