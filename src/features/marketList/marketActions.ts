import { AppThunk } from "../../application/store/appStore";
import { marketService } from "../../domain/services/service/marketService";
import {
  fetchSuccess,
  fetchStart,
  fetchError,
} from "../../application/reducers/marketSlice";

export const marketAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const response = await marketService.getMarket();
    dispatch(fetchSuccess({markets: [response]}));
  } catch (err) {
    dispatch(fetchError(err.response.data.error.message));
  }
};
