"use client";
import React, { useState } from "react";
import { FaPen, FaFileAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { shareProviderContext } from "../context/ContextProvider";
import { motion, AnimatePresence } from "framer-motion";

function WriteArticle() {
  const { axios, token } = shareProviderContext();

  const [write, setWrite] = useState("");
  const [length, setLength] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const writeArticle = async () => {
    if (!write || !length) {
      alert("Please enter a topic and select article length");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt: write, length },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setContent(data.content);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const lengthOptions = [
    { label: "Short (500-800 words)", value: 800 },
    { label: "Medium (800-1200 words)", value: 1000 },
    { label: "Long (1200+ words)", value: 1500 },
  ];

  return (
    <div className="p-6 w-full flex flex-col md:flex-row gap-6 min-h-screen bg-gradient-to-r from-blue-50 to-white">
      {/* Left Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full md:w-1/2 p-6 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FaFileAlt className="text-blue-600 animate-bounce" />
          Article Settings
        </h2>

        {/* Topic Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Article Topic</label>
          <input
            type="text"
            value={write}
            onChange={(e) => setWrite(e.target.value)}
            placeholder="The future of artificial intelligence is..."
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm hover:shadow-md"
          />
        </div>

        {/* Article Length Buttons */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Article Length</label>
          <div className="flex gap-3 flex-wrap">
            {lengthOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLength(option.value)}
                className={`px-5 py-2 rounded-full border font-medium transition-colors ${
                  length === option.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={writeArticle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          {loading ? <ClipLoader size={22} color="#fff" /> : <><FaPen /> Generate Article</>}
        </motion.button>
      </motion.div>

      {/* Right Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full md:w-1/2 p-6 flex flex-col items-center justify-center text-center min-h-[300px] max-h-[80vh] overflow-y-auto"
      >
        <AnimatePresence>
          {content ? (
            <motion.div
              key="article"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-gray-700 whitespace-pre-line text-left text-lg"
            >
              {content}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-gray-400"
            >
              <FaPen className="text-5xl animate-pulse" />
              <p>Enter a topic and click “Generate Article” to get started</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default WriteArticle;
