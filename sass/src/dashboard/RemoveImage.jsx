import React, { useState } from "react";
import { shareProviderContext } from "../context/ContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

function RemoveImage() {
  const { axios, token } = shareProviderContext();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeBackGround = async () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    const form = new FormData();
    form.append("image", file);

    setLoading(true);
    try {
      const { data } = await axios.post("/api/ai/remove-imageback", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        alert(data.message || "Failed to process image");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gradient-to-r from-orange-50 to-white">
      {/* Left: Background Removal */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-red-500 animate-pulse">🪄</span> Background/Object Removal
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow hover:shadow-md"
        />
        <p className="text-gray-500 text-sm mt-2">
          Supports JPG, PNG, and other image formats
        </p>

        <motion.button
          onClick={removeBackGround}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg mt-4 transition-all duration-200 ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } flex justify-center items-center gap-2`}
        >
          {loading ? <ClipLoader size={22} color="#fff" /> : "Remove Background"}
        </motion.button>
      </motion.div>

      {/* Right: Processed Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Processed Image</h2>

        <div className="flex flex-col items-center justify-center w-full h-full">
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <ClipLoader size={40} color="#FB923C" />
              </motion.div>
            ) : content ? (
              <motion.img
                key="content"
                src={content}
                alt="Processed"
                className="rounded-xl max-w-full max-h-[400px] shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h8M8 11h8m-8 4h8"
                  />
                </svg>
                <p className="text-center text-sm">
                  Upload an image and click "Remove Background" to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default RemoveImage;
