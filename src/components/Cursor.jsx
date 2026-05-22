import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      setHover(!!(t.closest && t.closest("a,button,[data-hover]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{ scale: hover ? 2.5 : 1, opacity: hover ? 0.4 : 1 }}
          className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#d4a574]"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          animate={{ scale: hover ? 1.8 : 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-10 h-10 -ml-5 -mt-5 rounded-full border border-[#d4a574]/40"
        />
      </motion.div>
    </>
  );
};

export default Cursor;
