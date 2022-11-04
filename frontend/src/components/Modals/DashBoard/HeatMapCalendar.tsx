import { FC, useState, useEffect } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import { CalendarHistory } from './CalendarHistory'
import 'react-calendar-heatmap/dist/styles.css';
import { GrassType } from './types'
import { getNewsHistory } from '@modules/api'

export interface News {
  category : string,
    newsTitle : string,
    newsLink : string
}
type NewsList = News[] | []
const HeatMapCalendar: FC<GrassType> = ({ startDate, endDate, values}) => {

  // const startDateNewFormat = startDate.getFullYear() + '-' + `${startDate.getMonth() + 1}` + '-' + startDate.getDate();
  // const endDateNewFormat = now.getFullYear() + '-' + `${now.getMonth() + 1}` + '-' + now.getDate();
  const [newsList, setNewsList] = useState<NewsList>([])

  useEffect(()=>{
    const getNewsHistoryApi = async () =>{
      const now = new Date();
  const getToday = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`;
      const data = await getNewsHistory(getToday);
      console.log(data, getToday );
      setNewsList(()=> data.newsList);
    }
    getNewsHistoryApi();
  },[])
  return <>
  <div className='h-[100%] flex'>

  <div className='h-[120%] flex p-0 mr-3'>

    <ReactCalendarHeatmap
      startDate={new Date(startDate)}
      endDate={new Date(endDate)}
      showWeekdayLabels={true}
      // horizontal={false}
      onClick ={(value)=>console.log(value)}
      // onMouseOver={(event, value)=> console.log(event, value)}
      // titleForValue={(value) => `Date is ${value}`}
      // showOutOfRangeDays={true}
      monthLabels={['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']}
      tooltipDataAttrs={(somevlaue : {date : string } | null)=> {return {'data-tooltip' : somevlaue?.date}}}
      values={ values }
      />
      </div>
      <div>

    <ul>
      {newsList.map((news : News, idx)=> {
        return <li key={idx}>
          <CalendarHistory category={news.category} newsTitle={news.newsTitle} newsLink={news.newsLink}/>
        </li>
      })}
    </ul>
      </div>
  </div>
  </>;
}
 
export default HeatMapCalendar;