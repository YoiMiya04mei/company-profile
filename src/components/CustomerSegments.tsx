import { Building2, Briefcase, Share2, Landmark, GraduationCap, Server, Store } from 'lucide-react';
import { customerSegments } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Building2> = {
  Building2, Briefcase, Share2, Landmark, GraduationCap, Server, Store,
};

export default function CustomerSegments() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-navy-950 py-24">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">CUSTOMER SEGMENTS</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Solutions Designed for <span className="gradient-text">Your Business</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kami melayani berbagai segmen pelanggan dengan solusi yang disesuaikan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {customerSegments.map((segment, i) => {
            const Icon = iconMap[segment.icon] || Building2;
            return (
              <div
                key={i}
                className="group bg-navy-800/50 border border-navy-700/50 rounded-2xl p-5 card-hover hover:border-cyan-500/30 transition-colors text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{segment.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{segment.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
