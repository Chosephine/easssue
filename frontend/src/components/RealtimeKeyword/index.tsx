import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { KeywordResponse } from "./types";
import { trendAPI } from "@/modules/api";
import { RootState } from "@/modules/store";

export const RealtimeKeyword = () => {
  const [isHovering, setIsHovering] = useState(0);
  const [trend, setTrend] = useState<string[]>([]);
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
  };

  useEffect(() => {
    trendAPI().then((data) => {
      console.log(7)
      console.log(data)
      setTrend(data.trend)
    });
  }, []);

  return (
    <div
      className="p-2 bg-black/50 rounded-xl m-8"
      onMouseOver={() => setIsHovering(1)}
      onMouseOut={() => setIsHovering(0)}
    >
      {!isHovering ? (
        <Slider {...settings}>
          {trend.map((value, index) => {
            return (
              <div key={index}>
                <div className="text-lg text-white">
                  {index + 1} {value}
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        trend.map((value, index) => {
          return (
            <div key={index}>
              
                <div className="text-lg text-white">
                  {index + 1} <a href={`https://www.google.com/search?q=${value}`}> {value} </a>
                </div>
            </div>
          );
        })
      )}
    </div>
  );
};
