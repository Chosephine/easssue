import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putSubscribeKeywords } from '@/modules/api';
import { RootState } from '@modules/store'
import { KeywordModalProps } from './types'


export const KeywordModalSaveBtn : FC<KeywordModalProps> = ({setKeywordModalOpen , isLogin}) => {
  const {subScribeKwdList, banKwdList} = useSelector((state : RootState)=> {return{
    subScribeKwdList : state.persistedReducer.keyWordReducer.subScribeKwdList,
    banKwdList : state.persistedReducer.keyWordReducer.banKwdList
  }})
  const saveHandler = async ()=>{
    //*  벤리스트와 구독 키워드 한번에 보낼 것
    await putSubscribeKeywords(subScribeKwdList)
    setKeywordModalOpen(false)
    console.log(subScribeKwdList);
  }
  return <>
    <button className="absolute p-4 bg-blue-500 right-4 bottom-4"onClick={saveHandler}>저장하고 나가기</button>
  </>;
}
