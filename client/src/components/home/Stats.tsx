import { motion } from "framer-motion";

const Stats = () => {
  return (
    <section className="px-10 -mt-10">
      <div className="grid md:grid-cols-3 gap-6 text-center">
        
        {[ "10K+", "500+", "95%" ].map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition"
          >
            <h2 className="text-3xl text-purple-400 font-bold">{value}</h2>
            <p className="text-gray-400">
              {index === 0 && "Active Users"}
              {index === 1 && "Startups Built"}
              {index === 2 && "Success Rate"}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Stats;