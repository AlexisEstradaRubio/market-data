import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarketResponse } from "../../domain/models/market";

interface MarketState {
  markets: MarketResponse;
  loading?: boolean;
  error?: string | null;
}

const initialState: MarketState = {
  markets: {
    pagination: {
      limit: 0,
      offset: 0,
      count: 0,
      total: 0
    },
    data:[],

  },
  loading: false,
  error: null,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.markets = action.payload.markets[0];
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSuccess, fetchStart, fetchError } = marketSlice.actions;

export default marketSlice.reducer;
