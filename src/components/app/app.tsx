import AppHeader from "../app-header/app-header";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import RoutSwitch from "../rout-switch/rout-switch";

function App() {
  return (
    <>
      <HashRouter>
        <AppHeader />

        <RoutSwitch />
      </HashRouter>
    </>
  );
}

export default App;
