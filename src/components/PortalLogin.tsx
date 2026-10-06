import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Server, CreditCard, ExternalLink } from 'lucide-react';
import { company } from '@/data/company';

export default function PortalLogin() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const portals = [
    { label: company.portals.dcim.label, url: company.portals.dcim.url, icon: Server },
    { label: company.portals.billing.label, url: company.portals.billing.url, icon: CreditCard },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
      >
        Portal Login
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Minimalist Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700/80 rounded-xl shadow-xl p-1.5 z-50 animate-fade-in">
          {portals.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <a
                key={i}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors text-xs font-semibold group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span>{portal.label}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500 group-hover:text-cyan-500 transition-colors opacity-70 group-hover:opacity-100" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
