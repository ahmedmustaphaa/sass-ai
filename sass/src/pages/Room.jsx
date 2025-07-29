import React, { useState } from 'react';
import { roomsDummyData } from '../assets/assets';
import {
  FaStar,
  FaMapMarkerAlt,
  FaSwimmingPool,
  FaMountain,
  FaConciergeBell,
} from 'react-icons/fa';

function Room() {
  const [selectedFilters, setSelectedFilters] = useState({
    beds: [],
    prices: [],
    sort: '',
  });


  console.log(selectedFilters.beds)

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (category === 'sort') {
        updated.sort = value;
      } else {
        if (updated[category].includes(value)) {
          updated[category] = updated[category].filter((v) => v !== value);
        } else {
          updated[category] = [...updated[category], value];
        }
      }
      return updated;
    });
  };

  const clearCheck = () => {
    setSelectedFilters({ beds: [], prices: [], sort: '' });
  };

  return (
    <div className="pt-40 px-6 lg:px-20">
      <h1 className="text-4xl font-semibold mb-2">Hotel Rooms</h1>
      <p className="text-gray-500 mb-8 max-w-xl">
        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
      </p>

      {/* Flex Container */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: Room Cards */}
        <div className="flex-1 grid gap-10">
          {roomsDummyData.map((room) => (
            <div key={room._id} className="flex flex-col md:flex-row gap-6 shadow-lg rounded-xl overflow-hidden">
              <img
                src={room.images[0]}
                alt="room"
                className="w-full md:w-[350px] h-[250px] object-cover"
              />

              <div className="flex flex-col justify-between p-4 flex-grow">
                <div>
                  <p className="text-gray-500">{room.hotel.city}</p>
                  <h2 className="text-2xl font-semibold">{room.hotel.name}</h2>

                  <div className="flex items-center gap-1 text-orange-500 mt-1">
                    {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                    <span className="text-sm text-gray-600 ml-2">200+ reviews</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <FaMapMarkerAlt />
                    {room.hotel.address}
                  </div>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    {room.amenities.includes("Room Service") && (
                      <span className="bg-gray-100 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                        <FaConciergeBell /> Room Service
                      </span>
                    )}
                    {room.amenities.includes("Mountain View") && (
                      <span className="bg-gray-100 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                        <FaMountain /> Mountain View
                      </span>
                    )}
                    {room.amenities.includes("Pool Access") && (
                      <span className="bg-gray-100 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                        <FaSwimmingPool /> Pool Access
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-lg font-semibold text-indigo-800">
                  ${room.pricePerNight} <span className="text-sm font-normal text-gray-500">/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Filters */}
        <div className="w-full lg:w-[300px] shrink-0 border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">FILTERS</h3>
            <button className="text-sm text-blue-600" onClick={clearCheck}>
              CLEAR
            </button>
          </div>

          {/* Popular Filters */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Popular filters</h4>
            {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map((filter) => (
              <div key={filter} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.beds.includes(filter)}
                  onChange={() => toggleFilter('beds', filter)}
                  className="form-checkbox accent-black"
                />
                <label>{filter}</label>
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Price Range</h4>
            {["$ 0 to 500", "$ 500 to 1000", "$ 1000 to 2000", "$ 2000 to 3000"].map((price) => (
              <div key={price} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.prices.includes(price)}
                  onChange={() => toggleFilter('prices', price)}
                  className="form-checkbox accent-black"
                />
                <label>{price}</label>
              </div>
            ))}
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-semibold mb-2">Sort By</h4>
            {["Price Low to High", "Price High to Low", "Newest First"].map((sort) => (
              <div key={sort} className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="sort"
                  checked={selectedFilters.sort === sort}
                  onChange={() => toggleFilter('sort', sort)}
                  className="form-radio accent-black"
                />
                <label>{sort}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
