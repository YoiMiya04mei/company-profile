import { Radio, Instagram, Facebook, Linkedin, MapPin, Server, CreditCard } from 'lucide-react';
import { company } from '@/data/company';

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
  { label: 'Contact', href: '#contact' },
];

const handleNav = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Radio className="w-7 h-7 text-cyan-400" />
              <span className="text-white font-bold text-lg tracking-wide">
                JEMBATAN <span className="text-cyan-400">DATA</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Internet Service Provider & Network Infrastructure.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed">
              {company.tagline}
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerServices.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="text-gray-500 hover:text-cyan-400 text-sm transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerCompany.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="text-gray-500 hover:text-cyan-400 text-sm transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={company.portals.dcim.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  <Server className="w-3.5 h-3.5" />
                  DCIM Portal
                </a>
              </li>
              <li>
                <a
                  href={company.portals.billing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Billing System
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#contact')}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors text-left"
                >
                  Technical Support
                </button>
              </li>
              <li className="pt-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-xs leading-relaxed">
                    {company.contact.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © 2026 Jembatan Data. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-gray-700 text-xs hover:text-gray-500 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-gray-700 text-xs hover:text-gray-500 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
