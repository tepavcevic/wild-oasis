import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { signup as signupApi } from '../../services/apiAuth';

export default function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () =>
      toast.success(
        "New user created! Please verify the new account from the user's email address"
      ),
    onError: (error) => toast.error(error.message),
  });

  return { signup, isLoading };
}
