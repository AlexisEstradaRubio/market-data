import { MarketResponse } from "../../models/market";
import apiClient from "../../../infrastructure/api/apiClient";

const params = {
  'access_key': 'c096b0f6ba50b00e4a1eac64f91284b2',
  'offset': '0'
}
export const marketRepository = {
  getMarket: async (): Promise<MarketResponse> => {
    const response = await apiClient.get<MarketResponse>("tickers", {params});
    return response.data;
  },
};
