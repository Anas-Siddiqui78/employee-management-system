import { useState, useEffect } from "react";
import { getAllEmployees } from "../services/employeeService";
import { Users, Briefcase, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    averageSalary: 0
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const employees = await getAllEmployees();
      
      if (employees.length === 0) {
        setStats({
          totalEmployees: 0,
          totalDepartments: 0,
          averageSalary: 0
        });
        setLoading(false);
        return;
      }

      const total = employees.length;
      const departments = new Set(employees.map(e => e.department)).size;
      const avgSalary = Math.round(
        employees.reduce((sum, e) => sum + (parseFloat(e.salary) || 0), 0) / total
      );

      setStats({
        totalEmployees: total,
        totalDepartments: departments,
        averageSalary: avgSalary
      });

      setRecentEmployees(employees.slice(-5).reverse());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-slate-950 dark:bg-white">
        <p className="text-white dark:text-slate-950">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-slate-950 dark:from-white via-slate-900 dark:via-slate-50 to-slate-950 dark:to-white min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent dark:text-slate-950 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          Employee Management System
        </h1>
        <p className="text-slate-400 dark:text-slate-600 text-lg">Manage your workforce efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Employees Card */}
        <div className="bg-gradient-to-br from-slate-800 dark:from-blue-50 to-slate-900 dark:to-slate-100 rounded-2xl p-8 border border-slate-700 dark:border-blue-200 shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-300/20 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 dark:text-slate-600 text-sm font-semibold mb-2">TOTAL EMPLOYEES</p>
              <h2 className="text-5xl font-bold text-white dark:text-slate-950">{stats.totalEmployees}</h2>
              <p className="text-green-400 dark:text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={16} /> Active workforce
              </p>
            </div>
            <div className="bg-blue-600/20 dark:bg-blue-100 p-4 rounded-xl">
              <Users className="text-blue-400 dark:text-blue-600" size={40} />
            </div>
          </div>
        </div>

        {/* Departments Card */}
        <div className="bg-gradient-to-br from-slate-800 dark:from-green-50 to-slate-900 dark:to-slate-100 rounded-2xl p-8 border border-slate-700 dark:border-green-200 shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-300/20 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 dark:text-slate-600 text-sm font-semibold mb-2">DEPARTMENTS</p>
              <h2 className="text-5xl font-bold text-white dark:text-slate-950">{stats.totalDepartments}</h2>
              <p className="text-green-400 dark:text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={16} /> Organized teams
              </p>
            </div>
            <div className="bg-green-600/20 dark:bg-green-100 p-4 rounded-xl">
              <Briefcase className="text-green-400 dark:text-green-600" size={40} />
            </div>
          </div>
        </div>

        {/* Average Salary Card */}
        <div className="bg-gradient-to-br from-slate-800 dark:from-yellow-50 to-slate-900 dark:to-slate-100 rounded-2xl p-8 border border-slate-700 dark:border-yellow-200 shadow-2xl hover:shadow-yellow-500/20 dark:hover:shadow-yellow-300/20 hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 dark:text-slate-600 text-sm font-semibold mb-2">AVERAGE SALARY</p>
              <h2 className="text-4xl font-bold text-white dark:text-slate-950">₹{stats.averageSalary.toLocaleString('en-IN')}</h2>
              <p className="text-green-400 dark:text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={16} /> Per employee
              </p>
            </div>
            <div className="bg-yellow-600/20 dark:bg-yellow-100 p-4 rounded-xl">
              <DollarSign className="text-yellow-400 dark:text-yellow-600" size={40} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Joiners */}
      <div className="bg-gradient-to-br from-slate-800 dark:from-slate-100 to-slate-900 dark:to-slate-200 rounded-2xl p-8 border border-slate-700 dark:border-slate-300 shadow-2xl transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white dark:text-slate-950">Recent Joiners</h2>
          <Link to="/employees" className="text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-800 flex items-center gap-2 transition">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        {recentEmployees.length > 0 ? (
          <div className="space-y-4">
            {recentEmployees.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 dark:bg-blue-50 rounded-lg hover:bg-slate-700 dark:hover:bg-blue-100 transition-all border border-slate-600 dark:border-blue-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white dark:text-slate-950 font-semibold">{emp.name}</p>
                    <p className="text-slate-400 dark:text-slate-600 text-sm">{emp.department}</p>
                  </div>
                </div>
                <p className="text-white dark:text-slate-950 font-semibold">
                  ₹{emp.salary.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 dark:text-slate-600 text-center py-8">No employees yet</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;