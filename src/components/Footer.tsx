import { Zap } from 'lucide-react';

export default function Footer({ text }: { text: string }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Zap className="text-blue-600 w-6 h-6" />
                <span className="text-xl font-bold text-white">PLANTAS ELÉCTRICAS Y TRANSPORTES S.A.S</span>
            </div>
            <p className="text-sm">{text}</p>
        </div>
    </footer>
  );
}