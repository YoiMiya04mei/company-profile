import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { serviceOptions } from '@/data/company';
import { useReveal } from '@/hooks/useReveal';

type FormErrors = {
  name?: string;
  email?: string;
  whatsapp?: string;
  city?: string;
  service?: string;
};

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // TODO: Integrate with backend API to store contact inquiries
  // TODO: Set up email notification when inquiry is submitted

  const validate = (formData: FormData): FormErrors => {
    const errs: FormErrors = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const city = formData.get('city') as string;
    const service = formData.get('service') as string;

    if (!name?.trim()) errs.name = 'Nama lengkap wajib diisi';
    if (!email?.trim()) {
      errs.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Format email tidak valid';
    }
    if (!whatsapp?.trim()) {
      errs.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9+\-\s]{8,}$/.test(whatsapp)) {
      errs.whatsapp = 'Nomor WhatsApp tidak valid';
    }
    if (!city?.trim()) errs.city = 'Kota wajib diisi';
    if (!service) errs.service = 'Pilih kebutuhan layanan';

    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // TODO: Send data to backend API
      setSubmitted(true);
      e.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-navy-900 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500/50' : 'border-navy-700 focus:border-cyan-500'
    }`;

  return (
    <section id="contact" className="relative bg-navy-950 py-24 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${visible ? 'visible' : ''} reveal`}>
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

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-1">Informasi Kontak</h3>
              <p className="text-gray-500 text-sm mb-6">Hubungi kami melalui kanal berikut.</p>

              <div className="space-y-4">
                {[
                  { label: 'WhatsApp', value: '+62 8XX-XXXX-XXXX (Placeholder)', icon: '💬' },
                  { label: 'Email', value: 'info@jembatandata.com (Placeholder)', icon: '✉️' },
                  { label: 'Alamat', value: 'Jl. Placeholder No. 123, Jakarta (Placeholder)', icon: '📍' },
                  { label: 'Jam Operasional', value: '24/7 Support • Mon–Fri 09:00–17:00 WIB', icon: '🕒' },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{info.icon}</span>
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide">{info.label}</div>
                      <div className="text-gray-300 text-sm mt-0.5">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick response note */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-sm mb-2">Respons Cepat</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tim sales kami akan menghubungi Anda dalam 1×24 jam setelah form dikirim. Untuk kebutuhan mendesak, hubungi WhatsApp kami.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6 lg:p-8">
              {submitted && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-sm">Inquiry Berhasil Dikirim!</div>
                    <div className="text-gray-400 text-xs mt-0.5">Tim kami akan menghubungi Anda segera.</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input name="name" type="text" className={inputClass('name')} placeholder="Nama Anda" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">
                      Nama Perusahaan
                    </label>
                    <input name="company" type="text" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Perusahaan Anda" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input name="email" type="email" className={inputClass('email')} placeholder="email@perusahaan.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">
                      Nomor WhatsApp <span className="text-red-400">*</span>
                    </label>
                    <input name="whatsapp" type="tel" className={inputClass('whatsapp')} placeholder="0812-3456-7890" />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">
                      Kota <span className="text-red-400">*</span>
                    </label>
                    <input name="city" type="text" className={inputClass('city')} placeholder="Kota Anda" />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-1.5">
                      Kebutuhan Layanan <span className="text-red-400">*</span>
                    </label>
                    <select name="service" className={inputClass('service')} defaultValue="">
                      <option value="" disabled>Pilih layanan</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-navy-900">{opt}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium block mb-1.5">
                    Estimasi Bandwidth
                  </label>
                  <input name="bandwidth" type="text" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Contoh: 100 Mbps Dedicated" />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium block mb-1.5">
                    Pesan
                  </label>
                  <textarea name="message" rows={4} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none" placeholder="Ceritakan kebutuhan bisnis Anda..." />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all btn-shine"
                >
                  <Send className="w-5 h-5" />
                  Submit Inquiry
                </button>

                <div className="flex items-start gap-2 mt-2">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-xs">
                    Form ini belum terhubung ke backend. Data tidak akan dikirim. Hubungi WhatsApp untuk kebutuhan mendesak.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
