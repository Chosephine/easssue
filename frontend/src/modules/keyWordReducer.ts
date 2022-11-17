import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { getSubscribeKeywords, getBanKeywords } from './api';

export type keyword = { kwdId: number; kwdName: string };
interface Initial {
  subScribeKwdList: keyword[];
  banKwdList: keyword[];
  subKeyLength : number;
}

const initialState: Initial = {
  subScribeKwdList: [],
  banKwdList: [],
  subKeyLength : 0
};
export const getSubscribeKeywordsRedux = createAsyncThunk(
  'getSubscribeKeywords',
  async () => {
    const data = await getSubscribeKeywords();
    return data;
  }
);
export const getBanKeywordsRedux = createAsyncThunk(
  'getBanKeywords',
  async () => {
    const data = await getBanKeywords();
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
      const isFull = state.subKeyLength === 15 ? true : false;
      if (!isDuplicate && !isFull) {
        state.subScribeKwdList.push(action.payload);
        state.subKeyLength = state.subKeyLength + 1;
      }
      if(isFull){
        alert('키워드는 15개 까지 등록 가능해요 !!')
      }
    },
    addBanKeyword: (state, action) => {
      const isDuplicate = state.banKwdList.find(
        (keyword) => keyword.kwdId === action.payload.kwdId
      );
      if (!isDuplicate) {
          state.banKwdList.push(action.payload);
      }
    },
    removeKeyword: (state, action) => {
      const data = state.subScribeKwdList.filter((keyword) => {

        return keyword.kwdId != action.payload;
      });
      state.subScribeKwdList = data;
      state.subKeyLength = state.subKeyLength - 1;
    },
    removeBanKeyword: (state, action) => {
      const data = state.banKwdList.filter((keyword) => {
        return keyword.kwdId != action.payload;
      });
      state.banKwdList = data;
    },
    endDropChangeList: (state, action) => {
      if (!action.payload.destination) return;
      const keywords = [...state.subScribeKwdList];
      const [reorderedItem] = keywords.splice(action.payload.source.index, 1);
      keywords.splice(action.payload.destination.index, 0, reorderedItem);
      state.subScribeKwdList = keywords;
    },
    endDropChangeBanList: (state, action) => {
      if (!action.payload.destination) return;
      const keywords = [...state.banKwdList];
      const [reorderedItem] = keywords.splice(action.payload.source.index, 1);
      keywords.splice(action.payload.destination.index, 0, reorderedItem);
      state.banKwdList = keywords;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscribeKeywordsRedux.fulfilled, (state, action) => {
      state.subScribeKwdList = action.payload.kwdList;
      const keyLength = action.payload.kwdList.length;
      state.subKeyLength = keyLength;
    });
  },
});

export const {
  addKeyword,
  addBanKeyword,
  removeKeyword,
  removeBanKeyword,
  endDropChangeList,
} = keywordSlice.actions;

export default keywordSlice.reducer;
