import { getSalesStats, getRecentSales, getOrders } from '@/lib/product-actions';
import { getCurrentRole } from '@/lib/auth-actions';
import { redirect } from 'next/navigation';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Clock,
  Globe
} from 'lucide-react';
import DashboardCharts from '@/components/DashboardCharts';
import DashboardStats from '@/components/DashboardStats';
import OrderList from '@/components/OrderList';
import RecentSalesFeed from '@/components/RecentSalesFeed';

export default async function AdminDashboard() {
  const role = await getCurrentRole();
  if (role === 'worker') {
    redirect('/admin/orders');
  }

  const stats = await getSalesStats();
  const recentSales = await getRecentSales();
  const orders = await getOrders();

  const cards = [
    { 
      label: 'Выручка (Сегодня)', 
      value: `${stats.daily.total || 0} ₽`, 
      profit: `${stats.daily.profit || 0} ₽`,
      trend: stats.daily.trend,
      icon: 'DollarSign',
      color: 'blue'
    },
    { 
      label: 'Выручка (Неделя)', 
      value: `${stats.weekly.total || 0} ₽`, 
      profit: `${stats.weekly.profit || 0} ₽`,
      trend: stats.weekly.trend,
      icon: 'TrendingUp',
      color: 'purple'
    },
    { 
      label: 'Выручка (Месяц)', 
      value: `${stats.monthly.total || 0} ₽`, 
      profit: `${stats.monthly.profit || 0} ₽`,
      trend: stats.monthly.trend,
      icon: 'ShoppingBag',
      color: 'green'
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent">
            АНАЛИЗАТОР ВЫРУЧКИ
          </h1>
          <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Цифровой мониторинг ключевых показателей роста
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-2 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          ОБНОВЛЕНО: {new Date().toLocaleTimeString('ru-RU')}
        </div>
      </div>

      <DashboardStats cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Online Orders Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter">
              <Globe className="text-blue-400" size={28} />
              ОНЛАЙН ПРОДАЖИ (МАГАЗИН)
            </h2>
            <OrderList orders={orders} />
          </div>

          <div className="glass p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              ДИНАМИКА ПРОДАЖ <span className="text-[10px] text-metal-500 font-bold uppercase tracking-widest ml-auto">За 30 дней</span>
            </h2>
            <div className="h-[350px]">
              <DashboardCharts data={stats.chartData} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8">
              <h2 className="text-lg font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
                <div className="w-1 h-6 bg-purple-500 rounded-full" />
                Недельный цикл
              </h2>
              <div className="space-y-3">
                {stats.weeklyAnalysis.map((item: any, idx: number) => (
                  <div key={item.week} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group">
                    <div>
                      <p className="text-[10px] text-metal-500 uppercase font-black mb-0.5">
                        {idx === 0 ? 'Текущая' : `${idx + 1}-я`} неделя
                      </p>
                      <p className="font-black text-white">{item.total} ₽</p>
                    </div>
                    <div className="w-12 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-1000"
                        style={{ width: `${Math.min(100, (item.total / (stats.weekly.total || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {stats.weeklyAnalysis.length === 0 && (
                  <p className="text-center text-metal-500 py-4 italic text-sm">Нет данных</p>
                )}
              </div>
            </div>

            <div className="glass p-8">
              <h2 className="text-lg font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                Месячный отчет
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {stats.monthlyAnalysis.map((item: any) => (
                  <div key={item.month} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all text-center">
                    <p className="text-[10px] text-metal-500 uppercase font-black mb-1">
                      {new Date(2024, parseInt(item.month) - 1).toLocaleString('ru-RU', { month: 'short' })}
                    </p>
                    <p className="text-sm font-black text-white">{item.total} ₽</p>
                  </div>
                ))}
                {stats.monthlyAnalysis.length === 0 && (
                  <p className="col-span-2 text-center text-metal-500 py-4 italic text-sm">Нет данных</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 glass p-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -mr-24 -mb-24 rounded-full" />
          <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <Clock className="text-blue-400" size={24} /> 
            Лента продаж
          </h2>
          <RecentSalesFeed initialSales={recentSales} />
        </div>
      </div>
    </div>
  );
}
