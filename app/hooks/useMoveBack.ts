import { useNavigate } from '@remix-run/react';

export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
