import { getSalesStats, getRecentSales } from '@/lib/product-actions';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Banknote,
  CreditCard,
  Package
} from 'lucide-react';
import DashboardCharts from '@/components/DashboardCharts';

export default async function SalesPage() {
  const stats = await getSalesStats();
  const recentSales = await getRecentSales();

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent">
            СТАТИСТИКА ПРОДАЖ
          </h1>
          <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Аналитика выручки и прибыли
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-metal-500 font-black uppercase tracking-widest mb-2">Выручка сегодня</p>
              <p className="text-3xl font-black text-white">{stats.daily.total || 0} ₽</p>
              <p className="text-sm font-bold text-green-400 mt-2">Прибыль: {stats.daily.profit || 0} ₽</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="text-blue-400" size={24} />
            </div>
          </div>
          <div className={`mt-4 flex items-center gap-2 text-xs font-bold ${stats.daily.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp size={14} />
            {stats.daily.trend >= 0 ? '+' : ''}{stats.daily.trend}% к вчера
          </div>
        </div>

        <div className="glass p-6 border-l-4 border-l-purple-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-metal-500 font-black uppercase tracking-widest mb-2">Выручка за неделю</p>
              <p className="text-3xl font-black text-white">{stats.weekly.total || 0} ₽</p>
              <p className="text-sm font-bold text-green-400 mt-2">Прибыль: {stats.weekly.profit || 0} ₽</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Calendar className="text-purple-400" size={24} />
            </div>
          </div>
          <div className={`mt-4 flex items-center gap-2 text-xs font-bold ${stats.weekly.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp size={14} />
            {stats.weekly.trend >= 0 ? '+' : ''}{stats.weekly.trend}% к пред. неделе
          </div>
        </div>

        <div className="glass p-6 border-l-4 border-l-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-metal-500 font-black uppercase tracking-widest mb-2">Выручка за месяц</p>
              <p className="text-3xl font-black text-white">{stats.monthly.total || 0} ₽</p>
              <p className="text-sm font-bold text-green-400 mt-2">Прибыль: {stats.monthly.profit || 0} ₽</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </div>
          <div className={`mt-4 flex items-center gap-2 text-xs font-bold ${stats.monthly.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp size={14} />
            {stats.monthly.trend >= 0 ? '+' : ''}{stats.monthly.trend}% к пред. месяцу
          </div>
        </div>
      </div>

      <div className="glass p-8">
        <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          ДИНАМИКА ПРОДАЖ <span className="text-[10px] text-metal-500 font-bold uppercase tracking-widest ml-auto">За 30 дней</span>
        </h2>
        <div className="h-[350px]">
          <DashboardCharts data={stats.chartData} />
        </div>
      </div>

      <div className="glass p-8">
        <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
          <div className="w-1 h-6 bg-purple-500 rounded-full" />
          ПОСЛЕДНИЕ ПРОДАЖИ
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-black uppercase text-metal-500">Дата</th>
                <th className="pb-4 text-[10px] font-black uppercase text-metal-500">Товар</th>
                <th className="pb-4 text-[10px] font-black uppercase text-metal-500 text-center">Кол-во</th>
                <th className="pb-4 text-[10px] font-black uppercase text-metal-500 text-center">Оплата</th>
                <th className="pb-4 text-[10px] font-black uppercase text-metal-500 text-right">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentSales.map((sale: any) => (
                <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <p className="font-black text-xs text-white">
                      {new Date(sale.sale_date).toLocaleDateString('ru-RU')}
                    </p>
                    <p className="text-[10px] text-metal-500 font-bold">
                      {new Date(sale.sale_date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="py-4">
                    <p className="font-black text-xs text-white uppercase">{sale.product_name}</p>
                  </td>
                  <td className="py-4 text-center">
                    <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-black text-metal-400">
                      {sale.quantity}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {sale.payment_method === 'Перевод' ? (
                        <CreditCard size={14} className="text-purple-400" />
                      ) : (
                        <Banknote size={14} className="text-green-400" />
                      )}
                      <span className={`text-[10px] font-black uppercase ${sale.payment_method === 'Перевод' ? 'text-purple-400' : 'text-green-400'}`}>
                        {sale.payment_method || 'Наличными'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <p className="font-black text-sm text-white">{sale.total_price} ₽</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentSales.length === 0 && (
            <div className="py-20 text-center">
              <Package size={48} className="mx-auto text-white/5 mb-4" />
              <p className="text-metal-500 font-bold italic text-sm">Продаж пока нет</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
