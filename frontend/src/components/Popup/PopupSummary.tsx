import { FC } from 'react';

interface PopupSummaryProps {
  summary : string[];
}
 
export const PopupSummery: FC<PopupSummaryProps> = ({ summary }) => {
  
  return <>
    <div className='h-[218px] w-[426px] border-2 border-black overflow-auto'>
      { summary && summary.map((item, index)=>{
        return <p key={index}>{`${index+1}. ${item}`}</p>
      })}
     </div> 
  </>;
}
 