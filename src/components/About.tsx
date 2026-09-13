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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Description */}
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-cyan-300 text-sm font-medium">TENTANG KAMI</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
              Connectivity That Keeps Your <span className="gradient-text">Business Moving</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {company.shortName} menyediakan solusi konektivitas dan infrastruktur jaringan untuk membantu perusahaan tetap terhubung, produktif, dan berkembang di era digital.
            </p>

            <p className="text-gray-500 leading-relaxed mb-10">
              {company.description}
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {aboutFeatures.map((feature, i) => {
                const Icon = iconMap[feature.icon] || ShieldCheck;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl card-hover"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Network infrastructure visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central data center representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-700/20 rounded-3xl blur-2xl" />

                  {/* Server racks illustration */}
                  <div className="relative bg-navy-800 border border-cyan-500/20 rounded-2xl p-6 h-full flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-xs font-medium">DATA CENTER</span>
                      </div>
                      <MonitorCheck className="w-4 h-4 text-cyan-400" />
                    </div>

                    {/* Server rack rows */}
                    {[...Array(5)].map((_, row) => (
                      <div key={row} className="flex gap-2">
                        {[...Array(6)].map((_, col) => (
                          <div
                            key={col}
                            className="flex-1 h-8 bg-navy-700 rounded border border-cyan-500/10 relative overflow-hidden"
                          >
                            <div
                              className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full animate-network-pulse"
                              style={{
                                background: (row + col) % 3 === 0 ? '#22d3ee' : (row + col) % 3 === 1 ? '#38bdf8' : '#475569',
                                animationDelay: `${(row * 6 + col) * 0.1}s`,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Bottom stats */}
                    <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-navy-700">
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold text-sm">99.9%</div>
                        <div className="text-gray-600 text-[10px]">UPTIME</div>
                      </div>
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold text-sm">10G</div>
                        <div className="text-gray-600 text-[10px]">BACKBONE</div>
                      </div>
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold text-sm">24/7</div>
                        <div className="text-gray-600 text-[10px]">NOC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating connection indicators */}
              <div className="absolute top-8 right-0 bg-navy-800/80 backdrop-blur border border-cyan-500/20 rounded-lg px-3 py-2 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-gray-300 text-xs">Core Online</span>
                </div>
              </div>
              <div className="absolute bottom-8 left-0 bg-navy-800/80 backdrop-blur border border-cyan-500/20 rounded-lg px-3 py-2 animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-gray-300 text-xs">Redundant Path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
