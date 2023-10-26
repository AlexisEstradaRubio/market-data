import { AppDispatch } from "../../application/store/appStore";
import { useDispatch } from "react-redux";
import { ticketDetailActions, ticketPriceActions } from "./detailTicketActions";

const useDetailTicketActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getTicketDetail = (ticket: string) => {
    dispatch(ticketDetailActions(ticket));
  };
  const getTicketPrice = (
    ticket: string,
    startDate: string,
    endDate: string,
    pagination: number,
    rowsPerPage: number
  ) => {
    dispatch(
      ticketPriceActions(ticket, startDate, endDate, pagination, rowsPerPage)
    );
  };

  return {
    getTicketDetail,
    getTicketPrice,
  };
};

export default useDetailTicketActions;
