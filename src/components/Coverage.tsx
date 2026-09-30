import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Send, CheckCircle2, X, Layers, ChevronRight, RefreshCw, ShieldCheck, Zap, MapPin, ZoomIn } from 'lucide-react';
import { coverageRegions, indonesiaOverviewBounds, CoverageRegion } from '@/data/coverageData';
import { useReveal } from '@/hooks/useReveal';

export default function Coverage() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selectedRegion, setSelectedRegion] = useState<CoverageRegion | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    address: '',
    region: 'Jabodetabek',
    bandwidth: '',
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoLayersRef = useRef<Map<string, L.GeoJSON>>(new Map());

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create map instance with Full Touchpad & Mouse Wheel Zoom enabled
    const map = L.map(mapContainerRef.current, {
      center: [-7.0, 110.0],
      zoom: 6,
      minZoom: 4,
      maxZoom: 15,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true, // Enabled mouse wheel & touchpad zoom
      touchZoom: true,       // Enabled mobile/touchpad pinch zoom
      doubleClickZoom: true, // Enabled double click to zoom
      dragging: true,
    });

    // ESRI Dark Gray Base Layer - Clean dark theme with Indonesia islands & oceans
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a> &copy; OpenStreetMap',
        maxZoom: 16,
      }
    ).addTo(map);

    // ESRI Dark Gray Reference Overlay (Labels & Country / Island boundaries)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '',
        maxZoom: 16,
      }
    ).addTo(map);

    // Initial camera view focused on Java to Lombok
    map.fitBounds(indonesiaOverviewBounds, {
      padding: [25, 25],
      animate: false,
    });

    const layersMap = new Map<string, L.GeoJSON>();

    // Layer ordering: Render base provinces first (Jawa Barat, Banten), then Lombok Timur, then Jabodetabek on top
    const renderOrder = ['jawa-barat', 'banten', 'lombok-timur', 'jabodetabek'];
    const orderedRegions = renderOrder
      .map((id) => coverageRegions.find((r) => r.id === id))
      .filter((r): r is CoverageRegion => Boolean(r));

    orderedRegions.forEach((region) => {
      const isJabodetabek = region.id === 'jabodetabek';

      const geoLayer = L.geoJSON(region.geometry, {
        style: {
          color: region.strokeColor,
          weight: isJabodetabek ? 2.8 : 2.2,
          opacity: 0.95,
          fillColor: region.fillColor,
          fillOpacity: isJabodetabek ? 0.38 : 0.28,
          className: `coverage-polygon coverage-polygon-${region.id}`,
        },
      });

      // Tooltip with region name & distinct theme color
      geoLayer.bindTooltip(
        `
        <div class="p-1.5 text-left font-sans min-w-[150px]">
          <div class="text-[13px] font-bold text-white flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 rounded-full" style="background-color: ${region.strokeColor}; box-shadow: 0 0 10px ${region.strokeColor}"></span>
            ${region.name}
          </div>
          <div class="text-[11px] text-gray-300 mt-1 leading-snug">${region.subtitle}</div>
          <div class="text-[10px] font-semibold mt-1.5" style="color: ${region.strokeColor}">
            ● ${region.badge} • ${region.pointsCount}
          </div>
        </div>
      `,
        {
          permanent: false,
          sticky: true,
          direction: 'top',
          className: 'custom-leaflet-tooltip',
          offset: [0, -10],
        }
      );

      // Mouse hover and click events
      geoLayer.on('mouseover', () => {
        setHoveredRegionId(region.id);
        geoLayer.setStyle({
          weight: 3.8,
          color: '#ffffff',
          fillColor: region.strokeColor,
          fillOpacity: 0.65,
        });
        geoLayer.bringToFront();
      });

      geoLayer.on('mouseout', () => {
        setHoveredRegionId(null);
        if (selectedRegion?.id !== region.id) {
          geoLayer.setStyle({
            weight: isJabodetabek ? 2.8 : 2.2,
            color: region.strokeColor,
            fillColor: region.fillColor,
            fillOpacity: isJabodetabek ? 0.38 : 0.28,
          });
        }
      });

      geoLayer.on('click', () => {
        setSelectedRegion(region);
        setFormData((prev) => ({ ...prev, region: region.name }));
        geoLayer.bringToFront();
        map.fitBounds(geoLayer.getBounds(), {
          padding: [50, 50],
          maxZoom: 10,
          animate: true,
          duration: 1.2,
        });
      });

      geoLayer.addTo(map);
      layersMap.set(region.id, geoLayer);
    });

    geoLayersRef.current = layersMap;
    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Synchronize GeoJSON styles when selectedRegion changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    coverageRegions.forEach((region) => {
      const layer = geoLayersRef.current.get(region.id);
      if (!layer) return;

      const isJabodetabek = region.id === 'jabodetabek';

      if (selectedRegion?.id === region.id) {
        layer.setStyle({
          weight: 4,
          color: '#ffffff',
          fillColor: region.strokeColor,
          fillOpacity: 0.7,
        });
        layer.bringToFront();
      } else {
        layer.setStyle({
          weight: isJabodetabek ? 2.8 : 2.2,
          color: region.strokeColor,
          fillColor: region.fillColor,
          fillOpacity: isJabodetabek ? 0.38 : 0.28,
        });
      }
    });
  }, [selectedRegion]);

  // Handler when clicking region item in the right list
  const handleSelectRegion = (region: CoverageRegion) => {
    setSelectedRegion(region);
    setFormData((prev) => ({ ...prev, region: region.name }));

    const map = mapInstanceRef.current;
    const layer = geoLayersRef.current.get(region.id);

    if (map && layer) {
      layer.bringToFront();
      map.fitBounds(layer.getBounds(), {
        padding: [55, 55],
        maxZoom: 10,
        animate: true,
        duration: 1.2,
      });
      layer.openTooltip();
    }
  };

  // Hover sync from right list to map
  const handleHoverRegion = (region: CoverageRegion | null) => {
    if (!region) {
      setHoveredRegionId(null);
      coverageRegions.forEach((r) => {
        if (selectedRegion?.id !== r.id) {
          const layer = geoLayersRef.current.get(r.id);
          const isJabodetabek = r.id === 'jabodetabek';
          layer?.setStyle({
            weight: isJabodetabek ? 2.8 : 2.2,
            color: r.strokeColor,
            fillColor: r.fillColor,
            fillOpacity: isJabodetabek ? 0.38 : 0.28,
          });
        }
      });
      return;
    }

    setHoveredRegionId(region.id);
    const layer = geoLayersRef.current.get(region.id);
    if (layer && selectedRegion?.id !== region.id) {
      layer.setStyle({
        weight: 3.8,
        color: '#ffffff',
        fillColor: region.strokeColor,
        fillOpacity: 0.65,
      });
      layer.bringToFront();
    }
  };

  // Reset map view to full overview
  const handleResetView = () => {
    setSelectedRegion(null);
    const map = mapInstanceRef.current;
    if (map) {
      map.fitBounds(indonesiaOverviewBounds, {
        padding: [25, 25],
        animate: true,
        duration: 1.2,
      });
      map.closePopup();
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <section id="coverage" className="relative bg-navy-950 py-24 overflow-hidden">
      {/* Dark background grid texture */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">Wilayah Cakupan Jaringan</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our <span className="gradient-text">Coverage</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mb-4">
            Cek ketersediaan layanan internet fiber optic & dedicated bandwidth bergaransi di area operasional kami.
          </p>

          {/* Color legend pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-2">
            {coverageRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleSelectRegion(region)}
                onMouseEnter={() => handleHoverRegion(region)}
                onMouseLeave={() => handleHoverRegion(null)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  selectedRegion?.id === region.id
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'bg-navy-900/80 text-gray-300 hover:text-white border-navy-700'
                }`}
                style={{
                  borderColor: selectedRegion?.id === region.id ? region.strokeColor : undefined,
                  boxShadow: selectedRegion?.id === region.id ? `0 0 15px ${region.strokeColor}55` : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: region.strokeColor,
                    boxShadow: `0 0 8px ${region.strokeColor}`,
                  }}
                />
                <span>{region.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Leaflet Map (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative bg-navy-900/80 border border-navy-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-md flex-1 flex flex-col overflow-hidden">
              {/* Map container with Touchpad / Mouse Wheel Zoom support */}
              <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[530px] rounded-xl overflow-hidden border border-white/10 bg-[#060b13]">
                <div ref={mapContainerRef} className="w-full h-full z-10" />

                {/* Map Active Focus Badge (Top Left) */}
                <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-[#060b13]/90 border border-white/15 rounded-xl px-3 py-1.5 backdrop-blur-md shadow-xl pointer-events-none">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-ping"
                    style={{
                      backgroundColor: selectedRegion ? selectedRegion.strokeColor : '#38bdf8',
                    }}
                  />
                  <span className="text-xs font-bold text-white">
                    {selectedRegion ? selectedRegion.name : 'Peta Cakupan Wilayah'}
                  </span>
                  {selectedRegion && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${selectedRegion.strokeColor}22`,
                        borderColor: `${selectedRegion.strokeColor}55`,
                        color: selectedRegion.strokeColor,
                      }}
                    >
                      {selectedRegion.badge}
                    </span>
                  )}
                </div>

                {/* Controls (Top Right) */}
                <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5">
                  <button
                    onClick={handleResetView}
                    title="Tampilkan Seluruh Cakupan"
                    className="p-2 bg-[#060b13]/90 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-300 rounded-lg backdrop-blur-md transition-all shadow-lg active:scale-95 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </button>
                  <div className="flex flex-col bg-[#060b13]/90 border border-white/15 rounded-lg overflow-hidden backdrop-blur-md shadow-lg">
                    <button
                      onClick={handleZoomIn}
                      title="Zoom In"
                      className="p-2 hover:bg-white/10 text-gray-200 hover:text-white border-b border-white/10 transition-colors active:scale-95 text-sm font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={handleZoomOut}
                      title="Zoom Out"
                      className="p-2 hover:bg-white/10 text-gray-200 hover:text-white transition-colors active:scale-95 text-sm font-bold flex items-center justify-center cursor-pointer"
                    >
                      −
                    </button>
                  </div>
                </div>

                {/* Legend Hint Bottom with Zoom Tips */}
                <div className="absolute bottom-3 left-3 z-[400] hidden sm:flex items-center gap-2 bg-[#060b13]/85 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-md text-[11px] text-gray-300 pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Gunakan scroll mouse / touchpad pinch untuk zoom in & out</span>
                </div>
              </div>

              {/* Status info bar */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Batas daratan administrasi aktual (Banten, Jabodetabek, Jawa Barat, Lombok Timur)</span>
                </div>
                {selectedRegion && (
                  <button
                    onClick={handleResetView}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline"
                  >
                    ← Tampilkan Semua Wilayah
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Regional Connectivity Cards + CTA (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-white font-bold text-lg">Titik Konektivitas</h3>
                </div>
                <span className="text-xs text-gray-400 bg-navy-800/90 px-2.5 py-1 rounded-full border border-navy-700">
                  4 Wilayah Cakupan
                </span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mb-3.5">
                Pilih wilayah untuk memfokuskan kamera peta secara otomatis ke polygon perbatasan:
              </p>

              {/* 4 Regions: Jabodetabek, Banten, Jawa Barat, Lombok Timur with DISTINCT COLORS */}
              <div className="space-y-2.5">
                {coverageRegions.map((region) => {
                  const isSelected = selectedRegion?.id === region.id;
                  const isHovered = hoveredRegionId === region.id;

                  return (
                    <button
                      key={region.id}
                      onClick={() => handleSelectRegion(region)}
                      onMouseEnter={() => handleHoverRegion(region)}
                      onMouseLeave={() => handleHoverRegion(null)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3.5 group relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? 'bg-navy-900 border-white/40 shadow-2xl'
                          : isHovered
                          ? 'bg-navy-800/90 border-navy-600'
                          : 'bg-navy-900/60 hover:bg-navy-800/80 border-navy-800'
                      }`}
                      style={{
                        borderColor: isSelected ? region.strokeColor : undefined,
                        boxShadow: isSelected
                          ? `0 0 25px ${region.strokeColor}33, inset 0 0 15px ${region.strokeColor}15`
                          : undefined,
                      }}
                    >
                      {/* Left icon with distinct color */}
                      <div
                        className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${region.strokeColor}20`,
                          border: `1px solid ${region.strokeColor}55`,
                          color: region.strokeColor,
                          boxShadow: isSelected ? `0 0 12px ${region.strokeColor}66` : 'none',
                        }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <h4
                            className="font-bold text-sm sm:text-base tracking-wide transition-colors"
                            style={{
                              color: isSelected ? region.strokeColor : '#ffffff',
                            }}
                          >
                            {region.name}
                          </h4>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: `${region.strokeColor}18`,
                              borderColor: `${region.strokeColor}44`,
                              color: region.strokeColor,
                            }}
                          >
                            {region.badge}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs line-clamp-1 mb-1">{region.subtitle}</p>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span
                            className="font-semibold"
                            style={{ color: region.strokeColor }}
                          >
                            ● {region.pointsCount}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className="w-4 h-4 self-center transition-transform duration-300 flex-shrink-0"
                        style={{
                          color: isSelected ? region.strokeColor : '#64748b',
                          transform: isSelected ? 'translateX(2px)' : 'none',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note & CTA Button */}
            <div className="pt-2 space-y-3">
              <div className="p-3 bg-navy-900/90 border border-navy-700/80 rounded-xl flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-xs leading-relaxed">
                  Layanan mencakup Dedicated Internet, Broadband Bisnis, IP Transit & Dark Fiber. Hubungi kami untuk survey lokasi instan.
                </p>
              </div>

              <button
                onClick={() => {
                  if (selectedRegion) {
                    setFormData((prev) => ({ ...prev, region: selectedRegion.name }));
                  }
                  setShowForm(true);
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 btn-shine cursor-pointer group active:scale-[0.99]"
              >
                <Zap className="w-4 h-4 text-cyan-200 group-hover:animate-bounce" />
                <span>Check Availability</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage form modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-navy-900 border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-white font-bold text-2xl mb-2">Permintaan Terkirim!</h3>
                <p className="text-gray-300 text-sm">
                  Tim teknis kami akan segera melakukan pengecekan ketersediaan coverage di lokasi Anda dan menghubungi Anda via WhatsApp.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-navy-700/80">
                  <div>
                    <h3 className="text-white font-bold text-2xl">Check Availability</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Cek ketersediaan layanan dan perkiraan waktu aktivasi di wilayah Anda.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-navy-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Wilayah Cakupan</label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors"
                    >
                      {coverageRegions.map((reg) => (
                        <option key={reg.id} value={reg.name}>
                          {reg.name} ({reg.subtitle})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-1.5">Nama Lengkap</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Budi Pratama"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-1.5">Perusahaan / Instansi</label>
                      <input
                        type="text"
                        placeholder="Nama PT / Instansi"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-1.5">Nomor WhatsApp</label>
                      <input
                        required
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-1.5">Estimasi Bandwidth</label>
                      <input
                        type="text"
                        placeholder="Contoh: 100 Mbps / 1 Gbps"
                        value={formData.bandwidth}
                        onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">Alamat Lengkap Titik Lokasi</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Masukkan alamat lengkap, nama gedung, jalan, atau patokan lokasi..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition-all btn-shine mt-4 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Permintaan Survey
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
