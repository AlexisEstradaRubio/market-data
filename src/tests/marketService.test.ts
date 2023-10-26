import { marketService } from "../domain/services/service/marketService";
import { marketRepository } from "../domain/services/repositories/marketRepository";
import { MarketResponse } from "../domain/models/market";

jest.mock("../domain/services/repositories/marketRepository");

describe("marketService", () => {
  const mockMarketResponse: MarketResponse = {
    pagination: {
      limit: 25,
      offset: 0,
      count: 25,
      total: 287197,
    },
    data: [],
  };

  beforeEach(() => {
    (marketRepository.getMarket as jest.Mock).mockResolvedValue(
      mockMarketResponse
    );
  });

  it("should call the getStores method from marketRepository", async () => {
    const result = await marketService.getMarket(0, 25);
    expect(marketRepository.getMarket).toHaveBeenCalled();
    expect(result).toEqual(mockMarketResponse);
  });
});
