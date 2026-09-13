import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { monitoringData } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

export default function Monitoring() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const maxTraffic = Math.max(...monitoringData.trafficData);
  const chartHeight = 200;
  const chartWidth = 600;
  const points = monitoringData.trafficData
    .map((v, i) => {
      const x = (i / (monitoringData.trafficData.length - 1)) * chartWidth;
      const y = chartHeight - (v / maxTraffic) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <section className="relative bg-navy-950 py-24">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-cyan-300 text-sm font-medium">NOC MONITORING</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
              Monitored 24/7 by Our <span className="gradient-text">Network Operations Center</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Proactive monitoring helps us detect network issues before they impact your business.
            </p>

            {/* Status badges */}
            <div className="space-y-4 mb-6">
              {/* Overall status */}
              <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-semibold">Network Status</span>
                </div>
                <span className="text-green-400 font-bold text-lg">{monitoringData.status}</span>
              </div>

              {/* Metric rows */}
              {monitoringData.metrics.map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-navy-800/50 border border-navy-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300 font-medium">{metric.label}</span>
                  </div>
                  <span className="text-cyan-400 font-bold">{metric.value}{metric.unit}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-yellow-400/80 text-xs">{monitoringData.note}</span>
            </div>
          </div>

          {/* Right — Dashboard visual */}
          <div className="bg-navy-800/60 border border-navy-700/50 rounded-2xl p-6">
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy-700">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold text-sm">NOC Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-500 text-xs">LIVE</span>
              </div>
            </div>

            {/* Traffic chart */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs font-medium">Network Traffic (24h)</span>
                <span className="text-cyan-400 text-xs font-bold">Gbps</span>
              </div>
              <div className="relative bg-navy-900/50 rounded-xl p-4 overflow-hidden">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full"
                  preserveAspectRatio="none"
                  style={{ height: `${chartHeight}px` }}
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0.25, 0.5, 0.75].map((p) => (
                    <line
                      key={p}
                      x1="0"
                      y1={chartHeight * p}
                      x2={chartWidth}
                      y2={chartHeight * p}
                      stroke="#1a3a5c"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                    />
                  ))}
                  {/* Area fill */}
                  <polygon points={areaPoints} fill="url(#areaGrad)" />
                  {/* Line */}
                  <polyline
                    points={points}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* Time labels */}
              <div className="flex justify-between text-gray-600 text-[10px] mt-2">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* Mini metric cards */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: 'Latency', value: '2.1ms', color: 'text-green-400' },
                { label: 'Packet Loss', value: '0.01%', color: 'text-green-400' },
                { label: 'Utilization', value: '68%', color: 'text-cyan-400' },
              ].map((m, i) => (
                <div key={i} className="bg-navy-900/50 rounded-lg p-3 text-center">
                  <div className={`font-bold text-sm ${m.color}`}>{m.value}</div>
                  <div className="text-gray-600 text-[10px] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
