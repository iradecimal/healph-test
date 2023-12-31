import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/loginpage";
import LandingPage from "./pages/landingpage";
import RegisterPage from "./pages/registerpage";
import Dashboard from "./pages/dashboard";
import Dailyintakes from "./pages/dailyintakes";
import MealViewer from "./pages/mealviewer";
import ReportsPage from "./pages/reportspage";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<LandingPage />} />
          <Route exact={true} path="/register" element={<RegisterPage />} />
          <Route exact={true} path="/dashboard" element={<Dashboard />} />
          <Route exact={true} path="/dailyintakes" element={<Dailyintakes />} />
          <Route exact={true} path="/mealviewer" element={<MealViewer />} />
          <Route exact={true} path="/reports" element={<ReportsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
