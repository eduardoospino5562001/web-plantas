import { CheckCircle, ArrowRight, Zap, Globe, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  lang: 'es' | 'en';
}

export default function Home({ lang }: Props) {
  
  const t = {
    es: {
      heroTitle: "Potencia Industrial",
      heroSubtitle: "Garantizamos la continuidad de tu operación con tecnología de punta en generación eléctrica.",
      ctaPrimary: "Ver Servicios",
      ctaSecondary: "Catálogo",
      aboutTitle: "Ingeniería de Precisión",
      aboutSubtitle: "Energía que impulsa el futuro",
      aboutText: "Plantas eléctricas confiables. Mantenimiento experto, reparaciones rápidas, alquiler flexible y venta garantizada. Transferencias automáticas y tableros que funcionan. ¡Energía cuando la necesitas!",
      stats: [
        { label: "Cobertura", value: "Nacional" },
        { label: "Soporte", value: "24/7" },
        { label: "Experiencia", value: "+10 Años" }
      ]
    },
    en: {
      heroTitle: "Industrial Power",
      heroSubtitle: "We guarantee your operation continuity with state-of-the-art power generation technology.",
      ctaPrimary: "View Services",
      ctaSecondary: "Catalog",
      aboutTitle: "Precision Engineering",
      aboutSubtitle: "Energy that powers the future",
      aboutText: "We don't just rent machines; we offer operational peace of mind. We are a local company with global standards.",
      stats: [
        { label: "Coverage", value: "National" },
        { label: "Support", value: "24/7" },
        { label: "Experience", value: "+10 Years" }
      ]
    }
  };

  const content = lang === 'es' ? t.es : t.en;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      
      <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
        
        {/* Fondo con Efecto de Energía (Animación sutil CSS) */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80" 
                className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow" 
                alt="Fondo energía"
            />
            {/* Gradiente dramático */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-slate-950"></div>
            {/* Manchas de luz roja/azul */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-2xl hover:bg-white/10 transition-all cursor-default">
              <Zap className="w-3 h-3 fill-red-400" /> Plantas Eletricas
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none drop-shadow-2xl">
              {content.heroTitle.split(' ')[0]} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"> {content.heroTitle.split(' ')[1]}</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              {content.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/servicios" className="group relative px-8 py-4 bg-red-600 text-white font-bold rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(220,38,38,0.7)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span className="flex items-center gap-2 relative z-10">{content.ctaPrimary} <ArrowRight className="w-5 h-5"/></span>
              </Link>

              <Link to="/tienda" className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-black font-bold transition-all hover:scale-105 backdrop-blur-sm">
                {content.ctaSecondary}
              </Link>
            </div>
        </div>
      </section>


      {/* --- 2. SECCIÓN DE ESTADÍSTICAS (BARRA FLOTANTE) --- */}
      <div className="bg-slate-950 py-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {content.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                    <span className="text-4xl font-black text-white mb-1">{stat.value}</span>
                    <span className="text-sm text-slate-400 uppercase tracking-widest">{stat.label}</span>
                </div>
            ))}
        </div>
      </div>


     {/* --- 3. SECCIÓN "QUIÉNES SOMOS" TIPO GRID (BENTO) --- */}
      <section className="py-24 px-4 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">{content.aboutTitle}</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900">{content.aboutSubtitle}</h3>
            </div>

            {/* Grid Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                
                {/* 1. Card Grande Izquierda (Texto) */}
                
                <div className="md:col-span-2 md:row-span-2 bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center relative overflow-hidden group z-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                            <Activity className="text-white w-6 h-6" />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-800 mb-6">Más allá de la energía.</h4>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            {content.aboutText}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                                <CheckCircle className="text-green-500 w-5 h-5" />
                                <span className="font-semibold text-slate-700 text-sm">Normativa RETIE</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                                <CheckCircle className="text-green-500 w-5 h-5" />
                                <span className="font-semibold text-slate-700 text-sm">ISO 9001</span>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="relative bg-slate-900 rounded-3xl overflow-hidden group shadow-lg z-0">
                    {/* Imagen de fondo */}
                    <img 
                        src="/ingeniero.png" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" 
                        alt="Tecnología" 
                    />
                    {/* Capa oscura para que se lea el texto */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    
                    <div className="absolute bottom-6 left-6 z-10">
                        <span className="text-white font-bold text-xl">Tecnología</span>
                    </div>
                </div>

                {/* 3. Card Derecha Abajo (Llaneros)  */}
                <div className="relative rounded-3xl overflow-hidden group shadow-lg shadow-red-500/30 hover:-translate-y-1 transition-all duration-300 bg-red-900 z-0">
                    
                    {/* Imagen de fondo */}
                    <img 
                        src="/llanos.png"  
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
                        alt="Llaneros"
                    />
                    
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-900/50 to-transparent"></div>

                    
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                        <Globe className="w-10 h-10 opacity-90 drop-shadow-md" />
                        <div>
                            <h4 className="text-2xl font-bold mb-2 drop-shadow-md">100% Llaneros</h4>
                            <p className="text-red-100 text-sm opacity-90 font-medium">Orgullosamente impulsando la región.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </section>

      {/* --- 4. MARCAS (Estilo Monocromático Moderno) --- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {/* Logos simulados con tipografía Heavy */}
                <span className="text-3xl font-black text-slate-800 tracking-tighter">CUMMINS</span>
                <span className="text-3xl font-black text-slate-800 tracking-tighter">PERKINS</span>
                <span className="text-3xl font-black text-slate-800 tracking-tighter">CATERPILLAR</span>
                <span className="text-3xl font-black text-slate-800 tracking-tighter">VOLVO</span>
            </div>
        </div>
      </section>

    </div>
  );
}