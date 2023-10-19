import { MarketResponse } from "../../models/market";
import { marketRepository } from "../repositories/marketRepository";

export const marketService = {
  getMarket: async (): Promise<MarketResponse> => {
    return await marketRepository.getMarket();
  },
};
