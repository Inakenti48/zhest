'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { login } from '@/lib/auth-actions';
import { User, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

async function handleAction(formData: FormData) {
setLoading(true);
setError(null);
const result = await login(formData);
if (result?.error) {
setError(result.error);
setLoading(false);
}
}

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background 3D-like blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md p-8 card-shadow relative z-10"
      >
        <Link 
          href="/" 
          className="absolute left-4 top-4 md:left-6 md:top-6 text-metal-500 hover:text-white transition-colors group flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Назад</span>
        </Link>

        <div className="text-center mb-8 mt-4">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Вход в систему
          </motion.h1>
          <p className="text-metal-400 mt-2">Жестяной Цех - Управление</p>
        </div>

            <form action={handleAction} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-metal-300 ml-1">Личный пароль</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-500 w-5 h-5" />
                    <input 
                      name="password"
                      type="password" 
                      required
                      autoFocus
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-metal-600 text-center text-2xl tracking-[0.5em]"
                      placeholder="••••"
                    />
                  </div>
                </div>
              </div>



          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Войти'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
