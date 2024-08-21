import { redirect } from '@remix-run/react';

import { requireAuthenticatedUser } from '#/services/authGuards';

export async function clientLoader() {
  await requireAuthenticatedUser();

  return redirect('/dashboard');
}

export default function Index() {
  return null;
}
