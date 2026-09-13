import { useState } from 'react';
import { MapPin, X, Send, CheckCircle2 } from 'lucide-react';
import { coverageCities } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

export default function Coverage() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend API to store coverage inquiry
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <section id="coverage" className="relative bg-navy-900 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">COVERAGE</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Our <span className="gradient-text">Coverage</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-2">
            Cek ketersediaan layanan di wilayah Anda.
          </p>
          <span className="inline-block text-yellow-400/80 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-full px-3 py-1">
            Coverage Area — Example
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left — Map visual */}
          <div className="lg:col-span-3">
            <div className="relative bg-navy-800/40 border border-navy-700/50 rounded-2xl p-6 aspect-[4/3]">
              {/* Indonesia map silhouette (simplified SVG) */}
              <svg
                viewBox="0 0 100 75"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0f2540" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Simplified Indonesia island shapes */}
                {/* Sumatra */}
                <path d="M28,25 Q32,20 36,25 L40,35 Q38,42 35,48 L32,52 Q28,48 26,40 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />
                {/* Java */}
                <path d="M38,58 Q45,56 52,58 L60,60 Q62,62 58,64 L48,66 Q42,64 38,62 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />
                {/* Kalimantan */}
                <path d="M50,30 Q56,28 60,32 L62,42 Q60,48 56,50 L50,48 Q46,44 48,36 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />
                {/* Sulawesi */}
                <path d="M63,38 Q67,36 68,40 L67,48 Q65,50 63,48 L62,42 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />
                {/* Papua */}
                <path d="M75,35 Q82,33 85,38 L84,48 Q80,50 76,48 L73,42 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />
                {/* Bali/Nusa Tenggara */}
                <path d="M60,60 Q64,58 68,60 L67,63 Q63,64 60,62 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />
                {/* Maluku */}
                <path d="M70,42 Q72,40 73,43 L72,47 Q70,47 70,44 Z" fill="url(#mapGrad)" stroke="#2d5a8e" strokeWidth="0.3" />

                {/* Coverage city markers */}
                {coverageCities.map((city, i) => (
                  <g key={i}>
                    {/* Pulse ring */}
                    <circle cx={city.x} cy={city.y} r="1.5" fill="none" stroke="#38bdf8" strokeWidth="0.2" opacity="0.5">
                      <animate attributeName="r" values="1.5;4;1.5" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Dot */}
                    <circle cx={city.x} cy={city.y} r="1" fill="#38bdf8">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Label */}
                    <text
                      x={city.x}
                      y={city.y - 2}
                      fill="#94a3b8"
                      fontSize="2"
                      textAnchor="middle"
                      fontWeight="500"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}

                {/* Connection lines between cities */}
                {coverageCities.slice(0, -1).map((city, i) => {
                  const next = coverageCities[i + 1];
                  return (
                    <line
                      key={`line-${i}`}
                      x1={city.x}
                      y1={city.y}
                      x2={next.x}
                      y2={next.y}
                      stroke="#38bdf8"
                      strokeWidth="0.15"
                      strokeDasharray="0.5 0.5"
                      opacity="0.25"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right — City list & CTA */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">Titik Konektivitas</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {coverageCities.map((city, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 bg-navy-800/50 border border-navy-700/50 rounded-lg"
                >
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{city.name}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg mb-6">
              <p className="text-yellow-400/80 text-xs">
                Kota-kota di atas merupakan contoh area coverage. Hubungi kami untuk informasi ketersediaan layanan di lokasi Anda.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
            >
              <MapPin className="w-5 h-5" />
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Coverage form modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-navy-800 border border-cyan-500/20 rounded-2xl max-w-md w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Terima Kasih!</h3>
                <p className="text-gray-400 text-sm">Tim kami akan menghubungi Anda untuk informasi ketersediaan layanan.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold text-xl">Check Availability</h3>
                    <p className="text-gray-500 text-sm mt-1">Isi form untuk cek coverage di lokasi Anda.</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Nama</label>
                    <input required type="text" className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Perusahaan</label>
                    <input type="text" className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Nomor WhatsApp</label>
                    <input required type="tel" className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Alamat</label>
                    <textarea required rows={2} className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none transition-colors resize-none" />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Kebutuhan Bandwidth</label>
                    <input type="text" placeholder="Contoh: 100 Mbps" className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none transition-colors" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine mt-2">
                    <Send className="w-4 h-4" />
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
