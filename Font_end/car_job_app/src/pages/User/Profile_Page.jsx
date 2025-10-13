import React, { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';
const Profile_Page = () => {

  const [userData, setUserData] = useState(null); // สำหรับเก็บข้อมูลผู้ใช้จาก API
  const [loading, setLoading] = useState(true); // สถานะโหลด
  const [error, setError] = useState(null); // เก็บ error ถ้ามี
  const { auth } = useAuth();
  const email = auth.email
  useEffect(() => {
     const fetchData = async () => {
      try {
      const res  = await fetch(`http://localhost:8080/api/v1/applicants/profile?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
      }
    });
        const hrRes = await res.json();

          const firstName = hrRes?.applicant?.first_name || "";
        const lastName = hrRes?.applicant?.last_name || "";
        const fullName = (firstName + " " + lastName).trim() || "ไม่ทราบชื่อ";

          setUserData({
            fullname: fullName,
            phone: hrRes?.applicant?.phone || "",
            email: hrRes?.applicant?.email || "",
            position: hrRes?.application?.position || "ไม่ระบุตำแหน่ง",
            status: hrRes?.application?.stage || "รอการพิจารณา",
            avatar: hrRes?.applicant?.avatar || '/images/carwash/profile.png',
          });    
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [auth.email]);

  // ระหว่างโหลดข้อมูล
  if (loading) return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Error: {error}</p>;

  // ถ้าไม่มีข้อมูล
  if (!userData) return <p className="text-center mt-20 text-gray-600">No data available.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-600 to-purple-200">
      <div className="bg-white w-80 rounded-2xl shadow-lg overflow-hidden">
        {/* ส่วนหัว */}
        <div className="bg-purple-600 h-32 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
        </div>

        {/* ข้อมูลผู้ใช้ */}
        <div className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {userData.fullname}
          </h2>

          <div className="bg-gray-50 rounded-xl p-4 text-left shadow-sm">
            <div className="mb-2">
              <p className="text-purple-600 text-sm font-semibold">Email</p>
              <p className="text-gray-800 font-medium">{userData.email}</p>
            </div>
            <div>
              <p className="text-purple-600 text-sm font-semibold">Phone</p>
              <p className="text-gray-800 font-medium">{userData.phone}</p>
            </div>
            <div>
              <p className="text-purple-600 text-sm font-semibold">ตำแหน่งที่สมัคร</p>
              <p className="text-gray-800 font-medium">{userData.position}</p>
            </div>
          </div>
          {/* สถานะ */}
        <div
          className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium ${
            userData.status === "สมัครแล้ว"
              ? "bg-yellow-500"
              : userData.status === "นัดสัมภาษณ์"
              ? "bg-yellow-500"
              : userData.status === "ผ่านสัมภาษณ์"
              ? "bg-green-500"
              : userData.status === "รับเข้าทำงาน"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {userData.status}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Page;