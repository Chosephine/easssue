import { FC  } from 'react'
import type { News } from './HeatMapCalendar';

export const CalendarHistory: FC<News> = ({ category, newsTitle, newsLink}) => {
  return <>
  
  <a target={`_blank`} href={`${newsLink}`} className="w-[90%] transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-2 border-[1px] border-gray-400 bg-white text-black rounded mb-5 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-5 h-5 bg-gray-400 absolute -left-10 transform -translate-x-2/4 rounded-full z-[999] mt-2 md:mt-0"></div>

          <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

          <div className="flex-auto w-1/2">
            <h1 className="text-[0.8rem]">{category}</h1>
            <h1 className="text-lg font-bold">{newsTitle}</h1>
          </div>
          <span className="text-center text-blue-400 hover:text-gray-300">기사 열기</span>
        </a>
  </>;
}
