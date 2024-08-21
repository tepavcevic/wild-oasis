import { redirect } from '@remix-run/react';
import { User } from '@supabase/supabase-js';

import { queryClient } from '#/query/client';

/**
 * This function is used to check if the user is authenticated.
 * If the user is not authenticated, it will redirect them to the login page.
 */
export async function requireAuthenticatedUser() {
  const user = (await queryClient.getQueryData(['user'])) as User | undefined;
  const isAuthenticated = user?.role === 'authenticated';
  if (!isAuthenticated) {
    throw redirect('/login');
  }
}
