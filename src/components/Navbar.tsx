import { useState, useEffect } from 'react';
import { Menu, X, Radio, Phone } from 'lucide-react';
import { navLinks, company } from '@/data/company';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-lg shadow-navy-950/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-2.5 group"
          aria-label={company.name}
        >
          <div className="relative">
            <Radio className="w-7 h-7 text-cyan-400 transition-transform group-hover:rotate-180 duration-500" />
            <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full -z-10 animate-pulse-glow" />
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            JEMBATAN <span className="text-cyan-400">DATA</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-3/4" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex">
          <button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
          >
            <Phone className="w-4 h-4" />
            Hubungi Kami
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <div className="bg-navy-900/95 backdrop-blur-md mx-4 rounded-xl p-4 flex flex-col gap-1 border border-navy-700/50">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-3 text-left text-gray-300 hover:text-cyan-400 hover:bg-navy-800/50 rounded-lg transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-lg font-semibold text-sm mt-2"
          >
            <Phone className="w-4 h-4" />
            Hubungi Kami
          </button>
        </div>
      </div>
    </nav>
  );
}
