import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { company } from '@/data/company';
import PortalLogin from '@/components/PortalLogin';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();

  const dynamicNavLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.network, href: '#network' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.coverage, href: '#coverage' },
    { label: t.nav.partnership, href: '#partnership' },
    { label: t.nav.contact, href: '#footer' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const logoSrc = resolvedTheme === 'dark' ? '/logo-jdp-dark.png' : '/logo-jdp.png';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-md shadow-lg shadow-slate-200/50 dark:shadow-navy-950/40 border-b border-slate-200/80 dark:border-navy-800/80 py-2.5'
          : 'bg-white/70 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo JDP */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center group focus:outline-none"
          aria-label={company.name}
        >
          <img
            src={logoSrc}
            alt="PT. Jembatan Data Pangrango"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {dynamicNavLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-3/4" />
            </button>
          ))}
        </div>

        {/* Desktop actions: Language Toggle + Theme Toggle + Portal Login */}
        <div className="hidden lg:flex items-center gap-2.5">
          <LanguageToggle variant="dropdown" />
          <ThemeToggle variant="dropdown" />
          <PortalLogin />
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageToggle variant="dropdown" />
          <ThemeToggle variant="dropdown" />
          <button
            className="text-slate-800 dark:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[36rem] mt-3' : 'max-h-0'
        }`}
      >
        <div className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-md mx-4 rounded-xl p-4 flex flex-col gap-1 border border-slate-200 dark:border-navy-700/50 shadow-xl">
          {/* Mobile Settings: Language & Theme Selectors */}
          <div className="pb-3 mb-2 border-b border-slate-200 dark:border-navy-700/50 space-y-3">
            <LanguageToggle variant="segmented" />
            <ThemeToggle variant="segmented" />
          </div>

          {dynamicNavLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2.5 text-left text-slate-700 hover:text-cyan-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-navy-800/50 rounded-lg transition-colors font-medium text-sm"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile portal login links */}
          <div className="pt-3 mt-2 border-t border-slate-200 dark:border-navy-700/50 space-y-2">
            <p className="text-gray-400 dark:text-gray-500 text-xs font-medium uppercase tracking-wide px-4">Customer Portal</p>
            <a
              href={company.portals.dcim.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-100 dark:bg-navy-800/50 rounded-lg hover:bg-slate-200 dark:hover:bg-navy-800 transition-colors"
            >
              <div className="w-8 h-8 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">DCIM</span>
              </div>
              <div>
                <div className="text-slate-900 dark:text-white text-sm font-semibold">{company.portals.dcim.label}</div>
                <div className="text-slate-500 dark:text-gray-500 text-xs">{company.portals.dcim.description}</div>
              </div>
            </a>
            <a
              href={company.portals.billing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-100 dark:bg-navy-800/50 rounded-lg hover:bg-slate-200 dark:hover:bg-navy-800 transition-colors"
            >
              <div className="w-8 h-8 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">BILL</span>
              </div>
              <div>
                <div className="text-slate-900 dark:text-white text-sm font-semibold">{company.portals.billing.label}</div>
                <div className="text-slate-500 dark:text-gray-500 text-xs">{company.portals.billing.description}</div>
              </div>
            </a>
          </div>

          <button
            onClick={() => handleNavClick('#footer')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm mt-3 hover:opacity-95 transition-opacity shadow-md shadow-cyan-500/20"
          >
            {t.nav.contactUs}
          </button>
        </div>
      </div>
    </nav>
  );
}
