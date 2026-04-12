'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Loader2, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';

interface Employee {
  id: number;
  name: string;
}

export default function StaffLoginPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoadingEmployees(false);
      })
      .catch(() => setLoadingEmployees(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !pin) {
      setError('Выберите сотрудника и введите PIN');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const employee = employees.find(e => e.id === Number(selectedEmployee));
      const res = await fetch('/api/employees/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: employee?.name, pin })
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Неверные данные');
        setLoading(false);
        return;
      }

      router.push('/staff/work');
    } catch {
      setError('Ошибка входа');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0c]">
      <div className="absolute top-0 -left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md p-8 card-shadow relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
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
            className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Вход для сотрудников
          </motion.h1>
          <p className="text-metal-400 mt-2">Запись выполненных работ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-metal-300 ml-1">Сотрудник</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-metal-500 w-5 h-5" />
              {loadingEmployees ? (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-metal-500">
                  Загрузка...
                </div>
              ) : (
                <select 
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-white appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-900">Выберите сотрудника</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id} className="bg-gray-900">{emp.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-metal-300 ml-1">PIN-код</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-metal-500 w-5 h-5" />
              <input 
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-white"
                placeholder="Введите PIN"
              />
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
            disabled={loading || loadingEmployees}
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Войти'}
          </button>
        </form>

        {employees.length === 0 && !loadingEmployees && (
          <p className="text-metal-500 text-sm text-center mt-4">
            Нет сотрудников. Попросите администратора добавить вас.
          </p>
        )}
      </motion.div>
    </div>
  );
}
