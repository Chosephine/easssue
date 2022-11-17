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
      <div className="flex w-0 xl:w-[40px] rounded-full  bg-black/25 h-[36px] justify-center items-center mx-1">
      <button className="mx-2" style={{width: 16, height: 16}} onClick={onHistoryClick}>
          <img className="m-auto" src="history.svg" />
        </button>
      </div> 
      <div className="flex w-0 xl:w-[40px] rounded-full  bg-black/25 h-[36px] justify-center items-center mx-1">
        <button className="mx-2" style={{width: 16, height: 16}} onClick={onSettingClick}>
          <img src="settings.svg" alt="" />
        </button>
      </div>
      <div className="flex w-0 xl:w-[40px] rounded-full bg-black/25 h-[36px] justify-center items-center mx-1">
      <button className="mx-2" style={{width: 16, height: 16}} onClick={onDashboardClick}>
          <img src="dashboards_v1.svg" alt="" />
        </button>
      </div>
      </div>
    </>
  );
};
