import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { companyProfile } from '../data/companyData';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Server
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#05070a] border-t border-white/[0.08] text-slate-400 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo size="lg" showTagline={true} />
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              {companyProfile.shortDescription}
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>Distributed Global Delivery</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Trust Architecture</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                aria-label="Nexora GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                aria-label="Nexora LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                aria-label="Nexora Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-400 transition-colors">Show case</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Core Services (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">Core Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Custom Software</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Web Applications</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Mobile Engineering</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">AI & Machine Learning</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Cloud Solutions</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">UI/UX Systems</Link>
              </li>
            </ul>
          </div>

          {/* Global Inquiries & Placeholders (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">Direct Engagement</h3>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">{companyProfile.contactEmail}</span>
                  <span className="text-[11px] text-slate-400">Business Inquiries & RFP</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Global Delivery Network</span>
                  <span className="text-[11px] text-slate-400">{companyProfile.hqLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Response Guarantee</span>
                  <span className="text-[11px] text-slate-400">{companyProfile.responseSla}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group"
                >
                  <span>Initiate Architecture RFP</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All global telemetry & production clusters nominal</span>
          </div>

          <div className="text-center sm:text-right">
            © {CURRENT_YEAR} {companyProfile.name}. All rights reserved. <span className="text-slate-400">"{companyProfile.tagline}"</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
