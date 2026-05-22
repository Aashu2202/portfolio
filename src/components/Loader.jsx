import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(i); setTimeout(onDone, 400); return 100; }
        return p + Math.random() * 8 + 4;
      });
    }, 80);
    return () => clearInterval(i);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[200] bg-[#0a0907] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8 px-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-24 h-24 rounded-full border-2 border-transparent border-t-[#d4a574] border-r-[#f5e6d3]/30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black text-[#f5e6d3]" style={{ fontFamily: "'Instrument Serif', serif" }}>AY</span>
          </div>
        </div>
        <div className="w-64">
          <div className="flex justify-between mb-2 text-[10px] text-[#d4a574]/80 font-mono tracking-[0.3em] uppercase">
            <span>Initializing</span>
            <span>{Math.min(100, Math.floor(progress))}%</span>
          </div>
          <div className="h-px bg-[#f5e6d3]/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#d4a574]"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
