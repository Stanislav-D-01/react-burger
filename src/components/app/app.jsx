
import HomePage from "../../pages/home-page.jsx";
import AppHeader from "../app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../../pages/login-page.jsx";
import ForgotPassword from "../../pages/forgot-password.jsx";



function App() {
  

  return (
    <>
      <AppHeader />
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<HomePage/>}/> 
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
