import { createSlice } from "@reduxjs/toolkit";

export type USER_DATA = {
  displayName: string;
  email: string;
  phoneNumber?: number;
  photoURL?: string;
  providerId: string;
  uid: string;
};

const INITIAL_STATE = null as USER_DATA | null;

const slice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    login: (_user, action) => action.payload.user,
    logout: () => null,
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
