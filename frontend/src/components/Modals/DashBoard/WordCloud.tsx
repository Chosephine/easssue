import { FC } from 'react';

interface DashBoardWordCloudImgProps {
  cloud :string | undefined;  
}
 
export const DashBoardWordCloudImg: FC<DashBoardWordCloudImgProps> = ({cloud}) => {
  const img = cloud;
  return <>
      <div className='w-[99%] h-[100%] p-0 border-2 border-black bg-cover'>
          <img src={img} alt="" className='h-[350px]'/>
      </div>
  </>;
}
 