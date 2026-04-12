'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Package, 
  MapPin, 
  Phone, 
  User, 
  Check, 
  Clock, 
  Truck,
  CheckCircle2,
  Banknote,
  CreditCard
} from 'lucide-react';
import { updateOrderStatus, getOrders, saveReportToFile } from '@/lib/product-actions';

interface OrderItem {
  id: number;
  product_name: string;
  image_url: string;
  quantity: number;
  price_at_time: number;
  unit: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  status: 'pending' | 'accepted' | 'ready' | 'completed';
  created_at: string;
  payment_method?: string;
  items: OrderItem[];
}

export default function OnlineOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'ready' | 'completed'>('all');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updated = await getOrders();
        setOrders(updated);
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: number, newStatus: string, paymentMethod?: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      
      if (newStatus === 'completed') {
        const order = orders.find(o => o.id === id);
        if (order) {
          for (const item of order.items) {
            await saveReportToFile({
              product_name: item.product_name,
              quantity: item.quantity,
              unit: item.unit || 'шт',
              total_price: item.price_at_time * item.quantity,
              payment_method: paymentMethod || 'Онлайн заказ',
              order_id: id,
              customer: order.customer_name
            });
          }
        }
      }
      
      setOrders(prev => prev.map(o => 
        o.id === id ? { ...o, status: newStatus as any, payment_method: paymentMethod } : o
      ));
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'НОВЫЙ', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Clock };
      case 'accepted':
        return { text: 'ПРИНЯТ', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Check };
      case 'ready':
        return { text: 'СОБРАН', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Truck };
      case 'completed':
        return { text: 'ЗАВЕРШЁН', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle2 };
      default:
        return { text: status, color: 'bg-white/10 text-white border-white/20', icon: Package };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'accepted', 'ready', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/5 text-metal-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            {f === 'all' ? 'Все' : f === 'pending' ? 'Новые' : f === 'accepted' ? 'Принятые' : f === 'ready' ? 'Собранные' : 'Завершённые'}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="glass p-20 text-center">
          <Package size={64} className="mx-auto text-white/5 mb-4" />
          <p className="text-metal-500 font-bold">Заказов пока нет</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            const BadgeIcon = badge.icon;

            return (
              <div 
                key={order.id} 
                className={`glass overflow-hidden border-l-4 ${
                  order.status === 'completed' ? 'border-l-green-500/50 opacity-80' : 
                  order.status === 'ready' ? 'border-l-purple-500' :
                  order.status === 'accepted' ? 'border-l-yellow-500' :
                  'border-l-blue-500 animate-pulse'
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${badge.color}`}>
                          <BadgeIcon size={12} />
                          {badge.text}
                        </div>
                        <span className="text-[10px] text-metal-500 font-black uppercase">
                          #{order.id} • {new Date(order.created_at).toLocaleString('ru-RU')}
                        </span>
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

                    <div className="text-right flex flex-col justify-between items-end gap-4">
                      <div>
                        <p className="text-[10px] text-metal-500 uppercase font-black">Сумма заказа</p>
                        <p className="text-3xl font-black text-green-400">{order.total_price} ₽</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-end">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusChange(order.id, 'accepted')}
                            className="flex items-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-black text-xs uppercase transition-all"
                          >
                            <Check size={16} /> ПРИНЯТЬ ЗАКАЗ
                          </button>
                        )}
                        
                        {order.status === 'accepted' && (
                          <button 
                            onClick={() => handleStatusChange(order.id, 'ready')}
                            className="flex items-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-black text-xs uppercase transition-all"
                          >
                            <Truck size={16} /> ЗАКАЗ СОБРАН
                          </button>
                        )}
                        
                        {order.status === 'ready' && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleStatusChange(order.id, 'completed', 'Наличными')}
                              className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-xs uppercase transition-all"
                            >
                              <Banknote size={16} /> ОПЛАТА НАЛИЧНЫМИ
                            </button>
                            <button 
                              onClick={() => handleStatusChange(order.id, 'completed', 'Перевод')}
                              className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black text-xs uppercase transition-all"
                            >
                              <CreditCard size={16} /> ОПЛАТА ПЕРЕВОДОМ
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] text-metal-500 uppercase font-black mb-2 flex items-center gap-2">
                      <Package size={12} /> Состав заказа ({order.items.length} поз.)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
                            <p className="text-[10px] text-metal-500 font-bold">
                              {item.quantity} {item.unit || 'шт'} × {item.price_at_time} ₽
                            </p>
                          </div>
                          <p className="text-sm font-black text-blue-400">
                            {(item.quantity * item.price_at_time).toFixed(0)} ₽
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
