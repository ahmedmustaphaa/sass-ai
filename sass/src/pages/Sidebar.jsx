import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { FaChartPie, FaBed, FaClipboardList } from 'react-icons/fa';

function Sidebar() {
  const navLinks = [
    {
      name: "Dashboard",
      path: "",
      icon: <FaChartPie />,
    },
    {
      name: "listroom",
      path: "/owner/listroom",
      icon: <FaClipboardList />,
    },
    {
      name: "addroom",
      path: "/owner/addroom",
      icon: <FaBed />,
    },
  ];

  return (
    <div className='min-h-screen '>
      {/* Logo Section */}
      <div className='text-center px-10 pt-8'>
        <img src={assets.logo} alt="logo" className='w-32 mx-auto' />
      </div>

      {/* Nav Links */}
      <div className='flex flex-col px-4 mt-10'>
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 mt-2 text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-[#2C3D45] text-white' : 'text-[#444F57] hover:bg-gray-100'
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
