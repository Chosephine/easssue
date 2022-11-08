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
  }

  return (
    <div style={{height: "100%", minWidth: 270, maxWidth: 270, display: "block", alignItems: "center" }} onMouseOver={() => setIsHovering(1)}>
      {!isHovering ? ("") : (
          <div className="keyword-box"  onMouseOut={() => setIsHovering(0)} >
            {Object.values(trend).map((value, index) => {
            return (
              <div key={index}>
              
                <div className="text-lg text-white">
                  {index + 1} <a href={(isGoogle)?  `https://${host}/search?q=${value.keyword_name}` : `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${value.keyword_name}`}>{value.keyword_name}</a>
                </div>
            </div>
            );
          })}
          </div>
        )}
        <Slider {...settings} className="keyword">
        {Object.values(trend).map((value, index) => {
            return (
              <div key={index}>
                <div className="text-lg text-white">
                {index + 1} <a href={(isGoogle)?  `https://${host}/search?q=${value.keyword_name}` : `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${value.keyword_name}`}>{value.keyword_name}</a>
                </div>
              </div>
            );
          })}
        </Slider>
    </div>
  ) 
}