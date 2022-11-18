import React from 'react';
import TrendComponent from '../components/TrendList'
import TrendHover from '../components/TrendHover';
const Trend = () => {
  return (
    <>
      <section className="panel p-10 trend-main font-service">
        <div className='trend-unit trend-text font-service mr-10'>
          <div className='text-[30px]'>{"실시간 트랜드를 반영한 키워드"}</div>
        </div>
        <TrendComponent/>
        <TrendHover/>
      </section>
    </>
  );
};

export default Trend;