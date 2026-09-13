import { Wifi, TrendingUp, MonitorCheck, Activity, Headphones, Expand } from 'lucide-react';
import { whyChooseUs } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Wifi> = {
  Wifi, TrendingUp, MonitorCheck, Activity, Headphones, Expand,
};

export default function WhyChooseUs() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-navy-900 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">KEUNGGULAN</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Why Choose <span className="gradient-text">Jembatan Data?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Alasan mengapa bisnis mempercayakan konektivitas mereka kepada kami.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Wifi;
            return (
              <div
                key={i}
                className="group relative bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6 card-hover hover:border-cyan-500/30 transition-colors overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/5 group-hover:to-blue-600/5 transition-all duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/0 group-hover:bg-cyan-500/5 rounded-bl-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
