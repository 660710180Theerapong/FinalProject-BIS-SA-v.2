import React from "react";

const Status_Page = ({ position, status }) => {
  // กำหนดขั้นตอน
  
  const steps = [
    { id: 1, label: "ยื่นใบสมัคร", message: "ยื่นใบสมัครเรียบร้อย" },
    { id: 2, label: "รอตรวจสอบ", message: "กำลังตรวจสอบเอกสาร" },
    { id: 3, label: "นัดสัมภาษณ์", message: "รอนัดสัมภาษณ์" },
    { id: 4, label: "ผลการสมัคร", message: "ผ่าน" },
  ];


  // หาว่าตอนนี้อยู่ขั้นไหน
  const currentStep = steps.find((s) => s.label === status) || steps[2];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* หัวข้อ */}
        <h2 className="text-center text-xl font-bold text-gray-800 mb-8">
          การสมัคร : {position}
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