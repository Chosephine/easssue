import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import { login,  signUp } from './api';
import axios from 'axios';
import { LoginReq } from '@/components/user/Login';
type loginResponse = {
  status : boolean,
  accessToken : string,
  refreshToken : string
}
interface Initial {
  token: loginResponse;
  isLogin: boolean;
}

const initialState : Initial = {
  token: {
    status : false,
    accessToken : '',
    refreshToken : ''
  },
  isLogin: false,
};

export const loginAndSetToken = createAsyncThunk<loginResponse,LoginReq>('login', async (loginReq) => {
  const { email , pwd } = loginReq;
  const data = await login(email, pwd);
  return data;
});
export const signUpAndSetToken = createAsyncThunk<loginResponse,LoginReq>('signup', async (signUpReq) => {
  const { email , pwd } = signUpReq;
  const data = await signUp(email, pwd);
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAndSetToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isLogin = action.payload.status;
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.accessToken}`;
    })
    .addCase(signUpAndSetToken.fulfilled, (state,action)=>{
      state.token = action.payload;
      state.isLogin = action.payload.status;
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.accessToken}`;
    })
  },
});

export default authSlice.reducer;
