import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';

interface Initial {
  token : string;
  isLogin : boolean;
}

const initialState = {
  token : '',
  isLogin : false,
}

export const authSlice = createSlice({
  name : 'auth',
  initialState,
  reducers:{

  }
})


export default authSlice.reducer;