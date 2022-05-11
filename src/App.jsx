import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import React from "react";
import { AppRouter } from "./routers";
import store from "./redux/store";

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <ToastContainer />
        <AppRouter />
      </Provider>
    </React.Fragment>
  );
};

export default App;
