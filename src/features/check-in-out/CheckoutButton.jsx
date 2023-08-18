import useCheckout from './useCheckout';
import Button from '../../ui/Button';

function CheckoutButton({ bookingId }) {
  const { checkout, ischeckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={ischeckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
