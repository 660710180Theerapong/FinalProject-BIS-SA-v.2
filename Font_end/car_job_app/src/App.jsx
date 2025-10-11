import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar_user from './components/Navbar_user';
import Navbar_hr from './components/Navbar_hr';
import Navbar from './components/Navbar';
//Page
import Login_Page from './pages/Login_Page';
import Register_Page from './pages/Register_Page';
import HomePage_NotLog from './pages/HomePage_NotLog';
//user
import HomePage from './pages/User/HomePage';
import Profile_Page from './pages/User/Profile_Page';
import Status_Page from './pages/User/Status_Page';
import NotificationPage from './pages/User/Notification_Page';
//hr
import HomePage_Hr_page from './pages/Hr/Home_Hr_page';
import ApplicantList_Page from './pages/Hr/ApplicantList_Page'
import ManageApplicant_Page from './pages/Hr/ManageApplicant_Page';
import Document_Page from './pages/Hr/Document_Page';
import Repor_Page from './pages/Hr/Report_Page';

function App() {

  const auth = {
    isLoggedIn: true,
    role: 'hr', // 'user' หรือ 'hr'
  };
  

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        
         {/* แสดง Navbar ตาม role */}
      {auth.isLoggedIn ? (
        auth.role === 'hr' ? (
          <Navbar_hr />
        ) : (
          <Navbar_user />
        )
      ) : (
        <Navbar />   // แสดง navbar ปกติ ถ้ายังไม่ได้ login
      )}

        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* หน้า public */}
            <Route path="/" element={<HomePage_NotLog />} />
            
            <Route path="/login" element={<Login_Page />} />
            <Route path="/register" element={<Register_Page />} />

            <Route path="/user" element={<HomePage />} />
            <Route path="/user/profile" element={<Profile_Page />} />
            <Route path="/user/status" element={<Status_Page />} />
            <Route path="/user/notification" element={<NotificationPage />} />

            <Route path="/hr" element={<HomePage_Hr_page />} />
            <Route path="/hr/applicant" element={<ApplicantList_Page />} />
            <Route path="/manage/:id" element={<ManageApplicant_Page />} />
            <Route path="/hr/document" element={<Document_Page/>} />
            <Route path="/hr/report" element={<Repor_Page/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;