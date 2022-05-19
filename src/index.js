import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./app/store";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
