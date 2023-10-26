export interface TicketDetail {
  name: string;
  symbol: string;
  has_intraday: string;
  has_eod: string;
  country: null | string;
  stock_exchange: { name: string; acronym: string; country: string };
}

export interface TicketPrice {
  pagination: object;
  data: [
    {
      open: string;
      close: string;
      high: string;
      low: string;
      volume: string;
      date: string;
    },
  ];
}

export type TicketPriceResponse = TicketPrice[];
export type TicketDetailResponse = TicketDetail[];

export interface UpdateTicketResponse {
  result: [];
  status: string;
}

export interface UpdateTicketRequest {
  dateFrom: string;
  dateTo: string;
  ticketSymbol: string;
}
