/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/reducers";
import useDetailTicketActions from "../../../features/detailTicket/useDetailTicketActions";
import {
  getTokensFromCookies,
  removeTokensFromCookies,
} from "../../cookies/tokenCookies";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Button,
  Paper,
  Container,
  Box,
  Backdrop,
  CircularProgress,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TablePagination,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DetailTicket: React.FC = () => {
  const { token } = getTokensFromCookies();
  const { getTicketDetail, getTicketPrice } = useDetailTicketActions();
  const [ticketPrice, setTickePrice] = React.useState([]);
  const [ticketDetail, setTickeDetail] = React.useState({
    symbol: "",
    name: "",
    stock_exchange: { name: "", acronym: "", country: "" },
  });
  const navigate = useNavigate();

  const [ticketTable] = useState([]);
  const [chartFilter, setChartFilter] = useState("close");
  const [pickerDate, setPickerDate] = useState({
    start: dayjs("2023-09-01"),
    end: dayjs("2023-09-30"),
  });
  const [dataChart, setDataChart] = useState({
    options: {
      chart: {
        id: "priceTicket",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "close",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const { dataDetail, dataPrice, loading, error } = useSelector(
    (state: RootState) => state.ticket
  );
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const dataEstructureResponse = () => {
    ticketPrice.forEach((ticket) => {
      const dateFormat = new Date(ticket.date);

      const formatArray = {
        symbol: ticketDetail.symbol,
        name: ticketDetail.name,
        exchangeName: ticketDetail.stock_exchange.name,
        exchangeAcronym: ticketDetail.stock_exchange.acronym,
        exchangeCountry: ticketDetail.stock_exchange.country,
        openPrice: ticket.open,
        closePrice: ticket.close,
        highPrice: ticket.high,
        lowPrice: ticket.low,
        volume: ticket.volume,
        date: dateFormat.toDateString(),
      };
      return ticketTable.push(formatArray);
    });
  };

  const dateChartFormat = ticketPrice.map((ticket) =>
    dayjs(ticket.date).date()
  );

  const closeChartData = ticketPrice.map((ticket) => ticket.close);
  const openChartData = ticketPrice.map((ticket) => ticket.open);
  const highChartData = ticketPrice.map((ticket) => ticket.high);
  const lowChartData = ticketPrice.map((ticket) => ticket.low);
  const volumeChartData = ticketPrice.map((ticket) => ticket.volume);

  const dataFilters = {
    close: closeChartData,
    open: openChartData,
    high: highChartData,
    low: lowChartData,
    volume: volumeChartData,
  };
  const filterdataChartFormat = dataFilters[chartFilter];

  const filterChartPrice = () => {
    const filterPrice = filterdataChartFormat;
    const data = {
      ...dataChart,
      options: {
        chart: {
          id: dataChart.options.chart.id,
        },
        xaxis: {
          categories: dateChartFormat.sort(),
        },
      },
      series: [
        {
          name: chartFilter,
          data: filterPrice,
        },
      ],
    };
    return setDataChart(data);
  };

  const idTable = Math.random() + 1;
  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (token) {
      getTicketDetail(token);
      getTicketPrice(
        token,
        pickerDate.start.format("YYYY-MM-DD"),
        pickerDate.end.format("YYYY-MM-DD"),
        page,
        rowsPerPage
      );
    }
    setTickePrice(dataPrice.data);
    setTickeDetail(dataDetail);
  }, [token, pickerDate, page, rowsPerPage]);

  useEffect(() => {
    dataEstructureResponse();
  }, [dataEstructureResponse, token]);

  useEffect(() => {
    if (dateChartFormat) {
      filterChartPrice();
    }
  }, [chartFilter, ticketPrice]);

  const handleChangeChart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChartFilter((event.target as HTMLInputElement).value);
  };

  const returnMenu = () => {
    removeTokensFromCookies();
    return navigate("/");
  };
  return (
    <>
      <AppBar position="relative" color={"secondary"}>
        <Toolbar>
          <Button color="inherit" onClick={returnMenu}>
            Regresar
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "background.default",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          {error && <Alert severity="error">{error}</Alert>}
          <div style={{ display: "flex" }}>
            <Chart
              options={dataChart.options}
              series={dataChart.series}
              type="line"
              width="500"
            />
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Value Chart
              </FormLabel>
              <RadioGroup value={chartFilter} onChange={handleChangeChart}>
                <FormControlLabel
                  value="close"
                  control={<Radio />}
                  label="Close Price"
                />
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="Open Price"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High Price"
                />
                <FormControlLabel
                  value="low"
                  control={<Radio />}
                  label="Low Price"
                />
                <FormControlLabel
                  value="volume"
                  control={<Radio />}
                  label="Volume"
                />
              </RadioGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Start date"
                  value={pickerDate.start}
                  onChange={(newValue) =>
                    setPickerDate({ ...pickerDate, start: newValue })
                  }
                />
                <DatePicker
                  label="End date"
                  value={pickerDate.end}
                  onChange={(newValue) =>
                    setPickerDate({ ...pickerDate, end: newValue })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5} />
                  <TableCell
                    colSpan={6}
                    align="center"
                    variant="body"
                    sx={{ fontSize: "28px" }}
                  >
                    Latest end-of-day information
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Ticker symbol</TableCell>
                  <TableCell align="center">Ticker name</TableCell>
                  <TableCell align="center">Stock exchange name</TableCell>
                  <TableCell align="center">Stock exchange acronym</TableCell>
                  <TableCell align="center">Stock exchange country</TableCell>
                  <TableCell align="right">Open price</TableCell>
                  <TableCell align="center">Close price</TableCell>
                  <TableCell align="center">High price</TableCell>
                  <TableCell align="center">Low price</TableCell>
                  <TableCell align="center">Volume</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketTable.length > 1 ? (
                  ticketTable.map((row) => (
                    <TableRow key={idTable}>
                      <TableCell align="center">{row.symbol}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.exchangeName}</TableCell>
                      <TableCell align="center">
                        {row.exchangeAcronym}
                      </TableCell>
                      <TableCell align="center">
                        {row.exchangeCountry}
                      </TableCell>
                      <TableCell align="center">{row.openPrice}</TableCell>
                      <TableCell align="center">{row.closePrice}</TableCell>
                      <TableCell align="center">{row.highPrice}</TableCell>
                      <TableCell align="center">{row.lowPrice}</TableCell>
                      <TableCell align="center">{row.volume}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>un momento</div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={20}
            rowsPerPage={rowsPerPage}
            page={0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default DetailTicket;
