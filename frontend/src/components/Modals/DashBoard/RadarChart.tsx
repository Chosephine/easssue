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
);


export const RadarChart: FC<GraphDataType> = ({ labels, data }) => {
  console.log(labels, data);
  const dataset = {
    labels,
    datasets: [
      {
        label: '관심있는 주제',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        min : 0
      },
    ],
  };
  const options = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            Min: 0,
            suggestedMax: 10
        }
    }
  }
  return <>
    <Radar data={dataset} style={{height : '200px'}} options={options}/>
  </>;
}
