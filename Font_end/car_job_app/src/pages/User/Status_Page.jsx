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
              status: applyData[0]?.status || "ไม่มีข้อมูล",
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
    { id: 4, label: "ผลการสมัคร", message: "ผ่าน" },
  ];
  const index = 0;
  if(userData.status == 'ยื่นใบสมัคร'){
    index = 0;
  }else if(userData.status == 'รอพิจารณา'){
    index = 1;
  }else if(userData.status == 'นัดสัมภาษณ์'){
    index = 2;
  }else if(userData.status == 'ผลการสมัคร'){
    index = 3;
  }
  // หาว่าตอนนี้อยู่ขั้นไหน
  const currentStep = steps.find((s) => s.label === userData.status) || steps[1];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* หัวข้อ */}
        <h2 className="text-center text-xl font-bold text-gray-800 mb-8">
          การสมัคร : {userData.position}
        </h2>
        <h2 className="text-gray-600 text-lg mb-4">
          การสมัคร:{" "}
          <span className="font-medium">{userData.position}</span>
        </h2>

        {/* แสดงขั้นตอน */}
        <div className="flex items-center justify-between relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-1/4">
              {/* วงกลมของ Step */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${
                  step.id === currentStep.id
                    ? "bg-pink-400 text-white"
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

          {/* เส้นเชื่อมระหว่าง Step */}
          <div className="absolute top-5 left-0 right-0 flex justify-between items-center z-[-1] px-[8%]">
            <div className="border-t-2 border-dashed border-gray-400 w-full"></div>
            <div className="border-t-2 border-dashed border-gray-400 w-full"></div>
            <div className="border-t-2 border-dashed border-gray-400 w-full"></div>
          </div>
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