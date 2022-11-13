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
      {dashBoardInfo && <section className="flex-row w-[100%] h-[95%] border-blue-100 border-2 bg-blue-200">
        <div className="grid grid-cols-12 h-[50%]">
          <div className='col-span-3 h-[90%] m-6 bg-white  shadow-md'>
            <h1 className="mt-3 border-b-2 border-gray-400 ml-3 mb-0 mr-1 font-bold text-lg">읽은 뉴스</h1>
          <RadarChart labels={dashBoardInfo.graph.labels} data={dashBoardInfo.graph.data}/>
          </div>
          <div className='col-span-9 h-[98%]'>
          <DashBoardWordCloudImg cloud={dashBoardInfo.cloud}/>
          </div>
        </div>
        <div className='h-1/2 shadow-md'>
        <HeatMapCalendar startDate={dashBoardInfo.grass.startDate} endDate={dashBoardInfo.grass.endDate} values={dashBoardInfo.grass.values} />
        </div>
      </section>}
    </>
  );
};
