import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import KeywordModal from '@/components/Modals/Keywords/KeywordComponent';
import { BookmarkModal } from '@/components/BookmarkModal';
import '@root/index.css';
import { Bookmark } from '@/components/Bookmark';
import { Searchbar } from '@/components/Searchbar';
import { Settingbar } from '@/components/Settingbar';
import { NewsBoard } from '@/components/NewsBoard';
import { RealtimeKeyword } from '@/components/RealtimeKeyword';
import { DashIndex } from '@/components/Modals/DashBoard';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '@/modules/store';
import Scrollbars from 'react-custom-scrollbars-2';

const App: React.FC<{}> = () => {
  const [BookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [bookmarkTree, setBookmarkTree] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [myToken, setToken] = useState<string>('');
  useEffect(() => {
    fetchBookmarks();
  }, [BookmarkModalOpen]);
  const fetchBookmarks = () => {
    chrome.bookmarks.getChildren('1', (bookmarkTreeNodes) => {
      console.log(bookmarkTreeNodes);
      setBookmarkTree(bookmarkTreeNodes);
    });
  };
  return (
    <>
      <div
        className="flex flex-col bg-cover"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(tab-background.jpg)',
        }}
      >
        <div className="h-8 p-2">
          <Settingbar />
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
              <KeywordModal />
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
      {/* <button
        onClick={() =>

          chrome.identity.getAuthToken({ interactive: true }, resToken => {
            alert(resToken)
            setToken(()=> resToken)
            console.log(myToken);
            
    })
        }
      >
        구글로그인  
      </button>
      <button onClick={()=>{
        chrome.identity.removeCachedAuthToken(
          {token: myToken}, function (){
            console.log("remove");
          }
      );
      }}>로그아웃</button> */}
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
