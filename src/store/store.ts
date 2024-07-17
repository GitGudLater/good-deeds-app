import { configureStore } from "@reduxjs/toolkit";
import jwtReduser from "./jwt/jwt.slice";

export const store = () => {return configureStore({
    reducer: {
      jwt: jwtReduser
    }
  });
}

  export type AppStore = ReturnType<typeof store>
  export type RootState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch']