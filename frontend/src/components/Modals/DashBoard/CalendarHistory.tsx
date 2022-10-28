import { FC  } from 'react'
import type { News } from './HeatMapCalendar';

export const CalendarHistory: FC<News> = ({ category, newsTitle, newsLink}) => {
  
  return <>
  {`${category} ${newsTitle} ${newsLink}`}
  </>;
}
