import React, { useState } from "react";
import { shareProviderContext } from "../context/ContextProvider";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function ReviewResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const { axios, token } = shareProviderContext();

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async () => {
    setError("");
    setResult("");

    if (!file) {
      setError("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post("/api/ai/review-resume", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) setResult(res.data.content);
      else setError(res.data.message || "Something went wrong.");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[400px] flex justify-center bg-gray-100 p-12">
      <motion.div
      
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 shadow-2xl  flex flex-col gap-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Resume Review</h1>
          <p className="text-gray-500">Upload your resume to get AI-powered analysis</p>
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Analyzing..." : "Review Resume"}
        </motion.button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {/* Result Box */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-h-80 overflow-y-auto p-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 whitespace-pre-wrap"
          >
          
<ReactMarkdown className="prose max-w-full p-4 bg-gray-50 rounded-lg shadow-inner">
  {result}
</ReactMarkdown>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ReviewResume;
