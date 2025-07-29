import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

function Hero() {
  return (
    <motion.div
      className="pt-32 pb-10 px-4 md:px-10 lg:px-20 bg-[url('./assets/heroimage.png')] bg-cover bg-center min-h-screen text-white"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Badge */}
        <motion.p
          className="bg-[#49B9FF]/50 inline-block px-5 py-2 rounded-full text-sm font-medium backdrop-blur-md shadow-md"
          variants={fadeInUp}
          custom={0}
        >
          The Ultimate Hotel Experience
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          variants={fadeInUp}
          custom={1}
        >
          Discover Your Perfect <br /> Getaway Destination
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-light max-w-2xl"
          variants={fadeInUp}
          custom={2}
        >
          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
        </motion.p>

        {/* Search Box */}
        <motion.div
          className="mt-8 bg-white rounded-xl shadow-lg p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-end text-black"
          variants={fadeInUp}
          custom={3}
        >
          {/* Destination */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-600 font-medium mb-1 text-sm">
              <img src={assets.locationIcon} alt="" className="w-5 h-5" />
              Destination
            </label>
            <input
              type="text"
              placeholder="Where to?"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Check In */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-600 font-medium mb-1 text-sm">
              <img src={assets.locationIcon} alt="" className="w-5 h-5" />
              Check In
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Check Out */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-600 font-medium mb-1 text-sm">
              <img src={assets.locationIcon} alt="" className="w-5 h-5" />
              Check Out
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-600 font-medium mb-1 text-sm">
              <img src={assets.locationIcon} alt="" className="w-5 h-5" />
              Guests
            </label>
            <input
              type="number"
              min="1"
              placeholder="2 Adults"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Search Button */}
          <div className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300">
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Hero;
