import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { isElectron } from "definition";

import App from "./App";
import { TitleBar } from "title-bar";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

if (isElectron) {
  ReactDOM.render(<TitleBar />, document.getElementById("title-bar"));
}
