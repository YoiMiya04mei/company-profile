import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme, Theme } from '@/context/ThemeContext';

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Terang', icon: Sun },
  { value: 'dark', label: 'Gelap', icon: Moon },
  { value: 'system', label: 'Sistem', icon: Monitor },
];

export default function ThemeToggle({ variant = 'dropdown' }: { variant?: 'dropdown' | 'segmented' }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
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

  // Segmented control (ideal for mobile menu)
  if (variant === 'segmented') {
    return (
      <div className="w-full">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 px-1">
          Pilihan Tema
        </div>
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/80 dark:bg-navy-800/80 rounded-xl border border-slate-300/60 dark:border-navy-700/60">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-navy-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label={`Pilih tema ${opt.label}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop dropdown button
  const ActiveIcon = theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-lg text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-navy-800/60 border border-slate-200/80 dark:border-navy-700/60 transition-all duration-200"
        aria-label="Pilih tema tampilan"
        title={`Tema saat ini: ${theme === 'system' ? 'Sistem (Desktop/HP)' : theme === 'dark' ? 'Gelap' : 'Terang'}`}
      >
        <ActiveIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-400 transition-transform duration-300" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-slate-200 dark:border-navy-700/80 py-1.5 z-50 animate-fade-in">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-gray-400 uppercase tracking-wider">
            Tema Tampilan
          </div>
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-navy-800 text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-navy-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-gray-400'}`} />
                  <span>
                    {opt.label}
                    {opt.value === 'system' && (
                      <span className="text-[10px] text-slate-400 dark:text-gray-400 block font-normal -mt-0.5">
                        Otomatis Desktop/HP
                      </span>
                    )}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
