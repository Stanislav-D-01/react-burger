import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.css";
import App from "./components/app/App.jsx";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <body className={styles.body}>
    <App />
  </body>
);

reportWebVitals();
