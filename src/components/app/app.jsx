import AppHeader from "../app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ModalSwitch from "../modal-switch/modal-switch.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />

        <ModalSwitch />
      </BrowserRouter>
    </>
  );
}

export default App;
