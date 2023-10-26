import { AppDispatch } from "../../application/store/appStore";
import { useDispatch } from "react-redux";
import { ticketDetailActions, ticketPriceActions } from "./detailTicketActions";

const useDetailTicketActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getTicketDetail = (ticket: string) => {
    dispatch(ticketDetailActions(ticket));
  };
  const getTicketPrice = (ticket: string) => {
    dispatch(ticketPriceActions(ticket));
  };

  return {
    getTicketDetail,
    getTicketPrice,
  };
};

export default useDetailTicketActions;
