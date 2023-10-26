import { AppThunk } from "../../application/store/appStore";
import { marketService } from "../../domain/services/service/marketService";
import {
  fetchSuccess,
  fetchStart,
  fetchError,
} from "../../application/reducers/marketSlice";

export const marketAction = (pagination: number, rowsPerPage: number): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const response = await marketService.getMarket(pagination, rowsPerPage);
    dispatch(fetchSuccess({markets: [response]}));
  } catch (err) {
    dispatch(fetchError(err.response.data.error.message));
  }
};
