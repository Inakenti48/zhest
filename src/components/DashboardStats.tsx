'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  DollarSign: DollarSign,
  TrendingUp: TrendingUp,
  ShoppingBag: ShoppingBag,
};

export default function DashboardStats({ cards }: { cards: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const Icon = ICON_MAP[card.icon] || DollarSign;
        
        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass p-6 group transition-all cursor-default relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -mr-16 -mt-16 rounded-full transition-opacity group-hover:opacity-20 ${
              card.color === 'blue' ? 'bg-blue-500' : card.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'
            }`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl transition-colors ${
                card.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 
                card.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 
                'bg-green-500/10 text-green-400'
              }`}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <div className={`px-2 py-1 rounded-lg text-xs font-black tracking-wider uppercase flex items-center gap-1 ${
                card.trend >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {card.trend > 0 ? '+' : ''}{card.trend}%
                {card.trend !== 0 && (
                  <ArrowUpRight className={`w-3 h-3 ${card.trend < 0 ? 'rotate-90' : ''}`} />
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-black text-metal-500 uppercase tracking-widest">{card.label}</p>
              <h3 className="text-3xl font-black text-white">{card.value}</h3>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-metal-500 uppercase tracking-widest">Чистая прибыль</span>
                <span className="text-sm font-black text-blue-400">{card.profit}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: Math.min(100, Math.max(10, 50 + card.trend)) + '%' }}
                  className={`h-full ${card.trend >= 0 ? 'bg-green-500' : 'bg-red-500'} opacity-50`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
