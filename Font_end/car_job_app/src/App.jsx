import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar_user from './components/Navbar_user';
import Navbar_hr from './components/Navbar_hr';
import Navbar from './components/Navbar';
//Page
import Login_Page from './pages/Login_Page';
import Register_Page from './pages/Register_Page';
import Profile_Page from './pages/User/Profile_Page';
import Status_Page from './pages/User/Status_Page';
import HomePage from './pages/User/HomePage';
import HomePage_NotLog from './pages/HomePage_NotLog';
import NotificationPage from './pages/User/Notification_Page';
import HomePage_Hr_page from './pages/Home_Hr_page';


function App() {

  const auth = {
    isLoggedIn: false,
    role: 'user', // 'user' หรือ 'hr'
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
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;