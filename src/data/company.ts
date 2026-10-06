// =============================================================
// JEMBATAN DATA — Central Configuration File
// Edit all company information, contacts, pricing, and content here.
// TODO: When backend is ready, fetch this data from CMS/database.
// =============================================================

export const company = {
  name: 'PT. JEMBATAN DATA PANGRANGO',
  shortName: 'PT. Jembatan Data Pangrango',
  tagline: 'Connecting Indonesia, Empowering Your Digital Future',
  type: 'Internet Service Provider (ISP)',
  description:
    'PT. Jembatan Data Pangrango didirikan tahun 2019, perusahaan ini bergerak di bidang Internet Service Provider (ISP). Di era kemajuan globalisasi dan jaringan informasi, Jembatan Data Pangrango mampu beradaptasi dan terus berinovasi sehingga dapat menjawab segala tantangan yang ada.',
  website: 'jembatandata.com',

  // Contact
  contact: {
    whatsapp: '6289531825259', // Placeholder — include country code, no +
    whatsappDisplay: '+62 895-3282-5259',
    email: 'customerservice@jembatandata.com',
    address: 'Jl. Pabuaran No.51, Nyomplong, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43131',
    operationalHours: '24/7 Customer Support • Mon–Fri 09:00–17:00 WIB (Sales)',
  },

  // Social Media
  social: {
    instagram: 'https://www.instagram.com/sukabuminetwork?stkn=MTE0YmcycnQ2cW9vdQ==',
    facebook: 'https://www.facebook.com/share/1JoQf1LctD/',
    tiktok: 'https://www.tiktok.com/@sukabuminetwork.jdp?_r=1&_t=ZS-9AJXzj8gW9K',
    googleMaps: 'https://maps.google.com/?q=Jl.+Pabuaran+No.51,+Nyomplong,+Kec.+Warudoyong,+Kota+Sukabumi,+Jawa+Barat+43131',
  },

  targetCustomers: [
    'Corporate',
    'Enterprise',
    'UMKM',
    'ISP / Reseller',
    'Pemerintahan',
    'Institusi Pendidikan',
    'Data Center',
    'Pelanggan Rumah/Bisnis',
  ],

  // Customer Portal URLs — PLACEHOLDERS (replace with real portal URLs)
  // TODO: When portals are ready, update these URLs.
  portals: {
    dcim: {
      label: 'DCIM Portal',
      description: 'Monitor & manage your infrastructure',
      url: 'https://dcim.jembatandata.com',
    },
    billing: {
      label: 'Billing System',
      description: 'View invoices & manage payments',
      url: 'https://billingjdp.jembatandata.com/reseller/login',
    },
  },
};

export const stats = [
  { value: 10, suffix: '+', label: 'Tahun Pengalaman' },
  { value: 99.9, suffix: '%', label: 'Network Availability', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Network Monitoring' },
  { value: 100, suffix: '+', label: 'Corporate Customers' },
];

export const services = [
  {
    icon: 'Globe',
    title: 'Dedicated Internet',
    description:
      'Koneksi internet dedicated dengan bandwidth simetris untuk kebutuhan bisnis dan enterprise.',
    features: [
      'Symmetrical bandwidth',
      'Dedicated bandwidth (1:1)',
      'Public IP included',
      'Low latency routing',
      'SLA guarantee',
      '24/7 monitoring & support',
      'Scalable bandwidth',
    ],
  },
  {
    icon: 'Building2',
    title: 'Corporate Internet',
    description:
      'Internet berkualitas untuk perusahaan dengan kebutuhan konektivitas yang stabil.',
    features: [
      'Stable connection',
      'Business-grade bandwidth',
      'Static IP option',
      'Priority support',
      'Scalable plans',
      'Reliable uptime',
    ],
  },
  {
    icon: 'Server',
    title: 'Colocation',
    description:
      'Layanan penempatan server pada data center dengan konektivitas yang handal.',
    features: [
      'Tier-standard data center',
      'Redundant power supply',
      'Cooling & security',
      'Cross-connect available',
      'Flexible rack space',
      '24/7 physical access',
    ],
  },
  {
    icon: 'Router',
    title: 'Network Solutions',
    description:
      'Implementasi dan pengelolaan infrastruktur jaringan end-to-end.',
    features: [
      'Network design & planning',
      'Fiber & wireless deployment',
      'Routing & switching setup',
      'Network security',
      'Infrastructure audit',
      'Optimization & upgrades',
    ],
  },
  {
    icon: 'MonitorCheck',
    title: 'Managed Services',
    description:
      'Monitoring dan pengelolaan jaringan secara profesional oleh tim NOC.',
    features: [
      '24/7 NOC monitoring',
      'Proactive alerting',
      'Configuration management',
      'Performance reporting',
      'Incident response',
      'Regular maintenance',
    ],
  },
  {
    icon: 'Wifi',
    title: 'Internet Broadband',
    description:
      'Koneksi internet untuk kebutuhan bisnis dan pelanggan dengan kebutuhan bandwidth fleksibel.',
    features: [
      'Flexible bandwidth plans',
      'Quick installation',
      'Business & home use',
      'Affordable pricing',
      'Reliable connection',
      'Local support',
    ],
  },
];

export const featuredService = {
  title: 'Dedicated Internet for Critical Business',
  subtitle: 'Layanan unggulan untuk bisnis yang tidak kompromi dengan downtime.',
  features: [
    { icon: 'ArrowRightLeft', label: 'Symmetrical bandwidth' },
    { icon: 'Gauge', label: 'Dedicated bandwidth (1:1)' },
    { icon: 'Globe2', label: 'Public IP included' },
    { icon: 'Timer', label: 'Low latency' },
    { icon: 'ShieldCheck', label: 'SLA guarantee' },
    { icon: 'Activity', label: '24/7 monitoring' },
    { icon: 'Headphones', label: 'Technical support' },
    { icon: 'TrendingUp', label: 'Scalable bandwidth' },
  ],
  cta: 'Request a Quote',
};

export const aboutFeatures = [
  { icon: 'ShieldCheck', title: 'Reliable Infrastructure', description: 'Infrastruktur jaringan enterprise-grade dengan redundansi.' },
  { icon: 'Users', title: 'Professional Network Team', description: 'Tim teknisi berpengalaman di bidang infrastruktur jaringan.' },
  { icon: 'MonitorCheck', title: '24/7 Monitoring', description: 'NOC yang memantau jaringan Anda sepanjang waktu.' },
  { icon: 'Zap', title: 'Fast Technical Support', description: 'Respons cepat untuk setiap gangguan dan kebutuhan teknis.' },
];

export const networkTopology = [
  { label: 'Internet / Upstream', icon: 'Cloud', description: 'Multiple upstream connectivity providers' },
  { label: 'Core Network', icon: 'Server', description: 'Redundant core network dengan high-capacity backbone' },
  { label: 'Distribution', icon: 'Network', description: 'Distribusi jaringan ke berbagai wilayah' },
  { label: 'Access Network', icon: 'Router', description: 'Akses layer untuk konektivitas pelanggan' },
  { label: 'Customer', icon: 'Building2', description: 'Koneksi langsung ke lokasi bisnis Anda' },
];

export const networkFeatures = [
  'Multiple upstream connectivity',
  'Redundant core network',
  'High-capacity backbone',
  '24/7 NOC monitoring',
  'Network redundancy',
  'Enterprise-grade infrastructure',
];

export const partners = [
  {
    name: 'CGS',
    fullName: 'Cahaya Graha Selaras',
    tagline: 'Your Reliable Fiber Optic Network',
    logo: '/partners/cgs.jpg',
    category: 'Fiber Optic Network',
  },
  {
    name: 'iFORTE',
    fullName: 'PT iForte Solusi Infotek',
    tagline: 'Leading Connectivity & Telecommunication Provider',
    logo: '/partners/iforte.png',
    category: 'Telecommunication Infrastructure',
  },
  {
    name: 'APJII',
    fullName: 'Asosiasi Penyelenggara Jasa Internet Indonesia',
    tagline: 'National Internet Service Provider Association',
    logo: '/partners/apjii.png',
    category: 'ISP Official Association',
  },
  {
    name: 'Meta',
    fullName: 'Meta Platforms, Inc.',
    tagline: 'Global Technology & Connectivity Ecosystem',
    logo: '/partners/meta.png',
    category: 'Global Tech & Ecosystem Partner',
  },
  {
    name: 'Rapid Network',
    fullName: 'Rapid Network',
    tagline: 'High Speed Network Provider',
    logo: '/partners/rapid-network.png',
    category: 'Network Provider',
  },
  {
    name: 'JKT-IX',
    fullName: 'Jakarta Internet Exchange',
    tagline: 'Internet Exchange Point',
    logo: '/partners/jkt-ix.png',
    category: 'Internet Exchange',
  },
  {
    name: 'MVnet',
    fullName: 'MVnet',
    tagline: 'Innovative Network Solutions',
    logo: '/partners/mvnet.jpg',
    category: 'Network Solutions',
  },
  {
    name: 'IIX - APJII',
    fullName: 'Indonesia Internet Exchange',
    tagline: 'National Internet Exchange Point',
    logo: '/partners/iix-apjii.png',
    category: 'Internet Exchange',
  },
  {
    name: 'Trans Hybrid Communication',
    fullName: 'PT Trans Hybrid Communication',
    tagline: 'Integrated Telecommunication Provider',
    logo: '/partners/trans-hybrid.png',
    category: 'Telecommunication Provider',
  },
  {
    name: 'OpenIXP',
    fullName: 'Open Internet Exchange Point',
    tagline: 'Open Internet Exchange Point Indonesia',
    logo: '/partners/openixp.png',
    category: 'Internet Exchange',
  },
  {
    name: '36 Pixels',
    fullName: '36 Pixels',
    tagline: 'Digital Solutions Provider',
    logo: '/partners/36-px@3x-1.png',
    category: 'Digital Solutions',
  },
];

export const partnershipLogos = [
  { name: 'Skyline', logo: '/partnership/1.-Logo-Skyline.png' },
  { name: 'Blip Indonesia', logo: '/partnership/blip_indonesia_logo.jpg' },
  { name: 'GlobalNet', logo: '/partnership/globalnetinc_logo.jpg' },
  { name: 'IDCloudHost', logo: '/partnership/idCloudHost-Logo-horizontal-01.webp' },
  { name: 'Kino Indonesia', logo: '/partnership/Kino_Indonesia_logo.svg' },
  { name: 'Passnet', logo: '/partnership/logo-passnet-color-1.png' },
  { name: 'BWS', logo: '/partnership/LOGO_BWS_Biru.png' },
  { name: 'Netciti', logo: '/partnership/netciti_logo.png' },
  { name: 'Universal Broadband', logo: '/partnership/Uiversal-Broadband-LOGO-.webp' },
  { name: 'Cyber Park', logo: '/partnership/logo-cp.png' },
  { name: 'WhatsApp Partner', logo: '/partnership/WhatsApp-Image-2021-10-14-at-10.26.29-1.webp' },
  { name: 'Partner Network', logo: '/partnership/1666152060762.jpg' },
  { name: 'Fiber Partner', logo: '/partnership/1676137943.png' },
  { name: 'Cloud Partner', logo: '/partnership/8af5bc173e3d38e1e1d9b0d365c167b2a5581ac9.webp' },
  { name: 'Tech Partner', logo: '/partnership/b8a798e16d49ebf530cd1551394561d8.jpg' },
  { name: 'Digital Partner', logo: '/partnership/images.png' },
  { name: 'Network Partner 1', logo: '/partnership/images (1).png' },
  { name: 'ISP Partner 1', logo: '/partnership/images (2).jpg' },
  { name: 'ISP Partner 2', logo: '/partnership/images (2).png' },
  { name: 'Telco Partner 1', logo: '/partnership/images (3).jpg' },
  { name: 'Telco Partner 2', logo: '/partnership/images (3).png' },
  { name: 'Infra Partner 1', logo: '/partnership/images (4).jpg' },
  { name: 'Infra Partner 2', logo: '/partnership/images (4).png' },
  { name: 'ISP Partner 3', logo: '/partnership/images (5).jpg' },
  { name: 'ISP Partner 4', logo: '/partnership/images (6).jpg' },
  { name: 'Corporate Partner', logo: '/partnership/logo-1-1024x302.png' },
  { name: 'Dark Logo Partner', logo: '/partnership/logo-dark.webp' },
  { name: 'Enterprise Partner', logo: '/partnership/M2TnrgkN4FJXuIF-73WQ3DNQcnhMdHpUdW8vMjg4TE42VU1ITHBNMFQrTThTN2VLTWJRQi9ua05tdzA9.png' },
  { name: 'Broadband Partner', logo: '/partnership/M2TnrgkN4FJXuIF-73WQ3FJlL0tZTHdIY1BCQ0pmYWE1OXN4OXZuNnNhUlh2elNhbmZrb3d2ZzZ1eWs9.jpg' },
];

export const partnership = {
  eyebrow: 'STRATEGIC PARTNERSHIP',
  title: 'Grow Together with Jembatan Data',
  description:
    'Kami bermitra dan bersinergi dengan penyedia infrastruktur telekomunikasi, jaringan fiber optic terkemuka, asosiasi resmi, dan ekosistem teknologi global untuk menghadirkan konektivitas andal di seluruh Indonesia.',
};

export const monitoringData = {
  status: 'ONLINE',
  metrics: [
    { label: 'Core Network', value: 99.99, unit: '%' },
    { label: 'Backbone', value: 99.98, unit: '%' },
    { label: 'Customer Access', value: 99.95, unit: '%' },
  ],
  // Dummy traffic data for chart illustration
  trafficData: [45, 52, 48, 61, 73, 68, 79, 85, 72, 88, 94, 82, 76, 90, 86, 95, 78, 84, 70, 65, 72, 80, 88, 92],
  note: 'Illustration / Demo — Data di atas merupakan ilustrasi dan bukan data real-time.',
};

export { coverageRegions } from './coverageData';
export const coverageCities = [
  { name: 'Jabodetabek' },
  { name: 'Banten' },
  { name: 'Jawa Barat' },
  { name: 'Lombok Timur' },
];


export const pricing = [
  {
    name: 'BUSINESS',
    speed: '50',
    unit: 'Mbps',
    features: [
      'Shared bandwidth',
      'Static IP (optional)',
      'Email support',
      'Business hours support',
      'Standard SLA',
    ],
    highlighted: false,
  },
  {
    name: 'ENTERPRISE',
    speed: '100',
    unit: 'Mbps',
    features: [
      'Priority bandwidth',
      'Static IP included',
      'Phone & email support',
      'Extended hours support',
      'Enhanced SLA',
      'Network monitoring',
    ],
    highlighted: true,
  },
  {
    name: 'DEDICATED',
    speed: '200',
    unit: 'Mbps',
    features: [
      'Dedicated 1:1 bandwidth',
      'Public IP included',
      '24/7 phone support',
      '24/7 NOC monitoring',
      'Premium SLA',
      'Dedicated account manager',
    ],
    highlighted: false,
  },
  {
    name: 'CUSTOM',
    speed: 'Custom',
    unit: 'Bandwidth',
    features: [
      'Tailored bandwidth',
      'Custom SLA options',
      'Dedicated support',
      'Flexible contract terms',
      'Custom network solutions',
    ],
    highlighted: false,
  },
];

export const whyChooseUs = [
  { icon: 'Wifi', title: 'Reliable Connectivity', description: 'Koneksi internet stabil dengan infrastruktur yang andal.' },
  { icon: 'TrendingUp', title: 'High Availability', description: 'Jaringan dirancang dengan redundansi untuk minimal downtime.' },
  { icon: 'MonitorCheck', title: 'Professional NOC', description: 'Tim NOC berpengalaman yang memantau jaringan 24/7.' },
  { icon: 'Activity', title: '24/7 Monitoring', description: 'Pemantauan jaringan secara terus-menerus sepanjang waktu.' },
  { icon: 'Headphones', title: 'Fast Technical Support', description: 'Respons cepat dari tim teknis untuk setiap kendala.' },
  { icon: 'Expand', title: 'Scalable Solutions', description: 'Solusi jaringan yang dapat berkembang sesuai kebutuhan bisnis.' },
];

export const customerSegments = [
  { icon: 'Building2', title: 'Corporate', description: 'Konektivitas internet untuk kebutuhan kantor dan operasional perusahaan.' },
  { icon: 'Briefcase', title: 'Enterprise', description: 'Solusi jaringan berskala besar untuk operasi enterprise yang kompleks.' },
  { icon: 'Share2', title: 'ISP / Reseller', description: 'Wholesale bandwidth dan partnership untuk ISP lokal maupun reseller.' },
  { icon: 'Landmark', title: 'Government', description: 'Infrastruktur jaringan untuk institusi dan layanan pemerintahan.' },
  { icon: 'GraduationCap', title: 'Education', description: 'Konektivitas untuk sekolah, kampus, dan institusi pendidikan.' },
  { icon: 'Server', title: 'Data Center', description: 'Colocation dan connectivity untuk operator data center.' },
  { icon: 'Store', title: 'SME', description: 'Layanan internet terjangkau untuk UKM dan bisnis berkembang.' },
];

export const slaData = [
  { value: '99.9%+', label: 'Availability' },
  { value: '24/7', label: 'Monitoring' },
  { value: '24/7', label: 'Technical Support' },
  { value: 'SLA', label: 'Based Service' },
];

// NOTE: Replace these testimonials with real customer testimonials.
export const testimonials = [
  {
    quote:
      'Jembatan Data membantu kami mendapatkan koneksi yang stabil dan support teknis yang responsif.',
    author: 'Corporate Customer',
    role: 'IT Manager',
  },
  {
    quote:
      'Layanan dedicated internet mereka sangat membantu operasional kami berjalan tanpa hambatan.',
    author: 'Enterprise Client',
    role: 'Operations Director',
  },
  {
    quote:
      'Tim NOC yang profesional memberikan rasa amam bahwa jaringan kami selalu dipantau.',
    author: 'ISP Partner',
    role: 'Network Administrator',
  },
];

export const faqs = [
  {
    question: 'Apa itu Dedicated Internet?',
    answer:
      'Dedicated Internet adalah koneksi internet dengan bandwidth simetris (1:1) yang sepenuhnya diperuntukkan untuk satu pelanggan, tanpa dibagi dengan pengguna lain. Cocok untuk bisnis yang membutuhkan kecepatan konsisten dan stabilitas tinggi.',
  },
  {
    question: 'Apakah tersedia koneksi simetris?',
    answer:
      'Ya, layanan Dedicated Internet kami menyediakan bandwidth simetris, di mana kecepatan upload sama dengan kecepatan download. Hal ini ideal untuk aplikasi yang membutuhkan upload besar seperti video conferencing, VPN, dan cloud backup.',
  },
  {
    question: 'Apakah mendapatkan Public IP?',
    answer:
      'Ya, layanan Dedicated Internet dan Enterprise kami menyertakan Public IP. Jumlah dan jenis IP dapat disesuaikan dengan kebutuhan bisnis Anda.',
  },
  {
    question: 'Apakah tersedia SLA?',
    answer:
      'Ya, kami menyediakan Service Level Agreement (SLA) yang menjamin tingkat ketersediaan layanan. Detail SLA dapat disesuaikan berdasarkan jenis layanan dan kebutuhan pelanggan. Hubungi tim sales kami untuk informasi SLA yang berlaku.',
  },
  {
    question: 'Apakah tersedia layanan untuk ISP/Reseller?',
    answer:
      'Ya, kami menyediakan IP Transit dan wholesale bandwidth untuk ISP lokal, reseller, dan partner jaringan. Kami juga mendukung BGP routing dan menawarkan fleksibilitas dalam tingkat komitmen bandwidth.',
  },
  {
    question: 'Bagaimana cara berlangganan?',
    answer:
      'Anda dapat menghubungi kami melalui form Contact di website ini, melalui WhatsApp, atau email. Tim sales kami akan menghubungi Anda untuk memahami kebutuhan, melakukan survei lokasi jika diperlukan, dan memberikan penawaran yang sesuai.',
  },
  {
    question: 'Bagaimana cara mengetahui coverage?',
    answer:
      'Anda dapat menggunakan fitur Check Availability di section Coverage dengan mengisi form. Tim kami akan mengecek ketersediaan layanan di lokasi Anda dan memberikan informasi lebih lanjut.',
  },
  {
    question: 'Apakah tersedia technical support 24/7?',
    answer:
      'Ya, kami menyediakan technical support 24/7 untuk pelanggan layanan Enterprise dan Dedicated. Tim NOC kami selalu siap menangani gangguan dan pertanyaan teknis kapan saja.',
  },
];

export const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'NETWORK', href: '#network' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'COVERAGE', href: '#coverage' },
  { label: 'PARTNERSHIP', href: '#partnership' },
  { label: 'CONTACT', href: '#footer' },
];

export const serviceOptions = [
  'Dedicated Internet',
  'Corporate Internet',
  'Colocation',
  'Network Solution',
  'Managed Service',
  'Internet Broadband',
  'Other',
];
