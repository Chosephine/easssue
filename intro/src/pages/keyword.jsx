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
          <div className='text-[35px]'>{"나만의 키워드를 구독하면"}</div>
        </div>
      </section>
    </>
  );
};

export default Keyword;
