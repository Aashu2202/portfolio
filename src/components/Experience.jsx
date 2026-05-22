import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import cls from "../utils/cls";

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

export default Experience;
