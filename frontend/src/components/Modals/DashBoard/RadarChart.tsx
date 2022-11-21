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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export const RadarChart: FC<GraphDataType> = ({ labels, data }) => {
  // console.log(labels, data);
  const dataset = {
    labels,
    datasets: [
      {
        label: '읽은 기사의 수',
        data,
        backgroundColor: 'rgba(72,122,182, 0.5)',
        borderColor: 'navy',
        borderWidth: 1,
        pointBackgroundColor:'bg-blue-200',
        lineTension:0.2,
        min: 0,
      },
    ],
  };
  const options = {
    elements: {
      point: {
        radius: 3, // 점 크기
      },
    },
    scales: {

      r: {
        angleLines: {
          display: false,
          // color:'white'
        },
        Min: 0,
        pointLabels: {
          // color: 'white', // 라벨의 글씨 색상
          font: {
            family: 'Pretendard-Regular',
            size : 13
          },
        },
        grid: {
          // color: 'black', // 거미줄 중간 중간 선 색상
          // color:'rgba(0,0,0,0)'
          // borderDash : [15, 30],
          circular : true
        },
        ticks: {
          beginAtZero: true,
          stepSize:40,
          color: 'white',
          showLabelBackdrop: false, // hide square behind text // 이부분이 숫자 label의 배경 부분.
          font: {
            family: 'Pretendard-Regular',
          },

          display: false
        },
      },
      
    },
    plugins : {
      legend :{
        labels :{
          font:{
            size: 100
          }
        }
      }
    }
  };
  return (
    <>
      <Radar data={dataset} style={{ height: '' }} options={options} />
    </>
  );
};
