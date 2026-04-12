'use client';

import { useState } from 'react';
import { registerSale } from '@/lib/product-actions';
import { ShoppingCart, Loader2 } from 'lucide-react';

export default function SaleForm({ productId, productName, price, maxStock }: any) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSale() {
    if (quantity > maxStock) {
      setMessage({ type: 'error', text: 'Недостаточно на складе' });
      return;
    }

    setLoading(true);
    setMessage(null);
    
    const result = await registerSale(productId, quantity, price * quantity);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Продажа оформлена' });
      setQuantity(1);
    } else {
      setMessage({ type: 'error', text: result.error || 'Ошибка' });
    }
    setLoading(false);

    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div className="space-y-3 mt-auto">
      <div className="flex items-center gap-3">
        <input 
          type="number" 
          min="1" 
          max={maxStock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <div className="flex-1 text-right">
          <p className="text-xs text-metal-500">Итого</p>
          <p className="font-bold">{(price * quantity).toFixed(2)} ₽</p>
        </div>
      </div>

      <button 
        onClick={handleSale}
        disabled={loading || maxStock <= 0}
        className="w-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white font-semibold py-2 rounded-xl border border-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart size={18} />}
        Продать
      </button>

      {message && (
        <p className={`text-xs text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
