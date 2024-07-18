import { bl } from "@/BL/bl";
import { dal } from "@/dal/dal";
import { ProfileDTO } from "@/models/interfaces/profile.dto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfileInfoFromJwt = createAsyncThunk<ProfileDTO, string>(
  'jwt/fetchJwtFromLocalStorage',
  async(token) => {
      return await dal.fetchProfile(token);
  }
);