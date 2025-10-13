import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar_user from './components/Navbar_user';
import Navbar_hr from './components/Navbar_hr';
import Navbar from './components/Navbar';

// Pages
import Login_Page from './pages/Login_Page';
import Register_Page from './pages/Register_Page';
import HomePage_NotLog from './pages/HomePage_NotLog';

// User
import HomePage from './pages/User/HomePage';
import Profile_Page from './pages/User/Profile_Page';
import Status_Page from './pages/User/Status_Page';
import NotificationPage from './pages/User/Notification_Page';

// HR
import HomePage_Hr_page from './pages/Hr/Home_Hr_page';
import ApplicantList_Page from './pages/Hr/ApplicantList_Page';
import ManageApplicant_Page from './pages/Hr/ManageApplicant_Page';
import Document_Page from './pages/Hr/Document_Page';
import Report_Page from './pages/Hr/Report_Page';
import Profile_hr_Page from './pages/Hr/Profile_hr_Page';

import { useAuth } from './contexts/AuthContext'; // 👈 ย้อนขึ้นไปหา contexts


function ProtectedRoute({ children, role }) {
  const { auth, setAuth} = useAuth(); // 👉 ดึง auth จาก context


  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/" replace />; // หรือหน้าอื่นที่เหมาะสม
  }

  return children;
}


function App() {
  const { auth } = useAuth(); // 👉 ใช้ auth ที่แชร์จาก context
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* แสดง Navbar ตาม role */}
        
        {auth.isLoggedIn === true ? (
          auth.role === 'hr' ? (
            <Navbar_hr />
            
          ) :  (
            <Navbar_user />
          )
        ) : (
          <Navbar />
        )}

        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* หน้า public */}
            <Route path="/" element={<HomePage_NotLog />} />
            <Route path="/login" element={<Login_Page />} />
            <Route path="/register" element={<Register_Page />} />

            {/* หน้า user */}
            <Route
              path="/user"
              element={
                <ProtectedRoute role="applicant">
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute role="applicant">
                  <Profile_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/status"
              element={
                <ProtectedRoute role="applicant">
                  <Status_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/notification"
              element={
                <ProtectedRoute role="applicant">
                  <NotificationPage />
                </ProtectedRoute>
              }
            />

            {/* หน้า hr */}
            <Route
              path="/hr"
              element={
                <ProtectedRoute role="hr">
                  <HomePage_Hr_page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/profile"
              element={
                <ProtectedRoute role="hr">
                  <Profile_hr_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/applicant"
              element={
                <ProtectedRoute role="hr">
                  <ApplicantList_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage/:id"
              element={
                <ProtectedRoute role="hr">
                  <ManageApplicant_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/document"
              element={
                <ProtectedRoute role="hr">
                  <Document_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/report"
              element={
                <ProtectedRoute role="hr">
                  <Report_Page />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;