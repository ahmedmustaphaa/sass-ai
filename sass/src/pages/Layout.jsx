import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../HotelOwner/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar ثابت */}
      <div className="h-16">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar ثابت */}
        <div className="w-[80px] md:w-[16%] bg-[#010F18] text-white h-full overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
