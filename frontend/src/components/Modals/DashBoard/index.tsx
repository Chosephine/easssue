import { FC, useEffect, useState } from 'react';
import HeatMapCalendar from './HeatMapCalendar';
import { RadarChart } from './RadarChart';
import { DashBoardWordCloudImg } from './WordCloud';
import { getDashBoardInfo } from '@/modules/api';
import { DashInfo } from './types';
interface DashIndexProps {
}

export const DashIndex: FC<DashIndexProps> = () => {
  const [dashBoardInfo, setDashBoardInfo] = useState<DashInfo>();
  useEffect(() =>{
    const getDashInfo = async () =>{
      const data = await getDashBoardInfo();
      setDashBoardInfo(()=>data);
    }
    getDashInfo();
  },[])
  return (
    <>
      {dashBoardInfo && <section className="flex-row w-[100%] h-[95%] border-blue-100 border-2">
        <div className="grid grid-cols-12 h-[50%] border-2 border-black">
          <div className='col-span-3 h-full'>
          <RadarChart labels={dashBoardInfo.graph.labels} data={dashBoardInfo.graph.data}/>
          </div>
          <div className='col-span-9 py-1 h-[100%]'>
          <DashBoardWordCloudImg cloud={dashBoardInfo.cloud}/>
          </div>
        </div>
        <div className='h-1/2 border-2 border-black'>
        <HeatMapCalendar startDate={dashBoardInfo.grass.startDate} endDate={dashBoardInfo.grass.endDate} values={dashBoardInfo.grass.values} />
        </div>
      </section>}
    </>
  );
};
