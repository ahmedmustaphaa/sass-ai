import React from 'react';
import { motion } from 'framer-motion';

const PromoSection = () => {
  return (
    <div className="bg-white py-24 px-4 sm:px-6 lg:px-20 w-[80%] m-auto ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-full mx-auto  py-24  bg-[#0B1120] text-white rounded-xl p-8 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Inspired</h2>
        <p className="text-gray-300 text-base sm:text-lg mb-6">
          Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-72 px-4 py-3 rounded-md bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition">
            Subscribe →
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </motion.div>
    </div>
  );
};

export default PromoSection;
