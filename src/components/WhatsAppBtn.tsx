import { MessageCircle } from 'lucide-react';

export default function WhatsAppBtn({ lang }: { lang: 'es' | 'en' }) {
  const msg = lang === 'es' ? "Hola, quisiera asesoría general" : "Hello, I need general advice";
  
  return (
    <a 
        href={`https://wa.me/573142130308?text=${encodeURIComponent(msg)}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all z-50 hover:scale-110 animate-bounce"
    >
        <MessageCircle className="w-8 h-8" />
    </a>
  );
}