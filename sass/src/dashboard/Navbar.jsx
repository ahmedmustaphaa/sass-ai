import React from 'react';

function Navbar() {
  return (
    <div className="bg-white px-6 py-3 shadow-lg flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500
        drop-shadow-lg tracking-wider animate-pulse">
        Ahmed Mustafa
      </h1>

     
    </div>
  );
}

export default Navbar;
