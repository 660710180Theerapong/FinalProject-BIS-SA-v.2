// 📄 src/pages/Document_Page.jsx
import React, { useState, useEffect } from "react";

export default function Document_Page() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
    docName: "",
    docType: "",
    firstName: "",
    lastName: "",
    position: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicantRes, applyRes] = await Promise.all([
          fetch("/api/v1/applicants"),
          fetch("/api/v1/applies"),
        ]);

        const applicants = await applicantRes.json();
        const applies = await applyRes.json();

        // 🔗 เชื่อมข้อมูลโดยใช้ applicant_id
        const merged = applies.map((apply) => {
          const applicant = applicants.find(
            (a) => a.applicant_id === apply.applicant_id
          );

          return {
            date: apply.created_at?.split("T")[0] || "", // ดึงแค่วันที่
            firstName: applicant?.first_name || "ไม่ทราบชื่อ",
            lastName: applicant?.last_name || "",
            docName: "เอกสารประกอบการสมัคร",
            docType: "เอกสารประกอบการสมัคร",
            position: apply.position || "",
            resume: apply.file || "/images/carwash/resume.jpg", // ลิงก์ไฟล์
          };
        });

        setDocuments(merged);
      } catch (err) {
        console.error("❌ โหลดข้อมูลไม่สำเร็จ:", err);
      }
    };

    fetchData();
  }, []);

  // 📌 ฟังก์ชันเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 🔍 ฟังก์ชันกรองข้อมูล
  const filteredDocuments = documents.filter((doc) => {
    const matchDate = !filters.date || doc.date === filters.date;
    const matchDocName = !filters.docName || doc.docName.toLowerCase().includes(filters.docName.toLowerCase());
    const matchDocType = !filters.docType || doc.docType.toLowerCase().includes(filters.docType.toLowerCase());
    const matchFirstName = !filters.firstName || doc.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchLastName = !filters.lastName || doc.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchPosition = !filters.position || doc.position.toLowerCase().includes(filters.position.toLowerCase());

    return matchDate && matchDocName && matchDocType && matchFirstName && matchLastName && matchPosition;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-400 text-white py-10 px-12">
      {/* 🔍 ฟอร์มกรองข้อมูล */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 text-black">
        {[
          { label: "วัน/เดือน/ปี:", name: "date", type: "date" },
          { label: "ชื่อเอกสาร:", name: "docName", type: "text" },
          { label: "ประเภทเอกสาร:", name: "docType", type: "text" },
          { label: "ชื่อ:", name: "firstName", type: "text" },
          { label: "นามสกุล:", name: "lastName", type: "text" },
          { label: "ตำแหน่ง:", name: "position", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="text-white text-base">{label}</label>
            <input
              name={name}
              type={type}
              value={filters[name]}
              onChange={handleChange}
              className="w-full rounded-lg p-2"
            />
          </div>
        ))}
      </div>

      {/* 🧾 รายการเอกสาร */}
      <div className="bg-pink-300 p-6 rounded-2xl space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-xl p-4 hover:bg-gray-700 transition"
              onClick={() => setSelectedDoc(doc)}
            >
              <p className="text-lg leading-relaxed">
                {doc.date.split("-").reverse().join("-")} เอกสารประกอบการสมัคร ชื่อ: {doc.firstName} {doc.lastName}{" "}
                ประเภท: {doc.docType} ตำแหน่ง: {doc.position}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-800 font-semibold">
            ไม่พบเอกสารที่ตรงกับเงื่อนไขการค้นหา
          </p>
        )}
      </div>

      {/* 📄 Modal แสดงไฟล์ */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 max-w-lg w-11/12 relative">
            <button
              className="absolute top-2 right-3 text-xl text-red-500 font-bold"
              onClick={() => setSelectedDoc(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              Resume ของ {selectedDoc.firstName} {selectedDoc.lastName}
            </h2>
            <img
              src={'/images/carwash/resume.jpg'}
              alt={`Resume ของ ${selectedDoc.firstName}`}
              className="rounded-xl shadow-lg mx-auto max-h-[70vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
