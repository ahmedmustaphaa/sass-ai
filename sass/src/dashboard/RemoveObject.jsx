import React, { useState } from "react";
import { shareProviderContext } from "../context/ContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

function RemoveObject() {
  const { axios, token } = shareProviderContext();

  const [file, setFile] = useState(null);
  const [objectName, setObjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleRemoveObject = async () => {
    if (!file) return setError("Please upload an image");
    if (!objectName.trim()) return setError("Please enter an object name");

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("object", objectName);

      const res = await axios.post("/api/ai/remove-image-object", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) setResultImage(res.data.content);
      else setError(res.data.message || "Failed to process image");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gradient-to-r from-purple-50 to-white">
      {/* Left: Object Removal */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-purple-500 animate-pulse">✂</span> Object Removal
        </h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border-amber-200 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 hover:shadow-md transition-shadow"
        />

        <textarea
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          placeholder="e.g., watch or spoon (only one object)"
          className="w-full p-3 border-amber-200 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none h-20 mt-4 hover:shadow-sm transition-shadow"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <motion.button
          onClick={handleRemoveObject}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg mt-4 transition-all duration-200 ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
          } flex justify-center items-center gap-2`}
        >
          {loading ? <ClipLoader size={22} color="#fff" /> : "✂ Remove Object"}
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
                <ClipLoader size={40} color="#A78BFA" />
              </motion.div>
            ) : resultImage ? (
              <motion.img
                key="resultImage"
                src={resultImage}
                alt="Processed"
                className="rounded-2xl border-amber-200 border max-w-full max-h-[400px] shadow-md"
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
                    d="M14.121 14.121a3 3 0 11-4.242-4.242l4.242 4.242zM14.121 14.121L21 21m-6.879-6.879L3 3"
                  />
                </svg>
                <p className="text-center text-sm">
                  Upload an image and click "Remove Object" to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default RemoveObject;
