import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import axios from 'axios';

interface Initial {
  keywords: { kwdId: number; kwdName: string }[];
}

const initialState: Initial = {
  keywords: [{
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

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      const isDuplicate = state.keywords.find(
        (keyword) => keyword.kwdId === action.payload.kwdId
      );
      if (!isDuplicate) {
        state.keywords.unshift(action.payload);
      }
    },
    removeKeyword: (state, action) => {
      const data = state.keywords.filter((keywords) => {
        console.log(keywords, action.payload.kwdId);
        
        return keywords.kwdId != action.payload;
      });
      state.keywords = data;
    },
    endDropChangeList: (state, action) => {
      if(!action.payload.destination)return ;
      const keywords = [...state.keywords]
      console.log(keywords.map((a)=> current(a)));
      
      const [reorderedItem] = keywords.splice(action.payload.source.index, 1);
      keywords.splice(action.payload.destination.index, 0, reorderedItem);
      
      state.keywords = keywords;
    }
  },
});

export const { addKeyword, removeKeyword, endDropChangeList } = keywordSlice.actions;

export default keywordSlice.reducer;
