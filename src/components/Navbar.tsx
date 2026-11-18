import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Show case', path: '/portfolio' },
  { name: 'Contact Us', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.classList.remove('mobile-menu-active');
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links (Large Desktop Viewports) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0c101a]/70 border border-white/[0.07] px-3 py-1.5 rounded-full shadow-inner shadow-black/40 backdrop-blur-md">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-white bg-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.25)] border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Symmetrical Header Contact CTA */}
          <div className="hidden lg:flex items-center justify-end">
            <NavLink
              to="/contact"
              className="btn-luxury-outline inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 hover:text-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Initiate Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </NavLink>
          </div>

          {/* Mobile & Tablet Navigation Header */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <NavLink
              to="/contact"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30"
            >
              Contact
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              style={{ touchAction: 'manipulation' }}
              className="p-2.5 rounded-xl bg-[#0c101a] border border-white/10 text-slate-200 hover:text-white active:scale-95 focus:outline-none transition-transform"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#07090e]/98 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2">
          <div className="px-6 py-6 space-y-3">
            <div className="pb-3 border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>NEXORA NAVIGATION</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Operations Live
              </span>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-white border border-blue-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span>{item.name}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </NavLink>
            ))}

            <div className="pt-4 border-t border-white/10">
              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Architecture Consultation</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
