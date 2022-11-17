import React from "react";
import { SettingbarProps } from "./types";
export const Settingbar: React.FC<SettingbarProps> = ({setSettingModalOpen, setDashboardModalOpen}) => {
  const onHistoryClick = () => {
    chrome.tabs.create({
      url: "chrome://history"
    })
  }
  const onSettingClick = () => {
    setSettingModalOpen(true)
  }
  const onDashboardClick = () => {
    setDashboardModalOpen(true)
  }
  return (
    <>
      <div className="flex justify-end">
      <button className="flex w-0 xl:w-[40px] rounded-full  bg-black/25 h-[36px] justify-center items-center mx-1" onClick={onHistoryClick}>
      <button className="mx-2" style={{width: 16, height: 16}} >
          <img className="m-auto" src="history.svg" />
        </button>
      </button> 
      <button className="flex w-0 xl:w-[40px] rounded-full  bg-black/25 h-[36px] justify-center items-center mx-1" onClick={onSettingClick}>
        <button className="mx-2" style={{width: 16, height: 16}} >
          <img src="settings.svg" alt="" />
        </button>
      </button>
      <button className="flex w-0 xl:w-[40px] rounded-full bg-black/25 h-[36px] justify-center items-center mx-1" onClick={onDashboardClick}>
      <button className="mx-2" style={{width: 16, height: 16}} >
          <img src="dashboards_v1.svg" alt="" />
        </button>
      </button>
      </div>
    </>
  );
};
