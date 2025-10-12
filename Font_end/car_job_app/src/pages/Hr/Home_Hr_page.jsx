import React from "react";
import InterviewTable from "../../components/InterviewTable";

function HomePage_Hr_page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-white flex flex-col items-center font-sans">

      {/* ตารางนัดสัมภาษณ์ */}
      <InterviewTable />

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
          88 Car Wash, 107/1 อ้อมน้อย อำเภอกระทุ่มแบน สมุทรสาคร 74130
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

export default HomePage_Hr_page;
