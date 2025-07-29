import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomsDummyData } from '../assets/assets';
import {
  FaMapMarkerAlt,
  FaConciergeBell,
  FaMountain,
  FaSwimmingPool,
  FaStar,
  FaShieldAlt,
  FaSoap,
  FaHeart
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function RoomDetails() {
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const data = roomsDummyData.find((data) => data._id === id);
    setRoom(data);
    if (data?.images?.length > 0) {
      setMainImage(data.images[0]);
    }
  }, [id]);

  if (!room) return <div className="pt-40 px-6">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-40 px-6 lg:px-32 mb-20"
    >
      {/* Title & Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
            {room.hotel.name}
          </h1>
          <span className="text-gray-600 text-sm">({room.roomType})</span>
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
            20% OFF
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-orange-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={16} />
          ))}
          <span className="ml-2 text-sm text-gray-600">200+ reviews</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <FaMapMarkerAlt />
          {room.hotel.address}
        </div>
      </motion.div>

      {/* Image Gallery */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Image */}
        <motion.div layout className="w-full lg:w-[50%]">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt="Main Room"
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl w-full h-[450px] object-cover border shadow-lg"
          />
        </motion.div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-4 lg:w-2/5 flex-1">
          {room.images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer border-4 h-full w-full ${
                img === mainImage ? 'border-amber-500' : 'border-transparent'
              } rounded-xl overflow-hidden transition-all`}
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Room Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-10 space-y-5"
      >
        <p className="text-xl font-semibold text-indigo-800">
          ${room.pricePerNight}
          <span className="text-sm font-normal text-gray-500"> /night</span>
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Room Type:</span> {room.roomType}
        </p>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="flex gap-3 flex-wrap">
            {room.amenities.includes('Room Service') && (
              <span className="bg-gray-100 text-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <FaConciergeBell /> Room Service
              </span>
            )}
            {room.amenities.includes('Mountain View') && (
              <span className="bg-gray-100 text-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <FaMountain /> Mountain View
              </span>
            )}
            {room.amenities.includes('Pool Access') && (
              <span className="bg-gray-100 text-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <FaSwimmingPool /> Pool Access
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Booking Section */}
      <div className="shadow-xl rounded-2xl mt-20 py-10 bg-white px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Check In</label>
          <input
            type="date"
            className="border px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Check Out</label>
          <input
            type="date"
            className="border px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Guests</label>
          <input
            type="number"
            min="1"
            defaultValue={1}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition-all">
          Check Availability
        </button>
      </div>

      {/* Feature Section */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <FaShieldAlt className="text-xl text-black mt-1" />
            <div>
              <h3 className="font-semibold">Clean & Safe Stay</h3>
              <p className="text-gray-600 text-sm">A well-maintained and hygienic space just for you.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaSoap className="text-xl text-black mt-1" />
            <div>
              <h3 className="font-semibold">Enhanced Cleaning</h3>
              <p className="text-gray-600 text-sm">This host follows Staybnb’s strict cleaning standards.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaMapMarkerAlt className="text-xl text-black mt-1" />
            <div>
              <h3 className="font-semibold">Excellent Location</h3>
              <p className="text-gray-600 text-sm">90% of guests rated the location 5 stars.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaHeart className="text-xl text-black mt-1" />
            <div>
              <h3 className="font-semibold">Smooth Check-In</h3>
              <p className="text-gray-600 text-sm">100% of guests gave check-in a 5-star rating.</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">
          Guests will be allocated on the ground floor according to availability. You get a comfortable two-bedroom apartment with a true city feeling. The price quoted is for two guests. At the guest slot, please mark the number of guests to get the exact price for groups. The guests will be allocated ground floor according to availability.
        </p>

        <p className="text-sm text-gray-700 mt-4">
          You get the comfortable two-bedroom apartment that has a true city feeling.
        </p>

        <hr className="my-8 border-gray-300" />

        {/* Host Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="host"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Hosted by Urbanza Suites</p>
              <div className="flex items-center space-x-1 text-orange-500 text-sm">
                <FaStar />
                <span>200+ reviews</span>
              </div>
            </div>
          </div>

          <button className="mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Contact Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default RoomDetails;
