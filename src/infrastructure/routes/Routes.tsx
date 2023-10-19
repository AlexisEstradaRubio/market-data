import React from "react";
import { Routes, Route } from "react-router-dom";
import MarketList from "../ui/views/MarketList";

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
        path="products"
        element={
            <div>
              <h2>second page</h2>
            </div>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
