import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Linkedin from "../icons/Linkedin";
import WhatsApp from "../icons/WhatsApp";
import cls from "../utils/cls";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const contacts = [
    { Icon: Mail, label: "Email", value: "gurjarashish1010@gmail.com", href: "mailto:gurjarashish1010@gmail.com" },
    { Icon: Phone, label: "Phone", value: "+91 7489838868", href: "tel:+917489838868" },
    { Icon: WhatsApp, label: "WhatsApp", value: "+91 7489838868", href: "https://wa.me/917489838868" },
    { Icon: MapPin, label: "Location", value: "Indore, India", href: "#" },
    { Icon: Linkedin, label: "LinkedIn", value: "/in/aashish-yadav-679a81217", href: "https://www.linkedin.com/in/aashish-yadav-679a81217" },
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
                  : status === "error"
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
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
              {status === "sent" ? "Message sent!" : status === "error" ? "Failed — try again" : status === "sending" ? "Sending…" : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
