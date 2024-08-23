import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

import { useMoveBack } from '#/hooks/useMoveBack';
import { formatCurrency } from '#/utils/helpers';
import useSettings from '#/features/settings/useSettings';
import useCheckin from './useCheckin';
import BookingDataBox from '#/features/bookings/BookingDataBox';
import Row from '#/ui/Row';
import Heading from '#/ui/Heading';
import ButtonGroup from '#/ui/ButtonGroup';
import Button from '#/ui/Button';
import ButtonText from '#/ui/ButtonText';
import Spinner from '#/ui/Spinner';
import Checkbox from '#/ui/Checkbox';
import Empty from '#/ui/Empty';
import { BookingForView } from '#/features/bookings/types';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking({
  booking,
  isLoading,
}: {
  booking: BookingForView;
  isLoading: boolean;
}) {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  if (booking?.status === 'checked-in' || booking?.status === 'checked-out')
    return <Empty resource="booking to check in" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numOfGuests,
    hasBreakfast,
    numOfNights,
  } = booking || {};

  const optionalBreakfastPrice =
    settings.breakfastPrice * numOfGuests * numOfNights;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      return checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    }

    checkin({ bookingId });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} +
                ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
