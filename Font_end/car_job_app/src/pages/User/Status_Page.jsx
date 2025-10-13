import React, { useState, useEffect } from "react";

const Status_Page = () => {
  const [userData, setUserData] = useState(null); // สำหรับเก็บข้อมูลผู้ใช้จาก API
  const [loading, setLoading] = useState(true); // สถานะโหลด
  const [error, setError] = useState(null); // เก็บ error ถ้ามี

  useEffect(() => {
    const fetchData = async () => {
      try {
        // :small_blue_diamond: เรียก API ทั้งสองพร้อมกัน
        const [applyRes] = await Promise.all([
          fetch("/api/v1/applies"),
        ]);

        // :small_blue_diamond: ตรวจสอบสถานะ response ก่อน
        if (!applyRes.ok) throw new Error("Network apply was not ok");

        // :small_blue_diamond: แปลงเป็น JSON พร้อมกัน
        const [applyData] = await Promise.all([
          applyRes.json(),
        ]);

        console.log("Apply data:", applyData);

        // :small_blue_diamond: ใช้ข้อมูลมา set state
        if (Array.isArray(applyData) && applyData.length > 0) {
          setUserData({
            position: applyData[0]?.position || "ไม่ระบุตำแหน่ง",
            status: applyData[0]?.stage || "ไม่มีข้อมูล",
          });
        } else {
          throw new Error("No applyData found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ระหว่างโหลดข้อมูล
  if (loading) return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Error: {error}</p>;

  // ถ้าไม่มีข้อมูล
  if (!userData) return <p className="text-center mt-20 text-gray-600">No data available.</p>;
  // กำหนดขั้นตอน

  const steps = [
    { id: 1, label: "ยื่นใบสมัคร", message: "ยื่นใบสมัครเรียบร้อย" },
    { id: 2, label: "รอพิจารณา", message: "กำลังตรวจสอบเอกสาร" },
    { id: 3, label: "นัดสัมภาษณ์", message: "รอนัดสัมภาษณ์" },
    { id: 4, label: "ผลการสมัคร", message: "ไม่ผ่านผ่าน" },
  ];

  let index;
  switch (userData.status?.trim()) {
    case 'สมัครแล้ว':
      index = 1;
      break;
    case 'นัดสัมภาษณ์':
      index = 2;
      break;
    case 'ผ่านสัมภาษณ์':
      index = 3;
      steps[3].message = 'ผ่านสัมภาษณ์'
      break;
    case 'ไม่ผ่านสัมภาษณ์':
      index = 3;
            steps[3].message = 'ไม่ผ่านสัมภาษณ์'
      break;
      case 'รับเข้าทำงาน':
        index = 3;
        steps[3].message = 'ยินดีด้วยคุณผ่านการสมัคร'
        break;
    default:
      index = 0; // หรือค่าที่ต้องการสำหรับกรณีไม่ตรง
  }
  // หาว่าตอนนี้อยู่ขั้นไหน
  const currentStep = steps.find((s) => s.label === userData.status) || steps[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 px-4">
      {/* ข้อความด้านบน อยู่นอก card */}
      <h2 className="text-3xl font-bold mb-6">
        การสมัคร : {userData.position}
      </h2>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* แสดงขั้นตอน */}
        <div className="flex items-center justify-between relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-1/4">
              {/* วงกลมของ Step */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${step.id === currentStep.id
                    ? "bg-pink-400 text-white"
                    : step.id < currentStep.id
                      ? "bg-pink-300 text-white"
                      : "bg-purple-200 text-gray-600"
                  }`}
              >
                {step.id}
              </div>

              {/* ชื่อขั้นตอน */}
              <p className="mt-2 text-sm font-semibold text-gray-700">
                {step.label}
              </p>
            </div>
          ))}


        </div>

        {/* แสดงข้อความด้านล่าง */}
        <div className="mt-8 text-center text-lg font-medium text-gray-800">
          {currentStep.message}
        </div>
      </div>
    </div>
  );
};

export default Status_Page;