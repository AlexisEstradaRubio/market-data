import {
  ProductsResponse,
} from "../../domain/models/tiket";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  data: ProductsResponse;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } =
  productSlice.actions;

export default productSlice.reducer;
