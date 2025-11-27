import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Loader2, AlertCircle, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../client';

interface Producto {
  _id: string;
  nombre: string;
  precio: string;
  categoria: string;
  imagen: any;
  descripcion: string;
}

interface Props {
    lang: 'es' | 'en';
}

export default function Shop({ lang }: Props) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    // --- 1. ESTADOS PARA LA PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // ¿Cuántos productos quieres ver por página?

    useEffect(() => {
        const query = '*[_type == "producto"] | order(_createdAt desc)';
        client.fetch(query)
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    // --- 2. LÓGICA DE FILTRADO ---
    const productosFiltrados = productos.filter(prod => {
        const termino = busqueda.toLowerCase();
        const nombre = prod.nombre?.toLowerCase() || "";
        return nombre.includes(termino);
    });

    // Resetear a la página 1 si el usuario busca algo
    useEffect(() => {
        setCurrentPage(1);
    }, [busqueda]);

    // --- 3. CÁLCULO MATEMÁTICO DE LA PAGINACIÓN ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

    // Función para cambiar de página (con scroll suave hacia arriba)
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
    <div className="min-h-screen bg-slate-50/50">
        
        {/* Encabezado */}
        <div className="bg-white border-b border-slate-200 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {lang === 'es' ? 'Catálogo de Productos' : 'Product Catalog'}
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
                    <p className="text-lg">No se encontraron productos.</p>
                </div>
            )}

            {/* GRILLA (Mostramos currentItems en vez de todos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentItems.map(prod => (
                    <div 
                        key={prod._id} 
                        onClick={() => setSelectedProduct(prod)}
                        className="group bg-white rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden cursor-pointer"
                    >
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
                             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
                                    <Eye className="w-3 h-3" /> Ver detalles
                                </span>
                             </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2 leading-tight">
                                {prod.nombre}
                            </h3>
                            <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                                {prod.descripcion || "Sin descripción disponible."}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                            <span className="font-bold text-lg text-slate-800">{prod.precio}</span>
                            <button className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors">
                                <ShoppingBag className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 4. CONTROLES DE PAGINACIÓN --- */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                    {/* Botón Anterior */}
                    <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>

                    {/* Números de Página */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`
                                w-10 h-10 rounded-lg font-bold text-sm transition-all
                                ${currentPage === i + 1 
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-110' 
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}
                            `}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Botón Siguiente */}
                    <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            )}
        </div>

        {/* Modal (Sin cambios, solo lo incluyo para que no se te pierda) */}
        {selectedProduct && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSelectedProduct(null)}
                ></div>
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                    <button 
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full z-20"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="w-full md:w-1/2 bg-slate-50 p-8 flex items-center justify-center">
                        {selectedProduct.imagen ? (
                            <img 
                                src={urlFor(selectedProduct.imagen).url()} 
                                alt={selectedProduct.nombre} 
                                className="w-full h-full object-contain mix-blend-multiply max-h-[300px]" 
                            />
                        ) : (
                            <ShoppingBag className="w-20 h-20 text-slate-200" />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 p-8 flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            {selectedProduct.categoria}
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                            {selectedProduct.nombre}
                        </h2>
                        <div className="flex-1 overflow-y-auto max-h-[200px] mb-6 pr-2">
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {selectedProduct.descripcion || "Sin descripción detallada."}
                            </p>
                        </div>
                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <p className="text-xs text-slate-500 mb-1">Precio</p>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-2xl font-bold text-slate-900">
                                    {selectedProduct.precio}
                                </span>
                                <a 
                                    href={`https://wa.me/573142130308?text=Hola, estoy interesado en el producto: ${selectedProduct.nombre}`}
                                    target="_blank"
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    {lang === 'es' ? 'Comprar' : 'Buy Now'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}