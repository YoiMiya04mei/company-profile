import { ShieldCheck, Activity, Headphones, FileText } from 'lucide-react';
import { slaData } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const icons = [ShieldCheck, Activity, Headphones, FileText];

export default function SLA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-navy-900 py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">RELIABILITY</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Built for <span className="gradient-text">Reliability</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Infrastruktur dan layanan kami dirancang untuk memberikan ketersediaan tinggi.
          </p>
        </div>

        {/* SLA cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {slaData.map((item, i) => {
            const Icon = icons[i] || ShieldCheck;
            return (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-navy-800/60 to-navy-900/60 border border-cyan-500/15 rounded-2xl p-8 text-center card-hover hover:border-cyan-500/30 transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-extrabold gradient-text mb-2">
                    {item.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-yellow-400/70 text-xs bg-yellow-500/5 border border-yellow-500/15 rounded-lg px-4 py-3 inline-block max-w-2xl">
            Angka di atas merupakan contoh/template dan harus diganti dengan SLA resmi perusahaan.
          </p>
        </div>
      </div>
    </section>
  );
}
