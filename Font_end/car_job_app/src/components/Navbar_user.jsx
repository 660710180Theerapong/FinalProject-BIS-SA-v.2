import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartIcon, SearchIcon, UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar_user = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-purple-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              หน้าแรก
            </NavLink>
            <NavLink 
              to="/status" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              ตรวจสอบสถานะ
            </NavLink>
            <NavLink 
              to="/test" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              ทดสอบ
            </NavLink>
            <NavLink 
              to="/notification" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              แจ้งเตือน
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <NavLink to="/profile" >
            <button className="p-2 text-white hover:text-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
              <UserIcon className="h-6 w-6" />
            </button>
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 border-t">
            <NavLink 
              to="/" 
              className="block py-2 text-gray-700 hover:text-viridian-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าแรก
            </NavLink>
            <NavLink 
              to="/status" 
              className="block py-2 text-gray-700 hover:text-viridian-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ตรวจสอบสถานะ
            </NavLink>
            <NavLink 
              to="/test" 
              className="block py-2 text-gray-700 hover:text-viridian-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ทดสอบ
            </NavLink>
            <NavLink 
              to="/notificate" 
              className="block py-2 text-gray-700 hover:text-viridian-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              แจ้งเตือน
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_user;