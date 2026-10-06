import { Instagram, Facebook, MapPin, Server, CreditCard } from 'lucide-react';
import { company } from '@/data/company';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.37 22a6.3 6.3 0 0 0 6.27-6.31V9.28a8.16 8.16 0 0 0 4.95 1.66V7.49a4.86 4.86 0 0 1-1-.8z" />
    </svg>
  );
}

const handleNav = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const logoSrc = resolvedTheme === 'dark' ? '/logo-jdp-dark.png' : '/logo-jdp.png';

  const footerCompany = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.network, href: '#network' },
    { label: t.nav.coverage, href: '#coverage' },
    { label: t.nav.partnership, href: '#partnership' },
    { label: t.nav.contact, href: '#footer' },
  ];

  const translatedFooterServices = t.services.items.map(s => s.title);

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
                href={company.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 shadow-sm transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">{t.footer.services}</h3>
            <ul className="space-y-2.5">
              {translatedFooterServices.map((s, i) => (
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
            <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">{t.footer.company}</h3>
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
            <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">{t.footer.support}</h3>
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
            {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <span className="text-slate-500 dark:text-gray-500 text-xs hover:text-cyan-600 dark:hover:text-gray-400 cursor-pointer transition-colors">{t.footer.privacyPolicy}</span>
            <span className="text-slate-500 dark:text-gray-500 text-xs hover:text-cyan-600 dark:hover:text-gray-400 cursor-pointer transition-colors">{t.footer.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
