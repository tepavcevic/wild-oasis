import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@remix-run/react';
import { toast } from 'react-hot-toast';

import { logout as logoutApi } from '../../services/apiAuth';

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { logout, isLoading };
}
