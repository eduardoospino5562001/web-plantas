import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Loader2 } from 'lucide-react';
import { client, urlFor } from '../client'; // Importamos la conexión

interface Producto {
  _id: string;
  nombre: string;
  precio: string;
  categoria: string;
  imagen: any;
}

interface Props {
    lang: 'es' | 'en';
}

export default function Shop({ lang }: Props) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);

    // --- 1. PEDIR DATOS A SANITY ---
    useEffect(() => {
        const query = '*[_type == "producto"]'; // Pedimos todo lo que sea tipo "producto"

        client.fetch(query)
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    // Filtramos solo los repuestos para esta vista
    const repuestos = productos.filter(p => p.categoria === 'repuesto');

    return (
    <div className="min-h-screen bg-slate-50/50">
        {/* Encabezado */}
        <div className="bg-white border-b border-slate-200 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {lang === 'es' ? 'Catálogo de Repuestos' : 'Spare Parts Catalog'}
                </h1>
                
                {/* Buscador */}
                <div className="relative max-w-lg mx-auto shadow-lg rounded-full mt-8">
                    <input 
                        type="text" 
                        placeholder={lang === 'es' ? "Buscar repuesto..." : "Search part..."}
                        className="w-full pl-12 pr-4 py-4 rounded-full border-none focus:ring-2 focus:ring-red-500 bg-white text-slate-800"
                    />
                    <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                </div>
            </div>
        </div>

        {/* Contenido */}
        <div className="max-w-7xl mx-auto px-6 py-16">
            
            {/* Animación de Carga */}
            {loading && (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-red-600" />
                </div>
            )}

            {/* Si no hay productos aún */}
            {!loading && repuestos.length === 0 && (
                <p className="text-center text-slate-500">No hay productos cargados en el sistema aún.</p>
            )}

            {/* Grilla de Productos Reales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {repuestos.map(prod => (
                    <div key={prod._id} className="group bg-white rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col">
                        
                        {/* Imagen Real de Sanity */}
                        <div className="bg-slate-50 rounded-xl h-48 p-6 flex items-center justify-center mb-4 overflow-hidden relative">
                             {prod.imagen && (
                                 <img 
                                    src={urlFor(prod.imagen).width(400).url()} 
                                    alt={prod.nombre} 
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
                                />
                             )}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-red-700 transition-colors">
                                {prod.nombre}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                            <span className="font-bold text-lg text-slate-800">{prod.precio}</span>
                            <a 
                                href={`https://wa.me/573142130308?text=Me interesa: ${prod.nombre}`}
                                target="_blank"
                                className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}