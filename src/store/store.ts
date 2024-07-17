import { configureStore } from "@reduxjs/toolkit";
import jwtReduser from "./jwt/jwt.slice";

export default configureStore({
    reducer: {
      jwt: jwtReduser
    }
  });