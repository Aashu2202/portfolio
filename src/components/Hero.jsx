import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight, Mail, ChevronDown, Cpu } from "lucide-react";
import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";
import cls from "../utils/cls";
import resumePDF from "../assets/Resume.pdf";

const Typewriter = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < word.length) setText(word.slice(0, text.length + 1));
        else setTimeout(() => setDel(true), 1500);
      } else {
        if (text.length > 0) setText(word.slice(0, text.length - 1));
        else { setDel(false); setIdx((idx + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);
  return (
    <span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.9em] bg-[#d4a574] ml-1 -mb-1 align-baseline"
      />
    </span>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#d4a574]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] rounded-full bg-[#d4a574]/[0.05] blur-[120px]" />
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#f5e6d3 1px, transparent 1px), linear-gradient(90deg, #f5e6d3 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-5 md:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 backdrop-blur-sm mb-8"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-[#d4a574] opacity-75" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#d4a574]" />
              </span>
              <span className="text-[10px] text-[#a8997f] font-mono tracking-[0.25em] uppercase">Available for projects</span>
            </motion.div>

            <h1 className="leading-[0.95] tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block text-[clamp(2.8rem,8vw,6.5rem)] text-[#f5e6d3] font-normal"
              >
                Aashish
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="block text-[clamp(2.8rem,8vw,6.5rem)] text-[#d4a574] italic font-normal"
              >
                Yadav.
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-xl md:text-2xl text-[#f5e6d3]/90 h-8 font-light"
            >
              <Typewriter
                words={[
                  "Full Stack MERN Developer",
                  "ERP Solution Architect",
                  "Google Apps Script Expert",
                  "n8n Automation Engineer",
                  "AI Workflow Builder",
                ]}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
              className="mt-5 max-w-xl text-[#a8997f] text-base md:text-lg leading-relaxed"
            >
              Building smart ERP systems, end-to-end automations, and scalable web solutions
              that quietly run businesses while teams sleep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-6 py-3.5 rounded-xl bg-[#d4a574] text-[#0a0907] font-semibold text-sm overflow-hidden hover:bg-[#e3b988] transition-colors"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <a
                href={resumePDF}
                download="Aashish_Yadav_Resume.pdf"
                className="group px-6 py-3.5 rounded-xl bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/15 backdrop-blur-sm text-[#f5e6d3] font-semibold text-sm hover:bg-[#f5e6d3]/[0.08] hover:border-[#f5e6d3]/25 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-6 py-3.5 rounded-xl border border-[#d4a574]/40 text-[#d4a574] font-semibold text-sm hover:bg-[#d4a574]/10 transition-all flex items-center gap-2"
              >
                Contact Me <Mail className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-10 flex items-center gap-5"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#5c5346] font-mono">Connect</div>
              <div className="h-px flex-1 max-w-[60px] bg-[#f5e6d3]/10" />
              {[
                { Icon: Github, href: "https://github.com" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/aashish-yadav-679a81217" },
                { Icon: Mail, href: "mailto:gurjarashish1010@gmail.com" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 flex items-center justify-center text-[#a8997f] hover:text-[#d4a574] hover:border-[#d4a574]/40 hover:-translate-y-1 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative aspect-square"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed"
                  style={{
                    borderColor: i === 0 ? "rgba(212,165,116,0.25)" : i === 1 ? "rgba(245,230,211,0.12)" : "rgba(212,165,116,0.08)",
                    inset: `${i * 30}px`,
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#d4a574] shadow-lg shadow-[#d4a574]/50" />
                </motion.div>
              ))}
              <div className="absolute inset-[90px] rounded-3xl bg-[#f5e6d3]/[0.04] backdrop-blur-xl border border-[#f5e6d3]/10 p-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 via-transparent to-transparent" />
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#d4a574]/80 font-mono mb-2">Current Stack</div>
                  <div className="space-y-1.5">
                    {["MERN", "n8n", "Apps Script", "AI"].map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm font-mono text-[#f5e6d3]/90"
                      >
                        <span className="text-[#d4a574]">▸</span> {t}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-4xl text-[#f5e6d3]" style={{ fontFamily: "'Instrument Serif', serif" }}>3+</div>
                      <div className="text-[10px] uppercase tracking-widest text-[#5c5346] font-mono mt-1">Years</div>
                    </div>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                      <Cpu className="w-10 h-10 text-[#d4a574]/50" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5c5346]"
        >
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
