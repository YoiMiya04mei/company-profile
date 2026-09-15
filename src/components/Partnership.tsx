import {
  Handshake, TrendingUp, Headphones, Share2,
  Router, Cable, Workflow, ArrowRight, Info, Check,
} from 'lucide-react';
import { partnership } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Handshake> = {
  Handshake, TrendingUp, Headphones, Share2,
  Router, Cable, Workflow,
};

export default function Partnership() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="partnership" className="relative bg-navy-900 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">{partnership.eyebrow}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Grow Together with <span className="gradient-text">Jembatan Data</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{partnership.description}</p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {partnership.benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Handshake;
            return (
              <div
                key={i}
                className="group bg-navy-800/50 border border-navy-700/50 rounded-2xl p-5 card-hover hover:border-cyan-500/30 transition-colors text-center"
                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s backwards` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partner programs */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {partnership.programs.map((program, i) => {
            const Icon = iconMap[program.icon] || Router;
            return (
              <div
                key={i}
                className="group bg-gradient-to-br from-navy-800/60 to-navy-900/60 border border-cyan-500/15 rounded-2xl p-7 card-hover hover:border-cyan-500/30 transition-colors"
                style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s backwards` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{program.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{program.description}</p>

                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs px-2.5 py-1 rounded-full"
                    >
                      <Check className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl mb-8 max-w-3xl mx-auto">
          <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-400/80 text-xs leading-relaxed">
            Contoh program partnership — detail benefit, komisi, persyaratan, dan wilayah kerja harus dikonfirmasi oleh tim Jembatan Data.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
          >
            Become a Partner
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
