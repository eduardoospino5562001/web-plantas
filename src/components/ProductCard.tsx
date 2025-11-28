import { ShoppingBag, Eye } from 'lucide-react';
import { urlFor } from '../client';
import { Producto } from '../types'; // Importamos del paso 1

interface Props {
    prod: Producto;
    onClick: () => void;
}

export default function ProductCard({ prod, onClick }: Props) {
  return (
    <div 
        onClick={onClick}
        className="group bg-white rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden cursor-pointer h-full"
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
  );
}