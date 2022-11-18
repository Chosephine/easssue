import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putBanKeywords, putSubscribeKeywords,putAllKeywordList } from '@/modules/api';
import { RootState } from '@modules/store';
import { KeywordModalProps } from './types';

export const KeywordModalSaveBtn: FC<KeywordModalProps> = ({
  setKeywordModalOpen,
  isLogin,
}) => {
  const { subScribeKwdList, banKwdList, subKeyLength } = useSelector((state: RootState) => {
    return {
      subScribeKwdList: state.persistedReducer.keyWordReducer.subScribeKwdList,
      banKwdList: state.persistedReducer.keyWordReducer.banKwdList,
      subKeyLength: state.persistedReducer.keyWordReducer.subKeyLength,
    };
  });
  const saveHandler = async () => {
    //*  벤리스트와 구독 키워드 한번에 보낼 것
    await putBanKeywords(banKwdList);
    const result = await putSubscribeKeywords(subScribeKwdList, subKeyLength);
    // putAllKey  wordList(subScribeKwdList,banKwdList);
    if(result !== 'key length error'){
      setKeywordModalOpen(false);
    }
  };
  return (
    <>
      <div onClick={saveHandler} className="absolute right-6 bottom-6">
        <button
          type="button"
          className="flex bg-gradient-to-r from-[#6183e7] to-[#1ec4c4] hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-md uppercase font-bold shadow-md rounded-lg mx-auto p-2"
        >
          <div className="flex justify-center">
            <div className="text-xl font-bold mx-3">저장하고 나가기</div>
          </div>
        </button>
      </div>
    </>
  );
};
