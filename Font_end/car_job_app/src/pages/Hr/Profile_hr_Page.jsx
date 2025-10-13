import React, { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';

const Profile_hr_Page = () => {
  const [userData, setUserData] = useState(null); // สำหรับเก็บข้อมูลผู้ใช้จาก API
  const [loading, setLoading] = useState(true); // สถานะโหลด
  const [error, setError] = useState(null); // เก็บ error ถ้ามี
  const { auth } = useAuth();
  const email = auth.email
  useEffect(() => {
    const fetchData = async () => {
      try {
      const hrRes = await fetch(`http://localhost:8080/api/v1/hre?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
      }
    });

  
        // :small_blue_diamond: ตรวจสอบสถานะ response ก่อน
        if (!hrRes.ok) throw new Error("Network Hr was not ok");
  
        // :small_blue_diamond: แปลงเป็น JSON พร้อมกัน
        const [hrData] = await Promise.all([
          hrRes.json(),
        ]);
  
        console.log("hrRes data:", hrData);
  
        // :small_blue_diamond: ใช้ข้อมูลมา set state
        //if (hrData.length > 0) {
          setUserData({
            fullname:
            hrData.first_name + " " + hrData.last_name ||
              "ไม่ทราบชื่อ",
            phone: hrData?.phone,
            email: hrData?.email,
            avatar: hrData?.avatar || '/images/carwash/profile.png' ,
          });
     //    } else {
     //      throw new Error("No applicants found");
     //    }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  },  [auth.email]);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_hr_Page;