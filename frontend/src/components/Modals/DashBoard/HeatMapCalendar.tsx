import { FC, useState, useEffect } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import { CalendarHistory } from './CalendarHistory';
import 'react-calendar-heatmap/dist/styles.css';
import { GrassType } from './types';
import { getNewsHistory } from '@modules/api';
import Scrollbars from 'react-custom-scrollbars-2';

export interface News {
  category: string;
  newsTitle: string;
  newsLink: string;
}
type NewsList = News[] | [];
const HeatMapCalendar: FC<GrassType> = ({ startDate, endDate, values }) => {
  // const startDateNewFormat = startDate.getFullYear() + '-' + `${startDate.getMonth() + 1}` + '-' + startDate.getDate();
  // const endDateNewFormat = now.getFullYear() + '-' + `${now.getMonth() + 1}` + '-' + now.getDate();
  const [newsList, setNewsList] = useState<NewsList>([]);
  const [clickedDate, setClickedDate] = useState<string>('');
  useEffect(() => {
    const getNewsHistoryApi = async () => {
      const now = new Date();
      const getToday = `${now.getFullYear()}-${now.getMonth() + 1}-${
        now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
      }`;
      const korDate =
        `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${
          now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
        }` + '일';
      const data = await getNewsHistory(getToday);
      // console.log(data, korDate);
      setClickedDate(() => korDate);
      setNewsList(() => data.newsList);
    };
    getNewsHistoryApi();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [newsList]);
  const getNewsHistoryFromDate = async (fullDate: string) => {
    const now = new Date();
    const getToday = `${now.getFullYear()}-${now.getMonth() + 1}-${
      now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
    }`;
    let isToday = false;
    if (getToday === fullDate) {
      isToday = true;
    }
    const data = await getNewsHistory(fullDate);
    // console.log('getNewsHistoryFromDate:', data);
    if (data !== null) {
      const splitDate = fullDate.split('-');
      const korDate = `${splitDate[0]}년 ${splitDate[1]}월 ${splitDate[2]}일`
      setNewsList(() => data.newsList);
      // console.log('korDate:', korDate);
      setClickedDate(() =>korDate);
    }
  };
  return (
    <>
      <div className="h-[100%] flex p-0 mr-3">
        <ReactCalendarHeatmap
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          showWeekdayLabels={true}
          // horizontal={false}
          onClick={(value) => {
            if (value !== null) getNewsHistoryFromDate(value.date);
            // console.log('onClick : ', value);
          }}
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
          // onMouseOver={(event, value)=> console.log(event, value)}
          // titleForValue={(value) => `Date is ${value}`}
          // showOutOfRangeDays={true}
          monthLabels={[
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월',
          ]}
          tooltipDataAttrs={(somevlaue: { date: string } | null) => {
            return { 'data-tooltip': somevlaue?.date };
          }}
          values={values}
        />
      </div>
      <div className="h-[75%] w-[100%]">
        <span className=" ml-[4rem] mb-5 mr-1 text-lg">
          {clickedDate}
        </span>
        <ul className="border-l-2 mt-1 ml-5 h-[100%] w-[100%] overflow-auto">
          <Scrollbars
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHide={true}
          >
            {newsList.map((news: News, idx) => {
              return (
                <li key={idx}>
                  <CalendarHistory
                    category={news.category}
                    newsTitle={news.newsTitle}
                    newsLink={news.newsLink}
                  />
                </li>
              );
            })}
          </Scrollbars>
        </ul>
      </div>
    </>
  );
};

export default HeatMapCalendar;
