import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
  return (
    <section className="grid md:grid-cols-2 gap-12 px-10 py-20 items-center">
      
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-purple-400 mb-3">
          Career & Startup Intelligence Platform
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Plan Your Career. <br /> Build Your Startup.
        </h1>

        {/* UPDATED DESCRIPTION */}
        <p className="text-gray-400 mb-6 text-lg max-w-lg">
          SkillifyX helps students and founders analyze skills, track industry trends, 
          and discover real opportunities to grow their careers or launch startups.
        </p>

        {/* NEW FEATURES LIST 🔥 */}
        <ul className="text-gray-400 mb-8 space-y-2">
          <li>✔ Skill analysis & career insights</li>
          <li>✔ Startup idea validation</li>
          <li>✔ Industry trend tracking</li>
          <li>✔ Collaboration & project building</li>
        </ul>

        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Access Insights
          </button>

          <button 
                onClick={() => navigate("/login")}
                className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
            Join platform
          </button>
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex justify-center"
      >
        {/* Glow */}
        <div className="absolute w-[300px] h-[300px] bg-purple-600/30 blur-[100px] rounded-full"></div>

        {/* REDUCED IMAGE SIZE */}
        <motion.img
          src="https://images.unsplash.com/photo-1556155092-490a1ba16284"
          alt="hero"
          className="relative rounded-xl w-[85%] md:w-[75%] shadow-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;