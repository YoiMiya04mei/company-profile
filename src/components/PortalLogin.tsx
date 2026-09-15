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
    { ...company.portals.dcim, icon: Server },
    { ...company.portals.billing, icon: CreditCard },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
      >
        Portal Login
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-72 bg-navy-800 border border-cyan-500/20 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-3 border-b border-navy-700">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Customer Portal</p>
          <p className="text-gray-500 text-xs mt-0.5">Login to access your services</p>
        </div>
        <div className="p-2">
          {portals.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <a
                key={i}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-navy-700/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-cyan-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/25 transition-colors">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{portal.label}</div>
                  <div className="text-gray-500 text-xs truncate">{portal.description}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              </a>
            );
          })}
        </div>
        <div className="p-3 border-t border-navy-700 bg-navy-900/50">
          <p className="text-gray-600 text-xs text-center">
            Need access? Contact our team.
          </p>
        </div>
      </div>
    </div>
  );
}
