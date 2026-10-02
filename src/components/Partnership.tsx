import { Handshake } from 'lucide-react';
import { partnership, partners, partnershipLogos } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

export default function Partnership() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Top marquee — partners (/partners folder) — duplicate 3x for seamless loop
  const marqueeListTop = [...partners, ...partners, ...partners];

  // Bottom marquee — partnershipLogos (/partnership folder) — duplicate 2x (many logos)
  const marqueeListBottom = [...partnershipLogos, ...partnershipLogos];

  return (
    <section id="partnership" className="relative bg-navy-900 py-24 overflow-hidden border-y border-navy-800/80">
      {/* Background glowing effects */}
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5 shadow-sm shadow-cyan-500/20">
            <Handshake className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              {partnership.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Grow Together with <span className="gradient-text">Jembatan Data</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {partnership.description}
          </p>
        </div>

        {/* Animated Partnership Logos Carousel / Marquee (Logos Only) */}
        <div className="relative my-4">
          {/* Left & Right Gradient Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-navy-900 via-navy-900/80 to-transparent z-20" />

          {/* Top Marquee Row (Left Scrolling - /partners) */}
          <div className="overflow-hidden py-3 marquee-track">
            <div className="animate-marquee flex items-center gap-5 sm:gap-7">
              {marqueeListTop.map((partner, index) => (
                <div
                  key={`top-${partner.name}-${index}`}
                  className="group w-44 sm:w-56 h-24 sm:h-28 bg-navy-800/80 hover:bg-navy-800 border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-black/25 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 flex items-center justify-center flex-shrink-0 cursor-pointer backdrop-blur-md"
                >
                  <div className="w-full h-full bg-white rounded-xl p-2.5 sm:p-3 flex items-center justify-center border border-slate-200/60 shadow-inner overflow-hidden">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee Row (Right Scrolling - /partnership) — Smaller cards */}
          <div className="overflow-hidden py-2 marquee-track mt-2">
            <div className="animate-marquee-reverse-smooth flex items-center gap-3 sm:gap-5">
              {marqueeListBottom.map((item, index) => (
                <div
                  key={`bottom-${item.name}-${index}`}
                  className="group w-32 sm:w-40 h-16 sm:h-20 bg-navy-800/80 hover:bg-navy-800 border border-cyan-500/20 hover:border-cyan-400/60 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-black/25 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 flex items-center justify-center flex-shrink-0 cursor-pointer backdrop-blur-md"
                >
                  <div className="w-full h-full bg-white rounded-lg p-1.5 sm:p-2 flex items-center justify-center border border-slate-200/60 shadow-inner overflow-hidden">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
