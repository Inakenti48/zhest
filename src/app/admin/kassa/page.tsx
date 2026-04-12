'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote,
  CheckCircle2,
  X,
  Package
} from 'lucide-react';
import { getProducts, registerSale, saveReportToFile } from '@/lib/product-actions';
import Image from 'next/image';

export default function KassaPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Наличными' | 'Перевод' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.category?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const [selectedProductForCalc, setSelectedProductForCalc] = useState<any>(null);
  const [calcDimensions, setCalcDimensions] = useState({ width: 0, length: 0 });

  const addToCart = (product: any) => {
    if (product.useful_width) {
      setSelectedProductForCalc(product);
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCalcAdd = () => {
    if (!selectedProductForCalc || !calcDimensions.width || !calcDimensions.length) return;
    
    const sheets = Math.ceil(calcDimensions.width / selectedProductForCalc.useful_width);
    const totalArea = sheets * calcDimensions.length * selectedProductForCalc.full_width;
    const finalArea = parseFloat(totalArea.toFixed(2));

    const existing = cart.find(item => item.id === selectedProductForCalc.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === selectedProductForCalc.id ? { ...item, quantity: item.quantity + finalArea } : item
      ));
    } else {
      setCart([...cart, { ...selectedProductForCalc, quantity: finalArea }]);
    }
    
    setSelectedProductForCalc(null);
    setCalcDimensions({ width: 0, length: 0 });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0.1, item.quantity + delta);
        return { ...item, quantity: parseFloat(newQty.toFixed(2)) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.sell_price * item.quantity), 0);

  const handleCompleteSale = async () => {
    if (!paymentMethod) return;
    setIsProcessing(true);
    
    try {
      for (const item of cart) {
        await registerSale(item.id, item.quantity, item.sell_price * item.quantity, paymentMethod);
        // Save to local report file
        await saveReportToFile({
          product_name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          total_price: item.sell_price * item.quantity,
          payment_method: paymentMethod
        });
      }
      
      setIsSuccess(true);
      setCart([]);
      setPaymentMethod(null);
      setTimeout(() => {
        setIsSuccess(false);
        setIsPaymentModalOpen(false);
      }, 2000);
      
      // Refresh products to update stock
      const updated = await getProducts();
      setProducts(updated);
    } catch (error) {
      alert('Ошибка при оформлении продажи');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-180px)]">
      {/* Product Selection */}
      <div className="flex-1 space-y-6 flex flex-col min-h-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-500" size={20} />
          <input
            type="text"
            placeholder="ПОИСК ТОВАРА (НАЗВАНИЕ ИЛИ КАТЕГОРИЯ)..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 font-black uppercase tracking-widest text-sm focus:border-blue-500/50 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`group glass p-4 text-left transition-all hover:border-blue-500/50 flex flex-col gap-3 relative overflow-hidden ${product.stock <= 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
            >
              <div className="aspect-square relative rounded-xl overflow-hidden bg-metal-900/50">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-metal-700">
                    <Package size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-black uppercase">
                  {product.stock} {product.unit}
                </div>
              </div>
              <div>
                <p className="font-black text-xs uppercase truncate leading-tight">{product.name}</p>
                <p className="text-blue-400 font-black mt-1">{product.sell_price} ₽</p>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Plus className="text-blue-400" size={32} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart / Checkout */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="glass p-6 flex flex-col flex-1 min-h-0">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
            <ShoppingCart className="text-blue-400" size={24} />
            КОРЗИНА
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 group">
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xs uppercase truncate">{item.name}</p>
                  <p className="text-[10px] text-metal-500 font-bold uppercase">{item.sell_price} ₽ / {item.unit}</p>
                  {item.useful_width && (
                    <p className="text-[8px] text-blue-400 font-bold uppercase">Размер: {item.full_width}м (полн) / {item.useful_width}м (полз)</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-black text-sm w-12 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-metal-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-metal-600 gap-4 opacity-50">
                <ShoppingCart size={48} />
                <p className="font-black uppercase tracking-widest text-xs">ПУСТО</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-metal-500 font-black uppercase text-xs">ИТОГО К ОПЛАТЕ:</span>
              <span className="text-3xl font-black text-blue-400">{total.toFixed(2)} ₽</span>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={cart.length === 0}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-metal-800 disabled:text-metal-600 py-4 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              ОФОРМИТЬ ПРОДАЖУ
            </button>
          </div>
        </div>
      </div>

      {/* Roofing Calculator Modal */}
      {selectedProductForCalc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProductForCalc(null)} />
          <div className="glass p-8 w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">КАЛЬКУЛЯТОР КРОВЛИ</h2>
            <p className="text-metal-500 font-bold uppercase text-[10px] mb-8 tracking-widest">
              {selectedProductForCalc.name} ({selectedProductForCalc.useful_width}м полезная ширина)
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Ширина ската (м)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black text-xl outline-none focus:border-blue-500 transition-all"
                  placeholder="0.00"
                  autoFocus
                  value={calcDimensions.width || ''}
                  onChange={(e) => setCalcDimensions({ ...calcDimensions, width: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Длина листа (м)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black text-xl outline-none focus:border-blue-500 transition-all"
                  placeholder="0.00"
                  value={calcDimensions.length || ''}
                  onChange={(e) => setCalcDimensions({ ...calcDimensions, length: parseFloat(e.target.value) || 0 })}
                />
              </div>

              {calcDimensions.width > 0 && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-metal-500">
                    <span>Листов:</span>
                    <span className="text-white">{Math.ceil(calcDimensions.width / selectedProductForCalc.useful_width)} шт</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-metal-500">
                    <span>Площадь (полная):</span>
                    <span className="text-green-400">{(Math.ceil(calcDimensions.width / selectedProductForCalc.useful_width) * calcDimensions.length * selectedProductForCalc.full_width).toFixed(2)} кв.м.</span>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setSelectedProductForCalc(null)}
                  className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all text-xs"
                >
                  ОТМЕНА
                </button>
                <button
                  onClick={handleCalcAdd}
                  disabled={!calcDimensions.width || !calcDimensions.length}
                  className="flex-[2] py-4 rounded-2xl font-black uppercase tracking-widest bg-blue-500 hover:bg-blue-600 disabled:opacity-50 transition-all text-xs"
                >
                  ДОБАВИТЬ В КОРЗИНУ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isProcessing && setIsPaymentModalOpen(false)} />
          <div className="glass p-8 w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-metal-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-500" size={48} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">ПРОДАЖА ЗАВЕРШЕНА</h2>
                <p className="text-metal-400 font-bold uppercase text-xs">Чек сохранен в системе и файле отчетов</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 text-center">ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ</h2>
                  <p className="text-metal-500 font-bold uppercase text-[10px] text-center tracking-widest">Продажа не будет завершена до выбора оплаты</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('Наличными')}
                    className={`flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border-2 transition-all group ${paymentMethod === 'Наличными' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <Banknote className={paymentMethod === 'Наличными' ? 'text-blue-500' : 'text-metal-500 group-hover:text-white'} size={40} />
                    <span className="font-black uppercase tracking-widest text-xs">НАЛИЧНЫМИ</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('Перевод')}
                    className={`flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border-2 transition-all group ${paymentMethod === 'Перевод' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <CreditCard className={paymentMethod === 'Перевод' ? 'text-blue-500' : 'text-metal-500 group-hover:text-white'} size={40} />
                    <span className="font-black uppercase tracking-widest text-xs">ПЕРЕВОД</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-metal-500 font-black uppercase text-xs">СУММА К ОПЛАТЕ:</span>
                    <span className="text-2xl font-black text-white">{total} ₽</span>
                  </div>
                  <button
                    onClick={handleCompleteSale}
                    disabled={!paymentMethod || isProcessing}
                    className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400 hover:text-white"
                  >
                    {isProcessing ? 'ОБРАБОТКА...' : 'ПОДТВЕРДИТЬ ОПЛАТУ'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
