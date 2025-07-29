import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600',
    quote: 'Radiant made undercutting all of our competitors an absolute breeze.',
    name: 'John Doe',
    role: 'Content Marketing'
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600',
    quote: 'An amazing experience with top-notch services and great results.',
    name: 'Jane Smith',
    role: 'Product Designer'
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop',
    quote: 'Radiant helped us grow rapidly and connect better with our audience.',
    name: 'Emily Johnson',
    role: 'UX Researcher'
  },
];

function Testimonial() {
  return (
    <div className="py-16 px-6 md:px-10 lg:px-20 bg-white">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
        <p className="mt-4 text-gray-600">
          Discover the experiences of our valued clients who have partnered with us for their success.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-black text-white max-w-[300px] rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-[270px] w-full object-cover rounded-t-2xl hover:scale-105 transition-all duration-300"
              />
              <div className="absolute bottom-0 h-60 w-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
            <div className="px-5 pb-6 pt-4">
              <p className="font-medium border-b border-gray-600 pb-4">“{item.quote}”</p>
              <p className="mt-4">— {item.name}</p>
              <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
                {item.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
