import React, { useState, useEffect } from "react";
import { shareProviderContext } from "../context/ContextProvider";
import { motion } from "framer-motion";

function Community() {
  const { axios, token } = shareProviderContext();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch published creations from backend
  useEffect(() => {
    const fetchCreations = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/user/get-poublished-creations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setCreations(res.data.creations);
        else setError(res.data.message || "Failed to load creations.");
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreations();
  }, [axios, token]);

  // Toggle like function
  const toggleLike = async (id) => {
    try {
      const res = await axios.post(
        "/api/user/toggle-like",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setCreations((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, likes: res.data.likes } : c
          )
        );
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Community Creations
        </h2>

        {loading && (
          <p className="text-center text-gray-500 font-medium">Loading creations...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {!loading && !error && creations.length === 0 && (
          <p className="text-center text-gray-600">No creations published yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creations.map((creation) => (
            <motion.div
              key={creation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white shadow-2xl rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={creation.content} // assuming content is image URL
                alt={`Creation ${creation.id}`}
                className="w-full h-64 object-cover"
              />

              <button
                onClick={() => toggleLike(creation.id)}
                className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-80 transition"
              >
                {creation.likes || 0} ❤️
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;
