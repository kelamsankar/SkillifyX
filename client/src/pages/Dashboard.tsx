import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartLine, FaRocket } from "react-icons/fa";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">

      {/* 🌌 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0c29] to-black animate-pulse opacity-90" />

      {/* ✨ Floating Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[150px] top-[-150px] left-[-150px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[140px] bottom-[-120px] right-[-120px] animate-pulse" />

      {/* 🌟 Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center mb-14"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Choose Your Platform
        </h1>
        <p className="text-gray-400 mt-3 text-sm">
          Smart insights for your career & startup journey 🚀
        </p>
      </motion.div>

      {/* 🧊 Cards Container */}
      <div className="grid md:grid-cols-2 gap-12 z-10">

        {/* 🔥 SkillSync Card */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.07, rotate: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/skillsync-dashboard")}
          className="group relative cursor-pointer w-[340px] p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 h-full">

            {/* Icon */}
            <div className="mb-4 text-purple-400 text-3xl group-hover:scale-110 transition">
              <FaChartLine />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-purple-300">
              SkillSync
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4">
              Analyze your skills, discover gaps, and build a roadmap to success.
            </p>

            {/* Features */}
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✔ Skill Input</li>
              <li>✔ Demand Analytics</li>
              <li>✔ Gap Detection</li>
              <li>✔ Learning Roadmap</li>
            </ul>

            {/* Glow Hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-purple-500/10 blur-xl transition" />
          </div>
        </motion.div>

        {/* 🚀 Startify Card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.07, rotate: -1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/startify-dashboard")}
          className="group relative cursor-pointer w-[340px] p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 h-full">

            {/* Icon */}
            <div className="mb-4 text-pink-400 text-3xl group-hover:scale-110 transition">
              <FaRocket />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-pink-300">
              Startify
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4">
              Explore startup ecosystems, funding trends, and opportunities.
            </p>

            {/* Features */}
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✔ Industry Trends</li>
              <li>✔ Funding Insights</li>
              <li>✔ Opportunity Score</li>
              <li>✔ Region Analysis</li>
            </ul>

            {/* Glow Hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-pink-500/10 blur-xl transition" />
          </div>
        </motion.div>

      </div>

      {/* 🌠 Floating Footer Glow Line */}
      <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40" />

    </div>
  );
};

export default Dashboard;