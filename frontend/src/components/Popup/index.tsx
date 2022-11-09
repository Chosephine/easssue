import { FC, useEffect, useState } from 'react';
import { PopupWordCloud } from './PopupWordCloudImg';
import { PopupSummery } from './PopupSummary';
import { popupApi } from '@/modules/api';
import { PopupData } from './types';
import Scrollbars from 'react-custom-scrollbars-2';
interface PopupIndexProps {}

export const PopupIndex: FC<PopupIndexProps> = () => {
  const [cloudImg, setCloudImg] = useState<string>('');
  const [summary, setSummary] = useState<string[]>([]);
  const [thisTitle, setThisTitle] = useState<string>('');
  useEffect(() => {
    async function getCurrentTab() {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }

    chrome.runtime.onInstalled.addListener(async () => {
      console.log(await getCurrentTab());
    });

    const getUrl = async () => {
      const url = (await getCurrentTab()).url;
      const title = (await getCurrentTab()).title;
      if (title)setThisTitle(()=>title);
      console.log(url, title);
      if (typeof url === 'string') {
        const data: PopupData = await popupApi(url);
        if (!data.error) {
          setCloudImg(() => data.cloud);
          setSummary(() => data.summary);
        } else {
        }
      }
    };
    getUrl();
  }, []);
  return (
    <>
      <div className="flex flex-col m-0 items-center w-[100%] h-[550px]">
    <Scrollbars
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHide={true}
          >
        <div className="p-3 w-[100%] flex items-center bg-blue-300">
          <img className="w-10 h-10 " src="biglogo.png" alt="" />
          <h1 className="ml-3 text-xl font-bold">easssue 있슈</h1>
        </div>
        <div className="mt-1 px-3 w-[100%] flex items-center justify-end">
          <h1 className="ml-3 text-md text-slate-600 font-bold truncate">{`${thisTitle}`}</h1>
        </div>
        <div className="w-[100%] flex items-center">
          {/* <img className="w-3 h-3 " src="smalllogo.png" alt="" /> */}
          <h2 className="m-3 text-lg font-bold border-b-2 border-gray-400">키워드 클라우드</h2>
        </div>
        <PopupWordCloud imgUrl={cloudImg} />
        <div className="w-[100%] flex items-center">
          {/* <img className="w-3 h-3 " src="smalllogo.png" alt="" /> */}
          <h2 className="m-3 text-lg font-bold border-b-2 border-gray-400">기사 요약</h2>
        </div>
        <PopupSummery summary={summary} />
      </Scrollbars>
      </div>
    </>
  );
};
