import { redirect } from '@remix-run/react';

import { queryClient } from '#/query/client';
import { userQuery } from '#/query/options';

/**
 * This function is used to check if the user is authenticated.
 * If the user is not authenticated, it will redirect them to the login page.
 */
export async function requireAuthenticatedUser() {
  const user = await queryClient.ensureQueryData({ ...userQuery });
  const isAuthenticated = user?.role === 'authenticated';
  if (!isAuthenticated) {
    throw redirect('/login');
  }
}
