import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../application/store/appStore";
import { useEffect } from "react";
import { RootState } from "../../application/reducers";

import { marketAction } from "./marketActions";

const useMarketActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { markets } = useSelector((state: RootState) => state.market);

  useEffect(() => {
    const handleGetMarket = async () => {
      await dispatch(marketAction());
    };
    handleGetMarket();
  }, [dispatch]);

  return {
    markets,
  };
};

export default useMarketActions;
