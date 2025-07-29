import React from 'react';
import { assets, dashboardDummyData } from '../assets/assets';

function Dashboard() {
  const stats = [
    {
      title: 'Total Bookings',
      icon: assets.totalBookingIcon,
      value: dashboardDummyData.totalBookings,
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
    },
    {
      title: 'Total Hotels',
      icon: assets.totalHotelIcon,
      value: dashboardDummyData.totalHotels,
      bg: 'bg-green-100',
      text: 'text-green-700',
    },
    {
      title: 'Total Users',
      icon: assets.totalUserIcon,
      value: dashboardDummyData.totalUsers,
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
    },
    {
      title: 'Total Revenue',
      icon: assets.totalRevenueIcon,
      value: `$${dashboardDummyData.totalRevenue}`,
      bg: 'bg-pink-100',
      text: 'text-pink-700',
    },
  ];

  return (
    <div className="p-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-xl shadow-md ${item.bg} hover:shadow-lg transition`}
          >
            <div className={`p-3 rounded-full ${item.text} bg-white shadow`}>
              <img src={item.icon} alt={item.title} className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className={`text-xl font-bold ${item.text}`}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Latest Bookings</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-gray-600 font-medium">Username</th>
                <th className="px-4 py-3 text-gray-600 font-medium">Room Name</th>
                <th className="px-4 py-3 text-gray-600 font-medium">Amount</th>
                <th className="px-4 py-3 text-gray-600 font-medium">Payment</th>
                <th className="px-4 py-3 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardDummyData.bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{booking.username}</td>
                  <td className="px-4 py-3">{booking.roomName}</td>
                  <td className="px-4 py-3">${booking.totalAmount}</td>
                  <td className="px-4 py-3">{booking.paymentType}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
