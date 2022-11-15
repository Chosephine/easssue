import React, { useRef, useEffect } from 'react';
import { gsap,Back } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"; //https://www.youtube.com/watch?v=_-_JCocqNbw

gsap.registerPlugin(ScrollTrigger);
export default function App() {
  const app = useRef();
  const Box = ({ children, className }) => {
    return <div className={'box ' + className}>{children}</div>;
  };
  function Container({ children }) {
    return (
      <div className="">
        <Box>Don't Animate Me</Box>
      </div>
    );
  }
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Target the two specific elements we have asigned the animate class
      gsap.to('.animate',{
        x: 1000,
        duration: 1,
        ease: "power3.in", //https://greensock.com/docs/v3/Eases
        delay: 0.1,
        opacity: 1,
        scrollTrigger: {
          trigger: '.animate',
          markers: true,
          scrub:1,
          pin:true,
          start: 'top center',
          end: "bottom top"
        },
      });
      ScrollTrigger.create({ trigger: '.app' });
    }, app); // <- Scope!

    return () => ctx.revert();
  }, []);
  return (
    <>
    <section style={{width:"100%", height:"100vh"}}>

    </section>
    <div className="app" ref={app}>
      <Box className="animate" style={{opacity:0}}>Box</Box>
      <Container></Container>
      <Box className="animate">Box</Box>
      <div>
        <Box className="animate">Box</Box>
      </div>
    </div>
    <section style={{width:"100%", height:"100vh"}}>

    </section>
    </>
  );
}
