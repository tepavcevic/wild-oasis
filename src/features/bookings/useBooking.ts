import { useQuery } from '@tanstack/react-query';
import { useParams } from '@remix-run/react';

import { getBooking } from '../../services/apiBookings';

export default function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return {
    isLoading,
    booking,
    error,
  };
}
