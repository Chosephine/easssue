import React, { useState } from 'react';
import { DashboardModalProps } from './types';
import { DashIndex } from '@/components/Modals/DashBoard';
import SingUpComponent from '@/components/user/Signup';
import LoginComponent from '@/components/user/Login';

export const DashboardModal: React.FC<DashboardModalProps> = ({
  setDashboardModalOpen,
  isLogin,
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const onCloseClick = () => {
    setDashboardModalOpen(false);
  };
  function loginToSignUp() {
    setIsSignUp(() => !isSignUp);
  }

  function signUpToLogin() {
    setIsSignUp(() => !isSignUp);
  }
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/75">
        <div className="p-2 z-50 h-[80%] w-[70%] absolute top-[10%] left-[15%] bg-white rounded-lg">
          <div className="text-xl pl-2 font-bold mt-2 border-b-2 border-black">
            대시보드
            <button className="absolute right-3" onClick={onCloseClick}>
              <img className="h-5 w-5" src="itemDelete.svg" alt="" />
            </button>
          </div>
          {isLogin ? (
            <DashIndex />
          ) : isSignUp ? (
            <SingUpComponent stateChange={signUpToLogin} />
          ) : (
            <LoginComponent stateChange={loginToSignUp} />
          )}
        </div>
      </div>
    </>
  );
};
