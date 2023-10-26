import { TicketDetail, TicketPrice } from "../../domain/models/ticket";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TicketState {
  dataDetail: TicketDetail;
  dataPrice: TicketPrice;
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  dataDetail: {
    name: "",
    symbol: "",
    has_intraday: "",
    has_eod: "",
    country: "",
    stock_exchange: { name: "", acronym: "", country: ""}

  },
  dataPrice: {
    pagination: [],
    data: [{
      open: '',
      close: '',
      high: '',
      low: '',
      volume: '',
      date: '',
    }]
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccessDetail: (state, action) => {
      state.loading = false;
      state.dataDetail = action.payload;
    },
    fetchSuccessPrice: (state, action) => {
      state.loading = false;
      state.dataPrice = action.payload;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccessDetail, fetchSuccessPrice, fetchError } =
  productSlice.actions;

export default productSlice.reducer;
