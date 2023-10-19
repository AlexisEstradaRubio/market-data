import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const Main: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  );
};

export default Main;
