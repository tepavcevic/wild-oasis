export type ConfirmedStay = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numOfNights: number;
  numOfGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  guests: {
    fullName: string;
  };
};

export type Stay = {
  duration: string;
  value: number;
  color: string;
};
