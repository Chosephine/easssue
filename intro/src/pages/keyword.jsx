import React from 'react';
import KeywordInput from '../components/KeywordInput';
const Keyword = () => {
  return (
    <>
      <section className="panel p-10 ">
        <div className="keyword items-center">
          <KeywordInput />
        </div>
        <div className='keyword-text font-service ml-10'>
          <div className='text-[1.8rem]'>{"원하는 키워드를 구독하여 원하는 기사만 확인"}</div>
        </div>
      </section>
    </>
  );
};

export default Keyword;
