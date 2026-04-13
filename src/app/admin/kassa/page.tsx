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
  DollarSign,
  CheckCircle2,
  X,
  Package
} from 'lucide-react';
import { getProducts, registerSale, saveReportToFile, getNextInvoiceNo } from '@/lib/product-actions';
import { getCurrentUser } from '@/lib/auth-actions';
import Image from 'next/image';
import { Invoice } from '@/components/Invoice';

export default function KassaPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState<any[]>([]);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'Наличными' | 'Перевод' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentUserName, setCurrentUserName] = useState<string>('Кострова В.Б.');
  
    useEffect(() => {
      getProducts().then(setProducts);
      getCurrentUser().then(setCurrentUserName);
    }, []);
  
    const filteredProducts = useMemo(() => {
      return products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category?.toLowerCase().includes(search.toLowerCase())
      );
    }, [products, search]);
  
    const [selectedProductForCalc, setSelectedProductForCalc] = useState<any>(null);
    const [calcDimensions, setCalcDimensions] = useState({ width: 0, length: 0 });
    const [calcUnits, setCalcUnits] = useState({ width: 'm', length: 'm' });
      const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [lastSaleForInvoice, setLastSaleForInvoice] = useState<any>(null);
    const [extraCalc, setExtraCalc] = useState({ coeff: 0 });

  const [editableInvoice, setEditableInvoice] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

    const cartItem = { 
      ...selectedProductForCalc, 
      quantity: finalArea,
      calc: {
        sheets,
        length_input: calcDimensions.length,
        width_input: calcDimensions.width,
        full_width: selectedProductForCalc.full_width,
        useful_width: selectedProductForCalc.useful_width,
        total_linear_meters: sheets * calcDimensions.length,
        total_m2: sheets * calcDimensions.length * selectedProductForCalc.full_width
      }
    };

    setCart([...cart, cartItem]);
    
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
        const saleItems = [];
        let firstSaleId = null;
        const { invoiceNo, formattedDate } = await getNextInvoiceNo();

        for (const item of cart) {
          const result = await registerSale(item.id, item.quantity, item.sell_price * item.quantity, paymentMethod, invoiceNo);
          if (result.success && !firstSaleId) {
            firstSaleId = result.id;
          }
          saleItems.push({
            ...item,
            total_price: item.sell_price * item.quantity
          });
          
          await saveReportToFile({
            product_name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            total_price: item.sell_price * item.quantity,
            payment_method: paymentMethod
          });
        }
        
                const invoiceData = {
                  items: saleItems.map((item: any) => ({
                    name: item.name,
                    pricePerUnit: item.sell_price,
                    quantity: item.quantity,
                    unit: item.unit,
                    sum: item.total_price,
                    calc: item.calc
                  })),
                  supplier: 'Жестяной Цех',
                  buyer: customerName || '',
                  deliveryAddress: '',
                    phone: customerPhone || '',
                    contactPerson: customerName || '',
                    releasedBy: currentUserName,
                    comment: '',

                  paymentMethod,
                  date: formattedDate,
                  total: total,
                  vatAmount: 0,
                  id: invoiceNo
                };



        
        setLastSaleForInvoice(invoiceData);
        setEditableInvoice(invoiceData);

        setIsSuccess(true);
      setCart([]);
      setPaymentMethod(null);
      
      const updated = await getProducts();
      setProducts(updated);
    } catch (error) {
      alert('Ошибка при оформлении продажи');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] overflow-hidden">
      {/* Product Selection */}
      <div className="flex-[2] flex flex-col min-h-0 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-500" size={20} />
          <input
            type="text"
            placeholder="ПОИСК ТОВАРА (НАЗВАНИЕ ИЛИ КАТЕГОРИЯ)..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 font-black uppercase tracking-widest text-xs focus:border-blue-500/50 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 overflow-y-auto pr-2 custom-scrollbar pb-24 md:pb-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`group glass p-3 text-left transition-all hover:border-blue-500/50 flex flex-col gap-2 relative overflow-hidden ${product.stock <= 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
            >
              <div className="aspect-square relative rounded-xl overflow-hidden bg-metal-900/50 shadow-inner">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-metal-700">
                    <Package size={24} />
                  </div>
                )}
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[9px] font-black uppercase border border-white/5">
                  {product.stock} {product.unit}
                </div>
              </div>
              <div className="px-0.5">
                <p className="font-black text-[10px] uppercase truncate leading-tight tracking-tight">{product.name}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-blue-400 font-black text-xs">{product.sell_price} ₽</p>
                  <div className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Plus size={10} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart / Checkout */}
      <div className={`
        fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm transition-opacity lg:static lg:bg-transparent lg:backdrop-blur-none lg:z-0 lg:flex-1 lg:flex lg:flex-col lg:min-w-[380px]
        ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}
      `}>
        <div className="absolute inset-0 lg:hidden" onClick={() => setIsCartOpen(false)} />
        
        <div className={`
          absolute right-0 bottom-0 top-0 w-full max-w-[450px] bg-[#030712] border-l border-white/5 p-6 flex flex-col gap-6 transition-transform lg:translate-x-0 lg:static lg:max-w-none lg:h-full lg:rounded-3xl lg:glass
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-black flex items-center gap-3 uppercase tracking-tighter">
              <ShoppingCart className="text-blue-400" size={20} />
              КОРЗИНА
              <span className="bg-blue-500 text-white text-[10px] py-0.5 px-2 rounded-full font-black ml-2">
                {cart.length}
              </span>
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group relative overflow-hidden">
                <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-metal-900 flex-shrink-0 border border-white/5">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-metal-800">
                      <Package size={16} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[10px] uppercase truncate tracking-tight">{item.name}</p>
                  <p className="text-[9px] text-metal-500 font-bold uppercase">{item.sell_price} ₽ / {item.unit}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="font-black text-xs w-10 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                    <Plus size={12} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-metal-600 hover:text-red-500 transition-colors lg:opacity-0 group-hover:opacity-100">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-metal-600 gap-4 opacity-30 mt-10">
                <ShoppingCart size={40} />
                <p className="font-black uppercase tracking-widest text-[10px]">ПУСТО</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-metal-500 font-black uppercase text-[10px] tracking-widest">ИТОГО К ОПЛАТЕ:</span>
              <span className="text-2xl font-black text-blue-400">{total.toFixed(2)} ₽</span>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={cart.length === 0}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-metal-800 disabled:text-metal-600 py-4 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 text-sm shadow-xl shadow-blue-500/20"
            >
              ОФОРМИТЬ ПРОДАЖУ
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Cart Button */}
      {cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 right-6 z-[90] bg-blue-600 p-4 rounded-2xl shadow-2xl shadow-blue-600/40 flex items-center justify-between border border-white/10 animate-in slide-in-from-bottom duration-500"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-blue-600">
                {cart.length}
              </span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Корзина</p>
              <p className="text-lg font-black leading-tight">{total.toFixed(2)} ₽</p>
            </div>
          </div>
          <div className="bg-white/10 py-2 px-4 rounded-xl font-black text-xs uppercase tracking-widest">
            Смотреть
          </div>
        </button>
      )}

      {/* Roofing Calculator Modal */}
      {selectedProductForCalc && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProductForCalc(null)} />
          <div className="glass p-8 w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">КАЛЬКУЛЯТОР КРОВЛИ</h2>
            <p className="text-metal-500 font-bold uppercase text-[10px] mb-8 tracking-widest">
              {selectedProductForCalc.name} ({selectedProductForCalc.useful_width}м полезная ширина)
            </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Ширина ската</label>
                      <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                        <button 
                          onClick={() => setCalcUnits({ ...calcUnits, width: 'cm' })}
                          className={`text-[8px] font-black px-2 py-0.5 rounded transition-all ${calcUnits.width === 'cm' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-metal-500 hover:text-metal-400'}`}
                        >
                          СМ
                        </button>
                        <button 
                          onClick={() => setCalcUnits({ ...calcUnits, width: 'm' })}
                          className={`text-[8px] font-black px-2 py-0.5 rounded transition-all ${calcUnits.width === 'm' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-metal-500 hover:text-metal-400'}`}
                        >
                          МЕТР
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                          <input
                            type="number"
                            step="0.01"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black text-xl outline-none focus:border-blue-500 transition-all"
                            placeholder="0.00"
                            autoFocus
                            value={calcUnits.width === 'm' ? (calcDimensions.width || '') : (calcDimensions.width === 0 ? '' : Math.round(calcDimensions.width * 100))}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value.replace(/^0+(?=\d)/, '')) || 0;
                              setCalcDimensions({ ...calcDimensions, width: calcUnits.width === 'm' ? val : val / 100 });
                            }}
                          />
                      </div>
                    </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Длина листа</label>
                      <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                        <button 
                          onClick={() => setCalcUnits({ ...calcUnits, length: 'cm' })}
                          className={`text-[8px] font-black px-2 py-0.5 rounded transition-all ${calcUnits.length === 'cm' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-metal-500 hover:text-metal-400'}`}
                        >
                          СМ
                        </button>
                        <button 
                          onClick={() => setCalcUnits({ ...calcUnits, length: 'm' })}
                          className={`text-[8px] font-black px-2 py-0.5 rounded transition-all ${calcUnits.length === 'm' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-metal-500 hover:text-metal-400'}`}
                        >
                          МЕТР
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                          <input
                            type="number"
                            step="0.01"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black text-xl outline-none focus:border-blue-500 transition-all"
                            placeholder="0.00"
                            value={calcUnits.length === 'm' ? (calcDimensions.length || '') : (calcDimensions.length === 0 ? '' : Math.round(calcDimensions.length * 100))}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value.replace(/^0+(?=\d)/, '')) || 0;
                              setCalcDimensions({ ...calcDimensions, length: calcUnits.length === 'm' ? val : val / 100 });
                            }}
                          />
                      </div>
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

                <button onClick={() => setSelectedProductForCalc(null)} className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all text-xs">
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isProcessing && setIsPaymentModalOpen(false)} />
          <div className="glass p-8 w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-4 right-4 text-metal-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-green-500" size={32} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter">ПРОДАЖА ЗАВЕРШЕНА</h2>
                
                  {editableInvoice && (
                    <div className="space-y-3 text-left">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                        {/* Header Fields */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">№ Накладной</label>
                              <div className="w-full bg-black/20 border border-white/5 rounded-xl py-1.5 px-3 font-bold text-[10px] text-metal-400 cursor-not-allowed">
                                {editableInvoice.id}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Дата</label>
                              <div className="w-full bg-black/20 border border-white/5 rounded-xl py-1.5 px-3 font-bold text-[10px] text-metal-400 cursor-not-allowed">
                                {editableInvoice.date}
                              </div>
                            </div>
                        </div>

                          <div className="space-y-1">
                            <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Исполнитель</label>
                            <input 
                              type="text" 
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500"
                              value={editableInvoice.supplier}
                              onChange={(e) => setEditableInvoice({ ...editableInvoice, supplier: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Заказчик</label>
                            <input 
                              type="text" 
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500"
                              value={editableInvoice.buyer}
                              onChange={(e) => setEditableInvoice({ ...editableInvoice, buyer: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Телефон</label>
                              <input 
                                type="text" 
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500"
                                value={editableInvoice.phone}
                                onChange={(e) => setEditableInvoice({ ...editableInvoice, phone: e.target.value })}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Адрес</label>
                              <input 
                                type="text" 
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500"
                                value={editableInvoice.deliveryAddress}
                                onChange={(e) => setEditableInvoice({ ...editableInvoice, deliveryAddress: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Комментарий</label>
                            <textarea 
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500 resize-none h-12"
                              value={editableInvoice.comment}
                              placeholder="Напишите комментарий здесь..."
                              onChange={(e) => setEditableInvoice({ ...editableInvoice, comment: e.target.value })}
                            />
                          </div>

                              {/* Products */}
                              <div className="space-y-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Товары и Цены</label>
                                  <button 
                                    onClick={() => {
                                      const newItem = { name: 'Новый товар', quantity: 1, unit: 'шт', pricePerUnit: 0, sum: 0 };
                                      const newItems = [...editableInvoice.items, newItem];
                                      setEditableInvoice({ ...editableInvoice, items: newItems });
                                    }}
                                    className="text-[8px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-lg border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-colors uppercase font-black"
                                  >
                                    + Добавить товар
                                  </button>
                                </div>
                                <div className="flex gap-1.5 px-1 mb-1">
                                  <span className="text-[7px] text-metal-600 font-black uppercase tracking-tighter flex-[2]">Наименование</span>
                                  <span className="text-[7px] text-metal-600 font-black uppercase tracking-tighter w-14 text-center">Кол-во</span>
                                  <span className="text-[7px] text-metal-600 font-black uppercase tracking-tighter w-14 text-center">Ед.изм</span>
                                  <span className="text-[7px] text-metal-600 font-black uppercase tracking-tighter w-16 text-center">Цена</span>
                                  <span className="w-6"></span>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {editableInvoice.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex gap-1.5 items-start">
                                    <input 
                                      type="text" 
                                      className="flex-[2] min-w-0 bg-black/40 border border-white/10 rounded-xl py-1 px-2 font-bold text-[9px] outline-none focus:border-blue-500"
                                      value={item.name}
                                      onChange={(e) => {
                                        const newItems = [...editableInvoice.items];
                                        newItems[idx] = { ...newItems[idx], name: e.target.value };
                                        setEditableInvoice({ ...editableInvoice, items: newItems });
                                      }}
                                    />
                                    <div className="w-14 flex flex-col gap-1">
                                            <input 
                                              type="number" 
                                              className="w-full bg-black/40 border border-white/10 rounded-lg py-1 px-1 font-bold text-[9px] outline-none focus:border-blue-500 text-center"
                                              value={item.quantity || ''}
                                              onChange={(e) => {
                                                const val = parseFloat(e.target.value.replace(/^0+(?=\d)/, '')) || 0;
                                                const newItems = [...editableInvoice.items];
                                                const newSum = val * item.pricePerUnit;
                                                newItems[idx] = { ...newItems[idx], quantity: val, sum: newSum };
                                                const newTotal = newItems.reduce((sum: number, i: any) => sum + i.sum, 0);
                                                setEditableInvoice({ ...editableInvoice, items: newItems, total: newTotal });
                                              }}
                                            />
                                        </div>
                                    <div className="w-14 flex flex-col gap-1">
                                      <input 
                                        type="text" 
                                        className="w-full bg-black/40 border border-white/10 rounded-lg py-1 px-1 font-bold text-[9px] outline-none focus:border-blue-500 text-center"
                                        value={item.unit}
                                        placeholder="ед"
                                        onChange={(e) => {
                                          const newItems = [...editableInvoice.items];
                                          newItems[idx] = { ...newItems[idx], unit: e.target.value };
                                          setEditableInvoice({ ...editableInvoice, items: newItems });
                                        }}
                                      />
                                      <div className="flex flex-wrap gap-0.5 justify-center">
                                        {['шт', 'м2', 'м', 'см', 'пог.м'].map(u => (
                                          <button 
                                            key={u}
                                            onClick={() => {
                                              const newItems = [...editableInvoice.items];
                                              newItems[idx] = { ...newItems[idx], unit: u };
                                              setEditableInvoice({ ...editableInvoice, items: newItems });
                                            }}
                                            className={`text-[5px] px-0.5 rounded border border-white/5 transition-colors ${item.unit === u ? 'bg-blue-500 text-white' : 'bg-white/5 text-metal-500 hover:bg-white/10'}`}
                                          >
                                            {u}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                      <div className="w-16 relative">
                                        <input 
                                          type="number" 
                                          className="w-full bg-black/40 border border-white/10 rounded-xl py-1 px-1 font-bold text-[9px] outline-none focus:border-blue-500 pr-3"
                                          value={item.pricePerUnit || ''}
                                          onChange={(e) => {
                                            const val = parseFloat(e.target.value.replace(/^0+(?=\d)/, '')) || 0;
                                            const newItems = [...editableInvoice.items];
                                            const newSum = val * item.quantity;
                                            newItems[idx] = { ...newItems[idx], pricePerUnit: val, sum: newSum };
                                            const newTotal = newItems.reduce((sum: number, i: any) => sum + i.sum, 0);
                                            setEditableInvoice({ ...editableInvoice, items: newItems, total: newTotal });
                                          }}
                                        />
                                        <span className="absolute right-0.5 top-1/2 -translate-y-1/2 text-[7px] text-metal-600">₽</span>
                                      </div>
                                    <button 
                                      onClick={() => {
                                        const newItems = editableInvoice.items.filter((_: any, i: number) => i !== idx);
                                        const newTotal = newItems.reduce((sum: number, i: any) => sum + i.sum, 0);
                                        setEditableInvoice({ ...editableInvoice, items: newItems, total: newTotal });
                                      }}
                                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-metal-600 hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 size={10} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                              <div className="space-y-1">
                                <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">НДС (руб)</label>
                                <input 
                                  type="number" 
                                  className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500"
                                  value={editableInvoice.vatAmount || ''}
                                  onChange={(e) => setEditableInvoice({ ...editableInvoice, vatAmount: parseFloat(e.target.value.replace(/^0+(?=\d)/, '')) || 0 })}
                                />
                              </div>
                            <div className="space-y-1">
                              <label className="text-[8px] text-metal-500 font-black uppercase tracking-widest ml-1">Отпустил</label>
                              <input 
                                type="text" 
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 px-3 font-bold text-[10px] outline-none focus:border-blue-500"
                                value={editableInvoice.releasedBy}
                                onChange={(e) => setEditableInvoice({ ...editableInvoice, releasedBy: e.target.value })}
                              />
                            </div>
                          </div>

                      </div>

                      <div className="flex flex-col gap-2">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setIsPreviewOpen(true)}
                              className="bg-white/5 hover:bg-white/10 py-3 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-xs"
                            >
                              ПРЕДПРОСМОТР
                            </button>
                            <button
                              onClick={() => {
                                setIsPreviewOpen(false); // Close preview before printing to avoid duplicates
                                setTimeout(() => window.print(), 50);
                              }}
                              className="bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-blue-500/20"
                            >
                              ПЕЧАТЬ
                            </button>
                          </div>
                        <button
                          onClick={() => {
                            setIsSuccess(false);
                            setIsPaymentModalOpen(false);
                            setLastSaleForInvoice(null);
                            setEditableInvoice(null);
                              setCustomerName('');
                              setCustomerPhone('');
                            }}

                          className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-black uppercase tracking-widest transition-all text-xs"
                        >
                          ЗАВЕРШИТЬ
                        </button>
                      </div>
                    </div>
                  )}

                  {editableInvoice && (
                      <div className="sr-only">
                        <Invoice 
                          date={editableInvoice.date}
                          orderNumber={editableInvoice.id || '-'}
                          supplier={editableInvoice.supplier}
                          buyer={editableInvoice.buyer}
                          deliveryAddress={editableInvoice.deliveryAddress}
                          phone={editableInvoice.phone}
                          contactPerson={editableInvoice.contactPerson}
                          items={editableInvoice.items}
                          totalAmount={editableInvoice.total}
                          releasedBy={editableInvoice.releasedBy}
                          vatAmount={editableInvoice.vatAmount}
                          comment={editableInvoice.comment}
                        />

                    </div>
                )}
            </div>
          ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-2 text-center">ОФОРМЛЕНИЕ ПРОДАЖИ</h2>
                  <p className="text-metal-500 font-bold uppercase text-[9px] text-center tracking-widest">Введите имя клиента и выберите способ оплаты</p>
                </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">ИМЯ КЛИЕНТА</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 font-black text-sm outline-none focus:border-blue-500 transition-all uppercase"
                        placeholder="ИМЯ..."
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">НОМЕР ТЕЛЕФОНА</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 font-black text-sm outline-none focus:border-blue-500 transition-all uppercase"
                        placeholder="НОМЕР..."
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                  </div>


                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setPaymentMethod('Наличными')} className={`flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border-2 transition-all group ${paymentMethod === 'Наличными' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}>
                    <Banknote className={paymentMethod === 'Наличными' ? 'text-blue-500' : 'text-metal-500 group-hover:text-white'} size={40} />
                    <span className="font-black uppercase tracking-widest text-xs">НАЛИЧНЫМИ</span>
                  </button>
                  <button onClick={() => setPaymentMethod('Перевод')} className={`flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border-2 transition-all group ${paymentMethod === 'Перевод' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}>
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

        {/* Visual Preview Modal */}
        {isPreviewOpen && editableInvoice && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
            <div className="relative z-10 w-full max-w-[95vw] max-h-[95vh] flex flex-col items-center gap-4">
              <div className="bg-white overflow-auto max-w-full rounded shadow-2xl custom-scrollbar-light">
                  <div className="transform scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top p-4">
                        <Invoice 
                          date={editableInvoice.date}
                          orderNumber={editableInvoice.id || '-'}
                          supplier={editableInvoice.supplier}
                          buyer={editableInvoice.buyer}
                          deliveryAddress={editableInvoice.deliveryAddress}
                          phone={editableInvoice.phone}
                          contactPerson={editableInvoice.contactPerson}
                          items={editableInvoice.items}
                          totalAmount={editableInvoice.total}
                          releasedBy={editableInvoice.releasedBy}
                          vatAmount={editableInvoice.vatAmount}
                          comment={editableInvoice.comment}
                          isPrintable={false}
                        />

                  </div>
              </div>
            <div className="flex gap-4">
              <button onClick={() => setIsPreviewOpen(false)} className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all text-xs border border-white/10">
                ЗАКРЫТЬ
              </button>
              <button
                onClick={() => {
                  setIsPreviewOpen(false);
                  setTimeout(() => window.print(), 100);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all text-xs shadow-xl shadow-blue-500/20"
              >
                ПЕЧАТЬ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
