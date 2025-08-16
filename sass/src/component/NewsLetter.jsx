import React from "react";
import { motion } from "framer-motion";

function Testimonial() {
  const testimonials = [
    {
      name: "Donald Jackman",
      role: "Content Creator",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100",
      text: "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier."
    },
    {
      name: "Richard Nelson",
      role: "Instagram Influencer",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
      text: "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier."
    },
    {
      name: "James Washington",
      role: "Digital Content Creator",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
      text: "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier."
    }
  ];

  const StarIcon = () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path
        d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
        fill="#FF532E"
      />
    </svg>
  );

  // Variants للكروت
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: i % 2 === 0 ? 50 : -50, // لو زوجي يجي من تحت، لو فردي من فوق
      x: i === 1 ? 50 : -50, // الكارت اللي في النص يجي من اليمين
      rotate: i % 2 === 0 ? -5 : 5,
      scale: 0.8
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="pt-20">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-5xl font-bold text-[#3B3B3B]">
          Loved by Creators
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0px 15px 30px rgba(0,0,0,0.2)"
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-red-500/10">
              <img
                className="h-12 w-12 rounded-full"
                src={t.img}
                alt={t.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">{t.name}</h1>
                <p className="text-gray-800/80">{t.role}</p>
              </div>
            </div>

            {/* Stars & Text */}
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <StarIcon key={idx} />
                ))}
              </div>
              <p className="text-gray-500 mt-5">{t.text}</p>
            </div>

            {/* Link */}
            <a href="#" className="text-red-500 underline px-5">
              Read more
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
