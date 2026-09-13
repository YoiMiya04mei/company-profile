import { Check, Star, ArrowRight } from 'lucide-react';
import { pricing } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

export default function Pricing() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative bg-navy-950 py-24">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">PRICING</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Internet Solutions for <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilih paket internet yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {pricing.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 card-hover transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-2 border-cyan-500/40'
                  : 'bg-navy-800/50 border border-navy-700/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-sm tracking-wider mb-3">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-3xl font-extrabold ${plan.highlighted ? 'gradient-text' : 'text-white'}`}>
                    {plan.speed}
                  </span>
                  <span className="text-gray-400 text-sm">{plan.unit}</span>
                </div>
                <div className="mt-2 text-gray-500 text-xs">Rp XXX / bulan</div>
              </div>

              <div className="space-y-2.5 mb-6">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 bg-cyan-500/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-cyan-400" />
                    </div>
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToContact}
                className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 btn-shine'
                    : 'bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-cyan-500/40'
                }`}
              >
                {plan.name === 'CUSTOM' ? 'Contact Sales' : 'Request Quote'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-yellow-400/70 text-xs bg-yellow-500/5 border border-yellow-500/15 rounded-lg px-4 py-3 inline-block max-w-2xl">
            Illustrative pricing — contact our sales team for current pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
