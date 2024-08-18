import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfuly edited');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (error: string) => toast.error(error),
  });

  return { updateSetting, isUpdating };
}
