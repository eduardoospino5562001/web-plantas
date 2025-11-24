import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom';

interface Props {
    lang: 'es' | 'en';
    toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: Props) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Función para resaltar el link activo
  const isActive = (path: string) => location.pathname === path ? "text-red-600 font-bold" : "text-slate-800 font-medium";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100 relative">
        
        {/* --- BARRA PRINCIPAL --- */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center bg-white relative z-50">
          
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
          
          {/* 2. MENÚ ESCRITORIO (Oculto en móvil) */}
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide uppercase items-center">
            <Link to="/" className={`hover:text-red-600 transition-colors ${isActive('/')}`}>
                {lang === 'es' ? 'INICIO' : 'HOME'}
            </Link>
            <Link to="/tienda" className={`hover:text-red-600 transition-colors ${isActive('/tienda')}`}>
                {lang === 'es' ? 'REPUESTOS' : 'SPARE PARTS'}
            </Link>
            <Link to="/servicios" className={`hover:text-red-600 transition-colors ${isActive('/servicios')}`}>
                {lang === 'es' ? 'SERVICIOS' : 'SERVICES'}
            </Link>
          </div>

          {/* 3. BOTONES ESCRITORIO (Oculto en móvil) */}
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
            className="md:hidden text-slate-900 p-2 rounded-md focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-8 h-8 text-red-600" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* --- 5. MENÚ DESPLEGABLE MÓVIL (ARREGLADO) --- */}
        {/* Este bloque aparece DEBAJO de la barra blanca, cubriendo toda la pantalla hacia abajo */}
        <div 
            className={`
                absolute top-full left-0 w-full h-screen bg-white border-t border-slate-100 shadow-xl 
                flex flex-col items-center pt-10 gap-8
                transition-all duration-300 ease-in-out transform origin-top
                ${isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}
            `}
        >
            {/* Enlaces de Navegación Grandes */}
            <div className="flex flex-col items-center gap-6 w-full">
                <Link 
                    to="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-slate-800 uppercase tracking-widest hover:text-red-600 w-full text-center py-2"
                >
                    {lang === 'es' ? 'Inicio' : 'Home'}
                </Link>
                <Link 
                    to="/tienda" 
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-slate-800 uppercase tracking-widest hover:text-red-600 w-full text-center py-2"
                >
                    {lang === 'es' ? 'Repuestos' : 'Spare Parts'}
                </Link>
                <Link 
                    to="/servicios" 
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-slate-800 uppercase tracking-widest hover:text-red-600 w-full text-center py-2"
                >
                    {lang === 'es' ? 'Servicios' : 'Services'}
                </Link>
            </div>

            {/* Línea divisoria */}
            <div className="w-20 h-1 bg-slate-100 rounded-full"></div>

            {/* Botones de Acción */}
            <div className="flex flex-col gap-4 w-full px-10">
                 <button 
                    onClick={() => { toggleLang(); setIsOpen(false); }}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 text-slate-900 font-bold w-full"
                >
                    <Globe className="w-5 h-5" />
                    {lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
                </button>

                <a 
                    href="https://wa.me/573142130308"
                    className="bg-red-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg text-center w-full"
                >
                    {lang === 'es' ? 'Cotizar en WhatsApp' : 'Get Quote'}
                </a>
            </div>
        </div>

    </nav>
  );
}