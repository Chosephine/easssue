import { FC, useEffect, useState } from 'react';
import HeatMapCalendar from './HeatMapCalendar';
import { RadarChart } from './RadarChart';
import { DashBoardWordCloudImg } from './WordCloud';
import { getDashBoardInfo } from '@/modules/api';
import { DashInfo } from './types';
interface DashIndexProps {}

export const DashIndex: FC<DashIndexProps> = () => {
  const [dashBoardInfo, setDashBoardInfo] = useState<DashInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getDashInfo = async () => {
      const data = await getDashBoardInfo();
      setLoading(()=>false)
      setDashBoardInfo(() => data);
    };
    getDashInfo();
  }, []);
  return (
    <>
      {loading ?  <div className='h-[100%] flex justify-center flex-col items-center'>
      <img className='ml-3 h-[50%] w-[30%]' src="spinner.gif" alt="" /> 
      </div>  : dashBoardInfo && (
        <section className="flex-row w-[100%] h-[95%]  border-2 bg-gray-200">
          <div className="grid grid-cols-12 h-[50%]">
            <div className="col-span-3 h-[85%] m-6 bg-white shadow-lg">
              <h1 className="mt-3 border-b-2 border-gray-400 ml-3 mb-0 mr-1 font-bold text-lg">
                읽은 뉴스
              </h1>
              <RadarChart
                labels={dashBoardInfo.graph.labels}
                data={dashBoardInfo.graph.data}
              />
            </div>
            <div className="col-span-9 h-[85%] m-6 bg-white  shadow-lg">
              <h1 className="mt-3 border-b-2 border-gray-400 ml-3 mb-2 mr-1 font-bold text-lg">
                워드 클라우드
              </h1>
              <DashBoardWordCloudImg cloud={dashBoardInfo.cloud} />
            </div>
          </div>
          <div className="h-[50%]">
            <div className="h-[85%] w-[96.5%] pt-3 m-6 bg-white shadow-lg">
              <h1 className="border-b-2 border-gray-400 ml-3 mb-2 mr-1 font-bold text-lg">
                히스토리
              </h1>
              <div className="h-[100%] flex">
                <HeatMapCalendar
                  startDate={dashBoardInfo.grass.startDate}
                  endDate={dashBoardInfo.grass.endDate}
                  values={dashBoardInfo.grass.values}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
