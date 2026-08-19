import { useState, useEffect } from "react";
import { Trash2, Edit2, Search, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getAllEmployees,
  searchEmployeeByName,
  deleteEmployee
} from "../services/employeeService";
import { isAdmin } from "../services/authService";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const navigate = useNavigate();
  const userIsAdmin = isAdmin();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);

    // if (value.trim() === "") {
    //   setFilteredEmployees(employees);
    // } else {
    //   try {
    //     const results = await searchEmployeeByName(value);
    //     setFilteredEmployees(results);
    //   } catch (error) {
    //     console.error("Error searching:", error);
    //   }
    // }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        alert("Employee deleted successfully!");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete employee");
      }
    }
  };


  useEffect(() => {
  let updated = [...employees];

  if (searchTerm.trim() !== "") {
    updated = updated.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (departmentFilter !== "") {
    updated = updated.filter(
      (emp) => emp.department === departmentFilter
    );
  }

switch (sortBy) {
  case "salaryAsc":
  updated.sort((a, b) => Number(a.salary) - Number(b.salary));
  break;

case "salaryDesc":
  updated.sort((a, b) => Number(b.salary) - Number(a.salary));
  break;

  case "nameAsc":
    updated.sort((a, b) => a.name.localeCompare(b.name));
    break;

  case "nameDesc":
    updated.sort((a, b) => b.name.localeCompare(a.name));
    break;

  default:
    break;
}
  setFilteredEmployees(updated);
}, [employees, searchTerm, departmentFilter, sortBy]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p className="text-white dark:text-slate-950 p-8">Loading...</p>;
  }

  return (
    <div className="flex-1 p-8 bg-slate-950 dark:bg-white min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white dark:text-slate-950">Employees</h1>
        {/* Role Badge */}
        <div className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
          userIsAdmin 
            ? "bg-red-600/20 dark:bg-red-100 border border-red-600 dark:border-red-400 text-red-400 dark:text-red-700" 
            : "bg-blue-600/20 dark:bg-blue-100 border border-blue-600 dark:border-blue-400 text-blue-400 dark:text-blue-700"
        }`}>
          {userIsAdmin ? (
            <>
              👑 Admin
            </>
          ) : (
            <>
              <Lock size={16} /> Viewer Only
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
     <div className="mb-6 flex gap-3 flex-wrap">

  <div className="flex-1 relative min-w-[250px]">
    <Search className="absolute left-3 top-3 text-slate-400" size={20} />
    <input
      type="text"
      placeholder="Search employee by name..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full bg-slate-800 dark:bg-white text-white dark:text-black p-3 pl-10 rounded-lg border border-slate-700"
    />
  </div>

  <select
    value={departmentFilter}
    onChange={(e) => {
      setDepartmentFilter(e.target.value);
      setCurrentPage(1);
    }}
    className="bg-slate-800 dark:bg-white text-white dark:text-black p-3 rounded-lg border border-slate-700"
  >
    <option value="">All Departments</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="Java Developer">Java Developer</option>
    <option value="Frontend Developer">Frontend Developer</option>
    
    
  </select>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="bg-slate-800 dark:bg-white text-white dark:text-black p-3 rounded-lg border border-slate-700"
  >
    <option value="">Sort By</option>
    <option value="salaryAsc">Salary Low → High</option>
    <option value="salaryDesc">Salary High → Low</option>
    <option value="nameAsc">Name A → Z</option>
    <option value="nameDesc">Name Z → A</option>
  </select>

</div>

      {/* Employees Table */}
      {currentEmployees.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-slate-900 dark:bg-slate-100 rounded-lg border border-slate-800 dark:border-slate-300 mb-6 transition-colors">
            <table className="w-full text-white dark:text-slate-950">
              <thead className="bg-slate-800 dark:bg-slate-200 border-b border-slate-700 dark:border-slate-300">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Salary</th>
                  {userIsAdmin && <th className="p-4 text-left">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-slate-700 dark:border-slate-300 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                  >
                    <td className="p-4">{emp.name}</td>
                    <td className="p-4">{emp.email}</td>
                    <td className="p-4">{emp.department}</td>
                    <td className="p-4">₹{emp.salary.toLocaleString('en-IN')}</td>
                    {userIsAdmin && (
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => navigate(`/edit/${emp.id}`)}
                          className="text-blue-400 dark:text-blue-600 hover:text-blue-600 dark:hover:text-blue-800 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="text-red-400 dark:text-red-600 hover:text-red-600 dark:hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between bg-slate-900 dark:bg-slate-100 rounded-lg border border-slate-800 dark:border-slate-300 p-4 transition-colors">
            <div className="text-slate-400 dark:text-slate-600">
              Page <span className="text-white dark:text-slate-950 font-bold">{currentPage}</span> of{" "}
              <span className="text-white dark:text-slate-950 font-bold">{totalPages}</span> | Showing{" "}
              <span className="text-white dark:text-slate-950 font-bold">{currentEmployees.length}</span> of{" "}
              <span className="text-white dark:text-slate-950 font-bold">{filteredEmployees.length}</span> employees
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-600 dark:disabled:bg-slate-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition font-semibold"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-600 dark:disabled:bg-slate-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition font-semibold"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-slate-400 dark:text-slate-600 text-center py-12">
          {searchTerm ? "No employees found" : "No employees yet"}
        </p>
      )}
    </div>
  );
}

export default EmployeeList;