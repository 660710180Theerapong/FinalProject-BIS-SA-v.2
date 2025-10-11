import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar_user from './components/Navbar_user';
import Login_Page from './pages/Login_Page';
import Register_Page from './pages/Register_Page';
import Profile_Page from './pages/Profile_Page';
import Status_Page from './pages/Status_Page';
import HomePage from './pages/HomePage';

import HomePage_NotLog from './pages/HomePage_NotLog';

import NotificationPage from './pages/Notification_Page';

//import UserDashboard from './pages/UserDashboard';
//import HrDashboard from './pages/HrDashboard';

function App() {
  // state เก็บสถานะ login + role
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null, // 'user' หรือ 'hr'
  });

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* แสดง Navbar เฉพาะตอน login แล้ว */}
        <Navbar_user />
        {/*auth.isLoggedIn && auth.role === 'user' && <Navbar_user />*/}
        {/*auth.isLoggedIn && auth.role === 'hr' && <div>Navbar HR</div>*/}

        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* หน้า public */}
            <Route path="/" element={<HomePage_NotLog />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login_Page setAuth={setAuth} />} />
            <Route path="/register" element={<Register_Page />} />
            <Route path="/profile" element={<Profile_Page />} />
            <Route path="/status" element={<Status_Page />} />
            <Route path="/notification" element={<NotificationPage />} />
            {/* หน้า private สำหรับ user */}
            {/* <Route
              path="/user"
              element={
                auth.isLoggedIn && auth.role === 'user'
                  ? <UserDashboard />
                  : <Navigate to="/" />
              }
            />

            
            <Route
              path="/hr"
              element={
                auth.isLoggedIn && auth.role === 'hr'
                  ? <HrDashboard />
                  : <Navigate to="/" />
              }
            /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;