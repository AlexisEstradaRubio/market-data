/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
} from "@mui/material";

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

  const [ticketTable] = React.useState([]);
  const [chartFilter, setChartFilter] = React.useState("close");
  const [dataChart, setDataChart] = React.useState({
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
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const { dataDetail, dataPrice, loading, error } = useSelector(
    (state: RootState) => state.ticket
  );

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

  const dateChartFormat = ticketPrice.map((ticket) => new Date(ticket.date).getDate()).sort();

  const closeChartData = ticketPrice.map((ticket) => ticket.close);
  const openChartData = ticketPrice.map((ticket) => ticket.open);
  const highChartData = ticketPrice.map((ticket) => ticket.high);
  const lowChartData = ticketPrice.map((ticket) => ticket.low);
  const volumeChartData = ticketPrice.map((ticket) => ticket.volume);
  

  const dataFacke = { 
    close: closeChartData,
    open: openChartData, 
    high: highChartData, 
    low: lowChartData, 
    volume: volumeChartData, 
  }
  const filterdataChartFormat = dataFacke[chartFilter];


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


  useEffect(() => {
    if (token) {
      getTicketDetail(token);
      getTicketPrice(token);
    }
    setTickePrice(dataPrice.data);
    setTickeDetail(dataDetail);
  }, [token]);

  useEffect(() => {
    dataEstructureResponse();
  }, [dataEstructureResponse, token]);

  useEffect(() => {
    if (dateChartFormat) {
      filterChartPrice()
    }
  }, [chartFilter,ticketPrice]);

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
