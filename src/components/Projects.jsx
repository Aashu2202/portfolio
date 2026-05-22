import { motion } from "framer-motion";
import { Sparkles, Boxes, LineChart, Bot, QrCode, Wand2, ExternalLink, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Github from "../icons/Github";

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
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{ backgroundImage: `linear-gradient(#f5e6d3 1px, transparent 1px), linear-gradient(90deg, #f5e6d3 1px, transparent 1px)`, backgroundSize: "30px 30px" }}
                />
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

export default Projects;
