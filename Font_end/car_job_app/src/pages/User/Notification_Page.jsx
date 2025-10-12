import React, { useState } from "react";
import NotificationItem from "../../components/NotificationItem";


  const NotificationPage = () => {
    // ใช้ข้อมูลจำลองก่อน (ยังไม่เรียก API)
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        title: "ได้รับใบสมัครแล้ว",
        message:
          'เราได้รับใบสมัครของคุณเรียบร้อยแล้ว ขอบคุณที่สนใจร่วมงานกับเรา'
      },
      {
        id: 2,
        title: "อยู่ระหว่างการพิจารณา",
        message: 'ใบสมัครของคุณกำลังอยู่ระหว่างการพิจารณา'
      },
      {
        id: 3,
        title: "นัดสัมภาษณ์",
        message:
          'คุณผ่านการคัดเลือกเบื้องต้น กรุณาเข้าร่วมการสัมภาษณ์ตามวันและเวลาที่กำหนด'
      },
      {
        id: 4,
        title: "รอผลสัมภาษณ์",
        message: 'การสัมภาษณ์เสร็จสิ้นแล้ว โปรดรอผลการพิจารณา'
      },
      {
        id: 5,
        title: "ผ่านการคัดเลือก",
        message: 'ยินดีด้วย! คุณผ่านการคัดเลือกเข้าร่วมงานกับเรา'
      },
      {
        id: 6,
        title: "ไม่ผ่านการคัดเลือก",
        message:
          'ขอบคุณที่สละเวลามาสมัครงานกับเรา แต่ครั้งนี้คุณยังไม่ผ่านการคัดเลือก'
      }
    ]);
  
    // 🔸 ฟังก์ชันลบแจ้งเตือน
    const handleDelete = (id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 flex flex-col items-center p-6 text-black">
        <h1 className="text-3xl font-bold mb-6">การแจ้งเตือน</h1>
  
        <div className="w-full max-w-2xl space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <NotificationItem
                key={n.id}
                id={n.id}
                title={n.title}
                message={n.message}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-gray-200">
              🎉 ไม่มีการแจ้งเตือนที่ค้างอยู่
            </p>
          )}
        </div>
      </div>
    );
  };
  

export default NotificationPage;