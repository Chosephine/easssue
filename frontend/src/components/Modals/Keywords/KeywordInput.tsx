import React, { FC, useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { removeKeyword, addKeyword, keyword } from '@modules/keyWordReducer';
import { searchKeyword } from '@/modules/api';
const KeyInput: FC = () => {
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };
  const [searchResult, setSearchResult] = useState<keyword[]>();

  useEffect(() => {
    if (inputKeyword !== '') {
      const getSearchResult = async () => {
        await new Promise(async (resolve, reject) => {
          const res = await searchKeyword(inputKeyword);
          resolve(setSearchResult(() => res));
        });
        console.log('searchResult', searchResult);
      };
      getSearchResult();
    }
  }, [inputKeyword]);

  const debounceSearch = useMemo(
    () =>
      debounce((keyword) => {
        setInputKeyword(() => keyword);
        console.log('debounce value : ', inputKeyword);
      }, 500),
    [inputKeyword]
  );

  const dispatch = useDispatch();
  const addKeywordButton = () => {
    dispatch(
      addKeyword({
        kwdId: 123,
        kwdName: 'string',
      })
    );
  };

  return (
    <>
      <div className="w-[50%] pr-2 mr-2 border-r-2">
        <div className="mb-3 text-xl font-bold">{'검색하기'}</div>
        <input
          className="w-[80%] mb-2 border-blue-100 border-2"
          type="text"
          onChange={onChange}
        />
        <ul className="h-[65%] overflow-auto">
        {searchResult && searchResult.map(searchResultItem =>{
          return <li>{searchResultItem.kwdName}<button onClick={addKeywordButton}> addKeywordButton </button></li>
        })}
        </ul>
      </div>
    </>
  );
};

export default KeyInput;
