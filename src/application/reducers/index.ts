import { combineReducers } from "@reduxjs/toolkit";
import marketReducer from "./marketSlice";
import ticketReducer from "./ticketSlice";

const rootReducer = combineReducers({
  market: marketReducer,
  ticket: ticketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
