import React, { useState, useEffect } from 'react';

const Api_test = () => {
  const [data, setData] = useState(null);  // สำหรับเก็บข้อมูลที่ดึงมา
  const [loading, setLoading] = useState(true);  // สำหรับเก็บสถานะการโหลดข้อมูล
  const [error, setError] = useState(null);  // สำหรับเก็บ error ถ้ามี

  useEffect(() => {
    // ฟังก์ชัน async เพื่อดึงข้อมูลจาก API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/applicants'); // URL ของ API
        if (!response.ok) {  // ตรวจสอบสถานะการตอบกลับ
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // แปลงข้อมูลเป็น JSON

        setData(data); // เก็บข้อมูลใน state
      } catch (error) {
        setError(error.message); // ถ้ามี error ก็เก็บใน state
      } finally {
        setLoading(false); // เปลี่ยนสถานะโหลดเมื่อเสร็จ
      }
    };

    fetchData(); // เรียกใช้ฟังก์ชัน

  }, []);  // [] หมายความว่าทำงานแค่ครั้งเดียวหลังการ render

  // การแสดงผล
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Api_test;