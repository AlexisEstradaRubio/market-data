import { MarketResponse } from "../../models/market";
import apiClient from "../../../infrastructure/api/apiClient";


export const marketRepository = {
  getMarket: async (pagination: number, rowsPerPage: number): Promise<MarketResponse> => {
    const params = {
      'access_key': '735d8fd65f3fb7ba0495355a5066449c',
      'offset': pagination,
      'limit': rowsPerPage
    }
    const response = await apiClient.get<MarketResponse>("tickers", {params});
    return response.data;
  },
};
