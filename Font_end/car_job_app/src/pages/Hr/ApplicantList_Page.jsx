import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicantList() {
  const calculateAge = (birthDateString) => {
    if (!birthDateString) return null;
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };
  
  const navigate = useNavigate();

  const [applies, setApplies] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    position: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [applicantRes, applyRes] = await Promise.all([
          fetch("/api/v1/applicants"),
          fetch("/api/v1/applies"),
        ]);

        if (!applicantRes.ok || !applyRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const applicantData = await applicantRes.json();
        const applyData = await applyRes.json();

        // รวมข้อมูล apply + applicant ตาม applicant_id
        const merged = applyData.map((apply) => {
          const applicant = applicantData.find(
            (a) => a.applicant_id === apply.applicant_id
          );
          return {
            ...apply,
            applicant, // อาจเป็น undefined ถ้าไม่เจอ
          };
        });

        setApplies(merged);
        setApplicants(applicantData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredApplies = applies.filter((a) => {
    const fullName = `${a.applicant?.first_name || ""} ${a.applicant?.last_name || ""}`;
    const matchName = fullName.toLowerCase().includes(filters.name.toLowerCase());
    const matchPosition = (a.position || "").toLowerCase().includes(filters.position.toLowerCase());
    const matchStatus = (a.stage || "").toLowerCase().includes(filters.status.toLowerCase());
    const matchDate = filters.date
      ? new Date(a.created_at).toISOString().slice(0, 10) === filters.date
      : true;

    return matchName && matchPosition && matchStatus && matchDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-400 p-8 text-white">
      <div className="max-w-5xl mx-auto">
        {/* 🔍 Filter */}
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

        {/* 🔄 Loading/Error */}
        {loading && <p className="text-center py-8">กำลังโหลดข้อมูล...</p>}
        {error && (
          <p className="text-center py-8 text-red-400">เกิดข้อผิดพลาด: {error}</p>
        )}

        {/* 📋 รายชื่อ */}
        {!loading && !error && filteredApplies.map((a, index) => (
          <div
            key={a.apply_id}
            className="bg-gray-800 rounded-2xl p-4 mb-4 hover:bg-gray-700 cursor-pointer transition"
            onClick={() => navigate(`/manage/${a.apply_id}`)}
          >
            <p className="text-lg font-bold">
            {index + 1}. {a.applicant?.first_name} {a.applicant?.last_name} อายุ {calculateAge(a.applicant?.birth_day)} | {a.position} |{" "}
              <span className="text-pink-400">สถานะ : {a.stage}</span>
            </p>
            <p className="text-gray-300 mt-1 text-sm">
              🗓 วันที่สมัคร: {new Date(a.created_at).toLocaleDateString("th-TH")}
            </p>
          </div>
        ))}

        {!loading && !error && filteredApplies.length === 0 && (
          <p className="text-center text-gray-300 mt-10">ไม่พบข้อมูลผู้สมัคร</p>
        )}
      </div>
    </div>
  );
}