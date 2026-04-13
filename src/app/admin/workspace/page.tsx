'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, DollarSign, Receipt, Plus, Trash2, Save, UserPlus, 
  Trophy, TrendingDown, Scissors 
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState<'attendance' | 'salary' | 'expenses' | 'nesting'>('attendance');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [loading, setLoading] = useState(true);

      // Nesting State - Default 125x250 sheet
        const [nestingParams, setNestingParams] = useState({
          sheetWidth: 125,
          sheetLength: 250,
          partWidth: 0,
          partLength: 0,
          targetParts: 0
        });


      const [nestingResults, setNestingResults] = useState({
        countWidth: 0,
        countLength: 0,
        totalParts: 0,
        wasteWidth: 0,
        wasteLength: 0,
        efficiency: 0,
        sheetsNeeded: 0
      });


      const [nestingUnits, setNestingUnits] = useState({
        sheetWidth: 'cm',
        sheetLength: 'cm',
        partWidth: 'cm',
        partLength: 'cm'
      });
  
      const [extraCalc, setExtraCalc] = useState({
        coeff: 0
      });
  
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
    bonus: '',
    deductions: ''
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

      useEffect(() => {
        // Calculate Nesting
        const effectivePartWidth = nestingParams.partWidth;
        const effectivePartLength = nestingParams.partLength;

        // Try two orientations
        // 1. Normal: Width x Length
        const countW_1 = Math.floor(nestingParams.sheetWidth / (effectivePartWidth || 1));
        const countL_1 = Math.floor(nestingParams.sheetLength / (effectivePartLength || 1));
        const total_1 = countW_1 * countL_1;

        // 2. Rotated: Length x Width
        const countW_2 = Math.floor(nestingParams.sheetWidth / (effectivePartLength || 1));
        const countL_2 = Math.floor(nestingParams.sheetLength / (effectivePartWidth || 1));
        const total_2 = countW_2 * countL_2;

        const bestIsRotated = total_2 > total_1;
        const countW = bestIsRotated ? countW_2 : countW_1;
        const countL = bestIsRotated ? countL_2 : countL_1;
        const total = Math.max(total_1, total_2);
      
        const wasteW = nestingParams.sheetWidth - (countW * (bestIsRotated ? effectivePartLength : effectivePartWidth));
        const wasteL = nestingParams.sheetLength - (countL * (bestIsRotated ? effectivePartWidth : effectivePartLength));
        
          const partArea = effectivePartWidth * effectivePartLength;
          const sheetArea = nestingParams.sheetWidth * nestingParams.sheetLength;
          const efficiency = sheetArea > 0 ? ((total * partArea) / sheetArea) * 100 : 0;
          
          const sheetsNeeded = total > 0 ? Math.ceil(nestingParams.targetParts / total) : 0;

          setNestingResults({
            countWidth: countW,
            countLength: countL,
            totalParts: total,
            wasteWidth: wasteW,
            wasteLength: wasteL,
            efficiency: Math.round(efficiency),
            sheetsNeeded: sheetsNeeded
          });
        }, [nestingParams]);



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
    { id: 'nesting', label: 'Раскрой', icon: Scissors },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-metal-500 bg-clip-text text-transparent">
            ЗОНА РАБОТЫ
          </h1>
          <p className="text-metal-400 font-medium mt-1 uppercase tracking-widest text-[9px] sm:text-[10px]">
            Управление посещаемостью, зарплатами и раскроем
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 sm:flex-wrap no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest whitespace-nowrap transition-all flex-shrink-0 sm:flex-shrink-1 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white/5 text-metal-400 hover:bg-white/10'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading && activeTab !== 'nesting' ? (
        <div className="text-center py-20 text-metal-500">Загрузка...</div>
      ) : (
        <>
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="glass p-4 sm:p-6 space-y-4">
                  <h3 className="font-black uppercase text-xs sm:text-sm flex items-center gap-2">
                    <Plus size={16} /> Добавить запись посещаемости
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
                    <select
                      value={newAttendance.worker_id}
                      onChange={e => setNewAttendance({ ...newAttendance, worker_id: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">Сотрудник</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={newAttendance.date}
                      onChange={e => setNewAttendance({ ...newAttendance, date: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <select
                      value={newAttendance.status}
                      onChange={e => setNewAttendance({ ...newAttendance, status: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="present">Присутствует</option>
                      <option value="late">Опоздал</option>
                      <option value="absent">Отсутствует</option>
                      <option value="vacation">Отпуск</option>
                    </select>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={newAttendance.check_in}
                        onChange={e => setNewAttendance({ ...newAttendance, check_in: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Приход"
                      />
                      <input
                        type="time"
                        value={newAttendance.check_out}
                        onChange={e => setNewAttendance({ ...newAttendance, check_out: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Уход"
                      />
                    </div>
                    <button
                      onClick={addAttendance}
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2 whitespace-nowrap min-w-fit w-full sm:col-span-2 lg:col-span-1 shadow-lg shadow-blue-600/20"
                    >
                      <Save size={16} /> СОХРАНИТЬ
                    </button>
                  </div>
                  <input
                    type="text"
                    value={newAttendance.note}
                    onChange={e => setNewAttendance({ ...newAttendance, note: e.target.value })}
                    placeholder="Примечание (необязательно)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div className="glass p-4 sm:p-6">
                  <h3 className="font-black uppercase text-xs sm:text-sm mb-4 flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-500" /> Лидерборд
                  </h3>
                  <div className="space-y-3">
                    {workers.sort((a, b) => b.rating - a.rating).map((worker, idx) => (
                      <div key={worker.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                            idx === 0 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' :
                            idx === 1 ? 'bg-gray-400 text-black shadow-lg shadow-gray-400/20' :
                            idx === 2 ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/20' :
                            'bg-white/10 text-metal-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold truncate">{worker.name}</p>
                            <p className="text-[10px] text-metal-500 uppercase tracking-widest">{worker.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                          <span className="font-black text-xl bg-white/5 px-3 py-1 rounded-lg">{worker.rating} <span className="text-[10px] text-metal-500 font-bold uppercase">pts</span></span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateRating(worker.id, -10)}
                              className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                              title="Понизить рейтинг"
                            >
                              <TrendingDown size={18} />
                            </button>
                            <button
                              onClick={() => updateRating(worker.id, 10)}
                              className="p-2.5 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-colors"
                              title="Повысить рейтинг"
                            >
                              <Trophy size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-4 sm:p-6 overflow-hidden">
                  <h3 className="font-black uppercase text-xs sm:text-sm mb-4">История посещаемости</h3>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                    <table className="w-full text-sm min-w-[700px]">
                      <thead>
                        <tr className="text-left text-metal-500 uppercase text-[10px] tracking-widest">
                          <th className="pb-4">Сотрудник</th>
                          <th className="pb-4 text-center">Дата</th>
                          <th className="pb-4 text-center">Статус</th>
                          <th className="pb-4 text-center">Приход</th>
                          <th className="pb-4 text-center">Уход</th>
                          <th className="pb-4">Примечание</th>
                          <th className="pb-4 w-[50px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendance.map(record => (
                          <tr key={record.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 font-bold">{record.worker_name || `ID: ${record.worker_id}`}</td>
                            <td className="py-4 text-center text-metal-400 tabular-nums">{record.date}</td>
                            <td className="py-4 text-center">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                record.status === 'present' ? 'bg-green-500/10 text-green-400' :
                                record.status === 'late' ? 'bg-yellow-500/10 text-yellow-400' :
                                record.status === 'absent' ? 'bg-red-500/10 text-red-400' :
                                'bg-blue-500/10 text-blue-400'
                              }`}>
                                {record.status === 'present' ? 'ПРИСУТСТВУЕТ' :
                                 record.status === 'late' ? 'ОПОЗДАЛ' :
                                 record.status === 'absent' ? 'ОТСУТСТВУЕТ' : 'ОТПУСК'}
                              </span>
                            </td>
                            <td className="py-4 text-center tabular-nums">{record.check_in || '--:--'}</td>
                            <td className="py-4 text-center tabular-nums">{record.check_out || '--:--'}</td>
                            <td className="py-4 text-metal-400 text-xs italic">{record.note || '-'}</td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => deleteAttendance(record.id)}
                                className="p-2 text-metal-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}


          {activeTab === 'salary' && (
            <div className="space-y-6">
              <div className="glass p-4 sm:p-6 space-y-4">
                <h3 className="font-black uppercase text-xs sm:text-sm flex items-center gap-2">
                  <Plus size={16} /> Добавить запись зарплаты
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
                  <select
                    value={newSalary.worker_id}
                    onChange={e => setNewSalary({ ...newSalary, worker_id: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="">Сотрудник</option>
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                  <input
                    type="month"
                    value={newSalary.month}
                    onChange={e => setNewSalary({ ...newSalary, month: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                    <input
                      type="number"
                      value={newSalary.amount}
                      onChange={e => setNewSalary({ ...newSalary, amount: e.target.value.replace(/^0+(?=\d)/, '') })}
                      placeholder="Сумма"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <input
                      type="number"
                      value={newSalary.bonus}
                      onChange={e => setNewSalary({ ...newSalary, bonus: e.target.value.replace(/^0+(?=\d)/, '') })}
                      placeholder="Бонус"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <input
                      type="number"
                      value={newSalary.deductions}
                      onChange={e => setNewSalary({ ...newSalary, deductions: e.target.value.replace(/^0+(?=\d)/, '') })}
                      placeholder="Удержания"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  <button
                    onClick={addSalary}
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2 whitespace-nowrap min-w-fit w-full sm:col-span-2 lg:col-span-1 shadow-lg shadow-blue-600/20"
                  >
                    <Save size={16} /> СОХРАНИТЬ
                  </button>
                </div>
              </div>

              <div className="glass p-4 sm:p-6 overflow-hidden">
                <h3 className="font-black uppercase text-xs sm:text-sm mb-4">История зарплат</h3>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="text-left text-metal-500 uppercase text-[10px] tracking-widest">
                        <th className="pb-4">Сотрудник</th>
                        <th className="pb-4">Месяц</th>
                        <th className="pb-4">Сумма</th>
                        <th className="pb-4">Бонус</th>
                        <th className="pb-4">Удержания</th>
                        <th className="pb-4">Итого</th>
                        <th className="pb-4 w-[50px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaries.map(record => (
                        <tr key={record.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 font-bold">{record.worker_name || `ID: ${record.worker_id}`}</td>
                          <td className="py-4 text-metal-400">{record.month}</td>
                          <td className="py-4 font-medium tabular-nums">{record.amount} ₽</td>
                          <td className="py-4 text-green-400 tabular-nums">+{record.bonus} ₽</td>
                          <td className="py-4 text-red-400 tabular-nums">-{record.deductions} ₽</td>
                          <td className="py-4 font-black text-white tabular-nums">
                            {Number(record.amount) + Number(record.bonus) - Number(record.deductions)} ₽
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => deleteSalary(record.id)}
                              className="p-2 text-metal-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-6">
              <div className="glass p-4 sm:p-6 space-y-4">
                <h3 className="font-black uppercase text-xs sm:text-sm flex items-center gap-2">
                  <Plus size={16} /> Добавить расход
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                  <input
                    type="text"
                    value={newExpense.category}
                    onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                    placeholder="Категория"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="Описание"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                    <input
                      type="number"
                      value={newExpense.amount}
                      onChange={e => setNewExpense({ ...newExpense, amount: e.target.value.replace(/^0+(?=\d)/, '') })}
                      placeholder="Сумма"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-w-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button
                    onClick={addExpense}
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2 whitespace-nowrap min-w-fit w-full sm:col-span-2 lg:col-span-1 shadow-lg shadow-blue-600/20"
                  >
                    <Save size={16} /> СОХРАНИТЬ
                  </button>
                </div>
              </div>

              <div className="glass p-4 sm:p-6 overflow-hidden">
                <h3 className="font-black uppercase text-xs sm:text-sm mb-4">История расходов</h3>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="text-left text-metal-500 uppercase text-[10px] tracking-widest">
                        <th className="pb-4">Дата</th>
                        <th className="pb-4">Категория</th>
                        <th className="pb-4">Описание</th>
                        <th className="pb-4">Сумма</th>
                        <th className="pb-4 w-[50px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map(record => (
                        <tr key={record.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 text-metal-400 tabular-nums">{record.date}</td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              {record.category}
                            </span>
                          </td>
                          <td className="py-4 text-metal-400 text-xs">{record.description || '-'}</td>
                          <td className="py-4 font-black text-red-400 tabular-nums">-{record.amount} ₽</td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => deleteExpense(record.id)}
                              className="p-2 text-metal-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

            {activeTab === 'nesting' && (
              <div className="space-y-6">
                <div className="glass overflow-hidden relative border border-white/10 shadow-2xl rounded-[40px]">
                  {/* Декоративные свечения */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 blur-[120px] pointer-events-none" />

                  <div className="relative z-10 p-6 sm:p-10">
                    {/* Header */}
                    <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
                      <div className="p-5 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl shadow-lg shadow-blue-500/20 text-white">
                        <Scissors size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">КАЛЬКУЛЯТОР РАСКРОЯ</h2>
                        <p className="text-metal-400 text-xs sm:text-sm font-medium uppercase tracking-widest mt-1">Единая система расчёта изделий и стоимости</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                      {/* Left Side: Inputs */}
                      <div className="xl:col-span-4 space-y-8">
                        <div>
                          <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Параметры листа
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 bg-white/5 p-4 rounded-3xl border border-white/10 focus-within:border-blue-500/50 transition-all">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-metal-500 uppercase">Ширина</span>
                                <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                                  {['cm', 'm'].map(u => (
                                    <button 
                                      key={u}
                                      onClick={() => setNestingUnits({ ...nestingUnits, sheetWidth: u as any })}
                                      className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${nestingUnits.sheetWidth === u ? 'bg-blue-600 text-white' : 'text-metal-500 hover:text-metal-400'}`}
                                    >
                                      {u.toUpperCase()}
                                    </button>
                                  ))}
                                </div>
                              </div>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={nestingUnits.sheetWidth === 'cm' ? (nestingParams.sheetWidth || '') : (nestingParams.sheetWidth ? nestingParams.sheetWidth / 100 : '')}
                                    onChange={(e) => {
                                      const val = parseFloat(e.currentTarget.value.replace(/^0+(?=\d)/, '')) || 0;
                                      setNestingParams({ ...nestingParams, sheetWidth: nestingUnits.sheetWidth === 'cm' ? val : val * 100 });
                                    }}
                                    className="w-full bg-transparent border-none p-0 text-2xl font-black focus:ring-0 text-white"
                                  />
                                </div>
                                <div className="space-y-2 bg-white/5 p-4 rounded-3xl border border-white/10 focus-within:border-blue-500/50 transition-all">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-metal-500 uppercase">Длина</span>
                                    <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                                      {['cm', 'm'].map(u => (
                                        <button 
                                          key={u}
                                          onClick={() => setNestingUnits({ ...nestingUnits, sheetLength: u as any })}
                                          className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${nestingUnits.sheetLength === u ? 'bg-blue-600 text-white' : 'text-metal-500 hover:text-metal-400'}`}
                                        >
                                          {u.toUpperCase()}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={nestingUnits.sheetLength === 'cm' ? (nestingParams.sheetLength || '') : (nestingParams.sheetLength ? nestingParams.sheetLength / 100 : '')}
                                    onChange={(e) => {
                                      const val = parseFloat(e.currentTarget.value.replace(/^0+(?=\d)/, '')) || 0;
                                      setNestingParams({ ...nestingParams, sheetLength: nestingUnits.sheetLength === 'cm' ? val : val * 100 });
                                    }}
                                    className="w-full bg-transparent border-none p-0 text-2xl font-black focus:ring-0 text-white"
                                  />
                                </div>
                              </div>
                            </div>
    
                            <div>
                              <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Параметры изделия
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 bg-white/5 p-4 rounded-3xl border border-white/10 focus-within:border-orange-500/50 transition-all">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-metal-500 uppercase">Ширина (W)</span>
                                    <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                                      {['cm', 'm'].map(u => (
                                        <button 
                                          key={u}
                                          onClick={() => setNestingUnits({ ...nestingUnits, partWidth: u as any })}
                                          className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${nestingUnits.partWidth === u ? 'bg-orange-600 text-white' : 'text-metal-500 hover:text-metal-400'}`}
                                        >
                                          {u.toUpperCase()}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={nestingUnits.partWidth === 'cm' ? (nestingParams.partWidth || '') : (nestingParams.partWidth ? nestingParams.partWidth / 100 : '')}
                                    onChange={(e) => {
                                      const val = parseFloat(e.currentTarget.value.replace(/^0+(?=\d)/, '')) || 0;
                                      setNestingParams({ ...nestingParams, partWidth: nestingUnits.partWidth === 'cm' ? val : val * 100 });
                                    }}
                                    className="w-full bg-transparent border-none p-0 text-2xl font-black focus:ring-0 text-white"
                                  />
                                </div>
                                <div className="space-y-2 bg-white/5 p-4 rounded-3xl border border-white/10 focus-within:border-orange-500/50 transition-all">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-metal-500 uppercase">Длина (L)</span>
                                    <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                                      {['cm', 'm'].map(u => (
                                        <button 
                                          key={u}
                                          onClick={() => setNestingUnits({ ...nestingUnits, partLength: u as any })}
                                          className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${nestingUnits.partLength === u ? 'bg-orange-600 text-white' : 'text-metal-500 hover:text-metal-400'}`}
                                        >
                                          {u.toUpperCase()}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={nestingUnits.partLength === 'cm' ? (nestingParams.partLength || '') : (nestingParams.partLength ? nestingParams.partLength / 100 : '')}
                                    onChange={(e) => {
                                      const val = parseFloat(e.currentTarget.value.replace(/^0+(?=\d)/, '')) || 0;
                                      setNestingParams({ ...nestingParams, partLength: nestingUnits.partLength === 'cm' ? val : val * 100 });
                                    }}
                                    className="w-full bg-transparent border-none p-0 text-2xl font-black focus:ring-0 text-white"
                                  />
                              </div>
                            </div>
                          </div>
  
                          <div>
                            <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" /> Партия
                            </h3>
                            <div className="bg-white/5 p-4 rounded-3xl border border-white/10 focus-within:border-purple-500/50 transition-all">
                              <span className="text-[10px] font-black text-metal-500 uppercase block mb-1">Нужно изделий (шт)</span>
                              <input
                                type="number"
                                value={nestingParams.targetParts || ''}
                                onChange={(e) => setNestingParams({ ...nestingParams, targetParts: parseInt(e.target.value.replace(/^0+(?=\d)/, '')) || 0 })}
                                className="w-full bg-transparent border-none p-0 text-2xl font-black focus:ring-0 text-white"
                                placeholder="Количество..."
                              />
                            </div>
                          </div>
                        </div>

                            {/* Right Side: Results */}
                            <div className="xl:col-span-8 flex flex-col justify-between gap-8">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                                <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 group hover:bg-white/[0.08] transition-all">
                                  <p className="text-[10px] font-black text-metal-500 uppercase tracking-widest mb-2">Ширина (W)</p>
                                  <p className={`font-black text-white ${String(Number(nestingParams.partWidth.toFixed(2))).length > 2 ? 'text-xl' : 'text-2xl'}`}>{Number(nestingParams.partWidth.toFixed(2))} <span className="text-[10px] text-metal-500 uppercase">см</span></p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 group hover:bg-white/[0.08] transition-all">
                                  <p className="text-[10px] font-black text-metal-500 uppercase tracking-widest mb-2">Длина (L)</p>
                                  <p className={`font-black text-white ${String(Number(nestingParams.partLength.toFixed(2))).length > 2 ? 'text-xl' : 'text-2xl'}`}>{Number(nestingParams.partLength.toFixed(2))} <span className="text-[10px] text-metal-500 uppercase">см</span></p>
                                </div>
                                <div className="p-6 bg-blue-600/10 rounded-[32px] border border-blue-500/20 group hover:bg-blue-600/20 transition-all">
                                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Расчёт (ШxД)</p>
                                  <p className={`font-black text-white ${String(nestingResults.countWidth + 'x' + nestingResults.countLength).length > 3 ? 'text-xl' : 'text-3xl'}`}>{nestingResults.countWidth}x{nestingResults.countLength}</p>
                                </div>
                                <div className="p-6 bg-emerald-600/10 rounded-[32px] border border-emerald-500/20 group hover:bg-emerald-600/20 transition-all">
                                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">На 1 лист</p>
                                  <p className={`font-black text-white ${String(nestingResults.totalParts).length > 2 ? 'text-2xl' : 'text-3xl'}`}>{nestingResults.totalParts} <span className="text-[10px] text-metal-500 uppercase">шт</span></p>
                                </div>
                                <div className="p-6 bg-purple-600/10 rounded-[32px] border border-purple-500/20 group hover:bg-purple-600/20 transition-all">
                                  <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-2">Нужно листов</p>
                                  <p className={`font-black text-white ${String(nestingResults.sheetsNeeded).length > 2 ? 'text-2xl' : 'text-3xl'}`}>{nestingResults.sheetsNeeded} <span className="text-[10px] text-metal-500 uppercase">шт</span></p>
                                </div>
                              </div>


                              <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-red-600/5 rounded-[32px] border border-red-500/10 flex items-center justify-between">
                                  <div>
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">ОСТАТОК Ш</p>
                                    <p className={`font-black text-white ${String(Number(nestingResults.wasteWidth.toFixed(2))).length > 2 ? 'text-2xl' : 'text-3xl'}`}>{Number(nestingResults.wasteWidth.toFixed(2))} <span className="text-[10px] text-metal-500">см</span></p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[9px] font-black text-metal-500 uppercase tracking-widest">ДЛИНА ЛИСТА</p>
                                    <p className={`font-black text-metal-400 mt-0.5 ${String(Number(nestingParams.sheetLength.toFixed(2))).length > 2 ? 'text-lg' : 'text-xl'}`}>{Number(nestingParams.sheetLength.toFixed(2))} <span className="text-[10px]">см</span></p>
                                  </div>
                                </div>
                                <div className="p-6 bg-red-600/5 rounded-[32px] border border-red-500/10 flex items-center justify-between">
                                  <div>
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">ОСТАТОК Д</p>
                                    <p className={`font-black text-white ${String(Number(nestingResults.wasteLength.toFixed(2))).length > 2 ? 'text-2xl' : 'text-3xl'}`}>{Number(nestingResults.wasteLength.toFixed(2))} <span className="text-[10px] text-metal-500">см</span></p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[9px] font-black text-metal-500 uppercase tracking-widest">ШИРИНА ЛИСТА</p>
                                    <p className={`font-black text-metal-400 mt-0.5 ${String(Number(nestingParams.sheetWidth.toFixed(2))).length > 2 ? 'text-lg' : 'text-xl'}`}>{Number(nestingParams.sheetWidth.toFixed(2))} <span className="text-[10px]">см</span></p>
                                  </div>
                                </div>
                              </div>

                        <div className="p-8 sm:p-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[40px] border border-emerald-400/20 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-900/40">
                          <div className="flex items-center gap-6 w-full sm:w-auto">
                            <div className="p-5 bg-black/30 text-white rounded-3xl border border-white/10">
                              <DollarSign size={32} />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">ИТОГО К ОПЛАТЕ</p>
                              <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mt-1">Стоимость изделия</h3>
                            </div>
                          </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
                              <div className="w-full sm:w-44 space-y-2 bg-black/30 p-5 rounded-3xl border border-white/10 focus-within:border-white/30 transition-all">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Коэффициент</span>
                                <input
                                  type="number"
                                  step="any"
                                  value={extraCalc.coeff || ''}
                                  onChange={(e) => setExtraCalc({ ...extraCalc, coeff: parseFloat(e.currentTarget.value.replace(/^0+(?=\d)/, '')) || 0 })}
                                  className="w-full bg-transparent border-none p-0 text-3xl font-black focus:ring-0 text-white placeholder:text-white/20"
                                  placeholder="0"
                                />
                              </div>

                                  <div className="text-center sm:text-right flex-shrink-0 min-w-fit">
                                    <p className={`font-black text-white tracking-tighter tabular-nums drop-shadow-lg leading-none ${
                                      (nestingParams.partWidth * nestingParams.partLength * extraCalc.coeff * 0.01 * (nestingParams.targetParts || 1)).toFixed(0).length > 5 
                                      ? 'text-2xl sm:text-3xl lg:text-4xl' 
                                      : 'text-4xl sm:text-5xl lg:text-6xl'
                                    }`}>
                                      {(nestingParams.partWidth * nestingParams.partLength * extraCalc.coeff * 0.01 * (nestingParams.targetParts || 1)).toFixed(0)}
                                      <span className="text-lg sm:text-xl text-white/70 ml-2">₽</span>
                                    </p>
                                  </div>
                            </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

        </>
      )}
    </div>
  );
}
