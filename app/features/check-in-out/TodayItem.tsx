import { styled } from 'styled-components';
import { Link } from '@remix-run/react';

import CheckoutButton from './CheckoutButton';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import { Flag } from '../../ui/Flag';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

type Activity = {
  id: number;
  status: 'unconfirmed' | 'checked-in';
  guests: {
    fullName: string;
    country: string;
    countryFlag: string;
  };
  numOfNights: number;
};

type TodayItemProps = {
  activity: Activity;
};

export default function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, numOfNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numOfNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          variation="primary"
          size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
