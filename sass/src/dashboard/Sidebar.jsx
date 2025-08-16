import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePen,
  Hash,
  Image,
  Scissors,
  BadgeCheck,
  Users,
} from 'lucide-react';
import { shareProviderContext } from '../context/ContextProvider';

const sidebarLinks = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/ai' },
  { label: 'Write Article', icon: <FilePen size={20} />, path: '/ai/write' },
  { label: 'Blog Titles', icon: <Hash size={20} />, path: '/ai/blog-titles' },
  { label: 'Generate Images', icon: <Image size={20} />, path: '/ai/images' },
  { label: 'Remove Background', icon: <Scissors size={20} />, path: '/ai/remove-bg' },
  { label: 'Remove Object', icon: <Scissors size={20} />, path: '/ai/remove-object' },
  { label: 'Review Resume', icon: <BadgeCheck size={20} />, path: '/ai/review' },
  { label: 'Community', icon: <Users size={20} />, path: '/ai/community' },
];



function Sidebar() {
  const {user}=shareProviderContext()
    console.log(user)
  return (
    <div className="h-full bg-white shadow-md w-full flex flex-col justify-between">
      {/* Top profile circle */}
      <div>
        <div className="flex items-center justify-center py-6">
          <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
            a
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
                end={link.path === '/ai'} // ✅ أضف دي هنا
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {link.icon}
              <span className="text-sm font-medium hidden md:block">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom user info */}
      <div className="px-4 py-4 text-[gray] border-t">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
            a
          </div>
          <div className="hidden md:block">
              <p className="text-sm font-semibold">{user?.fullName || 'Guest'}</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
