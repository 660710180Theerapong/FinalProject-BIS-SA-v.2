import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return form.email.trim() !== "" && form.password.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid()) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/applicant/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      const data = await response.json();
      const role = data.role || "user"; // fallback role

      localStorage.setItem("userEmail", form.email);

      setAuth({
        isLoggedIn: true,
        role: role,
        email: form.email,
      });

      if (role === "hr") {
        navigate("/hr");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          เข้าสู่ระบบสำหรับผู้สมัครงาน
        </h2>
        {error && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded text-center text-sm">
    {error}
  </div>
)}

<form onSubmit={handleSubmit} className="space-y-4"></form>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="รหัสผ่าน"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "👁️‍🗨️" : "🙈"}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-orange-500 transition"
            >
              ลืมรหัสผ่าน
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
              isFormValid()
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            เข้าสู่ระบบ
          </button>

          <div className="text-center mt-6 text-gray-600 text-sm">
            ยังไม่ได้เป็นสมาชิก?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-600 font-medium transition"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;