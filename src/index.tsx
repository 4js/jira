// import './wdyr';

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProvider } from "context";
import { store } from "store/index";
import { Provider } from "react-redux";
// import "antd/dist/reset.css";
// 务必在jira-dev-tool后面引入
import "antd/dist/antd.less";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadServer(() => {
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
        <DevTools />
      </AppProvider>
    </Provider>
    // </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
