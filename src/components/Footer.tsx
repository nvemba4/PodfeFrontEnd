import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const linksRapidos = [
  { label: "Home", href: "#" },
  { label: "Sobre o Podfé", href: "#" },
  { label: "Notícias", href: "#" },
  { label: "Contacto", href: "#" },
  { label: "Mapa do site", href: "#" },
];
const ajudaSuporte = [
  { label: "Indicadores", href: "#" },
  { label: "Perguntas Frequentes", href: "#" },
  { label: "Apoio, Suporte", href: "#" },
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
];
const socialIcons = [
  { icon: "facebook", href: "#" },
  { icon: "instagram", href: "#" },
  { icon: "tiktok", href: "#" },
  { icon: "x", href: "#" },
  { icon: "linkedin", href: "#" },
  { icon: "youtube", href: "#" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#39393b] text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-[#555] pb-8">
        {/* Links Rápidos */}
        <div>
          <h4 className="font-bold text-lg mb-2 border-b border-[#888] pb-1">LINKS RÁPIDOS</h4>
          <ul className="space-y-1">
            {linksRapidos.map(link => (
              <li key={link.label}>
                <a href={link.href} className="hover:underline flex items-center gap-2">
                  <span className="text-red-200">&raquo;</span> {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Ajuda e Suporte */}
        <div>
          <h4 className="font-bold text-lg mb-2 border-b border-[#888] pb-1">AJUDA E SUPORTE</h4>
          <ul className="space-y-1">
            {ajudaSuporte.map(link => (
              <li key={link.label}>
                <a href={link.href} className="hover:underline flex items-center gap-2">
                  <span className="text-red-200">&raquo;</span> {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Contacto */}
        <div>
          <h4 className="font-bold text-lg mb-2 border-b border-[#888] pb-1">CONTACTO</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contato@podfe.org</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> <span className="font-bold text-lg">+244 937 900 958</span></li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Rua do Mat Talatona Luanda</li>
          </ul>
        </div>
        {/* Quem Somos */}
        <div>
          <h4 className="font-bold text-lg mb-2 border-b border-[#888] pb-1">QUEM SOMOS</h4>
          <p className="mb-3 text-sm">O Podfé é uma organização comprometida em levar a Palavra de Deus aos quatro cantos do mundo, através de testemunhos impactantes e ações sociais.</p>
          <div className="flex gap-3 mt-2">
            {/* Social icons - use SVGs for now */}
            <a href="#" aria-label="Facebook" className="hover:text-red-500"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
            <a href="#" aria-label="Instagram" className="hover:text-red-500"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.612.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-7.612 0-5.923-.012-6.332-.07-7.612-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
            <a href="#" aria-label="TikTok" className="hover:text-red-500"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12.5 2.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v.5a4.25 4.25 0 0 0 4.25 4.25h.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.75.75h-.5a6.75 6.75 0 0 1-6.75-6.75v-.5zm-2.25 2.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v10.25a2.25 2.25 0 1 1-2.25-2.25.75.75 0 0 1 .75.75v2a.75.75 0 0 0 1.5 0v-2A3.75 3.75 0 1 0 10.25 15V4.75z"/></svg></a>
            <a href="#" aria-label="X" className="hover:text-red-500"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47a.75.75 0 1 0-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z"/></svg></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-red-500"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.25c.414-.586 1.293-1.25 2.25-1.25 1.654 0 3 1.346 3 3v6z"/></svg></a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.114 0 12 0 12s0 3.886.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.542 20.5 12 20.5 12 20.5s7.458 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.886 24 12 24 12s0-3.886-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="bg-[#232324] text-center text-xs py-3 mt-0">
        Copyright © Podfé 2024. Todos os direitos resevados
      </div>
    </footer>
  );
};

export default Footer; 