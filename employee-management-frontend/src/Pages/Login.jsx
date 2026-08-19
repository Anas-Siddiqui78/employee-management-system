import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { loginUser, registerUser, saveToken, saveUserRole } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await loginUser(formData.email, formData.password);
        console.log("LOGIN RESPONSE:", response);

        if (response.token) {
          saveToken(response.token);
          saveUserRole(response.role); // ✅ Save role
          alert("✅ Login Successful!");
          navigate("/");
        } else {
          alert("❌ " + (response.message || "Login failed"));
        }
      } else {
        const response = await registerUser(formData.name, formData.email, formData.password);

        if (response.token) {
          saveToken(response.token);
          saveUserRole(response.role); // ✅ Save role
          alert("✅ Registration Successful!");
          setFormData({ name: "", email: "", password: "" });
          navigate("/");
        } else {
          alert("❌ " + (response.message || "Registration failed"));
        }
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <LogIn size={32} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-400">
            {isLogin ? "Login to manage employees" : "Join our employee management system"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-slate-800 text-white p-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-slate-700"
                } focus:outline-none focus:border-blue-500`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-slate-800 text-white p-3 pl-10 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-slate-700"
                } focus:outline-none focus:border-blue-500`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-slate-800 text-white p-3 pl-10 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-slate-700"
                } focus:outline-none focus:border-blue-500`}
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white py-3 rounded-lg font-semibold transition mt-6"
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "" });
                setErrors({});
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;