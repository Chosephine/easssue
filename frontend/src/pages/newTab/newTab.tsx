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
import { AppDispatch, persistor, store, RootState } from '@/modules/store';
import Scrollbars from 'react-custom-scrollbars-2';
import { SettingModal } from '@/components/SettingModal';
import { DashboardModal } from '@/components/DashboardModal';
import { KeywordModal } from '@/components/KeywordModal';
// apis
import { unwrapResult } from '@reduxjs/toolkit'
import { getNews, trendAPI } from '@/modules/api';
import { loginAuthToken } from '@/modules/auth';
import axios from 'axios';

const App: React.FC<{}> = () => {
  const [BookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [keywordModalOpen, setKeywordModalOpen] = useState(false);
  const [bookmarkTree, setBookmarkTree] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [imgUrl, setImgUrl] = useState('');
  const { accessToken, isLogin } = useSelector((state: RootState) => {
    return {
      accessToken : state.persistedReducer.authReducer.token.accessToken,
      isLogin : state.persistedReducer.authReducer.isLogin
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
    console.log(accessToken);
    
    getNews(0);
    trendAPI();
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
          backgroundImage: 'url(' + imgUrl + ')' || '',
        }}
      >
        <div className="h-8 p-2">
          <Settingbar
            setSettingModalOpen={setSettingModalOpen}
            setDashboardModalOpen={setDashboardModalOpen}
            setKeywordModalOpen={setKeywordModalOpen}
          />
        </div>
        <div className="flex flex-row h-full">
          <div className="w-1/4"></div>
          <div className="w-1/2">
            <Scrollbars
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHide={true}
            >
              <Searchbar />
              <NewsBoard />
              <Bookmark
                setBookmarkModalOpen={setBookmarkModalOpen}
                bookmarkTree={bookmarkTree}
              />
            </Scrollbars>
          </div>
          <div className="w-1/4">
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
          setDashboardModalOpen={setDashboardModalOpen}
        ></DashboardModal>
      )}
      {keywordModalOpen && (
        <KeywordModal setKeywordModalOpen={setKeywordModalOpen}></KeywordModal>
      )}
      <button onClick={async()=>{
        try {
          const data = await dispatch(loginAuthToken());
        } catch (error) {
          
        }
      }}>
        리덕스 구글 로그인
      </button>
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
