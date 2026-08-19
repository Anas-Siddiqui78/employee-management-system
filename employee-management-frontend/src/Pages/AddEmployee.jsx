import { useState } from "react";
import { UserPlus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/employeeService";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces (no numbers or special characters)";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateDepartment = (department) => {
    if (!department.trim()) {
      return "Department is required";
    }
    if (department.trim().length < 2) {
      return "Department must be at least 2 characters";
    }
    return "";
  };

  const validateSalary = (salary) => {
    if (!salary) {
      return "Salary is required";
    }
    if (salary <= 0) {
      return "Salary must be greater than 0";
    }
    if (salary > 10000000) {
      return "Salary seems unrealistic (max 1 crore)";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for name - prevent numbers
    if (name === "name") {
      // Remove numbers and special characters in real-time
      const cleanedValue = value.replace(/[0-9!@#$%^&*()_+=\-[\]{};:'",.<>?/\\|`~]/g, "");
      setEmployee({
        ...employee,
        [name]: cleanedValue
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.name = validateName(employee.name);
    newErrors.email = validateEmail(employee.email);
    newErrors.department = validateDepartment(employee.department);
    newErrors.salary = validateSalary(employee.salary);

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      alert("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      await createEmployee({
        name: employee.name.trim(),
        email: employee.email.trim(),
        department: employee.department.trim(),
        salary: parseFloat(employee.salary)
      });

      alert("✅ Employee Added Successfully!");
      navigate("/");
    } catch (error) {
      alert("❌ Error: " + (error.message || "Failed to add employee"));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center bg-slate-950 p-6 min-h-screen">
      <div className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-3 rounded-xl">
            <UserPlus size={24} color="white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Add Employee
            </h1>

            <p className="text-slate-400">
              Create a new employee record (ID auto-generated)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name Field */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., John Doe"
              value={employee.name}
              onChange={handleChange}
              className={`w-full bg-slate-800 text-white p-4 rounded-xl border ${
                errors.name ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.name && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g., john@example.com"
              value={employee.email}
              onChange={handleChange}
              className={`w-full bg-slate-800 text-white p-4 rounded-xl border ${
                errors.email ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.email && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Department Field */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Department *
            </label>
            <input
              type="text"
              name="department"
              placeholder="e.g., Engineering, Sales, HR"
              value={employee.department}
              onChange={handleChange}
              className={`w-full bg-slate-800 text-white p-4 rounded-xl border ${
                errors.department ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.department && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errors.department}
              </div>
            )}
          </div>

          {/* Salary Field */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Annual Salary (₹) *
            </label>
            <input
              type="number"
              name="salary"
              placeholder="e.g., 500000"
              value={employee.salary}
              onChange={handleChange}
              className={`w-full bg-slate-800 text-white p-4 rounded-xl border ${
                errors.salary ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.salary && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errors.salary}
              </div>
            )}
          </div>

          {/* Note about Employee ID */}
          <div className="bg-blue-600/10 border border-blue-500 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              ℹ️ <strong>Employee ID</strong> will be automatically generated by the system when you save.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Saving..." : "Save Employee"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddEmployee;