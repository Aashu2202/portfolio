import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import cls from "../utils/cls";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map(n => document.getElementById(n.id));
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= y) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      className={cls("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className={cls(
          "flex items-center justify-between transition-all duration-500 rounded-2xl",
          scrolled ? "bg-[#0a0907]/80 backdrop-blur-xl border border-[#f5e6d3]/[0.06] px-5 py-3" : "px-1 py-1"
        )}>
          <button onClick={() => go("home")} className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-lg bg-[#d4a574]/30 blur-sm"
              />
              <div className="relative w-full h-full rounded-lg bg-[#0a0907] border border-[#d4a574]/40 flex items-center justify-center">
                <span className="text-base font-black text-[#d4a574]" style={{ fontFamily: "'Instrument Serif', serif" }}>AY</span>
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium tracking-wide text-[#f5e6d3]">Aashish Yadav</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4a574]/70 font-mono">/ engineer</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(n => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={cls(
                  "relative px-4 py-2 text-sm transition-colors font-medium",
                  active === n.id ? "text-[#f5e6d3]" : "text-[#a8997f] hover:text-[#f5e6d3]"
                )}
              >
                {active === n.id && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 rounded-xl bg-[#f5e6d3]/[0.06] border border-[#f5e6d3]/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("contact")}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a574] text-[#0a0907] text-sm font-semibold hover:bg-[#e3b988] hover:shadow-lg hover:shadow-[#d4a574]/20 transition-all"
            >
              Let's Talk <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl bg-[#f5e6d3]/[0.05] border border-[#f5e6d3]/10 flex items-center justify-center text-[#f5e6d3]"
              aria-label="menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mx-5 mt-3 rounded-2xl bg-[#0a0907]/95 backdrop-blur-xl border border-[#f5e6d3]/10 p-4"
          >
            {navItems.map(n => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={cls(
                  "block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  active === n.id ? "bg-[#f5e6d3]/[0.06] text-[#f5e6d3]" : "text-[#a8997f] hover:text-[#f5e6d3]"
                )}
              >
                {n.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
