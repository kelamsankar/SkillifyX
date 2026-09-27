import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 
    bg-gradient-to-r from-black via-[#1a0025] to-black 
    border-b border-white/10 shadow-lg">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 
          flex items-center justify-center font-bold text-white 
          shadow-md group-hover:scale-105 transition">
            S
          </div>

          <span className="text-white font-semibold text-lg tracking-wide">
            SkillifyX
          </span>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden md:flex items-center bg-white/5 px-4 py-2 rounded-xl 
        border border-white/10 hover:border-purple-500/40 
        focus-within:ring-1 focus-within:ring-purple-500/30 transition-all duration-200">

          <Search size={16} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-white ml-2 placeholder-gray-400 w-40"
          />
        </div>

        {/* Notification */}
        <div className="relative group cursor-pointer">
          <div className="p-2 rounded-lg hover:bg-white/10 transition">
            <Bell className="text-gray-300 group-hover:text-white transition" />
          </div>

          <span className="absolute top-1 right-1 bg-red-500 text-[10px] 
          w-4 h-4 flex items-center justify-center rounded-full shadow">
            3
          </span>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer relative group"
          onClick={() => setOpen(!open)}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 
          flex items-center justify-center text-white font-semibold shadow-md 
          group-hover:scale-105 transition">
            S
          </div>

          <div className="hidden md:block leading-tight">
            <p className="text-sm text-white">Sai</p>
            <p className="text-xs text-gray-400">Student</p>
          </div>

          <ChevronDown size={16} className="text-gray-400 group-hover:text-white transition" />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-44 
            bg-[#140020]/95 backdrop-blur-lg 
            border border-white/10 rounded-xl shadow-2xl p-2 animate-fadeIn">

              <div className="px-3 py-2">
                <p className="text-sm text-white">Sai</p>
                <p className="text-xs text-gray-400">Student</p>
              </div>

              <div className="border-t border-white/10 my-2"></div>

              <p className="px-3 py-2 text-sm hover:bg-white/5 rounded-lg cursor-pointer transition">
                Profile
              </p>

              <p className="px-3 py-2 text-sm hover:bg-white/5 rounded-lg cursor-pointer transition">
                Settings
              </p>

              <div className="border-t border-white/10 my-2"></div>

              <p
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("token_expiry");
                    navigate("/login", { replace: true });
                }}
                className="px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg cursor-pointer transition"
                >
                Logout
                </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Topbar;