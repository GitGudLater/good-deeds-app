import { IJwtState } from '@/models/interfaces/jwt-initial.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const jwtSlice = createSlice({
  name: 'jwt',
  initialState: {
    //jwt: null,
    login: '',
    password: '',
  } as IJwtState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
        state.login = action.payload;
    },
    setPassword (state, action: PayloadAction<string>) {
        state.login = action.payload;
    }
  }
});
export const jwtActions = jwtSlice.actions;
export default jwtSlice.reducer;

