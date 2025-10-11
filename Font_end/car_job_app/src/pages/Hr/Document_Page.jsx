// 📄 src/pages/Document_Page.jsx
import React, { useState } from "react";

export default function Document_Page() {
  const [filters, setFilters] = useState({
    date: "",
    docName: "",
    docType: "",
    firstName: "",
    lastName: "",
    position: "",
  });

  // 📋 ข้อมูลตัวอย่าง (สามารถเชื่อม API จริงภายหลังได้)
  const documents = [
    {
      date: "2025-05-20",
      firstName: "นาย สมชาย",
      lastName: "รวยน้อย",
      docName: "เอกสารประกอบการสมัคร",
      docType: "เอกสารประกอบการสมัคร",
      position: "พนักงานล้างรถ",
    },
    {
      date: "2025-05-20",
      firstName: "นางสาว สมหญิง",
      lastName: "รวยมาก",
      docName: "เอกสารประกอบการสมัคร",
      docType: "เอกสารประกอบการสมัคร",
      position: "พนักงานบริการ",
    },
    {
      date: "2025-05-11",
      firstName: "นาย สมชาย",
      lastName: "หมายสุข",
      docName: "เอกสารประกอบการสมัคร",
      docType: "เอกสารประกอบการสมัคร",
      position: "พนักงานบริการ",
    },
    {
      date: "2025-05-10",
      firstName: "นาย สมพงษ์",
      lastName: "นามยุดา",
      docName: "เอกสารประกอบการสมัคร",
      docType: "เอกสารประกอบการสมัคร",
      position: "พนักงานล้างรถ",
    },
  ];

  // 📌 ฟังก์ชันเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 🔍 ฟังก์ชันกรองข้อมูล
  const filteredDocuments = documents.filter((doc) => {
    const matchDate =
      !filters.date || doc.date === filters.date; // ถ้าไม่ได้เลือกวันที่ให้ผ่านทั้งหมด
    const matchDocName =
      !filters.docName ||
      doc.docName.toLowerCase().includes(filters.docName.toLowerCase());
    const matchDocType =
      !filters.docType ||
      doc.docType.toLowerCase().includes(filters.docType.toLowerCase());
    const matchFirstName =
      !filters.firstName ||
      doc.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchLastName =
      !filters.lastName ||
      doc.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchPosition =
      !filters.position ||
      doc.position.toLowerCase().includes(filters.position.toLowerCase());

    return (
      matchDate &&
      matchDocName &&
      matchDocType &&
      matchFirstName &&
      matchLastName &&
      matchPosition
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-600 text-white py-10 px-12">
      {/* 🔍 ฟอร์มกรองข้อมูล */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 text-black">
        <div>
          <label className="text-white text-base">วัน/เดือน/ปี:</label>
          <input
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChange}
            className="w-full rounded-lg p-2"
          />
        </div>
        <div>
          <label className="text-white text-base">ชื่อเอกสาร:</label>
          <input
            name="docName"
            type="text"
            value={filters.docName}
            onChange={handleChange}
            className="w-full rounded-lg p-2"
          />
        </div>
        <div>
          <label className="text-white text-base">ประเภทเอกสาร:</label>
          <input
            name="docType"
            type="text"
            value={filters.docType}
            onChange={handleChange}
            className="w-full rounded-lg p-2"
          />
        </div>
        <div>
          <label className="text-white text-base">ชื่อ:</label>
          <input
            name="firstName"
            type="text"
            value={filters.firstName}
            onChange={handleChange}
            className="w-full rounded-lg p-2"
          />
        </div>
        <div>
          <label className="text-white text-base">นามสกุล:</label>
          <input
            name="lastName"
            type="text"
            value={filters.lastName}
            onChange={handleChange}
            className="w-full rounded-lg p-2"
          />
        </div>
        <div>
          <label className="text-white text-base">ตำแหน่ง:</label>
          <input
            name="position"
            type="text"
            value={filters.position}
            onChange={handleChange}
            className="w-full rounded-lg p-2"
          />
        </div>
      </div>

      {/* 🧾 รายการเอกสาร */}
      <div className="bg-pink-300 p-6 rounded-2xl space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-xl p-4 hover:bg-gray-700 transition"
            >
              <p className="text-lg leading-relaxed">
                {doc.date.split("-").reverse().join("-")}{" "}
                เอกสารประกอบการสมัคร ชื่อ: {doc.firstName} {doc.lastName}{" "}
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
    </div>
  );
}
