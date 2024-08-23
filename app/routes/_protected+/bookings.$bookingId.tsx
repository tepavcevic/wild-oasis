import {
  redirect,
  type ClientLoaderFunctionArgs,
  useLoaderData,
  json,
} from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';

import BookingDetail from '#/features/bookings/BookingDetail';
import { requireAuthenticatedUser } from '#/services/authGuards';
import { queryClient } from '#/query/client';
import { Booking as BookingType } from '#/features/bookings/types';
import { bookingQuery } from '#/query/options';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  await requireAuthenticatedUser();

  const { bookingId } = params;
  if (!bookingId) throw redirect('/bookings');

  const booking = (await queryClient.ensureQueryData({
    ...bookingQuery(bookingId),
  })) as BookingType;

  if (!booking) throw redirect('/bookings');

  return json(booking);
}

function Booking() {
  const initialData = useLoaderData<typeof clientLoader>();
  const { data: booking, isLoading } = useQuery({
    ...bookingQuery(initialData.id.toString()),
    initialData,
  });

  return <BookingDetail booking={booking} isLoading={isLoading} />;
}

export default Booking;
