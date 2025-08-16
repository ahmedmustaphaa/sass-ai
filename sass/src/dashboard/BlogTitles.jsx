import React, { useState } from "react";
import { shareProviderContext } from "../context/ContextProvider";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

function BlogTitles() {
  const { axios, token } = shareProviderContext();

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const handleGenerate = async () => {
    if (!keyword) {
      alert("Please enter a topic");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt: keyword, category: selectedCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        alert(data.message || "Failed to generate title");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 min-h-screen bg-gradient-to-r from-purple-50 to-white">
      {/* Left: Generator Box */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-1/2 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">AI Title Generator</h2>

        <input
          type="text"
          placeholder="The future of artificial intelligence is..."
          className="w-full border border-amber-200 rounded-xl outline-none shadow-sm  px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-shadow hover:shadow-md"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`border px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-purple-100 border-purple-500 text-purple-600 shadow-lg"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleGenerate}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Generating..." : "🚀 Generate Title"}
        </motion.button>
      </motion.div>

      {/* Right: Generated Titles */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-1/2 flex flex-col"
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Generated Titles
        </h3>
        <div className="flex-1 w-full overflow-y-auto max-h-[400px]  rounded-xl p-4 bg-gray-50">
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-full"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
              </motion.div>
            ) : content ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="markdown-body text-gray-700"
              >
                <ReactMarkdown>{content}</ReactMarkdown>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 text-center"
              >
                No titles generated yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default BlogTitles;
