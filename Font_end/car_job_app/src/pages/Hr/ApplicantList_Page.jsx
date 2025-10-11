import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import applicants from "../../data/applicants";

export default function ApplicantList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    position: "",
    status: "",
    date: "",
  });

  // ฟังก์ชันเปลี่ยนค่าฟิลเตอร์
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // ฟิลเตอร์ข้อมูล
  const filteredApplicants = applicants.filter((a) => {
    const matchName = a.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchPosition = a.position.toLowerCase().includes(filters.position.toLowerCase());
    const matchStatus = a.status.toLowerCase().includes(filters.status.toLowerCase());
    const matchDate = filters.date ? a.date === filters.date : true;
    return matchName && matchPosition && matchStatus && matchDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-purple-900 p-8 text-white">
      <div className="max-w-5xl mx-auto">
        {/* 🔍 ฟิลเตอร์ค้นหา */}
        <div className="flex flex-wrap gap-3 mb-6 bg-gray-900/30 p-4 rounded-2xl">
          <input
            name="name"
            placeholder="ค้นหาชื่อ..."
            value={filters.name}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 text-black flex-1 min-w-[200px]"
          />
          <input
            name="position"
            placeholder="ตำแหน่ง..."
            value={filters.position}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 text-black flex-1 min-w-[200px]"
          />
          <input
            name="status"
            placeholder="สถานะ..."
            value={filters.status}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 text-black flex-1 min-w-[200px]"
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 text-black flex-1 min-w-[200px]"
          />
        </div>

        {/* 📋 รายชื่อผู้สมัคร */}
        {filteredApplicants.map((a, index) => (
          <div
            key={a.id}
            className="bg-gray-800 rounded-2xl p-4 mb-4 hover:bg-gray-700 cursor-pointer transition"
            onClick={() => navigate(`/manage/${a.id}`)}
          >
            <p className="text-lg font-bold">
              {index + 1}. {a.name} อายุ {a.age} | {a.position} |{" "}
              <span className="text-pink-400">สถานะ : {a.status}</span>
            </p>
            <p className="text-gray-300 mt-1 text-sm">
              🗓 วันที่สมัคร: {new Date(a.date).toLocaleDateString("th-TH")}
            </p>
          </div>
        ))}

        {filteredApplicants.length === 0 && (
          <p className="text-center text-gray-300 mt-10">ไม่พบข้อมูลผู้สมัคร</p>
        )}
      </div>
    </div>
  );
}
