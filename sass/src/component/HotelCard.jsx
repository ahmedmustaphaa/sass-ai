import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

function HotelCard({ hotel }) {

  const nav=useNavigate()
  return (
    <div  onClick={(()=>{nav(`room/${hotel._id}`),scroll(0,0)})}  className="w-full  bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      {/* Room Image */}
      <img
        src={hotel.images[0]}
        alt={hotel.hotel.name}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Hotel Name + Rating */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{hotel.hotel.name}</h2>
          <p className="flex items-center text-yellow-500 font-medium text-sm">
            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4 mr-1" />
            4.9
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{hotel.hotel.city || 'Maldives'}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-3">
          <p className="text-blue-600 font-bold text-md">${hotel.pricePerNight} / night</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md shadow-sm transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
