'use client';

import { useState, useEffect } from 'react';
import { Calendar, DollarSign, Receipt, Plus, Trash2, Save, UserPlus, Trophy, TrendingDown } from 'lucide-react';

interface Worker {
  id: number;
  login: string;
  name: string;
  position: string;
  salary: number;
  conditions: string;
  rating: number;
}

interface AttendanceRecord {
  id: number;
  worker_id: number;
  worker_name?: string;
  date: string;
  status: string;
  check_in: string;
  check_out: string;
  note: string;
}

interface SalaryRecord {
  id: number;
  worker_id: number;
  worker_name?: string;
  month: string;
  amount: number;
  bonus: number;
  deductions: number;
  paid: boolean;
}

interface ExpenseRecord {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'salary' | 'expenses'>('attendance');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [newAttendance, setNewAttendance] = useState({
    worker_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    check_in: '09:00',
    check_out: '18:00',
    note: ''
  });

  const [newSalary, setNewSalary] = useState({
    worker_id: '',
    month: new Date().toISOString().slice(0, 7),
    amount: '',
    bonus: '0',
    deductions: '0'
  });

  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [workersRes, attendanceRes, salariesRes, expensesRes] = await Promise.all([
        fetch('/api/workers'),
        fetch('/api/attendance'),
        fetch('/api/salaries'),
        fetch('/api/expenses')
      ]);

      if (workersRes.ok) setWorkers(await workersRes.json());
      if (attendanceRes.ok) setAttendance(await attendanceRes.json());
      if (salariesRes.ok) setSalaries(await salariesRes.json());
      if (expensesRes.ok) setExpenses(await expensesRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const addAttendance = async () => {
    if (!newAttendance.worker_id) return;
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAttendance)
    });
    if (res.ok) {
      fetchData();
      setNewAttendance({
        worker_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        check_in: '09:00',
        check_out: '18:00',
        note: ''
      });
    }
  };

  const addSalary = async () => {
    if (!newSalary.worker_id || !newSalary.amount) return;
    const res = await fetch('/api/salaries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSalary)
    });
    if (res.ok) {
      fetchData();
      setNewSalary({
        worker_id: '',
        month: new Date().toISOString().slice(0, 7),
        amount: '',
        bonus: '0',
        deductions: '0'
      });
    }
  };

  const addExpense = async () => {
    if (!newExpense.category || !newExpense.amount) return;
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense)
    });
    if (res.ok) {
      fetchData();
      setNewExpense({
        category: '',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const updateRating = async (workerId: number, change: number) => {
    const res = await fetch(`/api/workers/${workerId}/rating`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ change })
    });
    if (res.ok) fetchData();
  };

  const deleteAttendance = async (id: number) => {
    await fetch(`/api/attendance/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const deleteSalary = async (id: number) => {
    await fetch(`/api/salaries/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const deleteExpense = async (id: number) => {
    await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const tabs = [
    { id: 'attendance', label: 'Посещаемость', icon: Calendar },
    { id: 'salary', label: 'Зарплаты', icon: DollarSign },
    { id: 'expenses', label: 'Расходы', icon: Receipt },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent">
          ЗОНА РАБОТЫ
        </h1>
        <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
          Управление посещаемостью, зарплатами и расходами
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-metal-400 hover:bg-white/10'
              }`}
            >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-metal-500">Загрузка...</div>
      ) : (
        <>
          {activeTab === 'attendance' && (
            <div className="space-y-6">
                <div className="glass p-6 space-y-4">
                  <h3 className="font-black uppercase text-sm flex items-center gap-2">
                    <Plus size={16} /> Добавить запись посещаемости
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <select
                      value={newAttendance.worker_id}
                      onChange={e => setNewAttendance({ ...newAttendance, worker_id: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    >
                      <option value="">Выберите сотрудника</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={newAttendance.date}
                      onChange={e => setNewAttendance({ ...newAttendance, date: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <select
                      value={newAttendance.status}
                      onChange={e => setNewAttendance({ ...newAttendance, status: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    >
                      <option value="present">Присутствует</option>
                      <option value="late">Опоздал</option>
                      <option value="absent">Отсутствует</option>
                      <option value="vacation">Отпуск</option>
                    </select>
                    <input
                      type="time"
                      value={newAttendance.check_in}
                      onChange={e => setNewAttendance({ ...newAttendance, check_in: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                      placeholder="Приход"
                    />
                    <input
                      type="time"
                      value={newAttendance.check_out}
                      onChange={e => setNewAttendance({ ...newAttendance, check_out: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                      placeholder="Уход"
                    />
                    <button
                      onClick={addAttendance}
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2 whitespace-nowrap min-w-fit w-full"
                    >
                      <Save size={16} /> СОХРАНИТЬ
                    </button>
                  </div>
                  <input
                    type="text"
                    value={newAttendance.note}
                    onChange={e => setNewAttendance({ ...newAttendance, note: e.target.value })}
                    placeholder="Примечание (необязательно)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

              <div className="glass p-6">
                <h3 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-500" /> Лидерборд - Управление рейтингом
                </h3>
                <div className="space-y-2">
                  {workers.sort((a, b) => b.rating - a.rating).map((worker, idx) => (
                    <div key={worker.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                          idx === 0 ? 'bg-yellow-500 text-black' :
                          idx === 1 ? 'bg-gray-400 text-black' :
                          idx === 2 ? 'bg-amber-700 text-white' :
                          'bg-white/10 text-metal-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold">{worker.name}</p>
                          <p className="text-xs text-metal-500">{worker.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-lg">{worker.rating} pts</span>
                        <button
                          onClick={() => updateRating(worker.id, -10)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                          title="Понизить рейтинг"
                        >
                          <TrendingDown size={16} />
                        </button>
                        <button
                          onClick={() => updateRating(worker.id, 10)}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30"
                          title="Повысить рейтинг"
                        >
                          <Trophy size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {workers.length === 0 && (
                    <p className="text-center text-metal-500 py-8">Нет сотрудников. Добавьте их в разделе "Сотрудники".</p>
                  )}
                </div>
              </div>

              <div className="glass p-6">
                <h3 className="font-black uppercase text-sm mb-4">История посещаемости</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-metal-500 uppercase text-xs">
                        <th className="pb-4">Сотрудник</th>
                        <th className="pb-4">Дата</th>
                        <th className="pb-4">Статус</th>
                        <th className="pb-4">Приход</th>
                        <th className="pb-4">Уход</th>
                        <th className="pb-4">Примечание</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map(record => (
                        <tr key={record.id} className="border-t border-white/5">
                          <td className="py-3 font-medium">{record.worker_name || `ID: ${record.worker_id}`}</td>
                          <td className="py-3">{record.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              record.status === 'present' ? 'bg-green-500/20 text-green-400' :
                              record.status === 'late' ? 'bg-yellow-500/20 text-yellow-400' :
                              record.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {record.status === 'present' ? 'Присутствует' :
                               record.status === 'late' ? 'Опоздал' :
                               record.status === 'absent' ? 'Отсутствует' : 'Отпуск'}
                            </span>
                          </td>
                          <td className="py-3">{record.check_in || '-'}</td>
                          <td className="py-3">{record.check_out || '-'}</td>
                          <td className="py-3 text-metal-400">{record.note || '-'}</td>
                          <td className="py-3">
                            <button
                              onClick={() => deleteAttendance(record.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {attendance.length === 0 && (
                    <p className="text-center text-metal-500 py-8">Нет записей</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'salary' && (
            <div className="space-y-6">
                <div className="glass p-6 space-y-4">
                  <h3 className="font-black uppercase text-sm flex items-center gap-2">
                    <Plus size={16} /> Добавить запись зарплаты
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <select
                      value={newSalary.worker_id}
                      onChange={e => setNewSalary({ ...newSalary, worker_id: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    >
                      <option value="">Выберите сотрудника</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                    <input
                      type="month"
                      value={newSalary.month}
                      onChange={e => setNewSalary({ ...newSalary, month: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <input
                      type="number"
                      value={newSalary.amount}
                      onChange={e => setNewSalary({ ...newSalary, amount: e.target.value })}
                      placeholder="Сумма"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <input
                      type="number"
                      value={newSalary.bonus}
                      onChange={e => setNewSalary({ ...newSalary, bonus: e.target.value })}
                      placeholder="Бонус"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <input
                      type="number"
                      value={newSalary.deductions}
                      onChange={e => setNewSalary({ ...newSalary, deductions: e.target.value })}
                      placeholder="Удержания"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <button
                      onClick={addSalary}
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2 whitespace-nowrap min-w-fit w-full"
                    >
                      <Save size={16} /> СОХРАНИТЬ
                    </button>
                  </div>
                </div>

              <div className="glass p-6">
                <h3 className="font-black uppercase text-sm mb-4">История зарплат</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-metal-500 uppercase text-xs">
                        <th className="pb-4">Сотрудник</th>
                        <th className="pb-4">Месяц</th>
                        <th className="pb-4">Сумма</th>
                        <th className="pb-4">Бонус</th>
                        <th className="pb-4">Удержания</th>
                        <th className="pb-4">Итого</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaries.map(record => (
                        <tr key={record.id} className="border-t border-white/5">
                          <td className="py-3 font-medium">{record.worker_name || `ID: ${record.worker_id}`}</td>
                          <td className="py-3">{record.month}</td>
                          <td className="py-3">{record.amount} ₽</td>
                          <td className="py-3 text-green-400">+{record.bonus} ₽</td>
                          <td className="py-3 text-red-400">-{record.deductions} ₽</td>
                          <td className="py-3 font-bold">{Number(record.amount) + Number(record.bonus) - Number(record.deductions)} ₽</td>
                          <td className="py-3">
                            <button
                              onClick={() => deleteSalary(record.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {salaries.length === 0 && (
                    <p className="text-center text-metal-500 py-8">Нет записей</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-6">
                <div className="glass p-6 space-y-4">
                  <h3 className="font-black uppercase text-sm flex items-center gap-2">
                    <Plus size={16} /> Добавить расход
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <input
                      type="text"
                      value={newExpense.category}
                      onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                      placeholder="Категория"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                      placeholder="Описание"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full md:col-span-1 lg:col-span-1"
                    />
                    <input
                      type="number"
                      value={newExpense.amount}
                      onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                      placeholder="Сумма"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full"
                    />
                    <button
                      onClick={addExpense}
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2 whitespace-nowrap min-w-fit w-full"
                    >
                      <Save size={16} /> СОХРАНИТЬ
                    </button>
                  </div>
                </div>

              <div className="glass p-6">
                <h3 className="font-black uppercase text-sm mb-4">История расходов</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-metal-500 uppercase text-xs">
                        <th className="pb-4">Дата</th>
                        <th className="pb-4">Категория</th>
                        <th className="pb-4">Описание</th>
                        <th className="pb-4">Сумма</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map(record => (
                        <tr key={record.id} className="border-t border-white/5">
                          <td className="py-3">{record.date}</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold">
                              {record.category}
                            </span>
                          </td>
                          <td className="py-3 text-metal-400">{record.description || '-'}</td>
                          <td className="py-3 font-bold text-red-400">-{record.amount} ₽</td>
                          <td className="py-3">
                            <button
                              onClick={() => deleteExpense(record.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {expenses.length === 0 && (
                    <p className="text-center text-metal-500 py-8">Нет записей</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
