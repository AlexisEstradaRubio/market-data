import React from "react";
import { Provider } from "react-redux";
import appStore from "./application/store/appStore";
import Main from "./infrastructure/main";

const App: React.FC = () => {
  return (
    <Provider store={appStore}>
      <Main />
    </Provider>
  );
};

export default App;
