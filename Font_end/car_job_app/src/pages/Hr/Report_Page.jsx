import React from "react";

export default function Report_Page() {
  const reportData = [
    { position: "พนักงานบริการ", accepted: 5, applied: 3, passed: 1, missing: 4 },
    { position: "พนักงานล้างรถ", accepted: 7, applied: 5, passed: 2, missing: 5 },
  ];

  const totals = reportData.reduce(
    (acc, item) => ({
      accepted: acc.accepted + item.accepted,
      applied: acc.applied + item.applied,
      passed: acc.passed + item.passed,
      missing: acc.missing + item.missing,
    }),
    { accepted: 0, applied: 0, passed: 0, missing: 0 }
  );

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-10 py-12 bg-gradient-to-br from-purple-400 to-purple-400 text-gray-900 print:bg-white print:text-black">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* ตารางรายงาน */}
      <div className="bg-white rounded-3xl p-10 shadow-lg w-full max-w-5xl text-lg border border-purple-300 print:shadow-none print:border-gray-400">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          รายงานสรุปผลการรับสมัครงาน
        </h1>

        <table className="w-full border border-purple-300 text-center border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-purple-400 text-white font-semibold text-lg">
              <th className="py-3 border border-purple-300">ตำแหน่งที่รับสมัคร</th>
              <th className="py-3 border border-purple-300">จำนวนรับ</th>
              <th className="py-3 border border-purple-300">จำนวนสมัคร</th>
              <th className="py-3 border border-purple-300">จำนวนที่ผ่าน</th>
              <th className="py-3 border border-purple-300">ขาด</th>
            </tr>
          </thead>

          <tbody>
            {reportData.map((row, index) => (
              <tr
                key={index}
                className={`transition-colors duration-300 ${
                  index % 2 === 0 ? "bg-purple-100" : "bg-purple-50"
                } hover:bg-purple-200 print:hover:bg-transparent`}
              >
                <td className="py-3 border border-purple-200">{row.position}</td>
                <td className="py-3 border border-purple-200">{row.accepted}</td>
                <td className="py-3 border border-purple-200">{row.applied}</td>
                <td className="py-3 border border-purple-200">{row.passed}</td>
                <td className="py-3 border border-purple-200">{row.missing}</td>
              </tr>
            ))}

            {/* แถวรวม */}
            <tr className="bg-purple-400 text-white font-semibold text-lg">
              <td className="py-3 border border-purple-300">รวม</td>
              <td className="py-3 border border-purple-300">{totals.accepted}</td>
              <td className="py-3 border border-purple-300">{totals.applied}</td>
              <td className="py-3 border border-purple-300">{totals.passed}</td>
              <td className="py-3 border border-purple-300">{totals.missing}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ปุ่มปริ้น */}
      <div className="mt-8 flex justify-end w-full max-w-5xl print:hidden">
        <button
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold text-lg py-3 px-10 rounded-full shadow-md"
        >
          ปริ้น
        </button>
      </div>
    </div>
  );
}
