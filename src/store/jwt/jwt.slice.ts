import { IJwtState } from '@/models/interfaces/jwt-initial.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  fetchProfileInfoFromJwt } from './jwt.thunk';
import { ProfileDTO } from '@/models/interfaces/profile.dto';
import { bl } from '@/BL/bl';
const jwtSlice = createSlice({
  name: 'jwt',
  initialState: {
    jwt: null,
    login: '',
    loadingStatus: 'idle'
  } as IJwtState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
        state.login = action.payload;
    },
    setJwt (state, action: PayloadAction<string | null>) {
        state.jwt = action.payload;
    },
    clearProfile (state) {
        state.jwt = null;
        state.login = '';
        bl.clearLocalStorageJwt();
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProfileInfoFromJwt.rejected, (state) => {
      state.loadingStatus = 'rejected';
      console.log('rejected request');
    })
    .addCase(fetchProfileInfoFromJwt.pending, (state) => {
      console.log('pending');
      state.loadingStatus = 'pending';
    })
    .addCase(fetchProfileInfoFromJwt.fulfilled, (state, action: PayloadAction<ProfileDTO>) => {
      state.loadingStatus = 'fullfilled';
        state.login = action.payload.login;
    })
  }
});
export const jwtActions = jwtSlice.actions;
export default jwtSlice.reducer;

