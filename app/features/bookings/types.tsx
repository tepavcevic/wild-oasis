export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numOfNights: number;
  numOfGuests: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  guests: {
    fullName: string;
    email: string;
  };
  cabins: {
    name: string;
  };
};

export type ChartBooking = {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
};

export type BookingForView = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numOfNights: number;
  numOfGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  cabins: {
    id: number;
    name: string;
    image: string;
    discount: number;
    created_at: string;
    description: string;
    maxCapacity: number;
    regularPrice: number;
  };
  guests: {
    id: number;
    email: string;
    fullName: string;
    created_at: string;
    nationalID: string;
    country: string;
    countryFlag: string;
    nationality: string;
  };
};
