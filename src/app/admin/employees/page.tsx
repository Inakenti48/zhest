'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Loader2,
  KeyRound,
  Calendar,
  ClipboardList,
  Package
} from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  created_at: string;
}

interface ProductEntry {
  product_id: number;
  product_name: string;
  quantity: number;
}

interface WorkLog {
  id: number;
  employee_id: number;
  employee_name: string;
  description: string;
  products_made: ProductEntry[];
  total_items: number;
  work_date: string;
  created_at: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [newName, setNewName] = useState('');
  const [newPin, setNewPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    setLoadingData(true);
    const [empRes, logsRes] = await Promise.all([
      fetch('/api/employees'),
      fetch(`/api/work-logs?date=${selectedDate}`)
    ]);
    const empData = await empRes.json() as Employee[];
    const logsData = await logsRes.json() as WorkLog[];
    setEmployees(empData);
    setWorkLogs(logsData);
    setLoadingData(false);
  };

  const addEmployee = async () => {
    if (!newName.trim() || !newPin.trim()) {
      alert('Введите имя и PIN');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, pin: newPin })
      });

      if (res.ok) {
        setNewName('');
        setNewPin('');
        loadData();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    if (!confirm('Удалить сотрудника?')) return;

    await fetch(`/api/employees?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  const totalItemsToday = workLogs.reduce((sum, log) => sum + log.total_items, 0);

  const employeeStats = employees.map(emp => {
    const empLogs = workLogs.filter(log => log.employee_id === emp.id);
    const totalItems = empLogs.reduce((sum, log) => sum + log.total_items, 0);
    return { ...emp, logsCount: empLogs.length, totalItems };
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Сотрудники</h1>
          <p className="text-metal-500 text-sm mt-1">Управление сотрудниками и записи работ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-blue-400" />
            Добавить сотрудника
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-metal-400 mb-2 block">Имя</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Иван Иванов"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-metal-400 mb-2 block flex items-center gap-2">
                <KeyRound size={14} />
                PIN-код
              </label>
              <input
                type="text"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="1234"
                maxLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <button
              onClick={addEmployee}
              disabled={loading || !newName.trim() || !newPin.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
              Добавить
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-sm font-bold text-metal-400 mb-3 flex items-center gap-2">
              <Users size={16} />
              Список сотрудников ({employees.length})
            </h3>
            
            {loadingData ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-metal-500" size={24} />
              </div>
            ) : employees.length === 0 ? (
              <p className="text-metal-500 text-sm text-center py-4">Нет сотрудников</p>
            ) : (
              <div className="space-y-2">
                {employeeStats.map(emp => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div>
                      <p className="text-white font-medium">{emp.name}</p>
                      <p className="text-metal-500 text-xs">
                        Сегодня: {emp.logsCount} записей, {emp.totalItems} изд.
                      </p>
                    </div>
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ClipboardList size={20} className="text-green-400" />
              Записи работ
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-metal-400 text-sm">Всего изделий: </span>
                <span className="text-green-400 font-bold">{totalItemsToday}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-metal-500" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                />
              </div>
            </div>
          </div>

          {loadingData ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-metal-500" size={32} />
            </div>
          ) : workLogs.length === 0 ? (
            <p className="text-metal-500 text-center py-12">Нет записей за выбранную дату</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {workLogs.map(log => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-blue-400 font-medium">{log.employee_name}</span>
                      <span className="text-metal-500 text-sm ml-2">
                        {new Date(log.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {log.total_items > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs flex items-center gap-1">
                        <Package size={12} />
                        {log.total_items} изд.
                      </span>
                    )}
                  </div>
                  
                  <p className="text-white mb-2">{log.description}</p>
                  
                  {log.products_made && log.products_made.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {log.products_made.map((p, i) => (
                        <span key={i} className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs">
                          {p.product_name}: {p.quantity} шт
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {workLogs.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-sm font-bold text-metal-400 mb-4">Итого по сотрудникам</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {employeeStats.filter(e => e.totalItems > 0 || e.logsCount > 0).map(emp => (
                  <div key={emp.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-white font-medium text-sm">{emp.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-metal-500 text-xs">{emp.logsCount} записей</span>
                      <span className="text-green-400 text-xs font-bold">{emp.totalItems} изд.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
