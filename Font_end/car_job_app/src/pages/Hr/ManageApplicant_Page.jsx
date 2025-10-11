import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicants from "../../data/applicants";

export default function ManageApplicant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const applicant = applicants.find((a) => a.id === parseInt(id));
  const [status, setStatus] = useState(applicant?.status || "");

  // สมมติข้อมูลผลสัมภาษณ์
  const interviewResults = {
    1: "ยังไม่ได้สัมภาษณ์",
    2: "พูดจาดี มีประสบการณ์บริการลูกค้า",
    3: "ยังขาดประสบการณ์ด้านล้างรถเล็กน้อย แต่เรียนรู้เร็ว",
  };

  if (!applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>ไม่พบข้อมูลผู้สมัคร</p>
      </div>
    );
  }

  const handleSave = () => {
    alert(`บันทึกสถานะใหม่เรียบร้อย!\nสถานะ: ${status}`);
    navigate(-1); // กลับไปหน้ารายชื่อ
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-pink-400">
          จัดการข้อมูลผู้สมัคร
        </h1>

        <p className="text-xl mb-2 font-semibold">{applicant.name}</p>
        <p>อายุ: {applicant.age}</p>
        <p>ตำแหน่ง: {applicant.position}</p>

        {/* 🗒 ผลสัมภาษณ์ */}
        <div className="mt-4 bg-gray-700 p-3 rounded-lg">
          <p className="font-semibold mb-1">📝 ผลสัมภาษณ์:</p>
          <p>{interviewResults[applicant.id]}</p>
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
