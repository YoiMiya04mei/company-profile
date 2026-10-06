import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';

function FlagIndonesia({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-xs border border-black/10 flex-shrink-0 object-cover`} viewBox="0 0 36 24" fill="none">
      <rect width="36" height="12" fill="#E70011" />
      <rect y="12" width="36" height="12" fill="#FFFFFF" />
    </svg>
  );
}

function FlagUK({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-xs border border-black/10 flex-shrink-0 object-cover`} viewBox="0 0 60 30">
      <clipPath id="uk-flag-clip-svg">
        <rect width="60" height="30" rx="1" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip-svg)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30 0 V30 M0 15 H60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

const languageOptions: { value: Language; label: string; flagComponent: typeof FlagIndonesia }[] = [
  { value: 'id', label: 'Indonesia', flagComponent: FlagIndonesia },
  { value: 'en', label: 'English', flagComponent: FlagUK },
];

export default function LanguageToggle({ variant = 'dropdown' }: { variant?: 'dropdown' | 'segmented' }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Segmented control (for mobile menu)
  if (variant === 'segmented') {
    return (
      <div className="w-full">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 px-1">
          Bahasa / Language
        </div>
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/80 dark:bg-navy-800/80 rounded-xl border border-slate-300/60 dark:border-navy-700/60">
          {languageOptions.map((opt) => {
            const Flag = opt.flagComponent;
            const isSelected = language === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setLanguage(opt.value)}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-navy-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label={`Pilih bahasa ${opt.label}`}
              >
                <Flag className="w-5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop dropdown button matching the reference design
  const current = languageOptions.find((l) => l.value === language) || languageOptions[0];
  const CurrentFlag = current.flagComponent;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-navy-800/80 border border-slate-200/80 dark:border-navy-700/60 transition-all duration-200"
        aria-label="Pilih bahasa / Select language"
        title={`Bahasa saat ini: ${current.label}`}
      >
        <CurrentFlag className="w-6 h-4" />
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-500 dark:text-gray-300" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-gray-300" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-navy-700/80 p-2 z-50 animate-fade-in">
          {languageOptions.map((opt) => {
            const Flag = opt.flagComponent;
            const isSelected = language === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setLanguage(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-slate-100 dark:bg-navy-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                }`}
              >
                <Flag className="w-6 h-4" />
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
