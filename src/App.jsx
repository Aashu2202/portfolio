import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Mail, Phone, MapPin, Download, ArrowUpRight, ArrowRight,
  Code2, Database, Workflow, Sparkles, Briefcase, Send,
  Menu, X, ExternalLink, Cpu, Globe, Bot, LineChart,
  ChevronDown, Terminal, Server, Boxes, Wand2, FileCode2, QrCode
} from "lucide-react";

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const cls = (...c) => c.filter(Boolean).join(" ");

// ============== CUSTOM CURSOR ==============
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

// ============== PARTICLE BG ==============
const Particles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const count = window.innerWidth < 768 ? 35 : 75;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d, i) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 165, 116, 0.35)";
        ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const dx = d.x - dots[j].x;
          const dy = d.y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(212, 165, 116, ${0.1 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none opacity-50" />;
};

// ============== LOADER ==============
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

// ============== NAVBAR ==============
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

// ============== TYPING EFFECT ==============
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

// ============== HERO ==============
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
              <button className="group px-6 py-3.5 rounded-xl bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/15 backdrop-blur-sm text-[#f5e6d3] font-semibold text-sm hover:bg-[#f5e6d3]/[0.08] hover:border-[#f5e6d3]/25 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" /> Resume
              </button>
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
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Mail, href: "mailto:hello@aashishyadav.dev" },
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

// ============== SECTION HEADING ==============
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

// ============== ABOUT ==============
const AnimatedNumber = ({ value, suffix }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1500;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.floor(eased * value));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const About = () => {
  const stats = [
    { value: 3, suffix: "+", label: "Years Experience", icon: Briefcase },
    { value: 25, suffix: "+", label: "Projects Completed", icon: Boxes },
    { value: 40, suffix: "+", label: "Automation Workflows", icon: Workflow },
    { value: 8, suffix: "+", label: "ERP Systems Built", icon: Database },
  ];
  const expertise = [
    "MERN Stack", "Google Sheets", "Apps Script", "n8n Automations",
    "ERP Design", "API Integrations", "Business Automation", "AI Workflows"
  ];
  return (
    <section id="about" className="relative py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading kicker="01 — About" title="Engineer behind the systems that quietly run" titleAccent="businesses." />
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-[#a8997f] text-lg leading-relaxed"
          >
            <p>
              I'm a full-stack engineer and automation specialist with a soft spot for
              messy spreadsheets, brittle workflows, and operations that "kind of work"
              — and I turn them into <span className="text-[#f5e6d3] font-medium">ERP systems and pipelines that actually scale</span>.
            </p>
            <p>
              Whether it's a MERN stack web app, a Google Apps Script that replaces
              an entire department's manual work, or an n8n flow connecting six SaaS
              tools — I focus on solutions that ship, perform, and survive a year of edge cases.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {expertise.map((e, i) => (
                <motion.span
                  key={e}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3.5 py-1.5 rounded-full bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 text-xs font-mono text-[#d4a574]/90 backdrop-blur-sm"
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                data-hover
                className="group relative rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 p-6 backdrop-blur-sm overflow-hidden hover:border-[#d4a574]/40 transition-all"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#d4a574]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <s.icon className="w-5 h-5 text-[#d4a574]/80 mb-4" />
                <div className="text-4xl text-[#f5e6d3]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#5c5346] font-mono">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============== SKILLS ==============
const Skills = () => {
  const cats = [
    { title: "Frontend", icon: Code2, items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"] },
    { title: "Backend", icon: Server, items: ["Node.js", "Express.js", "REST APIs"] },
    { title: "Database", icon: Database, items: ["MongoDB", "MySQL"] },
    { title: "Automation", icon: Workflow, items: ["n8n", "Workflow Engines", "Webhooks"] },
    { title: "Google Tech", icon: FileCode2, items: ["Apps Script", "Google Sheets", "Drive API"] },
    { title: "Tools", icon: Terminal, items: ["Git", "Postman", "VS Code"] },
  ];
  return (
    <section id="skills" className="relative py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="02 — Skills"
          title="A stack tuned for"
          titleAccent="shipping."
          subtitle="The tools I reach for daily — from React frontends and Node APIs to glue-code that holds whole companies together."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              data-hover
              className="group relative rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 p-6 backdrop-blur-sm overflow-hidden transition-all hover:border-[#d4a574]/30 hover:shadow-2xl hover:shadow-[#d4a574]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center text-[#d4a574]">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#5c5346]">0{i + 1}</span>
                </div>
                <h3 className="text-xl text-[#f5e6d3] mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>{c.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {c.items.map(it => (
                    <span key={it} className="text-xs px-2.5 py-1 rounded-md bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 text-[#a8997f] font-mono">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============== EXPERIENCE ==============
const Experience = () => {
  const items = [
    {
      company: "D-Table Analytics",
      role: "Full Stack & Automation Engineer",
      period: "Jan 2025 — Present",
      current: true,
      bullets: [
        "Architect end-to-end ERP solutions for operations and analytics",
        "Build Google Apps Script integrations replacing manual processes",
        "Design n8n automation workflows connecting 10+ business tools",
        "Develop MERN stack applications & internal dashboards",
        "Lead business workflow automation initiatives",
      ],
    },
    {
      company: "Averybit Solution Pvt Ltd",
      role: "React & Node.js Developer",
      period: "Feb 2024 — Dec 2024",
      bullets: [
        "Built React.js web apps and React Native mobile apps",
        "Implemented REST APIs with Node.js & Express",
        "Shipped responsive, pixel-perfect UI/UX",
      ],
    },
    {
      company: "Qualwebs Solutions",
      role: "Frontend Developer Intern",
      period: "Internship",
      bullets: [
        "Frontend development with React.js",
        "Built responsive, accessible UI components",
        "First taste of production codebases",
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="03 — Experience"
          title="The path so"
          titleAccent="far."
          subtitle="Three roles. One trajectory: from pixels to platforms."
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#d4a574]/60 via-[#d4a574]/20 to-transparent" />
          {items.map((it, i) => (
            <motion.div
              key={it.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={cls(
                "relative grid md:grid-cols-2 gap-8 mb-12 last:mb-0 items-start",
                i % 2 === 1 && "md:[direction:rtl]"
              )}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-10">
                <motion.div
                  animate={it.current ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={cls(
                    "w-4 h-4 rounded-full border-2",
                    it.current ? "bg-[#d4a574] border-[#f5e6d3]/60 shadow-lg shadow-[#d4a574]/50" : "bg-[#0a0907] border-[#d4a574]/60"
                  )}
                />
              </div>

              <div className={cls("ml-12 md:ml-0 [direction:ltr]", i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12")}>
                <div className="rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 p-6 backdrop-blur-sm hover:border-[#d4a574]/30 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4a574] mb-2">{it.period}</div>
                  <h3 className="text-2xl text-[#f5e6d3]" style={{ fontFamily: "'Instrument Serif', serif" }}>{it.company}</h3>
                  <div className="text-sm text-[#a8997f] mt-1 italic">{it.role}</div>
                  {it.current && (
                    <div className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#d4a574] bg-[#d4a574]/10 border border-[#d4a574]/30 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574] animate-pulse" /> Current
                    </div>
                  )}
                </div>
              </div>

              <div className={cls("ml-12 md:ml-0 [direction:ltr]", i % 2 === 0 ? "md:pl-12" : "md:pr-12")}>
                <ul className="space-y-2.5 text-sm text-[#a8997f]">
                  {it.bullets.map((b, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.08 }}
                      className="flex gap-3 leading-relaxed"
                    >
                      <span className="text-[#d4a574] mt-1 flex-shrink-0">▹</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============== PROJECTS ==============
const Projects = () => {
  const list = [
    { title: "Mindshine App", desc: "Mental wellness mobile + web platform with personalized session flows and progress tracking.", stack: ["React Native", "Node.js", "MongoDB"], icon: Sparkles },
    { title: "ERP & Automation Suite", desc: "End-to-end ERP with HR, inventory, and finance modules glued together by n8n workflows.", stack: ["MERN", "n8n", "MySQL"], icon: Boxes },
    { title: "D-Table Analytics Website", desc: "Marketing + product site for a data analytics company with CMS-driven case studies.", stack: ["React", "Tailwind", "Framer Motion"], icon: LineChart },
    { title: "AI Business Tools", desc: "Internal AI assistants for proposal generation, lead enrichment, and report drafting.", stack: ["OpenAI", "n8n", "Apps Script"], icon: Bot },
    { title: "QR Restaurant Ordering", desc: "Contactless ordering with table-bound QRs, live kitchen display, and payment gateway.", stack: ["React", "Node.js", "MongoDB"], icon: QrCode },
    { title: "Google Sheets Power Tools", desc: "Apps Script add-ons that turn spreadsheets into mini-ERPs with email, PDFs, and webhooks.", stack: ["Apps Script", "Sheets API"], icon: Wand2 },
  ];

  return (
    <section id="projects" className="relative py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="04 — Work"
          title="Selected"
          titleAccent="projects."
          subtitle="A mix of products, internal platforms, and automations that paid for themselves in a quarter."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              data-hover
              className="group relative rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 overflow-hidden backdrop-blur-sm transition-all hover:border-[#d4a574]/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0907]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/15 via-[#d4a574]/5 to-transparent" />
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `linear-gradient(#f5e6d3 1px, transparent 1px), linear-gradient(90deg, #f5e6d3 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.2),transparent_60%)]" />
                <motion.div
                  animate={{ rotate: [0, 8, 0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-[#f5e6d3]/10 backdrop-blur-xl border border-[#f5e6d3]/20 flex items-center justify-center">
                    <p.icon className="w-9 h-9 text-[#d4a574]" />
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-[#0a0907]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <a href="#" className="px-4 py-2 rounded-lg bg-[#d4a574] text-[#0a0907] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#e3b988] transition-colors">
                    Live Demo <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="#" className="px-4 py-2 rounded-lg bg-[#f5e6d3]/10 border border-[#f5e6d3]/30 text-[#f5e6d3] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#f5e6d3]/20 transition-colors">
                    GitHub <Github className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-xl text-[#f5e6d3] group-hover:text-[#d4a574] transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>{p.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-[#5c5346] group-hover:text-[#d4a574] group-hover:rotate-45 transition-all flex-shrink-0 mt-1.5" />
                </div>
                <p className="text-sm text-[#a8997f] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 text-[#a8997f]">{s}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============== SERVICES ==============
const Services = () => {
  const services = [
    { title: "ERP Development", desc: "Custom ERP modules for HR, inventory, finance & ops.", icon: Database },
    { title: "Automation Solutions", desc: "n8n workflows that eliminate repetitive manual work.", icon: Workflow },
    { title: "Web App Development", desc: "End-to-end MERN apps from prototype to production.", icon: Globe },
    { title: "Apps Script Solutions", desc: "Spreadsheets turned into tiny, powerful internal tools.", icon: FileCode2 },
    { title: "AI Workflow Automation", desc: "LLM-powered pipelines for content, ops, and sales.", icon: Bot },
    { title: "Dashboards & Reporting", desc: "Live business dashboards your leadership will actually use.", icon: LineChart },
  ];
  return (
    <section id="services" className="relative py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="05 — Services"
          title="What I can build for"
          titleAccent="you."
          subtitle="Pick a service, or describe the chaos and we'll figure out the fix."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              data-hover
              className="group relative rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 p-7 backdrop-blur-sm overflow-hidden hover:border-[#d4a574]/30 transition-all"
            >
              <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-[#d4a574]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5 text-[#d4a574]" />
                </div>
                <h3 className="text-xl text-[#f5e6d3] mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>{s.title}</h3>
                <p className="text-sm text-[#a8997f] leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4a574]/70 group-hover:text-[#d4a574] transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============== CONTACT ==============
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const contacts = [
    { Icon: Mail, label: "Email", value: "hello@aashishyadav.dev", href: "mailto:hello@aashishyadav.dev" },
    { Icon: Phone, label: "Phone", value: "+91 • Available on request", href: "#" },
    { Icon: MapPin, label: "Location", value: "Indore, India", href: "#" },
    { Icon: Linkedin, label: "LinkedIn", value: "/in/aashishyadav", href: "https://linkedin.com" },
  ];

  return (
    <section id="contact" className="relative py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="06 — Contact"
          title="Got a system to"
          titleAccent="build?"
          subtitle="I read every message. Tell me about your project, your stack, or just say hi."
        />
        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                data-hover
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 backdrop-blur-sm hover:border-[#d4a574]/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center text-[#d4a574] group-hover:scale-110 transition-transform">
                  <c.Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#5c5346] font-mono">{c.label}</div>
                  <div className="text-sm text-[#f5e6d3] truncate">{c.value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#5c5346] group-hover:text-[#d4a574] group-hover:rotate-45 transition-all" />
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-2xl bg-[#f5e6d3]/[0.03] border border-[#f5e6d3]/10 backdrop-blur-sm p-6 md:p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5c5346] font-mono mb-2">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 text-[#f5e6d3] placeholder:text-[#5c5346] focus:border-[#d4a574]/60 focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5c5346] font-mono mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 text-[#f5e6d3] placeholder:text-[#5c5346] focus:border-[#d4a574]/60 focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5c5346] font-mono mb-2">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the system you're trying to build..."
                className="w-full px-4 py-3 rounded-xl bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 text-[#f5e6d3] placeholder:text-[#5c5346] focus:border-[#d4a574]/60 focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cls(
                "w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all",
                status === "sent"
                  ? "bg-green-500/20 border border-green-500/40 text-green-400"
                  : "bg-[#d4a574] text-[#0a0907] hover:bg-[#e3b988] hover:shadow-lg hover:shadow-[#d4a574]/20 disabled:opacity-60"
              )}
            >
              {status === "sending" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 rounded-full border-2 border-[#0a0907]/30 border-t-[#0a0907]"
                />
              )}
              {status === "sent" ? "Message sent!" : status === "sending" ? "Sending…" : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// ============== FOOTER ==============
const Footer = () => (
  <footer className="relative py-12 px-5 md:px-8 border-t border-[#f5e6d3]/[0.06]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#5c5346]">
        © {new Date().getFullYear()} Aashish Yadav — Built with React & Framer Motion
      </div>
      <div className="flex items-center gap-4">
        {[
          { Icon: Github, href: "https://github.com" },
          { Icon: Linkedin, href: "https://linkedin.com" },
          { Icon: Mail, href: "mailto:hello@aashishyadav.dev" },
        ].map(({ Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 flex items-center justify-center text-[#5c5346] hover:text-[#d4a574] hover:border-[#d4a574]/30 transition-all"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ============== APP ROOT ==============
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative bg-[#0a0907] min-h-screen" style={{ cursor: "none" }}>
      <Cursor />
      <Particles />

      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Services />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
