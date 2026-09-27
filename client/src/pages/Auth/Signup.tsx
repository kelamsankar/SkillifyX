import { useState,useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if(!name || !email || !password) {
        return setNotification({
            type: "error", 
            message: "Please fill all fields"
        });
    }
    setLoading(true);
    try{
    const res= await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    setLoading(false);

    if (data.msg === "OTP sent") {
      setNotification({
          type: "success",
          message: "OTP sent to your email ✉️"
        });

        setTimeout(() => {
          navigate("/verify", { state: { email } });
        }, 1500);
    } else {
      setNotification({
          type: "error",
          message: data.msg
        });
    }
    }catch(err){
        setLoading(false);
        setNotification({
            type: "error",
            message: "Something went wrong. Please try again."
        });
    }
    };
    useEffect(() => {
        if(notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌆 Background */}
      <motion.img
        src="data:image/jpeg;base64,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"
        className="absolute w-full h-full object-cover scale-110 brightness-100"
        animate={{ scale: [1.1, 1.15, 1.1] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* 🎨 Gradient (same as login/home) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0025]/80 to-gray"></div>

      {/* 🌫 White + Gray translucent */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-gray-300/10 to-white/5 backdrop-blur-sm"></div>

      {/* ✨ Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-gray-300/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* 💎 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[380px] p-8 rounded-2xl 
        bg-gray-200/10 backdrop-blur-2xl 
        border border-gray-300/30 
        shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      >

        {/* 👤 Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-gray-300/20 flex items-center justify-center text-white text-xl backdrop-blur-md border border-gray-400/30">
            👤
          </div>
        </motion.div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6 text-white">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 bg-transparent border-b border-gray-300/40 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 transition"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 bg-transparent border-b border-gray-300/40 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 bg-transparent border-b border-gray-300/40 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-pink-400 transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Signup Button */}
        <motion.button
          whileHover={{
            scale: 1.07,
            boxShadow: "0px 0px 25px rgba(168,85,247,0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="w-full py-2 rounded-lg 
          bg-gradient-to-r from-purple-600/80 to-pink-500/80 
          text-white font-medium 
          border border-purple-400/40 transition"
        >
          Signup
        </motion.button>

        {/* Bottom */}
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-center text-sm text-gray-400 mt-5 cursor-pointer hover:text-white transition"
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <span className="text-purple-400 underline">
            Login
          </span>
        </motion.p>

      </motion.div>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl 
            backdrop-blur-xl border shadow-lg z-50 flex items-center gap-2
            ${
              notification.type === "success"
                ? "bg-green-500/20 border-green-400/40 text-green-300"
                : "bg-red-500/20 border-red-400/40 text-red-300"
            }`}
          >
            <span>
              {notification.type === "success" ? "✅" : "⚠️"}
            </span>
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Signup;