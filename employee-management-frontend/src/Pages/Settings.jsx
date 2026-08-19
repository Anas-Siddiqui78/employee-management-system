import { useContext } from "react";
import { Settings as SettingsIcon, Moon, Save, Bell } from "lucide-react";
import { ThemeContext } from "../contexts/ThemeContext";

function Settings() {
  const { darkMode, setDarkMode, autoSave, setAutoSave, notifications, setNotifications } = useContext(ThemeContext);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleAutoSaveToggle = () => {
    setAutoSave(!autoSave);
    if (!autoSave) {
      // Show notification when enabling
      alert("✅ Auto-save enabled! Your changes will be saved automatically.");
    }
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    if (!notifications) {
      alert("✅ Notifications enabled! You'll receive updates.");
    }
  };

  return (
    <div className="flex-1 p-8 bg-slate-950 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="text-blue-500" size={32} />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Main Settings Card */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Application Settings</h2>

        <div className="space-y-6">
          {/* Dark Mode Setting */}
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition">
            <div className="flex items-center gap-3">
              <Moon className="text-yellow-400" size={24} />
              <div>
                <p className="text-white font-semibold">Dark Mode</p>
                <p className="text-slate-400 text-sm">Switch between light and dark theme</p>
              </div>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`relative w-14 h-8 rounded-full transition-all ${
                darkMode ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Auto-Save Setting */}
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition">
            <div className="flex items-center gap-3">
              <Save className="text-green-400" size={24} />
              <div>
                <p className="text-white font-semibold">Auto-Save</p>
                <p className="text-slate-400 text-sm">Automatically save changes while editing</p>
              </div>
            </div>
            <button
              onClick={handleAutoSaveToggle}
              className={`relative w-14 h-8 rounded-full transition-all ${
                autoSave ? "bg-green-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  autoSave ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Notifications Setting */}
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition">
            <div className="flex items-center gap-3">
              <Bell className="text-red-400" size={24} />
              <div>
                <p className="text-white font-semibold">Notifications</p>
                <p className="text-slate-400 text-sm">Receive updates and alerts</p>
              </div>
            </div>
            <button
              onClick={handleNotificationsToggle}
              className={`relative w-14 h-8 rounded-full transition-all ${
                notifications ? "bg-red-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-4">Current Settings:</p>
          <div className="space-y-2 text-sm">
            <p className="text-slate-300">
              🌙 Dark Mode: <span className="text-blue-400 font-semibold">{darkMode ? "ON" : "OFF"}</span>
            </p>
            <p className="text-slate-300">
              💾 Auto-Save: <span className="text-green-400 font-semibold">{autoSave ? "ON" : "OFF"}</span>
            </p>
            <p className="text-slate-300">
              🔔 Notifications: <span className="text-red-400 font-semibold">{notifications ? "ON" : "OFF"}</span>
            </p>
          </div>
        </div>

        {/* Info Message */}
        <div className="mt-6 p-4 bg-blue-600/10 border border-blue-500 rounded-lg">
          <p className="text-blue-300 text-sm">
            ℹ️ Settings are automatically saved to your browser and will persist across sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;