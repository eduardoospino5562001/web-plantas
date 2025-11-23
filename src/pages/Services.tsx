import { Wrench, Zap, Truck, ArrowRight } from 'lucide-react';

interface Props {
  lang: 'es' | 'en';
}

export default function Services({ lang }: Props) {
  
  // Textos traducidos
  const t = {
    es: {
      title: "Soluciones Integrales",
      subtitle: "Mantenemos su operación encendida con servicios técnicos de clase mundial.",
      services: [
        {
          title: "Alquiler de Plantas",
          desc: "Flota moderna de generadores insonorizados desde 10KW hasta 500KW listos para despliegue inmediato.",
          action: "Cotizar Alquiler"
        },
        {
          title: "Mantenimiento Preventivo",
          desc: "Rutinas programadas de inspección, cambio de filtros y fluidos para evitar fallas inesperadas.",
          action: "Agendar Visita"
        },
        {
          title: "Reparación Especializada",
          desc: "Diagnóstico avanzado y reparación de motores (overhaul), sistemas de inyección y tableros de control.",
          action: "Solicitar Diagnóstico"
        }
      ]
    },
    en: {
      title: "Comprehensive Solutions",
      subtitle: "We keep your operation running with world-class technical services.",
      services: [
        {
          title: "Generator Rental",
          desc: "Modern fleet of soundproof generators from 10KW to 500KW ready for immediate deployment.",
          action: "Quote Rental"
        },
        {
          title: "Preventive Maintenance",
          desc: "Scheduled inspection routines, filter and fluid changes to prevent unexpected failures.",
          action: "Schedule Visit"
        },
        {
          title: "Specialized Repair",
          desc: "Advanced diagnosis and engine repair (overhaul), injection systems, and control panels.",
          action: "Request Diagnosis"
        }
      ]
    }
  };

  const content = lang === 'es' ? t.es : t.en;

  // Iconos para cada servicio
  const icons = [<Truck className="w-8 h-8 text-white"/>, <Zap className="w-8 h-8 text-white"/>, <Wrench className="w-8 h-8 text-white"/>];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
        
        {/* Encabezado */}
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{content.title}</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                {content.subtitle}
            </p>
        </div>

        {/* Tarjetas de Servicio */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((servicio, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group">
                    
                    {/* Icono Flotante */}
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-700 transition-colors shadow-lg shadow-slate-900/20">
                        {icons[index]}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{servicio.title}</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        {servicio.desc}
                    </p>

                    <a 
                        href="https://wa.me/573001234567" 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-red-700 font-bold hover:gap-4 transition-all"
                    >
                        {servicio.action} <ArrowRight className="w-5 h-5"/>
                    </a>
                </div>
            ))}
        </div>
    </div>
  );
}