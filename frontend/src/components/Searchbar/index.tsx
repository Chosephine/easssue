import { useRef } from "react";

export const Searchbar = () => {
  return (
    <form action="https://www.google.com/search" method="GET">
      <div className="flex flex-row justify-center content-center items-center relative">
        <div className="rounded-full my-8 h-10 mx-2 w-full bg-white">
        <img className="absolute top-[40px] left-[20px]"src="google.png" style={{width: 24, height: 24}}alt="" />
        <input
          className="absolute top-[32px] left-[48px] w-full bg-transparent border-none focus:ring-transparent"
          name="q"
          type="text"
          style={{width: 'calc(100% - 96px)'}}
          placeholder="Google 검색"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          autoComplete="off"
        />
        </div>
      </div>
    </form>
  );
};
