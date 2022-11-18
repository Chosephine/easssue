import { FC } from 'react';

interface PopupWordCloudProps {
  imgUrl : string;
}
 
export const PopupWordCloud: FC<PopupWordCloudProps> = ({imgUrl}) => {
  return <>
    <img className='ml-3 h-[160px] w-[370px]' src={imgUrl} alt="keyword cloud" />
  </>;
}
 