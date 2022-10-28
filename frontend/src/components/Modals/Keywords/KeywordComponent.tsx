import React, { FC } from 'react'
import Input from './KeywordInput'
import UserKeyword from './UserKeywordList';

const KeywordModal:FC = () =>{
  return (
    <>
      <div className="flex border-2 border-black bg-white h-[50vh]">
        <Input/>
        <UserKeyword />
      </div>
    </>
  );
}

export default KeywordModal;