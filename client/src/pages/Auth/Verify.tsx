import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOtp = async () => {
    if (!otp) {
      return setNotification({
        type: "error",
        message: "Please enter OTP"
      });
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      setLoading(false);

      if (data.msg === "Verified") {
        setNotification({
          type: "success",
          message: "Verification successful 🎉"
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } else {
        setNotification({
          type: "error",
          message: "Invalid OTP"
        });
      }

    } catch (err) {
      setLoading(false);
      setNotification({
        type: "error",
        message: "Server error. Try again!"
      });
    }
  };

  const resendOtp = async () => {
    setResending(true);

    try {
      await fetch("http://localhost:5000/api/auth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      setNotification({
        type: "success",
        message: "OTP resent successfully ✉️"
      });

    } catch (err) {
      setNotification({
        type: "error",
        message: "Failed to resend OTP"
      });
    }

    setTimeout(() => setResending(false), 1500);
  };

  // 🔁 AUTO HIDE
  useEffect(() => {
    if (notification) {
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
        src="https://images.unsplash.com/photo-1557683316-973673baf926"
        className="absolute w-full h-full object-cover brightness-50 scale-110"
        animate={{ scale: [1.1, 1.15, 1.1] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* 🎨 Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0025]/80 to-black"></div>

      {/* 🌫 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-gray-300/10 to-white/5 backdrop-blur-sm"></div>

      {/* ✨ Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-pink-500/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* 💎 Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-[380px] p-8 rounded-2xl 
        bg-gray-200/10 backdrop-blur-2xl 
        border border-gray-300/30 
        shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      >

        {/* 🔐 Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-purple-600/30 flex items-center justify-center text-white text-xl border border-purple-400/30">
            🔐
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-2 text-white">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP INPUT */}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          maxLength={6}
          placeholder="------"
          className="w-full mb-6 bg-transparent border-b border-purple-400/40 py-3 text-white text-center text-2xl tracking-[0.6em] placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* VERIFY BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={verifyOtp}
          disabled={loading}
          className="w-full py-2 rounded-lg 
          bg-gradient-to-r from-purple-600 to-pink-500 
          text-white font-medium 
          border border-purple-400/40 transition 
          disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </motion.button>

        {/* RESEND */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Didn't receive code?{" "}
          <span
            onClick={resendOtp}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            {resending ? "Sending..." : "Resend"}
          </span>
        </p>

      </motion.div>

      {/* 🔔 NOTIFICATION */}
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

export default Verify;