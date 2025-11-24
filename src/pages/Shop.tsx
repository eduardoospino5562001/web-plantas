import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Loader2, AlertCircle } from 'lucide-react';
import { client, urlFor } from '../client';

interface Producto {
  _id: string;
  nombre: string;
  precio: string;
  categoria: string;
  imagen: any;
  descripcion: string; // <--- 1. AGREGAMOS ESTE CAMPO
}

interface Props {
    lang: 'es' | 'en';
}

export default function Shop({ lang }: Props) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        // Pedimos todos los productos
        const query = '*[_type == "producto"] | order(_createdAt desc)';

        client.fetch(query)
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const productosFiltrados = productos.filter(prod => {
        const termino = busqueda.toLowerCase();
        const nombre = prod.nombre?.toLowerCase() || "";
        return nombre.includes(termino);
    });

    return (
    <div className="min-h-screen bg-slate-50/50">
        
        {/* Encabezado */}
        <div className="bg-white border-b border-slate-200 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {lang === 'es' ? 'Catálogo de Repuestos' : 'Product Catalog'}
                </h1>
                
                <div className="relative max-w-lg mx-auto shadow-lg rounded-full mt-8 transition-all focus-within:ring-2 focus-within:ring-red-500">
                    <input 
                        type="text" 
                        placeholder={lang === 'es' ? "Buscar producto..." : "Search product..."}
                        className="w-full pl-12 pr-4 py-4 rounded-full border-none outline-none bg-white text-slate-800"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                </div>
            </div>
        </div>

        {/* Contenido */}
        <div className="max-w-7xl mx-auto px-6 py-16">
            
            {loading && (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-red-600" />
                </div>
            )}

            {!loading && productosFiltrados.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg">
                        {busqueda 
                            ? (lang === 'es' ? `No encontramos nada con "${busqueda}"` : `No results for "${busqueda}"`)
                            : (lang === 'es' ? "No hay productos cargados aún." : "No products loaded yet.")
                        }
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {productosFiltrados.map(prod => (
                    <div key={prod._id} className="group bg-white rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden">
                        
                        {prod.categoria && (
                            <span className="absolute top-4 left-4 z-10 bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                                {prod.categoria}
                            </span>
                        )}

                        <div className="bg-slate-50 rounded-xl h-48 p-6 flex items-center justify-center mb-4 overflow-hidden relative">
                             {prod.imagen ? (
                                 <img 
                                    src={urlFor(prod.imagen).width(400).url()} 
                                    alt={prod.nombre} 
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
                                />
                             ) : (
                                 <ShoppingBag className="w-12 h-12 text-slate-200" />
                             )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            {/* TÍTULO */}
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2 leading-tight">
                                {prod.nombre}
                            </h3>

                            {/* --- 2. AQUÍ ESTÁ LA NUEVA DESCRIPCIÓN --- */}
                            {/* line-clamp-2 corta el texto si es muy largo para que no dañe el diseño */}
                            <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                                {prod.descripcion || (lang === 'es' ? "Sin descripción disponible." : "No description available.")}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                            <span className="font-bold text-lg text-slate-800">{prod.precio}</span>
                            <a 
                                href={`https://wa.me/573142130308?text=Me interesa: ${prod.nombre}`}
                                target="_blank"
                                className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
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