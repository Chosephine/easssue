import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { KeywordResponse } from "./types";
import { trendAPI } from "@/modules/api";

export const RealtimeKeyword = () => {
  const [isHovering, setIsHovering] = useState(0);
  const [trend, setTrend] = useState<KeywordResponse>({});
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
      setTrend(data.data);
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
          {Object.values(trend).map((value, index) => {
            return (
              <div key={index}>
                <div className="text-lg text-white">
                  {index + 1} {value.keyword_name}
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        Object.values(trend).map((value, index) => {
          return (
            <div key={index}>
              
                <div className="text-lg text-white">
                  {index + 1} <a href={`https://www.google.com/search?q=${value.keyword_name}`}> {value.keyword_name} </a>
                </div>
            </div>
          );
        })
      )}
    </div>
  );
};
