import React, { useState, useEffect } from "react";

const Profile_Page = () => {
  const [userData, setUserData] = useState(null); // สำหรับเก็บข้อมูลผู้ใช้จาก API
  const [loading, setLoading] = useState(true); // สถานะโหลด
  const [error, setError] = useState(null); // เก็บ error ถ้ามี

  useEffect(() => {
    const fetchData = async () => {
      try {
        // :small_blue_diamond: เรียก API ทั้งสองพร้อมกัน
        const [applicantRes, applyRes] = await Promise.all([
          fetch("/api/v1/applicants"),
          fetch("/api/v1/applies"),
        ]);
  
        // :small_blue_diamond: ตรวจสอบสถานะ response ก่อน
        if (!applicantRes.ok) throw new Error("Network applicant was not ok");
        if (!applyRes.ok) throw new Error("Network apply was not ok");
  
        // :small_blue_diamond: แปลงเป็น JSON พร้อมกัน
        const [applicantData, applyData] = await Promise.all([
          applicantRes.json(),
          applyRes.json(),
        ]);
  
        console.log("Applicant data:", applicantData);
        console.log("Apply data:", applyData);
  
        // :small_blue_diamond: ใช้ข้อมูลมา set state
        if (Array.isArray(applicantData) && applicantData.length > 0) {
          setUserData({
            fullname:
              applicantData[0].first_name + " " + applicantData[0].last_name ||
              "ไม่ทราบชื่อ",
            position: applyData[0]?.position || "ไม่ระบุตำแหน่ง",
            status: applyData[0]?.status || "รอการพิจารณา",
            avatar: "",
          });
        } else {
          throw new Error("No applicants found");
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

        {/* ตำแหน่ง */}
        <p className="text-gray-600 text-lg mb-4">
          ตำแหน่งที่สมัคร:{" "}
          <span className="font-medium">{userData.position}</span>
        </p>

        {/* สถานะ */}
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