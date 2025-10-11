import React from "react";

const interviewData = [
  { id: 1, name: "นาย สมชาย รวยน้อย", time: "13.30 น. - 13.37 น." },
  { id: 2, name: "นางสาว สมหญิง รวยมาก", time: "13.37 น. - 13.44 น." },
  { id: 3, name: "นาย สมหมาย รวยปานกลาง", time: "13.44 น. - 13.51 น." },
];

function InterviewTable() {
  return (
    <div className="mt-12 bg-white text-black rounded-xl shadow-2xl overflow-hidden w-[90%] max-w-xl">
      <h2 className="text-2xl font-bold text-center bg-blue-400 text-white py-3">
        ตารางนัดสัมภาษณ์
      </h2>
      <table className="w-full text-center border-collapse">
        <thead className="bg-blue-200 text-gray-900">
          <tr>
            <th className="py-3 border">ลำดับ</th>
            <th className="py-3 border">ชื่อ - นามสกุล</th>
            <th className="py-3 border">เวลาสัมภาษณ์</th>
          </tr>
        </thead>
        <tbody>
          {interviewData.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50">
              <td className="py-2 border">{item.id}</td>
              <td className="py-2 border">{item.name}</td>
              <td className="py-2 border">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewTable;
