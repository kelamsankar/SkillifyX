import { motion } from "framer-motion";

const Companies = () => {
  return (
    <section className="py-12 text-center">
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-gray-400 mb-6"
      >
        Trusted by teams from leading companies
      </motion.p>

      <div className="flex justify-center gap-10 text-gray-400">
        {["Google", "Microsoft", "Amazon", "Meta", "Netflix"].map((item, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="hover:text-white transition"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default Companies;