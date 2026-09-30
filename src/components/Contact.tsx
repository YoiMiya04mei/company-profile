import { useReveal } from '@/hooks/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative bg-navy-950 py-24 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-cyan-300 text-sm font-medium">CONTACT</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Let's <span className="gradient-text">Connect</span> Your Business
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hubungi tim kami untuk konsultasi dan penawaran layanan yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

      </div>
    </section>
  );
}
