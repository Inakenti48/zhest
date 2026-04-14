'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Users, 
  KeyRound, 
  User, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { getAllAccounts, updateAccount, getCurrentUser, getCurrentRole } from '@/lib/auth-actions';

interface Account {
  id: number;
  username: string;
  password?: string;
  role: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [accs, user, role] = await Promise.all([
      getAllAccounts(),
      getCurrentUser(),
      getCurrentRole()
    ]);
    setAccounts(accs);
    setCurrentUser(user);
    setCurrentRole(role);
    setLoading(false);
  };

  const handleUpdate = async (id: number, username: string, password?: string) => {
    if (!username || !password) {
      setMessage({ type: 'error', text: 'Логин и пароль не могут быть пустыми' });
      return;
    }

    setSavingId(id);
    setMessage(null);

    const formData = new FormData();
    formData.append('userId', String(id));
    formData.append('username', username);
    formData.append('password', password);

    const result = await updateAccount(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Данные успешно обновлены' });
      loadData();
    } else {
      setMessage({ type: 'error', text: result.error || 'Ошибка при обновлении' });
    }
    setSavingId(null);
  };

  const togglePassword = (id: number) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isTima = currentRole === 'admin' && currentUser === '8080';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Учетные записи</h1>
          <p className="text-metal-500 text-sm mt-1">
            {isTima ? 'Управление всеми аккаунтами системы' : 'Управление вашим аккаунтом'}
          </p>
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold text-sm uppercase">{message.text}</span>
        </motion.div>
      )}

      <div className="grid gap-6">
        {accounts.map((account) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-600/20">
                <User className="text-blue-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase">{account.username}</h2>
                <p className="text-[10px] text-metal-500 uppercase font-bold tracking-widest">
                  Роль: {account.role === 'admin' ? 'Главный админ' : account.role === 'admin2' ? 'Админ 2' : account.role === 'office_manager' ? 'Офис менеджер' : 'Работник'}
                </p>
              </div>
            </div>

            <AccountForm 
              account={account} 
              onSave={(user, pass) => handleUpdate(account.id, user, pass)}
              isSaving={savingId === account.id}
              showPassword={showPasswords[account.id]}
              onTogglePassword={() => togglePassword(account.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AccountForm({ account, onSave, isSaving, showPassword, onTogglePassword }: { 
  account: Account, 
  onSave: (u: string, p: string) => void,
  isSaving: boolean,
  showPassword: boolean,
  onTogglePassword: () => void
}) {
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState(account.password || '');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-metal-500 tracking-widest px-1">Логин</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User size={16} className="text-metal-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold uppercase text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-metal-500 tracking-widest px-1">Пароль</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <KeyRound size={16} className="text-metal-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-sm"
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-metal-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="md:col-span-2 mt-4">
        <button
          onClick={() => onSave(username, password)}
          disabled={isSaving || (username === account.username && password === account.password)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest text-xs"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}
