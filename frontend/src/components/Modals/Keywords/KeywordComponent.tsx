import React, { FC } from 'react'
import Input from './KeywordInput'

const KeywordModal:FC = () =>{
  return (
    <>
      <div className="flex border-2 border-black">
        <Input/>
      </div>
    </>
  );
}

export default KeywordModal;