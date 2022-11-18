import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export const RadarChart = () => {
  const labels = [
    'IT/과학',
    '경제',
    '문화/생활',
    '미용/건강',
    '사회',
    '스포츠',
    '연예',
    '정치',
  ];
  const data = [80, 95, 60, 80, 83, 90, 60, 70];
  const dataset = {
    labels,
    datasets: [
      {
        label: '읽은 기사의 수',
        data,
        backgroundColor: 'rgba(72,122,182, 0.5)',
        borderColor: 'navy',
        borderWidth: 1,
        pointBackgroundColor: 'bg-blue-200',
        lineTension: 0.2,
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
          display: false,
          // color: 'white', // 라벨의 글씨 색상
          font: {
            family: 'Pretendard-Regular',
            size: 13,
          },
        },
        grid: {
          color: 'rgb(148 163 184)', // 거미줄 중간 중간 선 색상
          // color:'rgba(0,0,0,0)'
          // borderDash : [15, 30],
          circular: true,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 100,
          color: 'white',
          showLabelBackdrop: false, // hide square behind text // 이부분이 숫자 label의 배경 부분.
          font: {
            family: 'Pretendard-Regular',
          },

          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 100,
          },
        },
      },
    },
  };
  return (
    <>
      <div className="radar h-[100%] flex items-center ml-[323px]">
        <div className="bg-slate-300 m-[-1px] border-[1px] border-black p-[20px] flex justify-center h-[240px] w-[240px]">
            <Radar data={dataset} style={{ height: '' }} options={options} />
        </div>
          <div className="font-service w-[610px] text-[28px] ml-[40px] pl-[32px]">
            <div>{`뉴스를 읽으면 내 관심사를 카테고리별로 알려주고,`}</div>
          </div>
      </div>
    </>
  );
};
