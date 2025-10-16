import React, { useState,useEffect} from "react";
import { useAuth } from '../../contexts/AuthContext';

function HomePage() {
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
    
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-purple-300 flex flex-col items-center font-sans">
       <div className="mt-12 bg-white text-black rounded-xl shadow-2xl overflow-hidden w-[90%] max-w-xl">
      <h2 className="text-2xl font-bold text-center bg-blue-400 text-white py-3">
        ตารางนัดสัมภาษณ์
      </h2>
      <table className="w-full text-center border-collapse">
        <thead className="bg-blue-200 text-gray-900">
          <tr>
            <th className="py-3 border">ชื่อ - นามสกุล</th>
            <th className="py-3 border">เวลาสัมภาษณ์</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{userData.fullname}</td>
              <td>วันที่ 20 ตุลาคม 2568 และเวลา 13.30 น.</td>
            </tr>
        </tbody>
      </table>
    </div>
      {/* โลโก้และชื่อร้าน */}
      <div className="text-center mt-16">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-3">88 CAR WASH</h1>
        <p className="text-lg text-gray-700 font-medium">
          ล้างรถสะอาด เงางามทุกมุม ดูแลรถของคุณเหมือนรถของเรา 🚗✨
        </p>
      </div>

      {/* รูปภาพหลักหรือคำโฆษณา */}
      <div className="mt-12 flex justify-center">
        <img
          src="/images/carwash/88_car_wash.png"
          alt="Car Wash"
          className="rounded-2xl shadow-lg w-[90%] max-w-3xl"
        />
      </div>

      {/* รายละเอียดร้าน */}
      <div className="mt-12 text-center max-w-3xl px-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">บริการของเรา</h2>
        <p className="text-gray-700 leading-relaxed">
          เราให้บริการล้างรถครบวงจร ทั้งล้างภายนอก ภายใน ดูดฝุ่น เคลือบสี และขัดเงา  
          ด้วยผลิตภัณฑ์คุณภาพสูง ปลอดภัยต่อสีรถ และทีมงานมืออาชีพ  
          เปิดบริการทุกวัน เวลา <span className="font-semibold text-blue-800">08.00 - 18.30 น.</span>
        </p>
      </div>

      
      {/* แผนที่หรือข้อมูลติดต่อ */}
      <div className="text-center mt-16 mb-10 px-6 max-w-3xl">
        <h3 className="text-2xl font-bold text-blue-800 mb-3">ที่ตั้งร้าน</h3>
        <p className="text-gray-700 mb-4">
          88 Car Wash, 107/1 อ้อมน้อย อำเภอกระทุ่มแบน สมุทรสาคร 74130 74130 
          โทร: <span className="font-semibold text-blue-800">087 695 1341</span>
        </p>
        <iframe
          title="map"
          className="rounded-xl w-full h-64 border-2 border-blue-400 shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5054203939635!2d100.28972827480412!3d13.687810698772385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bfdab01d0517%3A0x88525efb84f1c5b5!2zODggQ2FyIFdhc2gg4Liq4Liy4LiC4LiyMQ!5e0!3m2!1sth!2sth!4v1759676189290!5m2!1sth!2sth" 
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer */}
      <footer className="bg-purple-500 text-white text-center py-4 w-full">
        <p>© 2025 88 Car Wash | สะอาด รวดเร็ว ใส่ใจทุกรายละเอียด</p>
      </footer>
    </div>
  );
}

export default HomePage;