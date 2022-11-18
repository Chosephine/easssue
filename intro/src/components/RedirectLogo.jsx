import React, { useEffect } from 'react';

const RedirectLogo = () => {
  useEffect(() => {}, []);
  const gotoExtension = () => {
    return (window.location.href =
      'https://chrome.google.com/webstore/detail/%EC%9E%88%EC%8A%88-easssue/cmnmdjpabceejnbkdlijepkmcdpdohjl?hl=ko&');
  };
  return (
    <>
      <div
        onClick={gotoExtension}
        className="animation:ping opacity-60 hover:opacity-100 hover:cursor-pointer absolute right-[100px] top-[50vh] flex flex-col items-center justify-center"
      >
        <div className="flex flex-col h-10 w-10">
          <img
            onClick={gotoExtension}
            className="logo w-[180px] h-[180px] hover:cursor-pointer"
            src="smalllogo.png"
            alt=""
          />
        </div>
        <div
          onClick={gotoExtension}
          className=" text-end text-sm mr-[-2px] text-blue-400 hover:cursor-pointer"
        >
          설치하기↗
        </div>
      </div>
    </>
  );
};

export default RedirectLogo;
