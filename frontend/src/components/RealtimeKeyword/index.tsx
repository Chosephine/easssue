import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    pauseOnHover: false
  };

  useEffect(() => {
    trendAPI().then((data) => {
      setTrend(data.trend);
    });
  }, []);

  return (
    <div className="max-w-[360px]" style={{width: 'calc(100% - 32px)'}}>
      <div
        className="xl:p-2 bg-black/25 rounded-t-xl ml-8"
        style={{ borderRadius: !isHovering ? "0.75rem" : ""}}
        onMouseOver={() => setIsHovering(1)}
        onMouseLeave={() => setIsHovering(0)}
      >
        <Slider {...settings}>
          {trend.map((value, index) => {
            return (
              <div key={index}>
                <div className="text-lg text-white">
                  <span className="font-black inline-block text-center w-[20px]">
                    {" "}
                    {index + 1}{" "}
                  </span>{" "}
                  &nbsp; {value}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div
        className="ml-8 p-2 bg-black/25 rounded-b-xl"
        style={{ display: !isHovering ? "none" : "block", width: 'calc(100% - 32px)'}}
        onMouseOver={() => setIsHovering(1)}
        onMouseLeave={() => setIsHovering(0)}
      >
        {trend.map((value, index) => {
          return (
            <div key={index}>
              <div className="text-lg text-white">
                <span className="font-black inline-block text-center w-[20px]">
                  {" "}
                  {index + 1}{" "}
                </span>{" "}
                <a href={`https://www.google.com/search?q=${value}`}>
                  {" "}
                  &nbsp; {value}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
