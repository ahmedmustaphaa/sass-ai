import React, { useState } from "react";
import { shareProviderContext } from "../context/ContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

function GenerateImages() {
  const { axios, token } = shareProviderContext();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("Realistic");

  const styles = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D style",
    "Portrait style",
  ];

  const generateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish, style: selectedStyle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setContent(data.content);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gradient-to-r from-green-50 to-white">
      {/* Left: Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-800">AI Image Generator</h2>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to see in the image..."
          className="w-full p-4  border-amber-200 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 h-28 resize-none shadow-sm hover:shadow-md transition-shadow"
        />

        {/* Styles */}
        <h3 className="font-medium text-gray-700">Style</h3>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <motion.button
              key={style}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
                selectedStyle === style
                  ? "bg-green-100 border-green-500 text-green-700 shadow-lg"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
            >
              {style}
            </motion.button>
          ))}
        </div>

        {/* Public toggle */}
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
            className="w-4 h-4 border-amber-200 border"
          />
          <span className="text-gray-700">Make this image Public</span>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={generateImage}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className={`w-full py-3 rounded-xl  font-semibold text-white shadow-lg mt-4 transition-all duration-200 ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } flex justify-center items-center gap-2`}
        >
          {loading ? <ClipLoader size={22} color="#fff" /> : "Generate Image"}
        </motion.button>
      </motion.div>

      {/* Right: Generated Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Image</h2>
        <div className="flex flex-col items-center justify-center text-gray-500 w-full h-full">
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <ClipLoader size={40} color="#34D399" />
              </motion.div>
            ) : content ? (
              <motion.img
                key="content"
                src={content}
                alt="Generated"
                className="rounded-lg max-h-[400px] object-contain shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 text-center"
              >
                No image generated yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default GenerateImages;
