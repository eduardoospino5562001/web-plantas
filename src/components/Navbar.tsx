import { Globe, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    lang: 'es' | 'en';
    toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: Props) {
  const location = useLocation();

  // Función para saber si el link está activo
  const isActive = (path: string) => location.pathname === path ? "text-red-600 font-bold" : "text-slate-600 hover:text-red-600";

  return (
    // Quitamos 'h-20' fijo y usamos 'py-3' para que la barra crezca según el tamaño del logo
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* 1. LOGO GRANDE + TEXTO */}
          <Link to="/" className="flex items-center gap-4 group">
            
            {/* IMAGEN DEL LOGO */}
            <img 
              src="/logo.png" 
              alt="Plantas Eléctricas y Transportes SAS" 
              // h-20 es mucho más grande (80px). 
              // mix-blend-multiply hace que el fondo blanco de la imagen se vuelva transparente visualmente.
              className="h-16 md:h-20 w-auto object-contain mix-blend-multiply" 
            />

            {/* TEXTO DE LA EMPRESA */}
            <div className="flex flex-col justify-center">
                <h1 className="text-lg md:text-xl font-black text-slate-900 leading-none tracking-tight group-hover:text-red-700 transition-colors uppercase">
                    PLANTAS ELÉCTRICAS
                </h1>
                <span className="text-[10px] md:text-xs font-bold text-red-600 tracking-widest uppercase mt-1">
                    Y TRANSPORTES S.A.S
                </span>
            </div>
          </Link>
          
          {/* 2. NAVEGACIÓN CENTRAL */}
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide uppercase items-center">
            <Link to="/" className={`transition-colors py-2 ${isActive('/')}`}>
                {lang === 'es' ? 'INICIO' : 'HOME'}
            </Link>
            <Link to="/tienda" className={`transition-colors py-2 ${isActive('/tienda')}`}>
                {lang === 'es' ? 'REPUESTOS' : 'SPARE PARTS'}
            </Link>
            <Link to="/servicios" className={`transition-colors py-2 ${isActive('/servicios')}`}>
                {lang === 'es' ? 'SERVICIOS' : 'SERVICES'}
            </Link>
          </div>

          {/* 3. ACCIONES */}
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

          {/* Menú Móvil */}
          <button className="md:hidden text-slate-800"><Menu /></button>
        </div>
    </nav>
  );
}