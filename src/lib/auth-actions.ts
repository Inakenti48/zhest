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
  const username = (formData.get('username') as string || '').trim();

  let success = false;
  let displayName = username;

  // Check special 8080 login
  if (username === '8080' || sha256(username) === TARGET_LOGIN_HASH) {
    success = true;
    displayName = 'Администратор';
  } else {
    // Check employees table by name or PIN
    const employee = await db.prepare('SELECT name FROM employees WHERE name = ? OR pin = ?').get(username, username);
    if (employee) {
      success = true;
      displayName = employee.name;
    } else {
      // Check workers table
      const worker = await db.prepare('SELECT name FROM workers WHERE login = ? OR name = ?').get(username, username);
      if (worker) {
        success = true;
        displayName = worker.name;
      } else {
        // Check users table
        const user = await db.prepare('SELECT username FROM users WHERE username = ?').get(username);
        if (user) {
          success = true;
          displayName = user.username;
        }
      }
    }
  }

  if (success) {
    console.log(`[AUTH] Login success for user: ${username} (${displayName})`);
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

    redirect('/admin');
  } else {
    console.log(`[AUTH] Login failed for user: ${username}`);
    return { error: 'Пользователь не найден' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  cookieStore.delete('admin_user_name');
  redirect('/login');
}

export async function isAuthenticated() {
  const session = (await cookies()).get('admin_session');
  return !!session;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_user_name')?.value || 'Кострова В.Б.';
}
