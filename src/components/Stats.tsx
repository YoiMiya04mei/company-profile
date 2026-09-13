import { stats } from '@/data/company';
import { useCountUp } from '@/hooks/useReveal';

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const decimals = 'decimals' in stat ? (stat as { decimals: number }).decimals : 0;
  const { ref, display } = useCountUp(stat.value, 2000, decimals);

  return (
    <div
      ref={ref}
      className="text-center reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl lg:text-5xl font-extrabold gradient-text">
        {display}
        <span className="text-cyan-400">{stat.suffix}</span>
      </div>
      <div className="text-gray-400 text-sm lg:text-base mt-2 font-medium">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-navy-900 py-16 border-y border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
