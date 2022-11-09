import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { getSubscribeKeywords } from './api';

export type keyword = { kwdId: number; kwdName: string };
interface Initial {
  subScribeKwdList: keyword[];
  banKwdList: keyword[];
}

const initialState: Initial = {
  subScribeKwdList: [],
  banKwdList: [],
};
export const getSubscribeKeywordsRedux = createAsyncThunk(
  'getSubscribeKeywords',
  async () => {
    const data = await getSubscribeKeywords();
    // console.log(data);
    return data;
  }
);

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      const isDuplicate = state.subScribeKwdList.find(
        (keyword) => keyword.kwdId === action.payload.kwdId
      );
      if (!isDuplicate) {
        state.subScribeKwdList.push(action.payload);
      }
    },
    removeKeyword: (state, action) => {
      const data = state.subScribeKwdList.filter((keywords) => {
        console.log(keywords, action.payload.kwdId);

        return keywords.kwdId != action.payload;
      });
      state.subScribeKwdList = data;
    },
    endDropChangeList: (state, action) => {
      if (!action.payload.destination) return;
      const keywords = [...state.subScribeKwdList];
      console.log(keywords.map((a) => current(a)));
      const [reorderedItem] = keywords.splice(action.payload.source.index, 1);
      keywords.splice(action.payload.destination.index, 0, reorderedItem);
      state.subScribeKwdList = keywords;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscribeKeywordsRedux.fulfilled, (state, action) => {
      console.log(action.payload.kwdList);
      state.subScribeKwdList = action.payload.kwdList;
    });
  },
});

export const { addKeyword, removeKeyword, endDropChangeList } =
  keywordSlice.actions;

export default keywordSlice.reducer;
