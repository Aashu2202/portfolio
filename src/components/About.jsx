import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Boxes, Workflow, Database } from "lucide-react";
import SectionHeading from "./SectionHeading";

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
    { value: 10, suffix: "+", label: "Automation Workflows", icon: Workflow },
    { value: 8, suffix: "+", label: "ERP Systems Built", icon: Database },
  ];
  const expertise = [
    "MERN Stack", "Google Sheets", "Apps Script", "n8n Automations",
    "ERP Design", "API Integrations", "Business Automation", "AI Workflows",
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

export default About;
