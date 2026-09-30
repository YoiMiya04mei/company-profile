import boundaries from './officialBoundaries.json';

export interface CoverageRegion {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  pointsCount: string;
  theme: 'cyan' | 'emerald' | 'indigo' | 'amber';
  hex: string;
  strokeColor: string;
  fillColor: string;
  bgBadge: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  // Official OpenStreetMap GeoJSON administrative boundary geometry
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}

export const coverageRegions: CoverageRegion[] = [
  {
    id: 'jabodetabek',
    name: 'Jabodetabek',
    subtitle: 'DKI Jakarta, Bogor, Depok, Tangerang, Bekasi',
    badge: 'Metro Core',
    description: 'Jaringan serat optik metropolitan berkecepatan tinggi, integrasi Data Center Interconnect (DCI), dan Dedicated Internet simetris.',
    pointsCount: '35+ Core POP & DC',
    theme: 'cyan',
    hex: '#00f2fe',
    strokeColor: '#00f2fe',
    fillColor: '#00c6ff',
    bgBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    center: [-6.30, 106.84],
    zoom: 10,
    geometry: boundaries.jabodetabek,
  },
  {
    id: 'banten',
    name: 'Banten',
    subtitle: 'Serang, Cilegon, Pandeglang, Lebak, Tangerang',
    badge: 'Kawasan Industri',
    description: 'Infrastruktur konektivitas handal untuk kawasan industri manufaktur & petrokimia Cilegon-Serang, pelabuhan Merak, hingga wilayah Lebak & Pandeglang.',
    pointsCount: '20+ Hub Distribusi',
    theme: 'emerald',
    hex: '#10b981',
    strokeColor: '#34d399',
    fillColor: '#10b981',
    bgBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    center: [-6.42, 106.10],
    zoom: 9,
    geometry: boundaries.banten,
  },
  {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    subtitle: 'Bandung Raya, Karawang, Cirebon, Sukabumi, Tasikmalaya, dll',
    badge: 'Enterprise Fiber',
    description: 'Cakupan enterprise menyeluruh melintasi koridor industri Cikarang-Karawang, pusat pendidikan & bisnis Bandung Raya, hingga Priangan Timur & Pantura.',
    pointsCount: '50+ Network Nodes',
    theme: 'indigo',
    hex: '#818cf8',
    strokeColor: '#a5b4fc',
    fillColor: '#6366f1',
    bgBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    center: [-6.90, 107.60],
    zoom: 8,
    geometry: boundaries.jawaBarat,
  },
  {
    id: 'lombok-timur',
    name: 'Lombok Timur',
    subtitle: 'Selong, Labuhan Lombok, Sembalun, Jerowaru',
    badge: 'Regional Expansion',
    description: 'Infrastruktur konektivitas broadband serat optik berkapasitas tinggi di kawasan Nusa Tenggara Barat, mendukung industri pariwisata, instansi, dan UMKM.',
    pointsCount: '15+ Sub-Distribusi POP',
    theme: 'amber',
    hex: '#fbbf24',
    strokeColor: '#fde047',
    fillColor: '#f59e0b',
    bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    center: [-8.62, 116.53],
    zoom: 10,
    geometry: boundaries.lombokTimur,
  },
];

// Initial camera overview bounds covering Java to Lombok cleanly
export const indonesiaOverviewBounds: [[number, number], [number, number]] = [
  [-10.2, 104.5], // South-West
  [-5.2, 117.8],  // North-East
];
