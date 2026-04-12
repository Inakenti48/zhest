'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Trash2, Package, Edit2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminProductList({ products, onEdit, onDelete }: { products: any[], onEdit: (product: any) => void, onDelete?: () => void }) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete(id: number) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      setIsPending(true);
      try {
        await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        if (onDelete) onDelete();
      } finally {
        setIsPending(false);
      }
    }
  }

  return (
    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <motion.div 
          key={product.id} 
          whileHover={{ y: -5 }}
          className="glass overflow-hidden flex flex-col group hover:border-blue-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] rounded-[2.5rem]"
        >
            <div className="h-56 bg-metal-900 relative overflow-hidden">
              {product.image_url ? (
                <Image 
                  src={product.image_url} 
                  alt={product.name} 
                  fill
                  className="object-contain transition-transform group-hover:scale-105 duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ 
                    padding: `${product.image_padding || 0}px`,
                    transform: `scale(${product.image_scale || 1.0})`
                  }}
                />
              ) : (

              <div className="w-full h-full flex items-center justify-center text-metal-600 bg-gradient-to-br from-metal-800 to-metal-900">
                <Package size={48} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button 
                onClick={() => onEdit(product)}
                className="p-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-2xl transition-all backdrop-blur-md shadow-lg"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(product.id)}
                disabled={isPending}
                className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all backdrop-blur-md disabled:opacity-50 shadow-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
            <div className="p-6 flex-1 flex flex-col relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{product.name}</h3>
                {product.color && (
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black text-blue-400 border border-blue-500/20 uppercase tracking-widest">
                    RAL {product.color}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.category && (
                  <div className="text-[10px] text-metal-500 font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    Категория: <span className="text-white">{product.category}</span>
                  </div>
                )}
                {product.thickness && (
                  <div className="text-[10px] text-metal-500 font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    Толщина: <span className="text-white">{product.thickness} мм</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-metal-500 uppercase font-black tracking-widest mb-1">Розница</p>
                  <p className="text-2xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">{product.sell_price} ₽ <span className="text-xs text-metal-600 font-bold">/ {product.unit}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-metal-500 uppercase font-black tracking-widest mb-1">Склад</p>
                  <p className={`text-xl font-black ${product.stock > 5 ? 'text-blue-400' : 'text-orange-400'} drop-shadow-sm`}>
                    {product.stock} <span className="text-xs font-bold opacity-60 uppercase">{product.unit}</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-metal-500">
                  Закуп: <span className="text-metal-300">{product.buy_price} ₽</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  Прибыль: {(product.sell_price - product.buy_price).toFixed(2)} ₽
                </div>
              </div>
            </div>
        </motion.div>
      ))}
      {products.length === 0 && (
        <div className="col-span-full py-20 text-center glass text-metal-500 rounded-[2.5rem]">
          <Package size={48} className="mx-auto mb-4 opacity-20" />
          <p className="uppercase font-black tracking-widest text-xs">Товары еще не добавлены</p>
        </div>
      )}
    </div>
  );
}
