import apiClient from "../../../infrastructure/api/apiClient";
import { TicketDetailResponse, TicketPriceResponse } from "../../models/ticket";

export const ticketRepository = {
  getTicketDetail: async (ticket: string): Promise<TicketDetailResponse> => {
    const response = await apiClient.get(
      `tickers/${ticket}?access_key=735d8fd65f3fb7ba0495355a5066449c`
    );
    return response.data;
  },
  getTicketPrice: async (
    ticket: string,
    startDate: string,
    endDate: string,
    pagination: number,
    rowsPerPage: number
  ): Promise<TicketPriceResponse> => {
    const response = await apiClient.get(
      `eod?access_key=735d8fd65f3fb7ba0495355a5066449c&symbols=${ticket}&date_from=${startDate}&date_to=${endDate}&offset=${pagination}&limit=${rowsPerPage}`
    );
    return response.data;
  },
};
