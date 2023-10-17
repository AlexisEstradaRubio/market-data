import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTokensFromCookies,
  removeTokensFromCookies,
  saveTokensToCookies,
} from "../../infrastructure/cookies/tokenCookies";

interface LoginState {
  isLoggedIn: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>,
    ) => {
      const { access, refresh } = action.payload;
      saveTokensToCookies(access, refresh);
      state.loading = false;
      state.isLoggedIn = true;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      removeTokensFromCookies();
    },
    updateTokenFromCookies: (state) => {
      const { token } = getTokensFromCookies();
      state.isLoggedIn = Boolean(token);
    },
    refreshToken: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>,
    ) => {
      const { access, refresh } = action.payload;
      saveTokensToCookies(access, refresh);
      state.isLoggedIn = true;
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateTokenFromCookies,
  refreshToken,
  fetchStart,
  fetchError,
} = loginSlice.actions;
export default loginSlice.reducer;
