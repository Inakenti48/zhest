'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, Search, Clock, CheckCircle2, AlertCircle, 
  Camera, Play, Check, Truck, User, Phone, MapPin,
  MoreVertical, Trash2, Edit3, X, ChevronDown, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getOrders, 
  getProducts, 
  createOrder, 
  takeOrder, 
  submitOrderForReview, 
  approveOrder,
  getWorkers,
  deleteOrder
} from '@/lib/product-actions';
import { getCurrentRole, getCurrentUser } from '@/lib/auth-actions';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price_at_time: number;
  unit: string;
  image_url?: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  status: string;
  created_at: string;
  type: string;
  worker_id?: number;
  cost_of_work: number;
  start_time?: string;
  end_time?: string;
  completion_photo?: string;
  urgent_until?: string;
  dynamic_fields: string; // JSON
  items: OrderItem[];
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [workersList, setWorkersList] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string>('guest');
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New Order State
  const [newOrder, setNewOrder] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    type: 'internal',
    urgent_until: '',
    cost_of_work: 0,
    items: [] as any[],
    dynamic_fields: [] as { label: string, value: string }[]
  });

  useEffect(() => {
    async function init() {
      const role = await getCurrentRole();
      const name = await getCurrentUser();
      
      const idStr = document.cookie.split('; ').find(row => row.startsWith('admin_user_id='))?.split('=')[1];
      setUserId(parseInt(idStr || '0'));

      setUserRole(role);
      setUserName(name);
      fetchData();
    }
    init();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersData, productsData, workersData] = await Promise.all([
        getOrders(),
        getProducts(),
        getWorkers()
      ]);
      setOrders(ordersData as any);
      setProducts(productsData);
      setWorkersList(workersData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const filteredOrders = orders.filter(o => {
    const matchesTab = o.type === activeTab;
    const matchesSearch = (o.customer_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (o.customer_phone || '').includes(searchQuery);
    
    if (userRole === 'worker') {
      return matchesTab && matchesSearch && (o.status === 'pending' || o.worker_id === userId);
    }
    return matchesTab && matchesSearch;
  });

  const handleCreateOrder = async () => {
    if (!newOrder.customer_name) return;
    
    await createOrder(
      { name: newOrder.customer_name, phone: newOrder.customer_phone, address: newOrder.customer_address },
      newOrder.items,
      activeTab,
      newOrder.urgent_until || null,
      newOrder.cost_of_work,
      newOrder.dynamic_fields
    );
    
    setIsCreateModalOpen(false);
    setNewOrder({
      customer_name: '',
      customer_phone: '',
      customer_address: '',
      type: 'internal',
      urgent_until: '',
      cost_of_work: 0,
      items: [],
      dynamic_fields: []
    });
    fetchData();
  };

  const handleTakeOrder = async (orderId: number) => {
    if (!userId) return;
    await takeOrder(orderId, userId);
    fetchData();
  };

  const handleFinishOrder = async (orderId: number) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        await submitOrderForReview(orderId, data.url);
        fetchData();
      }
    };
    fileInput.click();
  };

  const handleApprove = async (orderId: number, status: 'delivered' | 'completed') => {
    await approveOrder(orderId, status);
    fetchData();
  };

  const handleDelete = async (orderId: number) => {
    if (confirm('Удалить заказ?')) {
      await deleteOrder(orderId);
      fetchData();
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent uppercase">
            УПРАВЛЕНИЕ ЗАКАЗАМИ
          </h1>
          <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Контроль производства и логистики
          </p>
        </div>
        {(userRole === 'admin' || userRole === 'admin2' || userRole === 'office_manager') && (
          <button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]">
            <Plus size={20} /> НОВЫЙ ЗАКАЗ
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
          <button onClick={() => setActiveTab('internal')} className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'internal' ? 'bg-blue-600 text-white' : 'text-metal-400 hover:text-white'}`}>Внутренние</button>
          <button onClick={() => setActiveTab('external')} className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'external' ? 'bg-blue-600 text-white' : 'text-metal-400 hover:text-white'}`}>Наружные</button>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-500 w-5 h-5" />
          <input type="text" placeholder="Поиск по имени или телефону..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              userRole={userRole}
              workersList={workersList}
              onTake={() => handleTakeOrder(order.id)}
              onFinish={() => handleFinishOrder(order.id)}
              onApprove={(status) => handleApprove(order.id, status)}
              onDelete={() => handleDelete(order.id)}
            />
          ))}
        </AnimatePresence>
        {filteredOrders.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center glass border-dashed border-2">
            <AlertCircle className="mx-auto text-metal-600 mb-4" size={48} />
            <p className="text-metal-500 font-bold uppercase tracking-widest text-xs">Заказы не найдены</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
              <button onClick={() => setIsCreateModalOpen(false)} className="absolute right-6 top-6 text-metal-500 hover:text-white"><X size={24} /></button>
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">ОФОРМЛЕНИЕ ЗАКАЗА</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-metal-500 ml-1">Клиент</label>
                    <input type="text" value={newOrder.customer_name} onChange={(e) => setNewOrder({...newOrder, customer_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="Имя клиента" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-metal-500 ml-1">Телефон</label>
                    <input type="text" value={newOrder.customer_phone} onChange={(e) => setNewOrder({...newOrder, customer_phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="+7..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-metal-500 ml-1">Адрес доставки</label>
                  <input type="text" value={newOrder.customer_address} onChange={(e) => setNewOrder({...newOrder, customer_address: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="Адрес..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-metal-500 ml-1">Срочность (до)</label>
                    <input type="datetime-local" value={newOrder.urgent_until} onChange={(e) => setNewOrder({...newOrder, urgent_until: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-blue-500/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-metal-500 ml-1">Оплата мастеру (₽)</label>
                    <input type="number" value={newOrder.cost_of_work} onChange={(e) => setNewOrder({...newOrder, cost_of_work: parseFloat(e.target.value) || 0})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-blue-500/50 outline-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-500">Дополнительные поля</h3>
                    <button onClick={() => setNewOrder({...newOrder, dynamic_fields: [...newOrder.dynamic_fields, {label: '', value: ''}]})} className="text-[10px] font-black uppercase bg-blue-600/10 text-blue-400 px-3 py-1 rounded-lg">+ Добавить поле</button>
                  </div>
                  {newOrder.dynamic_fields.map((field, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input type="text" placeholder="Название" value={field.label} onChange={(e) => { const f = [...newOrder.dynamic_fields]; f[idx].label = e.target.value; setNewOrder({...newOrder, dynamic_fields: f}); }} className="w-1/3 bg-white/5 border border-white/10 rounded-xl p-3 text-xs outline-none" />
                      <input type="text" placeholder="Значение" value={field.value} onChange={(e) => { const f = [...newOrder.dynamic_fields]; f[idx].value = e.target.value; setNewOrder({...newOrder, dynamic_fields: f}); }} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-xs outline-none" />
                      <button onClick={() => { const f = newOrder.dynamic_fields.filter((_, i) => i !== idx); setNewOrder({...newOrder, dynamic_fields: f}); }} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
                <button onClick={handleCreateOrder} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20">ОФОРМИТЬ ЗАКАЗ</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderCard({ order, userRole, workersList, onTake, onFinish, onApprove, onDelete }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const workerName = workersList?.find((w: any) => w.id === order.worker_id)?.name;

  useEffect(() => {
    let interval: any;
    if (order.status === 'in_progress' && order.start_time) {
      const updateTimer = () => {
        const start = new Date(order.start_time!).getTime();
        const now = new Date().getTime();
        const diff = now - start;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setElapsedTime(`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else if (order.start_time && order.end_time) {
      const start = new Date(order.start_time).getTime();
      const end = new Date(order.end_time).getTime();
      const diff = end - start;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setElapsedTime(`${h}:${String(m).padStart(2, '0')} (всего)`);
    }
    return () => clearInterval(interval);
  }, [order.status, order.start_time, order.end_time]);

  const statusColors: any = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    in_progress: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    review: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    delivered: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    completed: 'bg-green-500/10 text-green-500 border-green-500/20'
  };

  const statusLabels: any = {
    pending: 'Ожидание',
    in_progress: 'В работе',
    review: 'На проверке',
    delivered: 'Доставка',
    completed: 'Завершен'
  };

  const isUrgent = order.urgent_until && new Date(order.urgent_until) > new Date();
  const dynamicFields = JSON.parse(order.dynamic_fields || '[]');

  return (
    <motion.div layout className={`glass overflow-hidden border transition-all ${isUrgent && order.status === 'pending' ? 'border-red-500/50 shadow-lg shadow-red-500/10' : 'border-white/5'}`}>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-metal-500 font-black text-xs uppercase tracking-widest">№{order.id}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
              {elapsedTime && <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-md text-[10px] font-black flex items-center gap-1 border border-blue-500/20"><Play size={10} /> {elapsedTime}</span>}
              {order.urgent_until && <span className="bg-red-500 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase flex items-center gap-1"><Clock size={10} /> {new Date(order.urgent_until).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">{order.customer_name}</h3>
            {workerName && <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Исполнитель: {workerName}</p>}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-metal-500 uppercase">Сумма заказа</p>
            <p className="text-2xl font-black text-white">{order.total_price} ₽</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div className="flex items-center gap-2 text-metal-400"><Phone size={14} className="text-blue-500" /><span className="font-bold">{order.customer_phone}</span></div>
          <div className="flex items-center gap-2 text-metal-400"><MapPin size={14} className="text-blue-500" /><span className="font-bold truncate">{order.customer_address}</span></div>
        </div>
        <div className="pt-4 flex flex-wrap gap-3">
          {order.status === 'pending' && userRole === 'worker' && <button onClick={onTake} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 min-w-[140px]"><Play size={16} /> ВЗЯТЬ В РАБОТУ</button>}
          {order.status === 'in_progress' && userRole === 'worker' && <button onClick={onFinish} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 min-w-[140px]"><Camera size={16} /> СФОТКАТЬ И ЗАВЕРШИТЬ</button>}
          {order.status === 'review' && (userRole === 'admin' || userRole === 'admin2' || userRole === 'office_manager') && (
            <>
              <button onClick={() => onApprove('delivered')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 min-w-[120px]"><Truck size={16} /> НА ДОСТАВКУ</button>
              <button onClick={() => onApprove('completed')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 min-w-[120px]"><Check size={16} /> ОТДАТЬ КЛИЕНТУ</button>
            </>
          )}
          {userRole === 'worker' && order.cost_of_work > 0 && <div className="bg-emerald-500/10 text-emerald-400 px-4 py-3 rounded-xl border border-emerald-500/20 flex items-center gap-2 font-black text-[10px] uppercase"><DollarSign size={14} /> Зарплата: {order.cost_of_work} ₽</div>}
          <div className="flex gap-2 ml-auto">
            {(userRole === 'admin' || userRole === 'admin2') && <button onClick={onDelete} className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"><Trash2 size={20} /></button>}
            <button onClick={() => setIsExpanded(!isExpanded)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-metal-400"><ChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={20} /></button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-white/5 bg-black/20 overflow-hidden">
            <div className="p-6 space-y-6">
              {order.completion_photo && <div className="space-y-2"><p className="text-[10px] font-black uppercase text-metal-500">Фото готовой работы</p><img src={order.completion_photo} alt="Result" className="w-full rounded-2xl border border-white/10" /></div>}
              {dynamicFields.length > 0 && <div className="space-y-3"><p className="text-[10px] font-black uppercase text-metal-500">Детали изделия</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{dynamicFields.map((f: any, i: number) => (<div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between items-center text-xs"><span className="text-metal-500 font-bold uppercase text-[9px]">{f.label}</span><span className="font-black text-metal-200">{f.value}</span></div>))}</div></div>}
              {(order.start_time || order.end_time) && <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4"><div><p className="text-[9px] font-black text-metal-600 uppercase">Начало</p><p className="text-[11px] font-bold text-metal-400">{order.start_time ? new Date(order.start_time).toLocaleString() : '-'}</p></div><div><p className="text-[9px] font-black text-metal-600 uppercase">Конец</p><p className="text-[11px] font-bold text-metal-400">{order.end_time ? new Date(order.end_time).toLocaleString() : '-'}</p></div></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
