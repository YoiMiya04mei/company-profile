import { ShieldCheck, Users, MonitorCheck, Zap } from 'lucide-react';
import { company, aboutFeatures } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Users,
  MonitorCheck,
  Zap,
};

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative bg-navy-950 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5 mx-auto">
            <span className="text-cyan-300 text-sm font-medium">TENTANG KAMI</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
            Connectivity That Keeps Your <span className="gradient-text">Business Moving</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            {company.shortName} menyediakan solusi konektivitas dan infrastruktur jaringan untuk membantu perusahaan tetap terhubung, produktif, dan berkembang di era digital.
          </p>

          <p className="text-gray-500 leading-relaxed mb-12">
            {company.description}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-2xl card-hover"
              >
                <div className="w-14 h-14 bg-cyan-500/15 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
