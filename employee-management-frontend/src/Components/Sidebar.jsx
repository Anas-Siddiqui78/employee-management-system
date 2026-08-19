import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout, isAdmin } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();
  const userIsAdmin = isAdmin();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      logout();
      navigate("/login");
    }, 3000);
  };

  return (
    <>
      {/* Logout Loading Overlay */}
      {loggingOut && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-xl text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-white text-xl font-bold">
              Logging Out...
            </h2>
            <p className="text-slate-400 mt-2">
              Please wait a moment
            </p>
          </div>
        </div>
      )}

      <div className="w-64 bg-slate-900 dark:bg-slate-100 border-r border-slate-800 dark:border-slate-300 p-6 min-h-screen flex flex-col transition-colors duration-300">
        <h1 className="text-2xl font-bold text-white dark:text-slate-950 mb-8">
          EMS
        </h1>

        <nav className="space-y-2 flex-1">
          <Link to="/" className="block">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-950 transition">
              <LayoutDashboard size={20} />
              Dashboard
            </div>
          </Link>

          <Link to="/employees" className="block">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-950 transition">
              <Users size={20} />
              Employees
            </div>
          </Link>

          {userIsAdmin && (
            <Link to="/add-employee" className="block">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-950 transition">
                <UserPlus size={20} />
                Add Employee
              </div>
            </Link>
          )}

          <Link to="/settings" className="block">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-950 transition">
              <Settings size={20} />
              Settings
            </div>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white transition font-semibold disabled:opacity-50"
        >
          <LogOut size={20} />
          {loggingOut ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </>
  );
}

export default Sidebar;