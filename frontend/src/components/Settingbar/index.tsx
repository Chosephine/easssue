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
        <button className="mx-2" style={{width: 32, height: 32}} onClick={onHistoryClick}>
          <img className="m-auto" src="history.svg" />
        </button>
        <button className="mx-2" style={{width: 32, height: 32}} onClick={onSettingClick}>
          <img src="settings.svg" alt="" />
        </button>
        <button className="mx-2" style={{width: 32, height: 32}} onClick={onDashboardClick}>
          <img src="dashboards_v1.svg" alt="" />
        </button>
      </div>
    </>
  );
};
