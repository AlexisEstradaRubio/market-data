import React from "react";
import { Routes, Route } from "react-router-dom";

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
        element={
          <div>
            <h2>firts page</h2>
          </div>
        }
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
