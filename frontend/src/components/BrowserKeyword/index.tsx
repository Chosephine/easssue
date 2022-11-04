import { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const BrowserKeyword = () => {
  const [isHovering, setIsHovering] = useState(0);
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


  const words = ["1위 111111111111111", "2위 2222222222222", "3위 333333333333333333", "4위 44444444444444", "5위 55555555555", "6위 66666666666666666", "7위 7777777777777777", "8위 8888888888888888", "9위 9999999999999999", "10위 0000000000000000"]

  return (
    <div style={{height: "100%", minWidth: 270, maxWidth: 270, display: "block", alignItems: "center" }} onMouseOver={() => setIsHovering(1)}>
      {!isHovering ? ("") : (
          <div className="keyword-box"  onMouseOut={() => setIsHovering(0)}>
            {words.map((item, index) => {
            return <div key={index}>
              <div className="text-lg text-white" style={{textAlign: "left", fontSize: 16, lineHeight: "2rem" }}>{item}</div>
            </div>
          })}
          </div>
        )}
        <Slider {...settings} className="keyword">
          {words.map((item, index) => {
            return <div key={index}>
              <div className="text-lg text-white" style={{textAlign: "left", fontSize: 16, lineHeight: "2rem"}}>{item}</div>
            </div>
          })}
        </Slider>
    </div>
  ) 
}