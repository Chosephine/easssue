import React from 'react';
import HeatMapCalendar from '../components/HeatMApCalendar';
import { RadarChart } from '../components/Radar';
const Dash = () => {
  return (
    <>
    <section className="panel font-service">
      <div className='dash flex flex-col w-[100%] items-center'>
      <RadarChart/>
      <HeatMapCalendar />
      </div>
    </section>
    </>
  );
};

export default Dash;
