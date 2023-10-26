import apiClient from "../../../infrastructure/api/apiClient";
import {
  TicketDetailResponse,
  TicketPriceResponse,
} from "../../models/ticket";


export const ticketRepository = {
  getTicketDetail: async (ticket:string): Promise<TicketDetailResponse> => {
    const response = await apiClient.get(`tickers/${ticket}?access_key=735d8fd65f3fb7ba0495355a5066449c`);
    return response.data;
  },
  getTicketPrice: async (ticket:string): Promise<TicketPriceResponse> => {
    const response = await apiClient.get(`eod?access_key=735d8fd65f3fb7ba0495355a5066449c&symbols=${ticket}&date_from=2023-09-01&date_to=2023-09-30`);
    return response.data;
  },
};
