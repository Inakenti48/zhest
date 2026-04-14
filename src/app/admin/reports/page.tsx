'use client';

import { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  Calendar,
  Banknote,
  CreditCard,
  TrendingUp,
  DollarSign,
  Package,
  Truck
} from 'lucide-react';
import { getOrders } from '@/lib/product-actions';

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(setReports)
      .catch(() => setReports([]));
    
    fetch('/api/sales')
      .then(res => res.json())
      .then(setSales)
      .catch(() => setSales([]));

    getOrders().then(setOrders).catch(() => setOrders([]));
  }, []);

  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'delivered');

  const allItems = [
    ...reports.map(r => ({ ...r, source: 'sale', timestamp: r.timestamp })),
    ...completedOrders.map(o => ({
      product_name: `Заказ №${o.id}: ${o.customer_name}`,
      quantity: 1,
      unit: 'зак',
      total_price: o.total_price,
      payment_method: 'Наличными', // Default for orders for now
      timestamp: o.created_at,
      source: 'order'
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredItems = allItems.filter(r => {
    const matchesSearch = r.product_name?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === 'all' || r.payment_method === filter;
    return matchesSearch && matchesType;
  });

  const totalRevenue = filteredItems.reduce((sum, r) => sum + (r.total_price || 0), 0);
  
  const totalProfit = sales.reduce((sum, s) => {
    const cost = s.buy_price ? s.buy_price * s.quantity : 0;
    return sum + (s.total_price - cost);
  }, 0);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent">
            ОТЧЁТЫ ПО ПРОДАЖАМ
          </h1>
          <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Локальный архив транзакций (reports.json + SQLite)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-right">
            <p className="text-[10px] text-metal-500 font-black uppercase">Общая выручка</p>
            <p className="text-xl font-black text-green-400">{totalRevenue.toFixed(0)} ₽</p>
          </div>
          <div className="px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-right">
            <p className="text-[10px] text-metal-500 font-black uppercase">Чистая прибыль</p>
            <p className="text-xl font-black text-green-400">{totalProfit.toFixed(0)} ₽</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-500" size={18} />
              <input
                type="text"
                placeholder="ПОИСК ПО ТОВАРУ..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 font-black uppercase text-xs focus:border-blue-500/50 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-black uppercase text-xs outline-none focus:border-blue-500/50"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">ВСЕ ОПЛАТЫ</option>
              <option value="Наличными">НАЛИЧНЫМИ</option>
              <option value="Перевод">ПЕРЕВОД</option>
            </select>
          </div>

          <div className="glass overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-4 text-[10px] font-black uppercase text-metal-500">Дата / Время</th>
                  <th className="p-4 text-[10px] font-black uppercase text-metal-500">Товар</th>
                  <th className="p-4 text-[10px] font-black uppercase text-metal-500 text-center">Кол-во</th>
                  <th className="p-4 text-[10px] font-black uppercase text-metal-500 text-center">Тип оплаты</th>
                  <th className="p-4 text-[10px] font-black uppercase text-metal-500 text-right">Сумма</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map((report: any, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <p className="font-black text-xs text-white">
                          {new Date(report.timestamp).toLocaleDateString('ru-RU')}
                        </p>
                        <p className="text-[10px] text-metal-500 font-bold">
                          {new Date(report.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {report.source === 'order' && <Truck size={14} className="text-blue-400" />}
                          <p className="font-black text-xs text-white uppercase">{report.product_name}</p>
                        </div>
                        {report.customer && (
                          <p className="text-[10px] text-blue-400 font-bold">Клиент: {report.customer}</p>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-black text-metal-400">
                          {report.quantity} {report.unit}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {report.payment_method === 'Перевод' ? (
                            <CreditCard size={14} className="text-purple-400" />
                          ) : (
                            <Banknote size={14} className="text-green-400" />
                          )}
                          <span className={`text-[10px] font-black uppercase ${report.payment_method === 'Перевод' ? 'text-purple-400' : 'text-green-400'}`}>
                            {report.payment_method}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <p className="font-black text-sm text-white">{report.total_price} ₽</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredItems.length === 0 && (
                  <div className="py-20 text-center">
                    <FileSpreadsheet size={48} className="mx-auto text-white/5 mb-4" />
                    <p className="text-metal-500 font-bold italic text-sm">Данных за выбранный период нет</p>
                  </div>
              )}

          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6">
            <h2 className="text-sm font-black mb-6 uppercase flex items-center gap-2">
              <TrendingUp size={18} className="text-green-400" /> Прибыль
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                <p className="text-[10px] text-metal-500 font-black uppercase mb-1">Чистая прибыль</p>
                <p className="text-2xl font-black text-green-400">{totalProfit.toFixed(0)} ₽</p>
                <p className="text-[10px] text-metal-500 font-bold mt-2">
                  Выручка минус закупка
                </p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-metal-500 font-bold">Выручка:</span>
                <span className="font-black text-white">{totalRevenue.toFixed(0)} ₽</span>
              </div>
            </div>
          </div>

          <div className="glass p-6">
            <h2 className="text-sm font-black mb-6 uppercase flex items-center gap-2">
              <Download size={18} className="text-blue-400" /> Экспорт данных
            </h2>
            <p className="text-[10px] text-metal-500 font-bold uppercase mb-6 leading-relaxed">
              Все продажи автоматически дублируются в локальный файл <code className="text-blue-400">reports.json</code> в корне проекта.
            </p>
            <button 
              onClick={() => window.print()}
              className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-blue-400 hover:text-white transition-all active:scale-95"
            >
              ПЕЧАТЬ ОТЧЁТА
            </button>
          </div>

          <div className="glass p-6">
            <h2 className="text-sm font-black mb-6 uppercase flex items-center gap-2">
              <Calendar size={18} className="text-purple-400" /> Статистика
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-metal-500 font-black uppercase">Всего транзакций</span>
                <span className="font-black text-white">{filteredItems.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-metal-500 font-black uppercase">Средний чек</span>
                <span className="font-black text-white">
                  {filteredItems.length > 0 ? (totalRevenue / filteredItems.length).toFixed(0) : 0} ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
