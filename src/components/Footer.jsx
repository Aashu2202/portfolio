import { Mail } from "lucide-react";
import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";

const Footer = () => (
  <footer className="relative py-12 px-5 md:px-8 border-t border-[#f5e6d3]/[0.06]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#5c5346]">
        © {new Date().getFullYear()} Aashish Yadav — Built with React & Framer Motion
      </div>
      <div className="flex items-center gap-4">
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
            className="w-9 h-9 rounded-lg bg-[#f5e6d3]/[0.04] border border-[#f5e6d3]/10 flex items-center justify-center text-[#5c5346] hover:text-[#d4a574] hover:border-[#d4a574]/30 transition-all"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
