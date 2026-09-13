import { Quote } from 'lucide-react';
import { testimonials } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

// NOTE: Replace these testimonials with real customer testimonials.
export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-navy-950 py-24">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">TESTIMONIAL</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-navy-800/50 border border-navy-700/50 rounded-2xl p-8 card-hover hover:border-cyan-500/30 transition-colors"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-navy-700">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.author}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder notice */}
        <div className="text-center mt-8">
          <p className="text-yellow-400/60 text-xs">
            Testimonial di atas merupakan placeholder dan harus diganti dengan testimonial asli.
          </p>
        </div>
      </div>
    </section>
  );
}
