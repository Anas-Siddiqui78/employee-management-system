import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { Edit2 } from "lucide-react";

function EditEmployees() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const data = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      alert("Failed to load employee");
      navigate("/employees");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEmployee(id, employee);
      alert("Employee Updated Successfully!");
      navigate("/employees");
    } catch (error) {
      alert("Error updating employee: " + error.message);
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-slate-950">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-slate-950 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-3 rounded-xl">
            <Edit2 size={24} color="white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Edit Employee
            </h1>

            <p className="text-slate-400">
              Update employee information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none"
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={employee.department}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none"
            required
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Update Employee
            </button>

            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-semibold transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditEmployees;