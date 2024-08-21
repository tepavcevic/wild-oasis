import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: any; id: number }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfuly edited');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error: string) => toast.error(error),
  });

  return { editCabin, isEditing };
}
