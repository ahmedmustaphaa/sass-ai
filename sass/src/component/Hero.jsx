import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

import { motion } from 'framer-motion'

import LogoSlider from './LogoCarousel'

function Hero() {
  const nav = useNavigate();
  const navigate = () => nav('/ai', { replace: true });

  return (
    <div className="relative text-center overflow-hidden mt-10">

      {/* خلفية متحركة */}
      <motion.div
        className="absolute inset-0  opacity-20 blur-2xl"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      {/* المحتوى */}
      <div className="relative z-10">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className='text-[40px] md:text-[60px] font-bold'
        >
          Create amazing content
        </motion.h1>

        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className='text-[60px] font-semibold'
        >
          with <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
            className='text-[#5044E5]'
          >
            AI tools
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='text-[#606060]'
        >
          Transform your content creation with our suite of premium AI tools. <br />
          Write articles, generate images, and enhance your workflow.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 1.2 }}
          className='flex justify-center gap-2 mt-4'
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigate}
            className='px-8 py-3 rounded-lg bg-[#5044E5] text-white font-semibold'
          >
            Start creating now
          </motion.button>

          <Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 rounded-lg border border-[#00000026] bg-white font-semibold'
            >
              Watch demo
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className='flex justify-center gap-2 mt-6 items-center'
        >
          <img src={assets.user_group} alt="" className='w-24' />
          <h3 className='text-gray-500'>Trusted by 10k+ people</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
       
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
