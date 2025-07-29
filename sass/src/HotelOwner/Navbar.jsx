import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <header className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-indigo-600">Admin Panel</span>
      </div>

      {/* Middle: Navigation */}
      <nav className="hidden md:flex items-center space-x-6 text-gray-600 text-sm font-medium">
        <a href="/dashboard" className="hover:text-indigo-600 transition">Dashboard</a>
        <a href="/bookings" className="hover:text-indigo-600 transition">Bookings</a>
        <a href="/hotels" className="hover:text-indigo-600 transition">Hotels</a>
        <a href="/users" className="hover:text-indigo-600 transition">Users</a>
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <FaBell className="text-gray-500 text-lg cursor-pointer hover:text-indigo-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        <FaUserCircle className="text-gray-500 text-2xl cursor-pointer hover:text-indigo-600" />
      </div>
    </header>
  );
}

export default Navbar;
