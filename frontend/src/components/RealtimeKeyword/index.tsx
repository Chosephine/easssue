import { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const RealtimeKeyword = () => {
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
  
  const words = ["1위", "2위", "3위", "4위", "5위", "6위", "7위", "8위", "9위", "10위"]

  return (
      <div className="p-2 bg-black/50 rounded-xl w-1/2 m-8" onMouseOver={() => setIsHovering(1)} onMouseOut={() => setIsHovering(0)} >
      {!isHovering ? (
        <Slider {...settings} >
          {words.map((item, index) => {
            return <div key={index}>
              <div className="text-lg text-white">{item}</div>
            </div>
          })}
        </Slider>
        ) : (
          words.map((item, index) => {
            return <div key={index}>
              <div className="text-lg text-white">{item}</div>
            </div>
        }))
      }
          
      </div>
  )
}