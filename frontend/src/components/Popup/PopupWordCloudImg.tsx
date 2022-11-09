import { FC } from 'react';

interface PopupWordCloudProps {
  imgUrl : string;
}
 
export const PopupWordCloud: FC<PopupWordCloudProps> = ({imgUrl}) => {
  return <>
    <img className='h-[160px] w-[98%]' src={imgUrl} alt="keyword cloud" />
  </>;
}
 