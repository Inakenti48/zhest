'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box, ShieldCheck, Zap, LogIn, Settings } from 'lucide-react';
import ProductCatalog from './ProductCatalog';

interface Product {
  id: number;
  name: string;
  sell_price: number;
  image_url: string;
  category: string;
  stock: number;
  variants?: string;
}

export default function ClientLandingWrapper({ products }: { products: Product[] }) {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-600/20 to-transparent pointer-events-none opacity-50" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Система управления производством v2.0
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mt-4 mb-8 tracking-tighter leading-[0.9]">
              <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent uppercase">Жестяной</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent uppercase">Цех</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-metal-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Цифровой контроль вашего производства. От закупки металла до отгрузки готовых изделий.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              {/* Admin Button - Above "Start Work" */}
              <Link href="/admin">
                <button className="group relative px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-lg transition-all hover:bg-white/10 hover:border-blue-500/30 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <LogIn size={20} className="text-blue-400" /> ВХОД В ЦЕХ
                    </span>
                </button>
              </Link>

              {/* Start Work Button */}
              <button 
                onClick={scrollToCatalog}
                className="group relative px-10 py-5 bg-white text-black rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  НАЧАТЬ РАБОТУ <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <div className="flex justify-center mt-12">
              <p className="text-metal-500 text-sm uppercase tracking-[0.3em] font-black opacity-80 animate-pulse">
                Профессиональное производство металлоизделий
              </p>
            </div>
          </motion.div>

          {/* Dashboard Mockup / Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-24 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass p-3 md:p-6 rounded-[2.5rem] border-white/10 bg-slate-950/50 backdrop-blur-2xl overflow-hidden">
              <div className="flex items-center gap-2 mb-6 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 h-6 bg-white/5 rounded-lg mx-4 flex items-center justify-center">
                  <span className="text-[10px] text-metal-500 font-mono tracking-widest uppercase">zhest-control-panel-v2.exe</span>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 space-y-4">
                  <div className="h-32 rounded-3xl bg-white/5 animate-pulse" />
                  <div className="h-48 rounded-3xl bg-blue-500/10 border border-blue-500/20" />
                </div>
                <div className="col-span-6 space-y-4">
                  <div className="h-64 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/5" />
                  <div className="h-16 rounded-3xl bg-white/5" />
                </div>
                <div className="col-span-3 space-y-4">
                  <div className="h-48 rounded-3xl bg-purple-500/10 border border-purple-500/20" />
                  <div className="h-32 rounded-3xl bg-white/5 animate-pulse" />
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Floating stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-12 -right-12 glass p-6 border-green-500/30 shadow-[0_20px_40px_rgba(34,197,94,0.15)] rounded-3xl hidden lg:block"
            >
              <p className="text-xs text-metal-500 font-bold uppercase tracking-widest">Средняя выручка мастера с нами</p>
              <p className="text-3xl font-black text-white mt-1">42,500 ₽</p>
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold mt-2">
                <Zap size={14} fill="currentColor" /> +15% рост
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Elegant Product Catalog Section */}
      <ProductCatalog products={products} />

      {/* Features Section - More Industrial */}
      <section className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Оптимизация <span className="text-blue-500">производства</span></h2>
                <p className="text-metal-400 text-lg leading-relaxed">
                  Разработали инструменты, которые реально работают в условиях цеха. Простота, скорость и надежность.
                </p>
            </div>
            <div className="text-right">
              <p className="text-7xl font-black text-white/5 uppercase">Features</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Box className="text-blue-400" size={32} />}
              title="Умный Склад"
              description="Автоматический расчет остатков при каждой продаже. История приходов и расходов."
            />
            <FeatureCard 
              icon={<Zap className="text-purple-400" size={32} />}
              title="Мгновенные Отчеты"
              description="Аналитика за день, неделю и месяц. Прогнозирование спроса на основе истории."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-400" size={32} />}
              title="Безопасность"
              description="Надежное хранение данных. Автономная работа и защищенный доступ."
            />
          </div>
        </div>
      </section>

      {/* Aesthetic Bottom Section */}
      <section className="py-32 relative overflow-hidden bg-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tighter">Готовы масштабироваться?</h2>
          <p className="text-metal-400 mb-10 text-lg">
            Система спроектирована специально для нужд жестяного производства. 
            Ничего лишнего — только то, что приносит результат.
          </p>
          <div className="inline-block glass p-8 border-blue-500/20 w-full max-w-2xl">
            <div className="flex flex-col md:flex-row justify-around gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-blue-400 text-3xl font-black">100%</p>
                <p className="text-xs text-metal-500 uppercase font-bold tracking-widest mt-1">Контроль</p>
              </div>
              <div className="hidden md:block w-px bg-white/10" />
              <div className="flex flex-col items-center md:items-start">
                <p className="text-purple-400 text-3xl font-black">SQL</p>
                <p className="text-xs text-metal-500 uppercase font-bold tracking-widest mt-1">Надежность</p>
              </div>
              <div className="hidden md:block w-px bg-white/10" />
              <div className="flex flex-col items-center md:items-start">
                <p className="text-green-400 text-3xl font-black">24/7</p>
                <p className="text-xs text-metal-500 uppercase font-bold tracking-widest mt-1">Доступность</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-8 border-white/5 hover:border-blue-500/20 transition-all"
    >
      <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3 text-white uppercase tracking-tight">{title}</h3>
      <p className="text-metal-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
