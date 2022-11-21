import React, { FC, useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { addKeyword, addBanKeyword, keyword } from '@modules/keyWordReducer';
import { searchKeyword } from '@/modules/api';
import Scrollbars from 'react-custom-scrollbars-2';
import { ModeProps } from '@/components/KeywordModal/types';
const KeyInput: FC<ModeProps> = ({mode}) => {
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
        // console.log('searchResult', searchResult);
      };
      getSearchResult();
    }
  }, [inputKeyword]);

  const debounceSearch = useMemo(
    () =>
      debounce((keyword) => {
        setInputKeyword(() => keyword);
        // console.log('debounce value : ', inputKeyword);
      }, 500),
    [inputKeyword]
  );

  const dispatch = useDispatch();
  const addKeywordButton = (kwdId: number, kwdName: string) => {
    if(mode){
      dispatch(
        addBanKeyword({
          kwdId,
          kwdName,
        })
      );
    }else{
      dispatch(
        addKeyword({
          kwdId,
          kwdName,
        })
      );
    }
  };

  return (
    <>
      <div className="w-[60%] pr-2 mr-3 border-r-2">
        <div className="mb-3 text-2xl font-bold">{'키워드 검색하기'}</div>
        {/* <input
          className="w-[100%] m-0 border-blue-300 border-2"
          type="text"
          onChange={onChange}
          placeholder={"키워드를 입력하세요 :)"}
        /> */}
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block ml-2 p-3 pl-10 w-[95%] text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onChange}
            placeholder={'키워드를 입력하세요 :)'}
          />
        </div>
        <ul className="h-[77%] pt-2 overflow-auto w-[100%]">
          <Scrollbars
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHide={true}
          >
            {searchResult &&
              searchResult.map((searchResultItem) => {
                return (
                  <div
                    onClick={() =>
                      addKeywordButton(
                        searchResultItem.kwdId,
                        searchResultItem.kwdName
                      )
                    }
                    className="flex flex-col gap-4 lg:p-0 p-2  rounde-lg m-2"
                  >
                    <div className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                      <div className="lg:flex md:flex items-center">
                        <div className="flex flex-col">
                          <div className="text-lg pl-2 leading-3 text-gray-700 font-bold w-full">
                            {searchResultItem.kwdName}
                          </div>
                        </div>
                      </div>

                      <svg
                        className="h-6 w-6 mr-1 invisible md:visible lg:visible xl:visible"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
          </Scrollbars>
        </ul>
      </div>
    </>
  );
};

export default KeyInput;
