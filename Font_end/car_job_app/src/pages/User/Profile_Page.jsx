import React from "react";

const Profile_Page = () => {
  // ตัวอย่างข้อมูล
  const userData = {
    fullname: "สมชาย ใจดี",
    position: "พนักงานบริการ",
    status: "รอการพิจารณา",
    avatar: "" // รูปสุ่มจาก API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h1>
        {/* รูปโปรไฟล์ */}
        <img
          src={userData.avatar}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-purple-500"
        />

        {/* ชื่อ */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {userData.fullname}
        </h2>

        {/* ตำแหน่งที่สมัคร */}
        <p className="text-gray-600 text-lg mb-4">
          ตำแหน่งที่สมัคร: <span className="font-medium">{userData.position}</span>
        </p>

        {/* สถานะการสมัคร */}
        <div
          className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium ${
            userData.status === "รอการพิจารณา"
              ? "bg-yellow-500"
              : userData.status === "รับเข้าทำงาน"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {userData.status}
        </div>
      </div>
    </div>
  );
};

export default Profile_Page;