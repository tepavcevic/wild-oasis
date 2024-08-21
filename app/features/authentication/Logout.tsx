import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '#/ui/ButtonIcon';
import useLogout from './useLogout';
import SpinnerMini from '#/ui/SpinnerMini';
import { Form } from '@remix-run/react';

export default function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Form action="/logout" method="post">
      <ButtonIcon disabled={isLoading}>
        {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
      </ButtonIcon>
    </Form>
  );
}
