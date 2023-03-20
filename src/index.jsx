import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppHeader from "./components/app-header/app-header.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <body className={styles.body}>
    <AppHeader />
  </body>
);

reportWebVitals();
