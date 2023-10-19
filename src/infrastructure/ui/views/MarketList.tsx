/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/reducers";

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
  CircularProgress
} from "@mui/material";
import useStoreActions from "../../../features/marketList/useMarketActions";

const MarketList: React.FC = () => {
  const { markets } = useStoreActions();
  const { error, loading } = useSelector((state: RootState) => state.market);


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
                <TableRow
                  key={row.symbol}
                >
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
                      onClick={() => console.log(row.symbol)}
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
          rowsPerPage={100}
          page={markets.pagination.offset}
          onPageChange={() => console.log("pag")}
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
