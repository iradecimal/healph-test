import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import Dashboard from './pages/dashboard';
import Dailyintakes from "./pages/dailyintakes";
import './App.css';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/" element={< LoginPage />} />
        <Route exact={true} path="/register" element={< RegisterPage />} />
        <Route exact={true} path="/dashboard" element={< Dashboard />} />
        <Route exact={true} path="/dailyintakes" element={< Dailyintakes/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
