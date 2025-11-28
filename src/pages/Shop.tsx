import { useEffect, useState } from 'react';
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../client';
import { Producto } from '../types';
import ProductCard from '../components/ProductCard';   // Importamos la tarjeta
import ProductModal from '../components/ProductModal'; // Importamos el modal

interface Props {
    lang: 'es' | 'en';
}

export default function Shop({ lang }: Props) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const query = '*[_type == "producto"] | order(_createdAt desc)';
        client.fetch(query)
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    // Filtros
    const productosFiltrados = productos.filter(prod => {
        const termino = busqueda.toLowerCase();
        const nombre = prod.nombre?.toLowerCase() || "";
        return nombre.includes(termino);
    });

    useEffect(() => { setCurrentPage(1); }, [busqueda]);

    // Cálculos de Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

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

            {/* GRILLA: Aquí usamos nuestro componente nuevo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentItems.map(prod => (
                    <ProductCard 
                        key={prod._id} 
                        prod={prod} 
                        onClick={() => setSelectedProduct(prod)} 
                    />
                ))}
            </div>

            {/* Controles de Paginación */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30">
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-red-600 text-white shadow-lg scale-110' : 'bg-white text-slate-600 border border-slate-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30">
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            )}
        </div>

        {/* MODAL: Aquí usamos nuestro componente nuevo */}
        {selectedProduct && (
            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
                lang={lang} 
            />
        )}
    </div>
  );
}