import { redirect } from '@remix-run/react';

import { queryClient } from '#/query/client';
import { logout as logoutApi } from '#/services/apiAuth';

export async function clientAction() {
  await logoutApi();

  queryClient.invalidateQueries();
  throw redirect('/login');
}
