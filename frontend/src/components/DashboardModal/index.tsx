import React from "react";
import { DashboardModalProps } from "./types";

export const DashboardModal: React.FC<DashboardModalProps> = ({
  setDashboardModalOpen,
}) => {
  const onCloseClick = () => {
    setDashboardModalOpen(false)
  }
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/75">
        <div className="p-2 z-50 h-1/2 w-1/2 absolute top-1/4 left-1/4 bg-white rounded-lg">
        <div className="text-xl">
              대시보드
            <button className="absolute right-2" onClick={onCloseClick}>
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
