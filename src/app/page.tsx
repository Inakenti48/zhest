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
            <Link href="/login" className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-blue-600 border border-blue-500 text-white hover:bg-blue-700 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-600/30">
              <LogIn size={20} /> ВХОД В ЦЕХ
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
