'use client';

// Локальное обновление в реальном времени (polling)
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { updateOrderStatus, getOrders } from '@/lib/product-actions';
import { Check, Package, MapPin, Phone, User } from 'lucide-react';

interface OrderItem {
  id: number;
  product_name: string;
  image_url: string;
  quantity: number;
  price_at_time: number;
}

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  status: 'pending' | 'completed';
  created_at: string;
  items: OrderItem[];
}

export default function OrderList({ orders: initialOrders }: { orders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    // Автоматическое обновление списка заказов каждые 5 секунд
    const interval = setInterval(async () => {
      try {
        const updatedOrders = await getOrders();
        setOrders(updatedOrders);
      } catch (error) {
        console.error('Ошибка обновления заказов:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as any } : o));
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 glass">
        <Package size={48} className="mx-auto text-white/5 mb-4" />
        <p className="text-metal-500 font-bold italic text-sm">Онлайн-заказов пока нет</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div 
          key={order.id} 
          className={`glass overflow-hidden transition-all border-l-4 ${order.status === 'completed' ? 'border-l-green-500/50 opacity-80' : 'border-l-blue-500'}`}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'}`}>
                    {order.status === 'pending' ? 'Новый заказ' : 'Выполнен'}
                  </div>
                  <span className="text-[10px] text-metal-500 font-black uppercase">#{order.id} • {new Date(order.created_at).toLocaleString('ru-RU')}</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-black flex items-center gap-2 text-white">
                    <User size={18} className="text-metal-500" /> {order.customer_name}
                  </h3>
                  <p className="flex items-center gap-2 text-metal-400 text-sm font-bold">
                    <Phone size={14} className="text-blue-400" /> {order.customer_phone}
                  </p>
                  <p className="flex items-center gap-2 text-metal-400 text-sm font-bold">
                    <MapPin size={14} className="text-red-400" /> {order.customer_address}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] text-metal-500 uppercase font-black">Сумма заказа</p>
                  <p className="text-3xl font-black text-green-400">{order.total_price} ₽</p>
                </div>
                
                {order.status === 'pending' && (
                  <button 
                    onClick={() => handleStatusChange(order.id, 'completed')}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-green-500/20"
                  >
                    <Check size={18} /> ЗАВЕРШИТЬ СДЕЛКУ
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] text-metal-500 uppercase font-black mb-2 flex items-center gap-2">
                <Package size={12} /> Состав заказа
              </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-metal-800 overflow-hidden flex-shrink-0 border border-white/10 relative">
                        {item.image_url ? (
                          <Image 
                            src={item.image_url} 
                            alt={item.product_name} 
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (

                        <div className="w-full h-full flex items-center justify-center text-metal-600">
                          <Package size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-white truncate uppercase">{item.product_name}</p>
                      <p className="text-[10px] text-metal-500 font-bold">{item.quantity} шт. × {item.price_at_time} ₽</p>
                    </div>
                    <p className="text-sm font-black text-blue-400">{(item.quantity * item.price_at_time).toFixed(0)} ₽</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
