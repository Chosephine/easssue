import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putSubscribeKeywords } from '@/modules/api';
import { RootState } from '@modules/store'


export const KeywordModalSaveBtn : FC = () => {
  const keywords = useSelector((state : RootState)=>{
    return state.persistedReducer.keyWordReducer.kwdList;
  })
  const saveHandler = ()=>{
    putSubscribeKeywords(keywords)
    console.log(keywords);
  }
  return <>
    <button className="absolute right-4 bottom-4"onClick={saveHandler}>저장하고 나가기</button>
  </>;
}
