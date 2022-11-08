import { FC } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { RadarController } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { GraphDataType } from './types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


export const RadarChart: FC<GraphDataType> = ({ labels, data }) => {
  console.log(labels, data);
  const dataset = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return <>
    <Radar data={dataset} style={{height : '200px'}}/>
  </>;
}
