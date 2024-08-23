import { queryOptions } from '@tanstack/react-query';

import { getBooking } from '#/services/apiBookings';
import { getCurrentUser } from '#/services/apiAuth';

export const userQuery = queryOptions({
  queryKey: ['user'],
  queryFn: () => getCurrentUser(),
});

export const bookingQuery = (bookingId: string) =>
  queryOptions({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });
