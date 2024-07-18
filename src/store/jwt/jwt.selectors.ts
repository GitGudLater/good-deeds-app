import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const jwtState = (state:RootState) => state.jwt;

const selectJwt = createSelector(jwtState, (state) => state.jwt);

const selectLogin = createSelector(jwtState, (state) => state.login);

export const jwtSelectors = {
    selectJwt,
    selectLogin
}