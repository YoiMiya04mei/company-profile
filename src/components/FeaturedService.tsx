import {
  ArrowRightLeft, Gauge, Globe2, Timer, ShieldCheck, Activity, Headphones, TrendingUp, ArrowRight, Server,
} from 'lucide-react';
import { featuredService } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof ArrowRightLeft> = {
  ArrowRightLeft, Gauge, Globe2, Timer, ShieldCheck, Activity, Headphones, TrendingUp,
};

export default function FeaturedService() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-navy-950 py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        <div className="bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-cyan-500/15 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">LAYANAN UNGGULAN</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                {featuredService.title}
              </h2>
              <p className="text-gray-400 text-lg mb-8">{featuredService.subtitle}</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {featuredService.features.map((feature, i) => {
                  const Icon = iconMap[feature.icon] || Activity;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm font-medium">{feature.label}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
              >
                {featuredService.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right — Network/server visual */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Server stack visual */}
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-navy-800 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-4"
                      style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s backwards` }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <Server className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold">Server Node {i + 1}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-gray-500 text-xs">Active • Low Latency</span>
                        </div>
                      </div>
                      {/* Mini traffic bars */}
                      <div className="flex items-end gap-0.5 h-6">
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            className="w-1 bg-cyan-400/60 rounded-sm animate-network-pulse"
                            style={{
                              height: `${30 + Math.random() * 70}%`,
                              animationDelay: `${(i * 5 + j) * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connection badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl px-4 py-2 shadow-lg animate-float">
                  <div className="text-xs font-medium">1:1 Dedicated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
