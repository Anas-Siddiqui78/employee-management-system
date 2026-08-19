import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext";
import Sidebar from "./Components/Sidebar";
import AIChatbot from "./Components/AIChatbot";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import EmployeeList from "./Pages/EmployeeList";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployees from "./Pages/EditEmployees";
import Settings from "./Pages/Settings";
import { isAuthenticated } from "./services/authService";

function AppContent() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };

    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  // Apply dark mode to HTML element ✅
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      {authenticated ? (
        <div className="flex bg-slate-950 dark:bg-white min-h-screen transition-colors duration-300">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployees />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <AIChatbot />
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;