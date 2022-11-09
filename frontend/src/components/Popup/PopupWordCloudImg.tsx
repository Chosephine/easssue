import { FC } from 'react';

interface PopupWordCloudProps {
  imgUrl : string;
}
 
export const PopupWordCloud: FC<PopupWordCloudProps> = ({imgUrl}) => {
  return <>
    <img className='h-[218px] w-[426px] border-2 border-gray-400' src={imgUrl} alt="" />
  </>;
}
 