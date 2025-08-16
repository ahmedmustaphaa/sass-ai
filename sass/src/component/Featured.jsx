import React from 'react';
import { AiToolsData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

function Featured() {

  // Variants للمجموعة كلها
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  // Variants لكل كارت
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className='pt-40 px-6 max-w-6xl  mx-auto'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* العنوان والوصف */}
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className='text-4xl md:text-5xl font-bold text-[#3B3B3B]'>
          Powerful AI Tools
        </h1>
        <p className='text-gray-500 mt-4 text-lg'>
          Everything you need to create, enhance, and optimize your content with <br className='hidden md:block' /> cutting-edge AI technology.
        </p>
      </motion.div>

      {/* الكروت */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        variants={containerVariants}
      >
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 200 }}
            className=' shadow-2xl '
          >
            <Link
              to={tool.path}
              className="group bg-white p-6 rounded-2xl shadow-2xl hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className='w-16 h-16 flex items-center justify-center rounded-xl mb-6'
                style={{
                  background: `linear-gradient(to right, ${tool.bg.from}, ${tool.bg.to})`,
                }}
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <tool.Icon className='text-white w-7 h-7' />
              </motion.div>
              <h2 className='text-xl font-semibold text-[#3B3B3B] group-hover:text-[#5044E5] transition-colors duration-200'>
                {tool.title}
              </h2>
              <p className='text-gray-600 mt-2 text-sm leading-relaxed'>
                {tool.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Featured;
