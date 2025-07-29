import React from 'react'
import { motion } from 'framer-motion'
import { exclusiveOffers, assets } from '../assets/assets'

function Exclusive() {
  return (
    <div className="mt-40 px-6 md:px-20">
      {/* Title and Button */}
      <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-semibold text-black">
            Exclusive Offers
          </h1>
          <p className="text-[#6B7280] mt-2">
            Take advantage of our limited-time offers and special packages to enhance your<br className="hidden md:block" />
            stay and create unforgettable memories.
          </p>
        </div>
        <button className="text-[#374151] flex items-center gap-2 text-sm md:text-base font-medium hover:underline">
          View All Offers <img src={assets.arrowIcon} alt="arrow" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 mt-10 justify-center md:justify-start">
        {exclusiveOffers.map((exc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-[90%] sm:w-[300px] md:w-[350px] lg:w-[400px] rounded-xl overflow-hidden relative shadow-md"
            style={{
              backgroundImage: `url(${exc.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '240px',
            }}
          >
            <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 rounded-md text-xs font-semibold">
              {exc.priceOff}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-lg md:text-xl font-semibold">{exc.title}</h2>
              <p className="text-sm my-1">{exc.description}</p>
              <p className="text-xs text-gray-200">{exc.validity}</p>
              <button className="mt-2 text-sm font-medium flex items-center gap-1 underline">
                View Offers <img src={assets.arrowIcon} alt="arrow" className="w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Exclusive
