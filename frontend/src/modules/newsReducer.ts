import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { getNews, getKeyWordNews } from './api';

export type newsList = {
  newsId: number,
	title: string,
	link: string,
	pubDate: string,
	summary: string,
	img: string,
	keywords: string[]
}

interface Initial {
  last : boolean,
  page : number,
  newsList : newsList[]
}

const initialState : Initial = {
  last : false,
  page : 0,
  newsList : []
}

export const getMainNewsRedux = createAsyncThunk('getMainNewsRedux', async ()=>{
  const data = await getNews(0);
  return data;
})

export const newsReducer = createSlice({
  name: 'newsReducer',
  initialState,
  reducers : {
    
  },
  extraReducers : builder => {
    builder.addCase(getMainNewsRedux.fulfilled, (state, action)=>{
      
    })
  },
})