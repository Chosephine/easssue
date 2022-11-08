import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import { login, BASE_URL } from './api';
import axios from 'axios';
type backToken = {
  accessToken : string,
  refreshToken : string
}
interface Initial {
  token: backToken;
  isLogin: boolean;
}

const initialState : Initial = {
  token: {
    accessToken : '',
    refreshToken : ''
  },
  isLogin: false,
};

export const loginAuthToken = createAsyncThunk('login', async () => {
  return new Promise<backToken>(function(resolve, reject) {
    chrome.identity.getAuthToken(
      { interactive: true }
      ,async (googleToken) => {
        try {
          console.log('Token :', googleToken);
          const { data } = await axios({
            url: BASE_URL + '/user/login',
            method: 'POST',
            data: {
              googleToken: googleToken,
            },
          });
          console.log(data);
          resolve(data)
        } catch (error) {
          console.error('loginError : ', error);
        }
      }
    );
});
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAuthToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isLogin = true;
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.accessToken}`;

    });
  },
});

export default authSlice.reducer;
