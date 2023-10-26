import { AppThunk } from "../../application/store/appStore";
import { ticketService } from "../../domain/services/service/ticketService";
import {
  fetchError,
  fetchStart,
  fetchSuccessPrice,
  fetchSuccessDetail,
  // updateAvailability,
} from "../../application/reducers/ticketSlice";

export const ticketDetailActions =
  (ticket: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = await ticketService.getTicketDetail(ticket);
      dispatch(fetchSuccessDetail(response));
    } catch (err) {
      dispatch(fetchError(err.response.data.error.message));
    }
  };
export const ticketPriceActions =
  (
    ticket: string,
    startDate: string,
    endDate: string,
    pagination: number,
    rowsPerPage: number
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchStart());
      const response = await ticketService.getTicketPrice(
        ticket,
        startDate,
        endDate,
        pagination,
        rowsPerPage
      );
      dispatch(fetchSuccessPrice(response));
    } catch (err) {
      dispatch(fetchError(err.response.data.error.message));
    }
  };
