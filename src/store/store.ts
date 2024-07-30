import { configureStore } from "@reduxjs/toolkit";
import jwtReduser from "./jwt/jwt.slice";

export const store = configureStore({
    reducer: {
      jwt: jwtReduser
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

  /*export type AppStore = ReturnType<typeof store>
  export type RootState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch']*/