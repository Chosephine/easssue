import React, { FC } from 'react'
import Input from './KeywordInput'
import UserKeyword from './UserKeywordList';
import { putSubscribeKeywords } from '@/modules/api';

export const KeywordIndex:FC = () =>{
  return (
    <>
      <div className="flex border-2 border-black bg-white h-[70%] overflow-auto">
        <Input/>
        <UserKeyword />
      </div>
    </>
  );
}
