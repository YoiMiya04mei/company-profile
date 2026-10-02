import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { ArrowUpRight, Radio, ShieldCheck, Sparkles } from 'lucide-react';

// ── Canvas dimensions (viewBox basis) ────────────────────────────────────────
const CW = 1100;
const CH = 620;

// ── JDP Hub position ──────────────────────────────────────────────────────────
const HUB_X = 550;
const HUB_Y = 445;

// ── Exchange / Peer Node data with staggered positions ────────────────────────
interface ENode {
  id: string;
  name: string;
  logo: string;
  x: number;
  y: number;
}

const nodes: ENode[] = [
  // ── Row 1 — Internet Exchange Points (IXP) ──
  { id: 'iix',      name: 'IIX APJII',    logo: '/exchange/images (5).png',                         x: 175,  y: 62  },
  { id: 'jkt-ix',   name: 'JKT-IX',       logo: '/exchange/jkt-ixlogo (1).png',                     x: 335,  y: 44  },
  { id: 'epix',     name: 'EPIX',         logo: '/exchange/epix-logo (1).webp',                     x: 550,  y: 36  },
  { id: 'openixp',  name: 'OpenIXP',      logo: '/exchange/openixp.png',                            x: 765,  y: 44  },
  { id: 'ace',      name: 'ACE AS139341', logo: '/exchange/sitelogo.2293256d.png',                   x: 925,  y: 62  },

  // ── Row 2 — Cloud / CDN / Global Tech ──
  { id: 'cloudflare',   name: 'Cloudflare',    logo: '/exchange/cloudflare-logo-png-svg.webp',       x: 60,   y: 185 },
  { id: 'meta',         name: 'Meta',          logo: '/exchange/meta-logo.webp',                     x: 220,  y: 165 },
  { id: 'netflix',      name: 'Netflix',       logo: '/exchange/netflix-logo-png-svg.webp',          x: 400,  y: 174 },
  { id: 'akamai',       name: 'Akamai',        logo: '/exchange/akamai-logo-png-svg.webp',           x: 550,  y: 158 },
  { id: 'google-cache', name: 'Google Cache',  logo: '/exchange/images (6).png',                    x: 700,  y: 174 },
  { id: 'alibaba-cloud',name: 'Alibaba Cloud', logo: '/exchange/alibaba-cloud-logo.webp',            x: 880,  y: 165 },
  { id: 'zenlayer',     name: 'Zenlayer',      logo: '/exchange/nnttpeosv1k1x5x9ukts.png',           x: 1040, y: 185 },

  // ── Row 3 — Content / OTT / E-Commerce ──
  { id: 'alibaba',  name: 'Alibaba.com',  logo: '/exchange/alibaba-com-logo-png_seeklogo-6545.png', x: 150,  y: 310 },
  { id: 'amazon',   name: 'Amazon',       logo: '/exchange/amazon-logo-png-svg.webp',               x: 370,  y: 295 },
  { id: 'sea',      name: 'Sea Group',    logo: '/exchange/Sea_Group_logo.svg.webp',                x: 550,  y: 292 },
  { id: 'gcore',    name: 'Gcore',        logo: '/exchange/gcore-logo-png-svg.webp',                x: 730,  y: 295 },
];

// ── Generate cubic-bezier path from node → hub ───────────────────────────────
function makePath(nx: number, ny: number): string {
  const dx = HUB_X - nx;
  const dy = HUB_Y - ny;
  // cp1: leave node going toward hub (slight lateral sweep)
  const cp1x = nx + dx * 0.3;
  const cp1y = ny + dy * 0.15;
  // cp2: approach hub from above (smooth curve)
  const cp2x = nx + dx * 0.7;
  const cp2y = ny + dy * 0.65;
  return `M ${nx} ${ny} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${HUB_X} ${HUB_Y}`;
}

// ── Hub port attachment coordinates ──────────────────────────────────────────
function hubPort(nx: number, ny: number, r: number) {
  const angle = Math.atan2(ny - HUB_Y, nx - HUB_X);
  return { px: HUB_X + Math.cos(angle) * r, py: HUB_Y + Math.sin(angle) * r };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function NetworkInfrastructure() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="network" className="relative bg-navy-900 py-20 lg:py-28 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}
      >
        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Network Exchange Topology
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Our <span className="gradient-text">Exchange Interconnection</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Infrastruktur JDPIX terhubung langsung ke seluruh Internet Exchange Point utama,
            CDN global, dan Cloud Provider tier-1 Indonesia & internasional.
          </p>
        </div>

        {/* ── Topology card ── */}
        <div className="relative bg-navy-800/40 border border-cyan-500/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl pointer-events-none" />

          {/* ════════════════════════════════════════
              DESKTOP TOPOLOGY  (md and above)
              ════════════════════════════════════════ */}
          <div
            className="hidden md:block relative w-full"
            style={{ paddingBottom: `${(CH / CW) * 100}%` }}
          >
            <div className="absolute inset-0">

              {/* ── SVG: lines only ── */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${CW} ${CH}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Per-line gradient: node colour → hub cyan */}
                  {nodes.map(node => (
                    <linearGradient
                      key={`g-${node.id}`}
                      id={`lg-${node.id}`}
                      gradientUnits="userSpaceOnUse"
                      x1={node.x} y1={node.y}
                      x2={HUB_X}  y2={HUB_Y}
                    >
                      <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                    </linearGradient>
                  ))}

                  {/* Soft glow for animated pulses */}
                  <filter id="pulse-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Hub glow filter */}
                  <filter id="hub-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer rotating rings around hub */}
                <circle cx={HUB_X} cy={HUB_Y} r="68"
                  fill="rgba(6,182,212,0.06)"
                  stroke="#06b6d4" strokeOpacity="0.25"
                  strokeWidth="1.5" strokeDasharray="5 6">
                  <animateTransform attributeName="transform" type="rotate"
                    from={`0 ${HUB_X} ${HUB_Y}`} to={`360 ${HUB_X} ${HUB_Y}`}
                    dur="22s" repeatCount="indefinite" />
                </circle>
                <circle cx={HUB_X} cy={HUB_Y} r="84"
                  fill="none"
                  stroke="#38bdf8" strokeOpacity="0.12"
                  strokeWidth="1" strokeDasharray="3 10">
                  <animateTransform attributeName="transform" type="rotate"
                    from={`360 ${HUB_X} ${HUB_Y}`} to={`0 ${HUB_X} ${HUB_Y}`}
                    dur="34s" repeatCount="indefinite" />
                </circle>

                {/* ── Per-node: base line + animated data-pulse ── */}
                {nodes.map((node, i) => {
                  const d = makePath(node.x, node.y);
                  const isHot = hoveredId === node.id;
                  // Stagger: each node gets a slightly different speed & delay
                  const dur   = (1.6 + (i % 6) * 0.25).toFixed(2);
                  const delay = (i * 0.22).toFixed(2);
                  const { px, py } = hubPort(node.x, node.y, 58);

                  return (
                    <g key={node.id}>
                      {/* Static base cable */}
                      <path
                        d={d}
                        fill="none"
                        stroke={`url(#lg-${node.id})`}
                        strokeWidth={isHot ? 2 : 1.3}
                        strokeOpacity={isHot ? 0.85 : 0.3}
                        style={{ transition: 'stroke-width 0.25s, stroke-opacity 0.25s' }}
                      />

                      {/* Bright glow duplicate when hovered */}
                      {isHot && (
                        <path
                          d={d}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeOpacity="0.4"
                          filter="url(#pulse-glow)"
                        />
                      )}

                      {/* Animated data-pulse dot travelling node→hub */}
                      <path
                        d={d}
                        fill="none"
                        stroke="#7dd3fc"
                        strokeWidth={isHot ? 4 : 2.5}
                        strokeLinecap="round"
                        strokeDasharray="8 220"
                        filter="url(#pulse-glow)"
                        strokeOpacity={isHot ? 1 : 0.8}
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="228"
                          to="0"
                          dur={`${dur}s`}
                          begin={`${delay}s`}
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Second trailing pulse (offset phase) for density effect */}
                      <path
                        d={d}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="4 220"
                        strokeOpacity="0.5"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="228"
                          to="0"
                          dur={`${dur}s`}
                          begin={`${(parseFloat(delay) + parseFloat(dur) / 2).toFixed(2)}s`}
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Hub port dot */}
                      <circle cx={px} cy={py} r="3" fill="#06b6d4" opacity="0.55">
                        <animate attributeName="opacity"
                          values="0.25;0.9;0.25"
                          dur={`${(1.8 + i * 0.15).toFixed(1)}s`}
                          repeatCount="indefinite" />
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* ── HTML Layer: exchange logo circles ── */}
              {nodes.map((node, i) => {
                const left = `${(node.x / CW) * 100}%`;
                const top  = `${(node.y / CH) * 100}%`;
                const isHot = hoveredId === node.id;

                return (
                  <div
                    key={node.id}
                    style={{ position: 'absolute', left, top, transform: 'translate(-50%,-50%)', animationDelay: `${i * 0.07}s` }}
                    className="z-20 flex flex-col items-center animate-fade-in-up cursor-pointer group"
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Glow aura */}
                    <div
                      className="absolute -inset-2 rounded-full blur-md transition-opacity duration-300"
                      style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)', opacity: isHot ? 0.7 : 0 }}
                    />

                    {/* Circular logo badge */}
                    <div
                      className={`relative w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 border-2 shadow-lg transition-all duration-300 ${
                        isHot
                          ? 'border-cyan-400 shadow-cyan-500/50 scale-110 -translate-y-1 ring-4 ring-cyan-500/20'
                          : 'border-white/80 group-hover:border-cyan-300 group-hover:scale-105 group-hover:-translate-y-0.5'
                      }`}
                    >
                      <img
                        src={node.logo}
                        alt={node.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                      {/* Live status dot */}
                      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                      </span>
                    </div>

                    {/* Name label */}
                    <div
                      className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap bg-navy-900/90 border transition-colors duration-200 ${
                        isHot ? 'text-cyan-300 border-cyan-500/50' : 'text-slate-300 border-slate-700/60 group-hover:text-cyan-300 group-hover:border-cyan-500/30'
                      }`}
                    >
                      {node.name}
                    </div>

                    {/* Hover tooltip */}
                    {isHot && (
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-44 bg-navy-900/98 border border-cyan-500/50 rounded-xl p-2.5 shadow-2xl z-50 pointer-events-none animate-fade-in">
                        <div className="text-[10px] font-bold text-white mb-1.5 flex items-center justify-between">
                          <span>{node.name}</span>
                          <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px]">Active</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[9px] bg-black/30 rounded-lg p-1.5">
                          <div><span className="text-slate-400 block">Bandwidth</span><span className="text-cyan-300 font-bold">100G</span></div>
                          <div><span className="text-slate-400 block">Latency</span><span className="text-emerald-400 font-bold">&lt;2ms</span></div>
                          <div><span className="text-slate-400 block">Protocol</span><span className="text-white font-bold">BGP4</span></div>
                          <div><span className="text-slate-400 block">Uptime</span><span className="text-emerald-400 font-bold">99.99%</span></div>
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-navy-900/98" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ── Central JDP Hub ── */}
              <div
                style={{
                  position: 'absolute',
                  left: `${(HUB_X / CW) * 100}%`,
                  top:  `${(HUB_Y / CH) * 100}%`,
                  transform: 'translate(-50%,-50%)',
                }}
                className="z-30 flex flex-col items-center"
              >
                {/* Pulsing outer glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 rounded-full blur-2xl opacity-35 animate-pulse-glow pointer-events-none" />

                {/* Hub badge */}
                <div className="relative w-32 h-32 rounded-full bg-white border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 flex items-center justify-center p-4">
                  <img src="/logo-jdp.png" alt="JDP Core Hub" className="max-h-full max-w-full object-contain" />
                </div>

                {/* Hub label */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-[10px] px-3 py-0.5 rounded-full shadow-lg tracking-widest whitespace-nowrap uppercase">
                  <Sparkles className="w-2.5 h-2.5" />
                  JDP CORE HUB
                </div>
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════════
              MOBILE FALLBACK (below md)
              ════════════════════════════════════════ */}
          <div className="block md:hidden">
            {/* JDP center card */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-cyan-400 p-3 flex items-center justify-center shadow-xl shadow-cyan-500/25">
                  <img src="/logo-jdp.png" alt="JDP Hub" className="max-h-full max-w-full object-contain" />
                </div>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black shadow">
                <Sparkles className="w-3 h-3" /> JDP CORE HUB
              </div>
            </div>

            {/* All logos grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {nodes.map(node => (
                <div key={node.id} className="flex flex-col items-center gap-1 group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 group-hover:border-cyan-400 flex items-center justify-center p-2 shadow transition-all duration-200">
                    <img src={node.logo} alt={node.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-300 text-center leading-tight">{node.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              JDPIX SERVICE CARDS (below topology)
              ════════════════════════════════════════ */}
          <div className="mt-6 pt-5 border-t border-navy-700/60">
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-500/30" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Layanan JDPIX
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-500/30" />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {/* JDPIX Standard */}
              <div className="flex-1 min-w-[220px] max-w-xs bg-gradient-to-br from-cyan-500/15 to-blue-700/20 border border-cyan-400/40 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-full bg-white p-1.5 flex items-center justify-center border-2 border-cyan-400 shadow flex-shrink-0">
                    <img src="/logo-jdp.png" alt="JDPIX" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm leading-tight">JDPIX</div>
                    <div className="text-[10px] text-cyan-300 font-semibold">Internet Exchange Service</div>
                  </div>
                </div>
                <ul className="space-y-1.5 text-[10px] text-slate-300">
                  {['100G Domestic Peering', 'BGP Route Exchange', 'Multi-homed Connectivity', '24/7 NOC Monitoring'].map(f => (
                    <li key={f} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* JDPIX Premium */}
              <div className="relative flex-1 min-w-[220px] max-w-xs bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-2 border-cyan-300/60 rounded-2xl p-4 shadow-xl shadow-cyan-500/15">
                <div className="absolute -top-3 left-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest shadow">
                  Premium
                </div>
                <div className="flex items-center gap-2.5 mb-2.5 mt-1">
                  <div className="w-9 h-9 rounded-full bg-white p-1.5 flex items-center justify-center border-2 border-cyan-300 shadow flex-shrink-0">
                    <img src="/logo-jdp.png" alt="JDPIX Premium" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm leading-tight">JDPIX Premium</div>
                    <div className="text-[10px] text-cyan-200 font-semibold">Managed IX + Global IP Transit</div>
                  </div>
                </div>
                <ul className="space-y-1.5 text-[10px] text-slate-200">
                  {['Dedicated Peering VLAN', 'Global Transit + CDN Access', 'SLA 99.99% Uptime Guarantee', 'Custom BGP Policy & Communities', 'Priority NOC + Technical Support'].map(f => (
                    <li key={f} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Footer CTA ── */}
          <div className="mt-6 pt-5 border-t border-navy-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Carrier-Neutral Redundant Interconnect</div>
                <div className="text-xs text-gray-400">Multi-path BGP rerouting — zero single-point-of-failure</div>
              </div>
            </div>
            <a
              href="#footer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap btn-shine"
            >
              Konsultasi JDPIX / Peering
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
