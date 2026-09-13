import { useState } from 'react';
import {
  Globe, Building2, Network, Server, Router, MonitorCheck, Wifi, Share2,
  X, ArrowRight, Check,
} from 'lucide-react';
import { services } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Globe> = {
  Globe, Building2, Network, Server, Router, MonitorCheck, Wifi, Share2,
};

type Service = typeof services[0];

export default function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="relative bg-navy-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 ${visible ? 'visible' : ''} reveal`}>
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">LAYANAN KAMI</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Our Internet & <span className="gradient-text">Network Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Solusi konektivitas lengkap untuk berbagai kebutuhan bisnis — dari dedicated internet hingga managed services.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div
                key={i}
                className="group bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6 card-hover hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <button
                  onClick={() => setSelected(service)}
                  className="flex items-center gap-1.5 text-cyan-400 text-sm font-medium hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-navy-800 border border-cyan-500/20 rounded-2xl max-w-lg w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = iconMap[selected.icon] || Globe;
                  return (
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  );
                })()}
                <h3 className="text-white font-bold text-xl">{selected.title}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-400 mb-6">{selected.description}</p>

            <h4 className="text-white font-semibold text-sm mb-3">Key Features:</h4>
            <div className="space-y-2.5">
              {selected.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-cyan-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelected(null);
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
