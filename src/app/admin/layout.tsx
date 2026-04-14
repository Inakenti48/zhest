'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut, 
  Menu, 
  X,
  FileSpreadsheet,
  Calculator,
  Globe,
  TrendingUp,
  Users,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCurrentRole, getCurrentUser } from '@/lib/auth-actions';

const menuItems = [
  { icon: LayoutDashboard, label: 'Дашборд', href: '/admin' },
  { icon: ShoppingCart, label: 'Заказы', href: '/admin/orders' },
  { icon: Package, label: 'Товары', href: '/admin/products' },
  { icon: TrendingUp, label: 'Продажи', href: '/admin/sales' },
  { icon: Calculator, label: 'Касса', href: '/admin/kassa' },
  { icon: Globe, label: 'Онлайн-магазин', href: '/admin/online-orders' },
  { icon: Users, label: 'Сотрудники', href: '/admin/employees' },
  { icon: Briefcase, label: 'Зона работы', href: '/admin/workspace' },
  { icon: FileSpreadsheet, label: 'Отчёты', href: '/admin/reports' },
  { icon: Users, label: 'Аккаунты', href: '/admin/accounts' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('guest');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function fetchUser() {
      const role = await getCurrentRole();
      const name = await getCurrentUser();
      setUserRole(role);
      setUserName(name);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (userRole === 'admin') return true;
    if (userRole === 'admin2') {
      return ['Дашборд', 'Заказы', 'Продажи', 'Касса', 'Онлайн-магазин', 'Зона работы', 'Аккаунты'].includes(item.label);
    }
    if (userRole === 'office_manager') {
      return ['Дашборд', 'Заказы', 'Продажи', 'Касса', 'Онлайн-магазин', 'Аккаунты'].includes(item.label);
    }
    if (userRole === 'worker') {
      return ['Дашборд', 'Заказы', 'Аккаунты'].includes(item.label); 
    }
    return false;
  });

  return (
    <div className="min-h-screen text-white flex bg-[#030712]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-white/5 border-r border-white/5 backdrop-blur-2xl">
        <div className="p-8">
          <Link href="/">
            <h2 className="text-2xl font-black bg-gradient-to-br from-white to-metal-500 bg-clip-text text-transparent tracking-tighter uppercase">
              Жестяной Цех
            </h2>
          </Link>
          <p className="text-[8px] text-metal-500 font-black tracking-[0.3em] uppercase mt-1">Industrial Control Panel</p>
          <div className="mt-4 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] font-black uppercase text-blue-500">{userName}</p>
            <p className="text-[8px] text-metal-500 uppercase font-bold">{userRole === 'admin' ? 'Главный админ' : userRole === 'admin2' ? 'Админ 2' : userRole === 'office_manager' ? 'Офис менеджер' : 'Работник'}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
          {filteredMenuItems.map((item) => {

            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'text-metal-400 hover:bg-white/5 hover:text-white'}
                `}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-500/50 group-hover:text-blue-400'} transition-colors`} />
                  <span className="font-black uppercase tracking-widest text-[11px]">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <Link href="/">
            <div className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl text-metal-400 hover:bg-white/5 transition-all group mb-2">
              <ShoppingCart className="w-5 h-5 text-blue-500/50 group-hover:text-blue-400" />
              <span className="font-black uppercase tracking-widest text-[11px]">Каталог</span>
            </div>
          </Link>
<button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
            >
            <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-black uppercase tracking-widest text-[11px]">Выйти</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-8">
        <Link href="/">
          <h2 className="text-xl font-black bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent uppercase tracking-tighter">
            Жестяной
          </h2>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-[#030712] z-40 pt-24 px-8 space-y-2"
        >
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`flex items-center gap-5 py-5 px-6 rounded-2xl ${pathname === item.href ? 'bg-blue-600 text-white' : 'bg-white/5 text-metal-400 border border-white/5'}`}>
                <item.icon size={20} />
                <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
              </div>
            </Link>
          ))}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center gap-5 py-5 px-6 rounded-2xl bg-white/5 text-metal-400 border border-white/5 mt-4">
              <ShoppingCart size={20} />
              <span className="text-sm font-black uppercase tracking-widest">Каталог</span>
            </div>
          </Link>
<button 
              onClick={handleLogout}
              className="flex items-center gap-5 py-5 px-6 w-full rounded-2xl bg-red-500/10 text-red-400 mt-10 border border-red-500/10"
            >
            <LogOut size={20} />
            <span className="text-sm font-black uppercase tracking-widest">Выход из системы</span>
          </button>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 pt-28 md:pt-12 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        {children}
      </main>
    </div>
  );
}
