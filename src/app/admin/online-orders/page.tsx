import { getOrders } from '@/lib/product-actions';
import OnlineOrdersClient from '@/components/OnlineOrdersClient';

export default async function OnlineOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent">
            ОНЛАЙН-МАГАЗИН
          </h1>
          <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Заказы из каталога на сайте
          </p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-[10px] text-metal-500 font-black uppercase">Новых заказов</p>
            <p className="text-xl font-black text-blue-400">{orders.filter((o: any) => o.status === 'pending').length}</p>
          </div>
          <div className="px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-[10px] text-metal-500 font-black uppercase">Выполнено</p>
            <p className="text-xl font-black text-green-400">{orders.filter((o: any) => o.status === 'completed').length}</p>
          </div>
        </div>
      </div>

      <OnlineOrdersClient initialOrders={orders} />
    </div>
  );
}
