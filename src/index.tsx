import { render } from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";

import Main from "./demo2/Main";
import Popover from "./popover/Popover";
import App from "./popover/app";
import { createStore } from "redux";
import counterApp from "./redux/reducers";

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("app")
);
