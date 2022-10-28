import { FC } from 'react';
import HeatMapCalendar from './HeatMapCalendar';

interface DashIndexProps {}

export const DashIndex: FC<DashIndexProps> = () => {
  return <>
    <section className='flex w-[100%] border-blue-100 border-2'>
      <HeatMapCalendar />
    </section>
  </>;
};

