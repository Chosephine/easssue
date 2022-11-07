import { FC, useEffect } from 'react';
import { PopupWordCloud } from './PopupWordCloudImg';
import { PopupSummery } from './PopupSummery';
interface PopupIndexProps {
  
}
 
export const PopupIndex: FC<PopupIndexProps> = () => {
  useEffect(()=>{
    async function getCurrentTab() {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }
    
    // chrome.runtime.onInstalled.addListener(async () => {
    //   console.log(await getCurrentTab());
    // });
    const getUrl = async()=> {
      const url = (await getCurrentTab()).url
      console.log(url);
      
    }
    getUrl();
  },[])
  return <>
    <div className='flex flex-col m-0 items-center w-[100%] h-[600px] border-r-8'>
      <div className='w-[100%] flex items-center'>
      <img className='w-10 h-10 ml-[33px]' src="biglogo.png" alt="" />
      <h1 className='m-5 text-xl font-bold'>easssue 있슈</h1>
      </div>
      <PopupWordCloud />
      <div className='w-[100%] flex items-center'>
      <img className='w-10 h-10 ml-[33px]' src="smalllogo.png" alt="" />
      <h2 className='m-5 text-lg font-bold'>3줄 요약</h2>
      </div>
      <PopupSummery/>
    </div>
  </>;
}
 