export interface Producto {
    id: number;
    nombre: string;
    categoria: string; // 'generador'
    precio: string;
    img: string;
}

export const productos: Producto[] = [
    // --- REPUESTOS 
    {
      id: 1,
      nombre: "Tarjeta AVR SX460",
      categoria: "repuesto",
      precio: "COP $180.000",
      img: "https://m.media-amazon.com/images/I/61w-JDQP+XL._AC_SL1500_.jpg" 
    },
    {
      id: 2,
      nombre: "Módulo de Control DSE5110",
      categoria: "repuesto",
      precio: "COP $450.000",
      img: "https://ae01.alicdn.com/kf/HTB1Kk5SKFXXXXXCXFXXq6xXFXXXM/Deep-Sea-Electronics-Controller-Module-DSE5110-Generator-Controller-Panel.jpg"
    },
    {
      id: 3,
      nombre: "Solenoide XHQ-PT 12V",
      categoria: "repuesto",
      precio: "COP $120.000",
      img: "https://ae01.alicdn.com/kf/HTB1..dHX.vrK1RjSspcq6zzSXXa8/Stop-Solenoid-Valve-XHQ-PT-12V-Engine-Parts.jpg"
    },
    {
      id: 4,
      nombre: "Sensor de Presión de Aceite VDO",
      categoria: "repuesto",
      precio: "COP $85.000",
      img: "https://m.media-amazon.com/images/I/51Z8Y-P5EKL._AC_SX679_.jpg"
    },
    // --- GENERADORES (Para portada) ---
    {
      id: 5,
      nombre: "Planta Cummins 150KW",
      categoria: "generador",
      precio: "A convenir",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
    }
];

export const servicios = [
    {
        titulo: "Alquiler de Plantas Eléctricas",
        desc: "A su disposición encontrará una amplia gama de plantas eléctricas, compresores y motosoldadores para alquiler por el tiempo requerido.",
        img: "https://images.unsplash.com/photo-1495125548446-85e02f234b41?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Mantenimiento Preventivo",
        desc: "Verificación del estado actual del equipo, registro de datos, revisión y limpieza general, control y medición de sistemas eléctricos.",
        img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Mantenimiento Correctivo",
        desc: "Diagnóstico, reparación de generadores, reparación de motor (anillado), entrega de informe técnico y puesta en marcha.",
        img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    }
];