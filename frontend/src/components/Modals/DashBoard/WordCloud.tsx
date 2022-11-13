import { FC } from 'react';

interface DashBoardWordCloudImgProps {
  cloud: string | undefined;
}

export const DashBoardWordCloudImg: FC<DashBoardWordCloudImgProps> = ({
  cloud,
}) => {
  const img = cloud;
  return (
    <>
      <img src={img} alt="word cloud" className="h-[75%] w-full" />
    </>
  );
};
