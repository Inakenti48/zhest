'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash } from 'crypto';

function sha256(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

const TARGET_LOGIN_HASH = '6c237681e70921603a306be9a1a5d9833fce5c1e268f52b1650970eaad0dce21'; // SHA-256 для '8080'

export async function login(formData: FormData) {
  const username = (formData.get('username') as string || '').trim();

    if (username === '8080' || sha256(username) === TARGET_LOGIN_HASH) {
      console.log(`[AUTH] Login success for user: ${username}`);
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      redirect('/admin');
    } else {
      console.log(`[AUTH] Login failed for user: ${username}`);
      return { error: 'Неверный логин' };
    }

}

export async function logout() {
  (await cookies()).delete('admin_session');
  redirect('/login');
}

export async function isAuthenticated() {
  const session = (await cookies()).get('admin_session');
  return !!session;
}
