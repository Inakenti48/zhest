'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash } from 'crypto';

import db from './db';

function sha256(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

const TARGET_LOGIN_HASH = '6c237681e70921603a306be9a1a5d9833fce5c1e268f52b1650970eaad0dce21'; // SHA-256 для '8080'

export async function login(formData: FormData) {
  const password = (formData.get('password') as string || '').trim();

  let success = false;
  let displayName = '';
  let role = 'admin';
  let userId = 0;

  if (!password) {
    return { error: 'Введите пароль' };
  }

  // Hash the input password for comparison
  const hashedInput = sha256(password);

  // Check users table first (new system) - Search by plain password or hashed password
  const user = await db.prepare('SELECT id, username, password, role FROM users WHERE password_plain = ? OR password = ?').get(password, hashedInput);
  
  if (user) {
    success = true;
    displayName = user.username;
    role = user.role;
    userId = user.id;
  } else {
    // Legacy / Fallback checks for special 8080 login if not in users table yet
    if (password === '8080' || hashedInput === TARGET_LOGIN_HASH) {
      success = true;
      displayName = 'Администратор';
      role = 'admin';
    }
  }

  if (success) {
    console.log(`[AUTH] Login success for user: ${displayName} (role: ${role})`);
    const cookieStore = await cookies();
    
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    cookieStore.set('admin_user_name', displayName, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    cookieStore.set('admin_user_role', role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    cookieStore.set('admin_user_id', String(userId), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    redirect('/admin');
  } else {
    console.log(`[AUTH] Login failed with password: ${password}`);
    return { error: 'Пользователь не найден или пароль неверный' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  cookieStore.delete('admin_user_name');
  cookieStore.delete('admin_user_role');
  cookieStore.delete('admin_user_id');
  redirect('/login');
}

export async function isAuthenticated() {
  const session = (await cookies()).get('admin_session');
  return !!session;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_user_name')?.value || 'Гость';
}

export async function getCurrentRole() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_user_role')?.value || 'guest';
}

export async function getCurrentUserId() {
  const cookieStore = await cookies();
  return Number(cookieStore.get('admin_user_id')?.value) || 0;
}

export async function getAllAccounts() {
  const role = await getCurrentRole();
  const userName = await getCurrentUser();
  
  // Only Tima (admin role and name 8080) can see everyone's plain passwords
  if (role === 'admin' && userName === '8080') {
    return await db.prepare('SELECT id, username, password_plain as password, role FROM users').all();
  }
  
  // Others only see their own (without plain password if needed, but here we'll just filter in the UI)
  const userId = await getCurrentUserId();
  if (userId > 0) {
    return await db.prepare('SELECT id, username, password_plain as password, role FROM users WHERE id = ?').all(userId);
  }
  
  return [];
}

export async function updateAccount(formData: FormData) {
  const userId = Number(formData.get('userId'));
  const newUsername = (formData.get('username') as string || '').trim();
  const newPassword = (formData.get('password') as string || '').trim();
  
  const currentUserId = await getCurrentUserId();
  const currentRole = await getCurrentRole();
  const currentUserName = await getCurrentUser();
  
  // Permission check: users can only update themselves, unless it's Tima
  const isTima = currentRole === 'admin' && currentUserName === '8080';
  if (!isTima && userId !== currentUserId) {
    return { error: 'У вас нет прав на изменение этого аккаунта' };
  }
  
  if (!newUsername || !newPassword) {
    return { error: 'Логин и пароль не могут быть пустыми' };
  }
  
  const hashedPassword = sha256(newPassword);
  
  try {
    await db.prepare('UPDATE users SET username = ?, password = ?, password_plain = ? WHERE id = ?')
      .run(newUsername, hashedPassword, newPassword, userId);
    
    // If updating self, update cookies
    if (userId === currentUserId) {
      const cookieStore = await cookies();
      cookieStore.set('admin_user_name', newUsername, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Update account error:', error);
    return { error: 'Ошибка при обновлении данных' };
  }
}
