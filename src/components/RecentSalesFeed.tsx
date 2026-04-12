'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Clock } from 'lucide-react';
import { getRecentSales } from '@/lib/product-actions';

export default function RecentSalesFeed({ initialSales }: { initialSales: any[] }) {
  const [sales, setSales] = useState(initialSales);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updated = await getRecentSales();
      setSales(updated);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 relative z-10">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group animate-in slide-in-from-right duration-500">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex flex-col items-center justify-center text-blue-400 font-black border border-blue-500/20 group-hover:scale-110 transition-transform text-xs">
            <span className="opacity-50">x</span>{sale.quantity}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black truncate text-white uppercase tracking-tight text-sm">{sale.product_name}</p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-metal-500 font-bold uppercase">
                {new Date(sale.sale_date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} • {new Date(sale.sale_date).toLocaleDateString('ru-RU')}
              </p>
              <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${sale.payment_method === 'Перевод' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}`}>
                {sale.payment_method}
              </span>
            </div>
          </div>
          <p className="font-black text-green-400 text-sm">+{sale.total_price} ₽</p>
        </div>
      ))}
      {sales.length === 0 && (
        <div className="text-center py-20">
          <ShoppingBag size={48} className="mx-auto text-white/5 mb-4" />
          <p className="text-metal-500 font-bold italic">Продаж пока нет</p>
        </div>
      )}
    </div>
  );
}
