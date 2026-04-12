'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Package, 
  ClipboardList,
  Loader2,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
}

interface ProductEntry {
  product_id: number;
  product_name: string;
  quantity: number;
}

interface WorkLog {
  id: number;
  description: string;
  products_made: ProductEntry[];
  total_items: number;
  work_date: string;
  created_at: string;
}

export default function StaffWorkPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [description, setDescription] = useState('');
  const [productEntries, setProductEntries] = useState<ProductEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
    
    loadWorkLogs();

    const name = document.cookie
      .split('; ')
      .find(row => row.startsWith('employee_name='))
      ?.split('=')[1];
    if (name) setEmployeeName(decodeURIComponent(name));
  }, []);

  const loadWorkLogs = () => {
    fetch('/api/work-logs')
      .then(res => res.json())
      .then(data => setWorkLogs(data));
  };

  const addProductEntry = () => {
    setProductEntries([...productEntries, { product_id: 0, product_name: '', quantity: 1 }]);
  };

  const updateProductEntry = (index: number, field: keyof ProductEntry, value: number | string) => {
    const updated = [...productEntries];
    if (field === 'product_id') {
      const product = products.find(p => p.id === Number(value));
      updated[index] = {
        ...updated[index],
        product_id: Number(value),
        product_name: product?.name || ''
      };
    } else if (field === 'quantity') {
      updated[index].quantity = Number(value);
    }
    setProductEntries(updated);
  };

  const removeProductEntry = (index: number) => {
    setProductEntries(productEntries.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('Введите описание работы');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/work-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          products_made: productEntries.filter(p => p.product_id > 0)
        })
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) {
          router.push('/staff');
          return;
        }
        alert(data.error || 'Ошибка');
        return;
      }

      setSuccess(true);
      setDescription('');
      setProductEntries([]);
      loadWorkLogs();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert('Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    document.cookie = 'employee_id=; max-age=0; path=/';
    document.cookie = 'employee_name=; max-age=0; path=/';
    router.push('/staff');
  };

  const totalItems = productEntries.reduce((sum, p) => sum + p.quantity, 0);
  const todayTotal = workLogs
    .filter(log => log.work_date === new Date().toISOString().split('T')[0])
    .reduce((sum, log) => sum + log.total_items, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/staff" className="text-metal-500 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Запись работы
              </h1>
              {employeeName && (
                <p className="text-metal-400 text-sm">{employeeName}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
          >
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-green-400">Работа успешно записана!</span>
          </motion.div>
        )}

        <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-green-400" />
            Новая запись
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-metal-400 mb-2 block">Описание работы *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Что было сделано..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white min-h-[100px] resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-metal-400 flex items-center gap-2">
                  <Package size={16} />
                  Изделия (опционально)
                </label>
                <button
                  onClick={addProductEntry}
                  className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
                >
                  <Plus size={16} />
                  Добавить
                </button>
              </div>

              {productEntries.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3 mb-3"
                >
                  <select
                    value={entry.product_id}
                    onChange={(e) => updateProductEntry(index, 'product_id', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white"
                  >
                    <option value={0} className="bg-gray-900">Выберите изделие</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id} className="bg-gray-900">{p.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={entry.quantity}
                    onChange={(e) => updateProductEntry(index, 'quantity', e.target.value)}
                    className="w-24 bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white text-center"
                  />
                  <button
                    onClick={() => removeProductEntry(index)}
                    className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}

              {productEntries.length > 0 && (
                <div className="text-right text-sm text-metal-400 mt-2">
                  Всего изделий: <span className="text-white font-bold">{totalItems}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !description.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Сохранить запись'}
            </button>
          </div>
        </div>

        <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Мои записи за сегодня</h2>
            <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="text-metal-400 text-sm">Всего изделий: </span>
              <span className="text-green-400 font-bold">{todayTotal}</span>
            </div>
          </div>

          {workLogs.filter(log => log.work_date === new Date().toISOString().split('T')[0]).length === 0 ? (
            <p className="text-metal-500 text-center py-8">Нет записей за сегодня</p>
          ) : (
            <div className="space-y-3">
              {workLogs
                .filter(log => log.work_date === new Date().toISOString().split('T')[0])
                .map(log => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <p className="text-white mb-2">{log.description}</p>
                    {log.products_made && log.products_made.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {log.products_made.map((p, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs">
                            {p.product_name}: {p.quantity} шт
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-metal-500 text-xs">
                      {new Date(log.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
