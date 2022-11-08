import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putSubscribeKeywords } from '@/modules/api';
import { RootState } from '@modules/store'


export const KeywordModalSaveBtn : FC = () => {
  const {subScribeKwdList, banKwdList} = useSelector((state : RootState)=> {return{
    subScribeKwdList : state.persistedReducer.keyWordReducer.subScribeKwdList,
    banKwdList : state.persistedReducer.keyWordReducer.banKwdList
  }})
  const saveHandler = ()=>{
    //*  벤리스트와 구독 키워드 한번에 보낼 것
    putSubscribeKeywords(subScribeKwdList)
    console.log(subScribeKwdList);
  }
  return <>
    <button className="absolute right-4 bottom-4"onClick={saveHandler}>저장하고 나가기</button>
  </>;
}
