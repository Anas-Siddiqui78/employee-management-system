import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [autoSave, setAutoSave] = useState(() => {
    const saved = localStorage.getItem("autoSave");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("autoSave", JSON.stringify(autoSave));
  }, [autoSave]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        autoSave,
        setAutoSave,
        notifications,
        setNotifications
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}