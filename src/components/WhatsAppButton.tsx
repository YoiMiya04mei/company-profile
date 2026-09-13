import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { company } from '@/data/company';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const waNumber = company.contact.whatsapp;
  const waMessage = encodeURIComponent(
    'Halo Jembatan Data, saya ingin mendapatkan informasi mengenai layanan internet.'
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showTooltip && (
        <div className="bg-white rounded-xl shadow-2xl p-4 max-w-xs relative animate-fade-in-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-gray-800 text-sm">Chat dengan Kami</span>
          </div>
          <p className="text-gray-600 text-xs mb-3">
            Punya pertanyaan? Tim kami siap membantu Anda.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
          >
            Mulai Chat
          </a>
        </div>
      )}

      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-transform group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        {/* Notification pulse */}
        {!showTooltip && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        )}
        {/* Badge */}
        {!showTooltip && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-navy-950">
            1
          </span>
        )}
      </button>
    </div>
  );
}
