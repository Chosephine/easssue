import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookmarkModal } from '@/components/BookmarkModal';
import '@root/index.css';
import { Bookmark } from '@/components/Bookmark';
import { Searchbar } from '@/components/Searchbar';
import { Settingbar } from '@/components/Settingbar';
import { NewsBoard } from '@/components/NewsBoard';
import { RealtimeKeyword } from '@/components/RealtimeKeyword';
import { DashIndex } from '@/components/Modals/DashBoard';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { persistor, store, AppDispatch,RootState } from '@/modules/store';
import Scrollbars from "react-custom-scrollbars-2";
import { SettingModal } from "@/components/SettingModal";
import { DashboardModal } from "@/components/DashboardModal";
import { KeywordModal } from "@/components/KeywordModal";

//api
import axios from 'axios'
import { getNews,trendAPI,getRecommendKeywords,newsLogApi  } from '@modules/api'
import { userStateCheck } from '@/modules/auth';
import { getSubscribeKeywordsRedux } from '@/modules/keyWordReducer';


const App: React.FC<{}> = () => {
  const [BookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [keywordModalOpen, setKeywordModalOpen] = useState(false);
  const [bookmarkTree, setBookmarkTree] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [imgUrl, setImgUrl] = useState('');
  const { accessToken, isLogin, subScribeKwdList } = useSelector((state: RootState) => {
    return {
      accessToken : state.persistedReducer.authReducer.token.accessToken,
      isLogin : state.persistedReducer.authReducer.isLogin,
      subScribeKwdList : state.persistedReducer.keyWordReducer.subScribeKwdList
    };
  });

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    fetchUrl();
  }, [settingModalOpen]);
  useEffect(() => {
    fetchBookmarks();
  }, [BookmarkModalOpen]);
  useEffect(() => {
    if(accessToken !== ''){
      axios.defaults.headers.common['Authorization'] = `${accessToken}`;
    }
    const getInitialData = async ()=>{
      const jwtStatus = await dispatch(userStateCheck()).unwrap();
      // console.log("jwtStatus", jwtStatus);
      if(accessToken !== ''){
      axios.defaults.headers.common['Authorization'] = `${accessToken}`;
    }
    await trendAPI();
    await getRecommendKeywords()
    await dispatch(getSubscribeKeywordsRedux());
      // return jwtStatus.data;
    }
    getInitialData();
  }, []);
  const fetchBookmarks = () => {
    chrome.bookmarks.getChildren('1', (bookmarkTreeNodes) => {
      // console.log(bookmarkTreeNodes);
      setBookmarkTree(bookmarkTreeNodes);
    });
  };
  const fetchUrl = () => {
    chrome.storage.local.get(['bgimg'], (result) => {
      setImgUrl(result.bgimg);
      // console.log(result.bgimg)
    });
  };
  return (
    <>
      <div
        className="flex flex-col bg-cover"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: !!imgUrl ? 'url(' + imgUrl + ')' : 'url(default-background.png)',
        }}
      >
        <div className="flex flex-row justify-center h-full">
          <div className="w-0 2xl:w-1/5"></div>
          <div className="w-3/5 min-w-[1152px]">
            <Scrollbars
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHide={true}
            >
              <Searchbar />
              <NewsBoard setKeywordModalOpen={setKeywordModalOpen}/>
              <Bookmark
                setBookmarkModalOpen={setBookmarkModalOpen}
                bookmarkTree={bookmarkTree}
              />
            </Scrollbars>
          </div>
          <div className="w-0 xl:w-2/5 2xl:w-1/5">
            <div className="h-[4rem] mt-6 mb-5 mr-6 p-2">
            <Settingbar
              setSettingModalOpen={setSettingModalOpen}
              setDashboardModalOpen={setDashboardModalOpen}
            />
          </div>
            <RealtimeKeyword />
          </div>
        </div>
      </div>
      {BookmarkModalOpen && (
        <BookmarkModal
          setBookmarkModalOpen={setBookmarkModalOpen}
        ></BookmarkModal>
      )}
      {settingModalOpen && (
        <SettingModal setSettingModalOpen={setSettingModalOpen}></SettingModal>
      )}
      {dashboardModalOpen && (
        <DashboardModal
          setDashboardModalOpen={setDashboardModalOpen} isLogin={isLogin}
        ></DashboardModal>
      )}
      {keywordModalOpen && (
        <KeywordModal setKeywordModalOpen={setKeywordModalOpen} isLogin={isLogin}></KeywordModal>
      )}
      {/* <button onClick={async()=>{
        try {
          await newsLogApi(1)
        } catch (error) {
          
        }
      }}>
        뉴스로그 증가
              </button> */}
    </>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
