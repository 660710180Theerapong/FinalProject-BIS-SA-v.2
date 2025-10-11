import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register_Page = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      form.fullname.trim() !== "" &&
      form.email.trim() !== "" &&
      form.password.trim() !== "" &&
      form.confirmPassword.trim() !== "" &&
      form.position.trim() !== "" &&
      form.password === form.confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    console.log("ข้อมูลที่สมัคร:", form);
    // ตรงนี้สามารถ call API สมัครสมาชิกได้
    alert("สมัครสมาชิกสำเร็จ!");

    // ไปหน้า login
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          สมัครสมาชิกสำหรับผู้สมัครงาน
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ชื่อ-นามสกุล */}
          <div>
            <input
              type="text"
              name="fullname"
              placeholder="ชื่อ-นามสกุล"
              value={form.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* ตำแหน่ง */}
          <div>
            <label className="block text-gray-700 mb-1">ตำแหน่งที่สมัคร</label>
            <select
              name="position"
              value={form.position}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            >
              <option value="">-- เลือกตำแหน่ง --</option>
              <option value="พนักงานบริการ">พนักงานบริการ</option>
              <option value="พนักงานล้างรถ">พนักงานล้างรถ</option>
            </select>
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
            สมัครสมาชิก
          </button>

          <div className="text-center mt-6 text-gray-600 text-sm">
            มีสมาชิกอยู่แล้ว?{" "}
            <Link
              to="/login"
              className="text-purple-500 hover:text-purple-600 font-medium transition"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register_Page;