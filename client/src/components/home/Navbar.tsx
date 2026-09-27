const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 backdrop-blur-md bg-white/5 border-b border-white/10">
      
      <h1 className="text-xl font-bold tracking-wide">SkillifyX</h1>

      <ul className="hidden md:flex gap-8 text-gray-300">
        <li className="hover:text-white transition">Home</li>
        <li className="hover:text-white transition">SkillSync</li>
        <li className="hover:text-white transition">Startify</li>
        <li className="hover:text-white transition">About</li>
      </ul>

      <button className="border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
        Explore
      </button>
    </nav>
  );
};

export default Navbar;