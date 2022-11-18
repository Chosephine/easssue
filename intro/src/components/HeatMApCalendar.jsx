import { FC, useState, useEffect } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const HeatMapCalendar = () => {
  return (
    <>
      <div className="heatmap h-[100%] mr-[350px] flex items-center">
        <div className="calendar-text text-[27px] w-[460px] font-service mr-[40px]">
          <div>{`히트맵에서 히스토리도 확인할 수 있어요`}</div>
        </div>
        <div  className=" bg-slate-300  border-[1px] border-black flex justify-center h-[240px] w-[240px]">
          <div className="h-full flex p-[20px] mx-[20px]">
            <ReactCalendarHeatmap
              startDate={new Date('2022-10-31')}
              endDate={new Date('2022-12-01')}
              showWeekdayLabels={false}
              showMonthLabels={false}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                } else if (value.count >= 10) {
                  return `color-gitlab-4`;
                } else if (value.count >= 6) {
                  return `color-gitlab-3`;
                } else if (value.count >= 2) {
                  return `color-gitlab-2`;
                } else if (value.count == 1) {
                  return `color-gitlab-1`;
                }
              }}
              values={[
                { date: '2022-11-01', count: 1 },
                { date: '2022-11-02', count: 3 },
                { date: '2022-11-03', count: 6 },
                { date: '2022-11-04', count: 3 },
                { date: '2022-11-05', count: 7 },
                { date: '2022-11-06', count: 6 },
                { date: '2022-11-07', count: 12 },
                { date: '2022-11-09', count: 1 },
                { date: '2022-11-10', count: 1 },
                { date: '2022-11-11', count: 8 },
                { date: '2022-11-14', count: 6 },
                { date: '2022-11-15', count: 12 },
                { date: '2022-11-16', count: 1 },
                { date: '2022-11-17', count: 3 },
                { date: '2022-11-18', count: 3 },
                { date: '2022-11-19', count: 5 },
                { date: '2022-11-20', count: 1 },
                { date: '2022-11-22', count: 122 },
                { date: '2022-11-23', count: 7 },
                { date: '2022-11-24', count: 1 },
                { date: '2022-11-25', count: 3 },
                { date: '2022-11-26', count: 6 },
                { date: '2022-11-28', count: 6 },
                { date: '2022-11-29', count: 1 },
                { date: '2022-11-30', count: 10 },
                { date: '2022-12-01', count: 1 }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeatMapCalendar;
