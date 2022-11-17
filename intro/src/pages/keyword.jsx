import React from 'react';
import KeywordInput from '../components/KeywordInput';
const Keyword = () => {
  return (
    <>
      <section className="panel p-10 font-service">
        <div className="keyword items-center">
          <KeywordInput />
        </div>
        <div className='keyword-text font-service ml-10'>
          <div className='text-[1.8rem]'>{"나만의 키워드를 구독하고 구독 한 키워드 기사들 확인"}</div>
        </div>
      </section>
    </>
  );
};

export default Keyword;
