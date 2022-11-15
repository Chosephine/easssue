import React from "react";
import { SettingbarProps } from "./types";
export const Settingbar: React.FC<SettingbarProps> = ({setSettingModalOpen, setDashboardModalOpen, setKeywordModalOpen}) => {
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
  const onKeywordClick = () => {
    setKeywordModalOpen(true)
  }
  return (
    <>
      <div className="flex justify-end">
        <button className="mx-2" onClick={onHistoryClick}>
          <img className="m-auto" src="history_32.png" />
        </button>
        <button className="mx-2" onClick={onSettingClick}>
          <img src="setting_32.png" alt="" />
        </button>
        <button className="mx-2" onClick={onDashboardClick}>
          <img src="hexagonal_32.png" alt="" />
        </button>
        <button className="p-1 mx-2 hover:cursor-pointer" onClick={onKeywordClick}>
          <img onClick={onKeywordClick} src="plus_32.png" alt="" />
        </button>
      </div>
    </>
  );
};
