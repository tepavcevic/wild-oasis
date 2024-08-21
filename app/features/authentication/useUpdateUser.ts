import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateCurrentUser as updateUserApi } from '../../services/apiAuth';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success('User data successfuly updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}
