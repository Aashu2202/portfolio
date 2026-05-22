import { motion } from "framer-motion";
import { Code2, Server, Database, Workflow, FileCode2, Terminal } from "lucide-react";
import SectionHeading from "./SectionHeading";

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

export default Skills;
