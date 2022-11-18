import React,{useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const TrendComponent = () => {
  const [isHovering, setIsHovering] = useState(0);
  const [trend, setTrend] = useState(["있슈","easssue","이슈 트래킹","워드 클라우드","키워드","chrome","SSAFY","라임물","빅데이터","익스텐션"]);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2500,
    pauseOnHover: false
  };

  return (
    <>
    <div className="trend-unit font-service">

    {!isHovering && <div className="font-service ml-8 text-gray-500">마우스를 올려 보세요⬇️</div>}
    <div className="max-w-[360px]" style={{width: 'calc(100% - 32px)'}}>
      <div
        className="px-2 bg-black/25 rounded-t-xl ml-8"
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
        className="ml-8 p-2 bg-black/25 rounded-b-xl mb-[45px]"
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
    </div>
    </>
  );
};

export default TrendComponent;