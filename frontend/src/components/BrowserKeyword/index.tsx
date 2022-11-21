import React, { useState, useEffect } from "react";
import { BrowserKeywordProp, KeywordResponse } from "./types";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { trendAPI } from "@/modules/api";

export const BrowserKeyword: React.FC<BrowserKeywordProp> = ({ trend, host }) => {
  const [isHovering, setIsHovering] = useState(0);
  const [isGoogle, setIsGoogle] = useState(false);
  const fr = new DocumentFragment
  const header = document.querySelector('#header') || document.querySelector('#lnb') || document.querySelector('body')!
  const naverBg = window.getComputedStyle(header).backgroundColor
  const bg = window.getComputedStyle(document.body).backgroundColor
  useEffect(() => {
    setIsGoogle(host==="www.google.com")
  })
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    pauseOnHover: false
  }

  return (
    <div style={{height: "100%", minWidth: 270, maxWidth: 270, display: "block", alignItems: "center", backgroundColor: (isGoogle)? bg : naverBg}} onMouseOver={() => setIsHovering(1)} onMouseOut={() => setIsHovering(0)} >
        <Slider {...settings} className="keyword">
        {trend.map((value, index) => {
            return (
              <div key={index}>
                <div className="keyword-text">
                  <span className="font-bold"> {index + 1}  </span> <a href={(isGoogle)?  `https://${host}/search?q=${value}` : `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${value}`} style={{textDecoration: "none"}}>{value}</a>
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="keyword-box"  style={{display: !isHovering? "none" : "block"}} onMouseOut={() => setIsHovering(0)} >
            <div className="keyword-title">실시간 키워드</div>
            {trend.map((value, index) => {
            return (
              <div key={index}>
                <div className="box-text">
                  <span className="font-bold"> {index + 1}  </span> <a href={(isGoogle)?  `https://${host}/search?q=${value}` : `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${value}`} style={{textDecoration: "none"}}> &nbsp; {value}</a>
                </div>
            </div>
            );
          })}
          </div>
    </div>
  ) 
}