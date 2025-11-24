import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react'; // Importamos X para cerrar
import { Link, useLocation } from 'react-router-dom';

interface Props {
    lang: 'es' | 'en';
    toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: Props) {
  const location = useLocation();
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? "text-red-600 font-bold" : "text-slate-600 hover:text-red-600";

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center gap-4 group z-50">
            <img 
              src="/logo.png" 
              alt="Plantas Eléctricas y Transportes SAS" 
              className="h-12 md:h-20 w-auto object-contain mix-blend-multiply" 
            />
            <div className="flex flex-col justify-center">
                <h1 className="text-sm md:text-xl font-black text-slate-900 leading-none tracking-tight group-hover:text-red-700 transition-colors uppercase">
                    PLANTAS ELÉCTRICAS
                </h1>
                <span className="text-[8px] md:text-xs font-bold text-red-600 tracking-widest uppercase mt-0.5">
                    Y TRANSPORTES S.A.S
                </span>
            </div>
          </Link>
          
          {/* 2. NAVEGACIÓN DE ESCRITORIO (Hidden en celular) */}
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

          {/* 3. ACCIONES DE ESCRITORIO */}
          <div className="hidden md:flex items-center gap-4">
            <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                aria-label="Cambiar idioma"
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

          {/* 4. BOTÓN HAMBURGUESA MÓVIL (Ahora sí funciona) */}
          <button 
            className="md:hidden text-slate-900 p-2 z-50" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú de navegación" // Esto arregla el error de accesibilidad
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* 5. EL MENÚ DESPLEGABLE MÓVIL */}
        {/* Solo se muestra si isOpen es true */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div className="flex flex-col items-center gap-6 text-xl font-bold uppercase tracking-wider">
                <Link 
                    to="/" 
                    onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                    className="hover:text-red-600 transition-colors"
                >
                    {lang === 'es' ? 'Inicio' : 'Home'}
                </Link>
                <Link 
                    to="/tienda" 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-red-600 transition-colors"
                >
                    {lang === 'es' ? 'Repuestos' : 'Parts'}
                </Link>
                <Link 
                    to="/servicios" 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-red-600 transition-colors"
                >
                    {lang === 'es' ? 'Servicios' : 'Services'}
                </Link>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                 <button 
                    onClick={() => { toggleLang(); setIsOpen(false); }}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-900 font-bold"
                >
                    <Globe className="w-5 h-5" />
                    {lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
                </button>

                <a 
                    href="https://wa.me/573142130308"
                    className="bg-red-600 text-white px-10 py-3 rounded-full text-lg font-bold shadow-xl"
                >
                    {lang === 'es' ? 'Cotizar Ahora' : 'Get Quote'}
                </a>
            </div>
        </div>
    </nav>
  );
}