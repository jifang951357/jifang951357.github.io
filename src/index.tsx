import { render } from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import App from "./containers/App";
import { createStore } from "redux";
import counterApp from "./redux/reducers";

const store = createStore(
  counterApp,
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
