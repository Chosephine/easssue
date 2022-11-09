import { FC, useEffect, useState } from 'react';
import { PopupWordCloud } from './PopupWordCloudImg';
import { PopupSummery } from './PopupSummary';
import { popupApi } from '@/modules/api';
import { PopupData } from './types'
interface PopupIndexProps {
  
}
 
export const PopupIndex: FC<PopupIndexProps> = () => {
  const [cloudImg, setCloudImg] = useState<string>('');
  const [summary, setSummary] = useState<string[]>([]);
  useEffect(()=>{
    async function getCurrentTab() {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }
    
    chrome.runtime.onInstalled.addListener(async () => {
      console.log(await getCurrentTab());
    });

    const getUrl = async()=> {
      const url = (await getCurrentTab()).url
      console.log(url)
      if (typeof url === 'string'){
        const data : PopupData = await popupApi(url);
        if (!data.error){
          setCloudImg(()=> data.cloud)
          setSummary(()=> data.summary)
        }else{

        }
      }
    }
    getUrl();
  },[])
  return <>
    <div className='flex flex-col m-0 items-center w-[100%] h-[600px] border-r-8'>
      <div className='w-[100%] flex items-center'>
      <img className='w-10 h-10 ml-[33px]' src="biglogo.png" alt="" />
      <h1 className='m-5 text-xl font-bold'>easssue 있슈</h1>
      </div>
      <div className='w-[100%] flex items-center'>
      <img className='w-3 h-3 ml-[33px]' src="smalllogo.png" alt="" />
      <h2 className='my-5 ml-3 text-lg font-bold'>키워드 클라우드</h2>
      </div>
      <PopupWordCloud imgUrl={cloudImg}/>
      <div className='w-[100%] flex items-center'>
      <img className='w-3 h-3 ml-[33px]' src="smalllogo.png" alt="" />
      <h2 className='my-5 ml-3 text-lg font-bold'>3줄 요약</h2>
      </div>
      <PopupSummery summary={summary}/>
    </div>
  </>;
}
 