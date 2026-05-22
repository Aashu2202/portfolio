import { motion } from "framer-motion";
import { Database, Workflow, Globe, FileCode2, Bot, LineChart, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

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

export default Services;
