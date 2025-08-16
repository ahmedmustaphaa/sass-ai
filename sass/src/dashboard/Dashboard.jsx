import React from 'react';
import {
  FilePenLine,
  Hash,
  ImageIcon,
  Scissors,
  BadgeCheck,
  Users2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const tools = [
  { label: 'Blog Titles', icon: Hash, link: '/ai/blog-titles' },
  { label: 'Write Article', icon: FilePenLine, link: '/ai/write' },
  { label: 'Generate Image', icon: ImageIcon, link: '/ai/images' },
  { label: 'Remove Background', icon: Scissors, link: '/ai/remove-bg' },
  { label: 'Remove Object', icon: Scissors, link: '/ai/remove-object' },
  { label: 'Review Resume', icon: BadgeCheck, link: '/ai/review' },
  { label: 'Community', icon: Users2, link: '/ai/community' },
];

function Dashboard() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Top Greeting */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome back 👋</h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Explore AI tools and create content effortlessly
        </p>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.Link
              to={tool.link}
              key={tool.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-transform duration-300"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all">
                <Icon className="text-white" size={32} />
              </div>

              {/* Label */}
              <span className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                {tool.label}
              </span>
            </motion.Link>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
