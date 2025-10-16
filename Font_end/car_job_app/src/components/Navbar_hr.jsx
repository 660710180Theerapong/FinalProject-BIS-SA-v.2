import React, { useState } from 'react';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, SearchIcon, UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar_hr = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setAuth } = useAuth(); // ✅
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: "" }); // ✅ เปลี่ยนสถานะ auth
    navigate("/"); // ✅ กลับหน้าแรกหรือ login
  };

  return (
    <nav className="bg-purple-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink 
              to="/hr" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              หน้าแรก
            </NavLink>
            <NavLink 
              to="/hr/applicant" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              จัดการผู้สมัคร
            </NavLink>
            <NavLink 
              to="/hr/document" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              คลังเอกสาร
            </NavLink>
            <NavLink 
              to="/hr/report" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              สร้างรายงาน
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <NavLink to="/hr/profile" >
            <button className="p-2 text-white hover:text-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
              <UserIcon className="h-6 w-6" />
            </button>
            </NavLink>
            <NavLink
                to="#"
                onClick={handleLogout}
                className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                isActive ? "border-b-2 border-white" : ""
                    }`
                  }
                >
              ออกจากระบบ
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_hr;