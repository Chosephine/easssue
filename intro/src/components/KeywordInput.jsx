import React from 'react';

const KeywordInput = () => {
  const searchResult = [
    {
      kwdName: '있슈 easssue',
    },
    {
      kwdName: 'SSAFY',
    },
    {
      kwdName: '구글',
    },
  ];
  return (
    <>
      <div className="key-input w-[30vw] pr-2 mr-2 border-r-2">
        <div className="mb-3 text-xl">{'키워드 검색하기'}</div>{' '}
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlstroke-linecapns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={"키워드"}
          />
        </div>
        <ul className="h-[70%] pt-2 overflow-auto w-[100%]">
          {searchResult &&
            searchResult.map((searchResultItem, index) => {
              return (
                <div key={index} className="search-result flex flex-col gap-4 lg:p-0  rounde-lg my-2">
                  <div className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                    <div className="lg:flex md:flex items-center">
                      <div className="flex flex-col">
                        <div className="text-sm pl-2 leading-3 text-gray-700 w-full">
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
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default KeywordInput;
