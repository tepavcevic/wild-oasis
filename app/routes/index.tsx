import { queryClient } from '#/query/client';
import { redirect } from '@remix-run/react';

export async function clientLoader() {
  const user = await queryClient.getQueryData(['user']);
  const isAuthenticated = user?.role === 'authenticated';
  if (isAuthenticated) {
    return redirect('/dashboard');
  }
  throw redirect('/login');
}
