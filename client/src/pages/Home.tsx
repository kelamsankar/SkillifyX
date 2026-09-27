import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import Companies from "../components/Home/Companies";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0025] to-black text-white relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-600/20 blur-[120px] bottom-[-100px] right-[-100px]"></div>

      <Navbar />
      <Hero />
      <Stats />
      <Companies />
    </div>
  );
};

export default Home;