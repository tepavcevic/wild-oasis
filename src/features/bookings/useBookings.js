import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';
import { ROWS_PER_PAGE } from '../../constants';

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const sortByValueRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValueRaw.split('-');
  const sortBy = { field, direction };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / ROWS_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return {
    isLoading,
    bookings,
    count,
    error,
  };
}
