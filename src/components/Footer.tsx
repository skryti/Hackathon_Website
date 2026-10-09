import React from 'react';
import { Heart, MessageSquare, Mail, MapPin } from 'lucide-react';

// Custom SVG Brand Icons
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative border-t border-white/10 dark:border-white/5 pt-16 pb-12 overflow-hidden bg-[#070709] text-gray-400">
      
      {/* Google 4-Color Accent Borderline at Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center p-1.5 shadow-md">
                <div className="font-mono text-sm font-bold flex items-center">
                  <span className="text-google-blue">&lt;</span>
                  <span className="text-google-red">G</span>
                  <span className="text-google-yellow">D</span>
                  <span className="text-google-green">G</span>
                  <span className="text-google-blue">/&gt;</span>
                </div>
              </div>

              <div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  INNOV8-MITS <span className="text-google-blue">'26</span>
                </span>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                  GDG On Campus • MITS-DU Gwalior
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mb-6 leading-relaxed font-sans">
              Organized with passionate dedication by the student developer community at Madhav Institute of Technology & Science (Deemed University), Gwalior, MP, India.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <MapPin className="w-4 h-4 text-google-red shrink-0" />
              <span>MITS Campus, Race Course Road, Gwalior (M.P.) - 474005</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#about" className="hover:text-google-blue transition-colors">About Sprint</a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-google-blue transition-colors">Problem Tracks</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-google-blue transition-colors">36-Hour Timeline</a>
              </li>
              <li>
                <a href="#prizes" className="hover:text-google-blue transition-colors">Prizes & Swag</a>
              </li>
              <li>
                <a href="#rules" className="hover:text-google-blue transition-colors">Judging Criteria</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-google-blue transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Community Channels
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a
                  href="https://discord.gg/gdgmits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-google-blue" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/gdg-mits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <LinkedinIcon />
                  <span>LinkedIn Page</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/gdg_mits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <InstagramIcon />
                  <span>Instagram @gdg_mits</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gdg-mits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <GithubIcon />
                  <span>GitHub Organization</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/gdgmits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <TwitterXIcon />
                  <span>X (Twitter)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="mailto:gdg@mitsgwalior.in"
                className="flex items-center gap-2 text-gray-300 hover:text-google-yellow transition-colors font-mono"
              >
                <Mail className="w-4 h-4 text-google-yellow" />
                <span>gdg@mitsgwalior.in</span>
              </a>

              <p className="text-gray-500 leading-relaxed font-sans">
                Queries regarding sponsorships, judging, or campus facilities? Feel free to email our lead organizing team.
              </p>

              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-google-green/10 text-google-green border border-google-green/30 text-[10px] font-mono font-bold">
                  ● CHAPTER ACTIVE • MITS-DU
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>
            © {new Date().getFullYear()} INNOV8-MITS 2026. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-google-red fill-current" />
            <span>by GDG On Campus MITS-DU Gwalior Team</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
