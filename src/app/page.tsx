import Link from 'next/link';
import { LogIn, Users } from 'lucide-react';
import { getProducts } from '@/lib/product-actions';
import ClientLandingWrapper from '../components/ClientLandingWrapper';

export const dynamic = 'force-dynamic';
// Force revalidation 4

export default async function LandingPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0c]">
      <ClientLandingWrapper products={products} />
      
      {/* Admin Login at the very bottom */}
      <footer className="py-20 border-t border-white/5 bg-black/50 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-metal-500 hover:text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest">
              <LogIn size={14} /> Админка
            </Link>
            <Link href="/staff" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:text-green-300 hover:bg-green-500/20 transition-all text-xs font-black uppercase tracking-widest">
              <Users size={14} /> Вход для сотрудников
            </Link>
          </div>
          <p className="text-metal-600 text-xs uppercase tracking-widest font-bold">
            © 2026 Жестяной Цех • Профессиональное производство металлоизделий
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="glass p-8 border-white/5 hover:border-blue-500/20 transition-all">
      <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-metal-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
