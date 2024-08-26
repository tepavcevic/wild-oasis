import {
  ClientLoaderFunctionArgs,
  redirect,
  useLoaderData,
} from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';

import CheckinBooking from '#/features/check-in-out/CheckinBooking';
import { requireAuthenticatedUser } from '#/services/authGuards';
import { queryClient } from '#/query/client';
import { Booking as BookingType } from '#/features/bookings/types';
import { bookingQuery } from '#/query/options';
import ErrorFallback from '#/ui/ErrorFallback';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  await requireAuthenticatedUser();

  const { bookingId } = params;
  if (!bookingId) throw redirect('/bookings');

  const booking = (await queryClient.ensureQueryData({
    ...bookingQuery(bookingId),
  })) as BookingType;

  if (!booking) throw redirect('/bookings');

  return booking;
}
export default function Checkin() {
  const initialData = useLoaderData<typeof clientLoader>();
  const { data: booking, isLoading } = useQuery({
    ...bookingQuery(initialData.id.toString()),
    initialData,
  });
  return <CheckinBooking booking={booking} isLoading={isLoading} />;
}

export function ErrorBoundary() {
  return (
    <ErrorFallback
      statusHandlers={{
        404: ({ params }) => (
          <p>Booking with the id {params.bookingId} not found</p>
        ),
      }}
    />
  );
}
