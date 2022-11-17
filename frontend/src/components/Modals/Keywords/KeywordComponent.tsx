import React, { FC } from 'react'
import Input from './KeywordInput'
import UserKeyword from './UserKeywordList';
import UserBanKeyWordList from './UserBanKeyword';
import { putSubscribeKeywords } from '@/modules/api';
import { ModeProps } from '@/components/KeywordModal/types';

export const KeywordIndex:FC<ModeProps> = ({mode}) =>{
  return (
    <>
      <div className="flex p-3 mt-3 bg-white h-[75%] overflow-auto">
        <Input mode={mode}/>
        {mode ? <UserBanKeyWordList /> : <UserKeyword />}
      </div>
    </>
  );
}
