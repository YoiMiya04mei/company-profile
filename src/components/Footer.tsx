import { Instagram, Facebook, Linkedin, MapPin, Server, CreditCard } from 'lucide-react';
import { company } from '@/data/company';
import { useTheme } from '@/context/ThemeContext';

const footerServices = [
  'Dedicated Internet',
  'Corporate Internet',
  'IP Transit',
  'Colocation',
  'Network Solutions',
];

const footerCompany = [
  { label: 'About', href: '#about' },
  { label: 'Network', href: '#network' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'Contact', href: '#footer' },
];

const handleNav = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/logo-jdp-dark.png' : '/logo-jdp.png';

  return (
    <footer id="footer" className="relative bg-slate-100 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <img
              src={logoSrc}
              alt="PT. Jembatan Data Pangrango"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-slate-900 dark:text-white font-bold text-base mb-1">
              PT. Jembatan Data Pangrango
            </p>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
              Internet Service Provider & Network Infrastructure.
            </p>
            <p className="text-slate-500 dark:text-gray-500 text-xs leading-relaxed">
              {company.tagline}
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 shadow-sm transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 shadow-sm transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 shadow-sm transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerServices.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerCompany.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={company.portals.dcim.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
                >
                  <Server className="w-3.5 h-3.5 text-cyan-500" />
                  DCIM Portal
                </a>
              </li>
              <li>
                <a
                  href={company.portals.billing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-cyan-500" />
                  Billing System
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#footer')}
                  className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors text-left"
                >
                  Technical Support
                </button>
              </li>
              <li className="pt-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-500 dark:text-gray-500 text-xs leading-relaxed">
                    {company.contact.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-gray-500 text-xs text-center sm:text-left font-medium">
            © 2026 PT. Jembatan Data Pangrango. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-slate-500 dark:text-gray-500 text-xs hover:text-cyan-600 dark:hover:text-gray-400 cursor-pointer transition-colors">Kebijakan Privasi</span>
            <span className="text-slate-500 dark:text-gray-500 text-xs hover:text-cyan-600 dark:hover:text-gray-400 cursor-pointer transition-colors">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
