import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { shareProviderContext } from '../context/ContextProvider';

function Layout() {
   const { isOpen } = shareProviderContext(); // جلب حالة الـ sidebar من الكونتكست
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar (fixed height) */}
      <div className="h-16">
        <Navbar />
      </div>

      {/* Remaining area below Navbar */}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar */}
        <div className={`${isOpen?'w-[60%]':'w-[80px]'} md:w-[17%]  overflow-y-auto z-100`}>
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
