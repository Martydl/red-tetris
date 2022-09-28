import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers/RootReducer";
import { Provider } from "react-redux";

let store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
