import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register_Page = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birth_day: "",
    phone: "",
    password: "",
    confirmPassword: "",
    position: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      form.first_name.trim() !== "" &&
      form.last_name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.birth_day.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.password.trim() !== "" &&
      form.confirmPassword.trim() !== "" &&
      form.position.trim() !== "" &&
      form.password === form.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      // แปลงวันเกิดเป็น ISO string
      const birthDayISO = new Date(form.birth_day).toISOString();

      const blacklistRes = await fetch("http://localhost:8080/api/v1/blacklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
        }),
      });

      if (!blacklistRes.ok) {
        if (blacklistRes.status === 403) {
          alert("คุณถูกบล็อคโดย Blacklist ไม่สามารถสมัครได้");
          setIsSubmitting(false);
          return;
        }
        throw new Error("เกิดข้อผิดพลาดในการตรวจสอบ Blacklist");
      }

      // 2. สมัคร user
      const appUserRes = await fetch("http://localhost:8080/api/v1/appuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: "applicant",
        }),
      });

      if (!appUserRes.ok) {
        throw new Error("สมัครสมาชิกไม่สำเร็จ");
      }

      const appUserData = await appUserRes.json();

      // 3. สมัคร applicant
      const applicantRes = await fetch("http://localhost:8080/api/v1/applicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          birth_day: birthDayISO,
          phone: form.phone,
          email: form.email,
        }),
      });

      if (!applicantRes.ok) {
        throw new Error("สมัคร applicant ไม่สำเร็จ");
      }

      const applicantData = await applicantRes.json();

      // 4. สมัคร apply (ใบสมัคร)
      const applyRes = await fetch("http://localhost:8080/api/v1/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: form.position,
          applicant_id: applicantData.applicant_id,
        }),
      });

      if (!applyRes.ok) {
        throw new Error("สมัคร apply ไม่สำเร็จ");
      }

      alert("สมัครสมาชิกสำเร็จ!");
      navigate("/"); // ไปหน้า login

    } catch (error) {
      console.error(error);
      alert(error.message || "เกิดข้อผิดพลาดในการสมัคร");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          สมัครสมาชิกสำหรับผู้สมัครงาน
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* first_name */}
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="ชื่อ"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* last_name */}
          <div>
            <input
              type="text"
              name="last_name"
              placeholder="นามสกุล"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* birth_day */}
          <div>
            <input
              type="date"
              name="birth_day"
              placeholder="วัน เดือน ปี เกิด"
              value={form.birth_day}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
          
          {/* phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="เบอร์โทร"
              value={form.phone}
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
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
              isFormValid() && !isSubmitting
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
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
