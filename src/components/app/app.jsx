import AppHeader from "../app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoutSwitch from "../rout-switch/rout-switch.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />

        <RoutSwitch />
      </BrowserRouter>
    </>
  );
}

export default App;
