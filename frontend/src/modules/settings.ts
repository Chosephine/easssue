import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';

interface Initial {
  trendState : boolean;
}

const initialState : Initial = {
  trendState : true
}

export const settingReducer = createSlice({
  name : 'settings',
  initialState,
  reducers : {
    toggleTrend : (state, action) =>{
      state.trendState = !state.trendState;
    }
  }
})

export const {toggleTrend} = settingReducer.actions
export default settingReducer.reducer;