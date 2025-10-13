import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
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
                                        `text-white hover:text-gray-200 transition-colors font-medium ${isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                                        }`
                                   }
                              >
                                   หน้าแรก
                              </NavLink>
                         </div>

                         {/* Action Buttons */}
                         <div className="flex items-center space-x-4">
                              <NavLink
                                   to="/login"
                                   className={({ isActive }) =>
                                        `text-white hover:text-gray-200 transition-colors font-medium ${isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                                        }`
                                   }
                              >
                                   เข้าสู่ระบบ
                              </NavLink>
                              <NavLink
                                   to="/register"
                                   className={({ isActive }) =>
                                        `text-white hover:text-gray-200 transition-colors font-medium ${isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                                        }`
                                   }
                              >
                                   สมัครสมาชิก
                              </NavLink>
                         </div>
                    </div>
               </div>
          </nav>
     );
};

export default Navbar;