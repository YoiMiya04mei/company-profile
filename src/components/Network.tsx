import { Cloud, Server, Network, Router, Building2, Check } from 'lucide-react';
import { networkTopology, networkFeatures } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Cloud> = {
  Cloud, Server, Network, Router, Building2,
};

export default function NetworkInfrastructure() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="network" className="relative bg-navy-900 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">INFRASTRUKTUR</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Our <span className="gradient-text">Network Infrastructure</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Arsitektur jaringan multi-layer yang dirancang untuk reliabilitas dan performa tinggi.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left — Topology diagram */}
          <div className="lg:col-span-3">
            <div className="relative bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8">
              {/* Vertical topology */}
              <div className="flex flex-col items-center gap-0">
                {networkTopology.map((node, i) => {
                  const Icon = iconMap[node.icon] || Server;
                  const isLast = i === networkTopology.length - 1;
                  return (
                    <div key={i} className="flex flex-col items-center w-full">
                      <div
                        className="flex items-center gap-4 bg-navy-800 border border-cyan-500/20 rounded-xl px-6 py-4 w-full max-w-md card-hover"
                        style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.15}s backwards` }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{node.label}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{node.description}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                      </div>

                      {/* Connection line */}
                      {!isLast && (
                        <div className="relative h-12 w-px flex items-center justify-center">
                          <div className="w-px h-full bg-gradient-to-b from-cyan-500/40 to-cyan-500/20" />
                          {/* Animated dot traveling down */}
                          <div
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                            style={{
                              animation: `float 2s ease-in-out ${i * 0.3}s infinite`,
                              boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — Features list */}
          <div className="lg:col-span-2 space-y-3">
            {networkFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-navy-800/50 border border-navy-700/50 rounded-xl card-hover hover:border-cyan-500/30 transition-colors"
                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s backwards` }}
              >
                <div className="w-8 h-8 bg-cyan-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
