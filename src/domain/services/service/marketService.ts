import { MarketResponse } from "../../models/market";
import { marketRepository } from "../repositories/marketRepository";

export const marketService = {
  getMarket: async (pagination: number, rowsPerPage: number): Promise<MarketResponse> => {
    return await marketRepository.getMarket(pagination, rowsPerPage);
  },
};
