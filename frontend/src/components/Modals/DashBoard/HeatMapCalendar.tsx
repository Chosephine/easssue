import { FC, useState, useEffect } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import { CalendarHistory } from './CalendarHistory'
import 'react-calendar-heatmap/dist/styles.css';
interface HeatMapCalendarProps {
  
}
export interface News {
  category : string,
    newsTitle : string,
    newsLink : string
}
type NewsList = News[] | []
const HeatMapCalendar: FC<HeatMapCalendarProps> = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() - 28);
  const startDateNewFormat = startDate.getFullYear() + '-' + `${startDate.getMonth() + 1}` + '-' + startDate.getDate();
  const endDateNewFormat = now.getFullYear() + '-' + `${now.getMonth() + 1}` + '-' + now.getDate();
  const [newsList, setNewsList] = useState<NewsList>([])

  useEffect(()=>{
    setNewsList(() => [{
      category: 'news',
      newsTitle:'naver',
      newsLink : "naver.com"
        }])
  },[])
  return <>
    <ReactCalendarHeatmap
      startDate={new Date('2022-10-01')}
      endDate={new Date('2022-10-30')}
      showWeekdayLabels={true}
      horizontal={false}
      onClick ={(value)=>console.log(value)}
      // onMouseOver={(event, value)=> console.log(event, value)}
      // titleForValue={(value) => `Date is ${value}`}
      showOutOfRangeDays={true}
      monthLabels={['01','02','03','04','05','06','07','08','09','10','11','12']}
      tooltipDataAttrs={(somevlaue : {date : string } | null)=> {return {'data-tooltip' : somevlaue?.date}}}
      values={
        [
          {date : '2022-10-10', count:12, article : ['ㅎㅇㅀ', 'ㄹㅇㅇㄹㅇ', 'ㄹㄻㅈㄷ']},
          {date : '2022-10-27', count:1, article : ['ㅎㅇㅀ', 'ㄹㅇㅇㄹㅇ', 'ㄹㄻㅈㄷ']}
        ]
      }
    />
    <ul>
      {newsList.map((news : News, idx)=> {
        return <li key={idx}>
          <CalendarHistory category={news.category} newsTitle={news.newsTitle} newsLink={news.newsLink}/>
        </li>
      })}
    </ul>
  </>;
}
 
export default HeatMapCalendar;