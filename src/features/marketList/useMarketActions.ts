import { useDispatch} from "react-redux";
import { AppDispatch } from "../../application/store/appStore";

import { marketAction } from "./marketActions";

const useMarketActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getMarcket = (pagination: number, rowsPerPage: number) => {
    dispatch(marketAction(pagination, rowsPerPage));
  };

  return {
    getMarcket,
  };
};

export default useMarketActions;
