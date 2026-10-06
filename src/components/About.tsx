import { ShieldCheck, Users, MonitorCheck, Zap } from 'lucide-react';
import { aboutFeatures } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Users,
  MonitorCheck,
  Zap,
};

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-navy-950 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5 mx-auto">
            <span className="text-cyan-300 text-sm font-medium">{t.about.badge}</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
            {t.about.title1} <span className="gradient-text">{t.about.title2}</span>
          </h2>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            const item = t.about.features[i] || feature;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-2xl card-hover"
              >
                <div className="w-14 h-14 bg-cyan-500/15 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
