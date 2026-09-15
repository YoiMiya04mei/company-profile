import { ArrowRight, LayoutGrid, ShieldCheck, Activity, Headphones } from 'lucide-react';
import { company } from '@/data/company';

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-navy-950 overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />

      {/* Animated network SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Connection lines */}
        {[
          [100, 150], [300, 300], [200, 500], [500, 200],
          [700, 400], [900, 250], [1050, 450], [800, 600],
          [400, 650], [600, 550], [150, 350], [1100, 200],
        ].map(([x, y], i) => {
          const next = [[100, 150], [300, 300], [200, 500], [500, 200],
            [700, 400], [900, 250], [1050, 450], [800, 600],
            [400, 650], [600, 550], [150, 350], [1100, 200]][(i + 1) % 12];
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={next[0]}
              y2={next[1]}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ animation: `dashFlow ${2 + (i % 3)}s linear infinite` }}
            />
          );
        })}
        {/* Nodes */}
        {[
          [100, 150], [300, 300], [200, 500], [500, 200],
          [700, 400], [900, 250], [1050, 450], [800, 600],
          [400, 650], [600, 550], [150, 350], [1100, 200],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#38bdf8" opacity="0.6">
              <animate
                attributeName="r"
                values="4;8;4"
                dur={`${2 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={x} cy={y} r="12" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3">
              <animate
                attributeName="r"
                values="8;20;8"
                dur={`${3 + (i % 2)}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur={`${3 + (i % 2)}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium">{company.tagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 animate-fade-in-up delay-100">
              Reliable Internet.
              <br />
              <span className="gradient-text">Built for Your Business.</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
              Solusi konektivitas internet dan infrastruktur jaringan yang cepat, stabil, aman, dan siap mendukung kebutuhan digital bisnis Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo('#services')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
              >
                Jelajahi Layanan
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={company.portals.billing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 hover:border-cyan-500/40 transition-all"
              >
                <LayoutGrid className="w-5 h-5" />
                Portal Login
              </a>
            </div>

            {/* Floating info cards */}
            <div className="grid grid-cols-3 gap-3 mt-12 max-w-lg mx-auto lg:mx-0 animate-fade-in-up delay-500">
              {[
                { icon: ShieldCheck, value: '99.9%', label: 'Network Availability' },
                { icon: Activity, value: '24/7', label: 'Network Monitoring' },
                { icon: Headphones, value: 'Dedicated', label: 'Support' },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 ${i === 1 ? 'animate-float' : i === 0 ? 'animate-float-delayed' : ''}`}
                >
                  <card.icon className="w-5 h-5 text-cyan-400 mb-2 mx-auto lg:mx-0" />
                  <div className="text-white font-bold text-sm lg:text-base">{card.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{card.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual — Network topology illustration */}
          <div className="hidden lg:flex justify-center items-center relative animate-slide-right">
            <div className="relative w-full max-w-lg">
              {/* Central hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-28 h-28 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-2xl flex items-center justify-center glow-blue card-hover">
                  <div className="text-center">
                    <Activity className="w-8 h-8 text-white mx-auto mb-1" />
                    <div className="text-white font-bold text-xs">CORE</div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl animate-ping-slow" />
              </div>

              {/* Orbiting nodes */}
              {[
                { angle: 0, label: 'Server', icon: 'S' },
                { angle: 60, label: 'Router', icon: 'R' },
                { angle: 120, label: 'Cloud', icon: 'C' },
                { angle: 180, label: 'Data', icon: 'D' },
                { angle: 240, label: 'Net', icon: 'N' },
                { angle: 300, label: 'ISP', icon: 'I' },
              ].map((node, i) => {
                const radius = 170;
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <div key={i}>
                    <div
                      className="absolute top-1/2 left-1/2 z-10"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <div className="w-14 h-14 bg-navy-800 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 font-bold text-lg card-hover">
                        {node.icon}
                      </div>
                      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-xl -z-10" />
                    </div>
                    {/* Connection line from center to node */}
                    <svg
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        transform: `translate(-50%, -50%)`,
                        overflow: 'visible',
                      }}
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2={x}
                        y2={y}
                        stroke="#38bdf8"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.3"
                        style={{ animation: `dashFlow ${2 + i}s linear infinite` }}
                      />
                    </svg>
                  </div>
                );
              })}

              {/* Outer ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-cyan-500/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-cyan-500/15 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
