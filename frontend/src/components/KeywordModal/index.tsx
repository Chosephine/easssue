import React, { useState } from 'react';
import { KeywordModalProps } from './types';
import { KeywordIndex } from '../Modals/Keywords/KeywordComponent';
import { KeywordModalSaveBtn } from './SaveBtn';
import KeywordModeSwitch from './BanKeySwitch';
import SingUpComponent from '@/components/user/Signup';
import LoginComponent from '@/components/user/Login';

export const KeywordModal: React.FC<KeywordModalProps> = ({
  setKeywordModalOpen,
  isLogin,
}) => {
  const onCloseClick = () => {
    setKeywordModalOpen(false);
  };
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  function loginToSignUp() {
    setIsSignUp(() => !isSignUp);
  }

  function signUpToLogin() {
    setIsSignUp(() => !isSignUp);
  }
  const keywordSwitch = (mode: boolean) => {
    setMode(() => mode!);
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/75 p-4">
        <div className="p-2 z-50 h-[40rem] w-[50%] absolute top-1/4 left-1/4 bg-white rounded-lg">
          <div>
            <div className="text-2xl font-bold my-3">키워드 등록 및 수정{!isLogin && (
              <button className="absolute top-3 right-3" onClick={onCloseClick}>
                <img className="h-5 w-5" src="itemDelete.svg" alt="" />
              </button>
            )}</div>
            <div className="text-md my-3 absolute top-0 right-3">
              {isLogin && (
                <KeywordModeSwitch switchFunction={keywordSwitch} mode={mode} />
              )}
            </div>
          </div>
          {isLogin ? (
            <KeywordIndex mode={mode} />
          ) : isSignUp ? (
            <SingUpComponent stateChange={signUpToLogin} />
          ) : (
            <LoginComponent stateChange={loginToSignUp} />
          )}
          {isLogin && (
            <KeywordModalSaveBtn
              setKeywordModalOpen={setKeywordModalOpen}
              isLogin={isLogin}
            />
          )}
        </div>
      </div>
    </>
  );
};
