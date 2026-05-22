import { motion } from "framer-motion";

const SectionHeading = ({ kicker, title, subtitle, titleAccent }) => (
  <div className="mb-16 max-w-3xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex items-center gap-3 mb-5"
    >
      <div className="h-px w-10 bg-[#d4a574]/60" />
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4a574] font-mono">{kicker}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="text-4xl md:text-6xl text-[#f5e6d3] tracking-tight leading-[1.05] font-normal"
      style={{ fontFamily: "'Instrument Serif', serif" }}
    >
      {title}
      {titleAccent && <span className="italic text-[#d4a574]"> {titleAccent}</span>}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2 }}
        className="mt-5 text-[#a8997f] text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
