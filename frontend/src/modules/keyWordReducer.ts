import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { getSubscribeKeywords } from './api';

export type keyword = { kwdId: number; kwdName: string }
interface Initial {
  kwdList: keyword[];
}

const initialState: Initial = {
  kwdList: [{
    kwdId : 1,
    kwdName : '0'
  },
  {
    kwdId : 2,
    kwdName : 'a'
  },
  {
    kwdId : 3,
    kwdName : 'b'
  },
  {
    kwdId : 4,
    kwdName : 'c'
  },
  {
    kwdId : 5,
    kwdName : 'd'
  }
],
};
export const getSubscribeKeywordsRedux = createAsyncThunk('getSubscribeKeywords',async()=>{
  const data = await getSubscribeKeywords();
  // console.log(data);
  return data;
})

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      const isDuplicate = state.kwdList.find(
        (keyword) => keyword.kwdId === action.payload.kwdId
      );
      if (!isDuplicate) {
        state.kwdList.unshift(action.payload);
      }
    },
    removeKeyword: (state, action) => {
      const data = state.kwdList.filter((keywords) => {
        console.log(keywords, action.payload.kwdId);
        
        return keywords.kwdId != action.payload;
      });
      state.kwdList = data;
    },
    endDropChangeList: (state, action) => {
      if(!action.payload.destination)return ;
      const keywords = [...state.kwdList]
      console.log(keywords.map((a)=> current(a)));
      const [reorderedItem] = keywords.splice(action.payload.source.index, 1);
      keywords.splice(action.payload.destination.index, 0, reorderedItem);
      state.kwdList = keywords;
    }
  },
  extraReducers : builder => {
    builder.addCase(getSubscribeKeywordsRedux.fulfilled, (state, action) => {
      console.log(action.payload.kwdList);
      state.kwdList = action.payload.kwdList;
    })
  }
});

export const { addKeyword, removeKeyword, endDropChangeList } = keywordSlice.actions;

export default keywordSlice.reducer;
