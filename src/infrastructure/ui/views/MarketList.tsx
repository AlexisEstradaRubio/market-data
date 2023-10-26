/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/reducers";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Container,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import useStoreActions from "../../../features/marketList/useMarketActions";
import {
  saveTokensToCookies,
} from "../../cookies/tokenCookies";

const MarketList: React.FC = () => {
  const navigate = useNavigate();
  const { getMarcket } = useStoreActions();
  const { markets, error, loading } = useSelector(
    (state: RootState) => state.market
  );
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const detailTicket = (ticket) => {
    saveTokensToCookies(ticket, ticket);
    return navigate("/ticket");
  };
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getMarcket(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.default",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          {error && <Alert severity="error">{error}</Alert>}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Ticker symbol</TableCell>
                  <TableCell align="center">Ticker name</TableCell>
                  <TableCell align="center">Stock exchange acronym</TableCell>
                  <TableCell align="center">Stock exchange country</TableCell>
                  <TableCell align="center">Detail Ticket</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {markets.data.map((row: any) => (
                  <TableRow key={row.symbol}>
                    <TableCell align="center">{row.symbol}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {row.stock_exchange.acronym}
                    </TableCell>
                    <TableCell align="center">
                      {row.stock_exchange.country}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => detailTicket(row.symbol)}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={markets.pagination.total}
            rowsPerPage={rowsPerPage}
            page={markets.pagination.offset}
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

export default MarketList;
