import { ticketRepository } from "../repositories/ticketRepository";
import {
  TicketPriceResponse,
  TicketDetailResponse,
} from "../../models/ticket";

export const ticketService = {
  getTicketDetail: async (ticket:string): Promise<TicketDetailResponse> => {
    return await ticketRepository.getTicketDetail(ticket);
  },
  getTicketPrice: async (ticket:string): Promise<TicketPriceResponse> => {
    return await ticketRepository.getTicketPrice(ticket);
  },
};
