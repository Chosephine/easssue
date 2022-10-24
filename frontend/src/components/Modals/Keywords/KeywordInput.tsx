import React , { FC, useMemo, useState, useEffect } from 'react'
import { debounce } from 'lodash'
const KeyInput : FC = () =>{
  const [inputKeyword, setInputKeyword] = useState<string>('');

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  }

  const debounceSearch = useMemo(()=> debounce((keyword) => {
    setInputKeyword(()=> keyword);
    console.log('debounce value : ',inputKeyword);
  }, 500), [inputKeyword]);

  return (
    <>
      <input type="text" onChange={onChange}/>
      <div>
        {inputKeyword}
      </div>
    </>
  )
}

export default KeyInput;