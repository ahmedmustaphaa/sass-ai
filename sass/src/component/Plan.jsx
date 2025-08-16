import React from "react";
import { PricingTable } from "@clerk/clerk-react";
import { motion } from "framer-motion";

function Plan() {
  return (
    <div className="py-20 px-6 max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold text-[#3B3B3B]">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      {/* Animated Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // قبل ما يظهر
        whileInView={{ opacity: 1, y: 0 }} // أول ما يدخل الشاشة
        viewport={{ once: true, amount: 0.2 }} // يظهر مرة واحدة و20% من العنصر داخل الشاشة
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-row gap-8"
      >
        <PricingTable />
      </motion.div>
    </div>
  );
}

export default Plan;
