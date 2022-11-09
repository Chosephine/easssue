import React, { FC } from 'react'
import Input from './KeywordInput'
import UserKeyword from './UserKeywordList';
import { putSubscribeKeywords } from '@/modules/api';

export const KeywordIndex:FC = () =>{
  return (
    <>
      <div className="flex p-3  bg-white h-[75%] overflow-auto">
        <Input/>
        <UserKeyword />
      </div>
    </>
  );
}
