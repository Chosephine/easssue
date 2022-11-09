import { FC } from 'react';

interface PopupSummaryProps {
  summary : string[];
}
 
export const PopupSummery: FC<PopupSummaryProps> = ({ summary }) => {
  
  return <>
    <div className='w-[100%] px-2'>
      { summary && summary.map((item, index)=>{
        return <p className='text-[16px] ml-1 mb-3' key={index}>{` ${item}`}</p>
      })}
     </div> 
  </>;
}
 