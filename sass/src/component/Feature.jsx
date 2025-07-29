import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Feature() {

  const navigate=useNavigate()
  return (
    <div className="pt-14 bg-[#F8FAFC]">
      {/* Title Section */}
      <motion.div
        className="text-center w-[90%] md:w-[50%] mx-auto mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-[32px] sm:text-[40px] font-bold text-[#252525] leading-tight">
          Featured Destinations
        </h1>
        <p className="text-[#6B7280] text-md mt-4">
          Discover our handpicked selection of exceptional properties around the world,
          offering unparalleled luxury and unforgettable experiences.
        </p>
      </motion.div>

      {/* Hotel Cards Grid */}
      <div className="px-6 sm:px-10 lg:px-20 py-10 flex flex-wrap gap-6 justify-center">
        {roomsDummyData.map((hotel, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-[45%] lg:w-[30%]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <HotelCard hotel={hotel} />
          </motion.div>
        ))}

       
      </div>
       <button className='px-10 py-2 w-[60%] md:w-[20%] m-auto flex items-center
        justify-center rounded-lg text-[#fff] bg-[#7636D1] mt-10' onClick={()=>{navigate('/room'),scroll(0,0)}}>View All Hotels</button>
    </div>
  )
}

export default Feature
