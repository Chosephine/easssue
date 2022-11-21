import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import { login,  signUp, jwtCheck } from './api';
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

export const userStateCheck = createAsyncThunk('jwtCheck', async ()=>{
  const data = await jwtCheck();
  // console.log("redux jwt",data);
  return data;
})

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
      window.location.reload()
    })
    .addCase(signUpAndSetToken.fulfilled, (state,action)=>{
      state.token = action.payload;
      state.isLogin = action.payload.status;
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.accessToken}`;
    })
    .addCase(userStateCheck.fulfilled, (state,action)=>{
      
      if (!action.payload) {
        state.isLogin = false;
        state.token = {
          status : false,
          accessToken : '',
          refreshToken : ''
        }
      }else{
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${state.token.accessToken}`;
      }
      // return action.payload;
    })
  },
});

export default authSlice.reducer;
