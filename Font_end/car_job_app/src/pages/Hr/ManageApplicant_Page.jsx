import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ManageApplicant() {
  const { id } = useParams(); // apply_id
  const navigate = useNavigate();

  const [apply, setApply] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Load data จาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [applyRes, applicantRes] = await Promise.all([
          fetch("/api/v1/applies"),
          fetch("/api/v1/applicants"),
        ]);

        if (!applyRes.ok || !applicantRes.ok) {
          throw new Error("โหลดข้อมูลไม่สำเร็จ");
        }

        const applies = await applyRes.json();
        const applicants = await applicantRes.json();

        const selectedApply = applies.find(
          (a) => a.apply_id === parseInt(id)
        );
        if (!selectedApply) {
          throw new Error("ไม่พบข้อมูลการสมัคร");
        }

        const selectedApplicant = applicants.find(
          (a) => a.applicant_id === selectedApply.applicant_id
        );

        setApply(selectedApply);
        setApplicant(selectedApplicant);
        setStatus(selectedApply.stage || "");
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await fetch(`api/v1/api/v1/apply/${apply.apply_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage: status }),
      });
  
      if (!res.ok) {
        throw new Error("บันทึกสถานะไม่สำเร็จ");
      }
  
      alert("บันทึกสถานะใหม่เรียบร้อย!");
      navigate(-1);
    } catch (error) {
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error || !apply || !applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>❌ {error || "ไม่พบข้อมูลผู้สมัคร"}</p>
      </div>
    );
  }

  // สมมติผลสัมภาษณ์ (เดิม)
  const interviewResults = {
    1: "ยังไม่ได้สัมภาษณ์",
    2: "พูดจาดี มีประสบการณ์บริการลูกค้า",
    3: "ยังขาดประสบการณ์ด้านล้างรถเล็กน้อย แต่เรียนรู้เร็ว",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-pink-400">
          จัดการข้อมูลผู้สมัคร
        </h1>

        <p className="text-xl mb-2 font-semibold">
          {applicant.first_name} {applicant.last_name}
        </p>
        <p>อายุ: {applicant.age}</p>
        <p>ตำแหน่งที่สมัคร: {apply.position}</p>

        {/* 🗒 ผลสัมภาษณ์ */}
        <div className="mt-4 bg-gray-700 p-3 rounded-lg">
          <p className="font-semibold mb-1">📝 ผลสัมภาษณ์:</p>
          <p>{interviewResults[apply.apply_id] || "ยังไม่มีข้อมูล"}</p>
        </div>

        {/* 🔄 แก้ไขสถานะ */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">📌 สถานะการสมัคร:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg text-black p-2"
          >
            <option value="สมัครแล้ว">สมัครแล้ว</option>
            <option value="นัดสัมภาษณ์">นัดสัมภาษณ์</option>
            <option value="ผ่านสัมภาษณ์">ผ่านสัมภาษณ์</option>
            <option value="ไม่ผ่านสัมภาษณ์">ไม่ผ่านสัมภาษณ์</option>
            <option value="รับเข้าทำงาน">รับเข้าทำงาน</option>
          </select>
        </div>

        {/* ปุ่ม */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSave}
            className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            💾 บันทึก
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-pink-500 px-6 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            🔙 กลับ
          </button>
        </div>
      </div>
    </div>
  );
}
