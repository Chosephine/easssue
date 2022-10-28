import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import KeywordModal from '@/components/Modals/Keywords/KeywordComponent';
import '@root/index.css';
import { Bookmark } from '@/components/Bookmark';
import { Searchbar } from '@/components/Searchbar';
import { NewsBoard } from '@/components/NewsBoard';
import { DashIndex } from '@/components/Modals/DashBoard';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '@/modules/store';
const App: React.FC<{}> = () => {

  return (
    <div
      className="flex justify-center bg-cover"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(tab-background.jpg)',
      }}
    >
      <div className="w-1/2">
        <Searchbar />
        <NewsBoard />
        <Bookmark />
        <KeywordModal />
        <DashIndex/>
      </div>
      
    </div>
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
