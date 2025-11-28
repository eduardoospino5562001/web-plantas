import { X, ShoppingBag } from 'lucide-react';
import { urlFor } from '../client';
import { Producto } from '../types';

interface Props {
    product: Producto;
    onClose: () => void;
    lang: 'es' | 'en';
}

export default function ProductModal({ product, onClose, lang }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Fondo Oscuro */}
        <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        ></div>

        {/* Caja del Modal */}
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh]">
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full z-20"
            >
                <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Imagen */}
            <div className="w-full md:w-1/2 bg-slate-50 p-8 flex items-center justify-center">
                {product.imagen ? (
                    <img 
                        src={urlFor(product.imagen).url()} 
                        alt={product.nombre} 
                        className="w-full h-full object-contain mix-blend-multiply max-h-[300px]" 
                    />
                ) : (
                    <ShoppingBag className="w-20 h-20 text-slate-200" />
                )}
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {product.categoria}
                </span>
                
                <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                    {product.nombre}
                </h2>

                <div className="flex-1 overflow-y-auto mb-6 pr-2 scrollbar-thin">
                    <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                        {product.descripcion || "Sin descripción detallada."}
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Precio</p>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-2xl font-bold text-slate-900">
                            {product.precio}
                        </span>
                        <a 
                            href={`https://wa.me/573142130308?text=Hola, estoy interesado en el producto: ${product.nombre}`}
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
  );
}