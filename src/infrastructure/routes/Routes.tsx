import React from "react";
import { Routes, Route } from "react-router-dom";
import MarketList from "../ui/views/MarketList";
import DetailTicket from "../ui/views/DetailTicket";

const PageNotFound: React.FC = () => {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
};


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={ <MarketList />}
      />
      <Route
        path="ticket"
        element={<DetailTicket /> }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
