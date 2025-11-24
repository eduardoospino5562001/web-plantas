import { useState, useEffect } from 'react';
import { Globe, Menu, X, ChevronRight } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom';

interface Props {
    lang: 'es' | 'en';
    toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: Props) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear el scroll del cuerpo cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path ? "text-red-600 font-bold bg-red-50" : "text-slate-700 font-medium hover:bg-slate-50";

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center bg-white">
            
            {/* 1. LOGO */}
            <Link to="/" className="flex items-center gap-4 z-50" onClick={() => setIsOpen(false)}>
              <img 
                src="/logo.png" 
                alt="Plantas Eléctricas y Transportes SAS" 
                className="h-12 md:h-20 w-auto object-contain mix-blend-multiply" 
              />
              <div className="flex flex-col justify-center">
                  <h1 className="text-sm md:text-xl font-black text-slate-900 leading-none tracking-tight uppercase">
                      PLANTAS ELÉCTRICAS
                  </h1>
                  <span className="text-[8px] md:text-xs font-bold text-red-600 tracking-widest uppercase mt-0.5">
                      Y TRANSPORTES S.A.S
                  </span>
              </div>
            </Link>
            
            {/* 2. MENÚ ESCRITORIO (Hidden en móvil) */}
            <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide uppercase items-center">
              <Link to="/" className={`hover:text-red-600 transition-colors ${location.pathname === '/' ? 'text-red-600' : ''}`}>
                  {lang === 'es' ? 'INICIO' : 'HOME'}
              </Link>
              <Link to="/tienda" className={`hover:text-red-600 transition-colors ${location.pathname === '/tienda' ? 'text-red-600' : ''}`}>
                  {lang === 'es' ? 'REPUESTOS' : 'SPARE PARTS'}
              </Link>
              <Link to="/servicios" className={`hover:text-red-600 transition-colors ${location.pathname === '/servicios' ? 'text-red-600' : ''}`}>
                  {lang === 'es' ? 'SERVICIOS' : 'SERVICES'}
              </Link>
            </div>

            {/* 3. BOTONES ESCRITORIO (Hidden en móvil) */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                  <Globe className="w-3.5 h-3.5" />
                  {lang === 'es' ? 'EN' : 'ES'}
              </button>

              <a 
                  href="https://wa.me/573142130308"
                  className="bg-slate-900 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                  {lang === 'es' ? 'Cotizar' : 'Get Quote'}
              </a>
            </div>

            {/* 4. BOTÓN HAMBURGUESA (Solo móvil) */}
            <button 
              className="md:hidden text-slate-900 p-2 -mr-2" 
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
      </nav>

      {/* --- NAVIGATION DRAWER (SIDE MENU) --- */}
      
      {/* 1. Backdrop Oscuro (Fondo) */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. El Cajón Lateral (Drawer) */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
          {/* Cabecera del Drawer */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Menú</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
          </div>

          {/* Cuerpo del Drawer (Enlaces) */}
          <div className="flex flex-col py-4">
              <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-8 py-4 ${isActive('/')}`}
              >
                  {lang === 'es' ? 'INICIO' : 'HOME'}
                  <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link 
                  to="/tienda" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-8 py-4 ${isActive('/tienda')}`}
              >
                  {lang === 'es' ? 'REPUESTOS' : 'SPARE PARTS'}
                  <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link 
                  to="/servicios" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-8 py-4 ${isActive('/servicios')}`}
              >
                  {lang === 'es' ? 'SERVICIOS' : 'SERVICES'}
                  <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
          </div>

          {/* Pie del Drawer (Acciones) */}
          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-100 bg-slate-50">
              <button 
                  onClick={toggleLang}
                  className="flex items-center justify-center gap-2 w-full py-3 mb-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50"
              >
                  <Globe className="w-4 h-4" />
                  {lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
              </button>

              <a 
                  href="https://wa.me/573142130308"
                  className="flex items-center justify-center w-full py-4 rounded-xl bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-colors"
              >
                  {lang === 'es' ? 'Cotizar en WhatsApp' : 'Get Quote'}
              </a>
          </div>
      </div>
    </>
  );
}