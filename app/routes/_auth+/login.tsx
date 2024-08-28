import {
  type ClientActionFunctionArgs,
  redirect,
  useNavigation,
  useRouteError,
  useSubmit,
} from '@remix-run/react';

import { styled } from 'styled-components';

import Logo from '#/ui/Logo';
import Heading from '#/ui/Heading';
import FormRowVertical from '#/ui/FormRowVertical';
import Input from '#/ui/Input';
import Button from '#/ui/Button';
import SpinnerMini from '#/ui/SpinnerMini';
import { login as loginApi } from '#/services/apiAuth';
import { queryClient } from '#/query/client';
import ErrorFallback from '#/ui/ErrorFallback';
import { FormEvent } from 'react';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const { user } = await loginApi({ email, password });
  if (user?.role === 'authenticated') {
    queryClient.setQueryData(['user'], user);
    return redirect('/dashboard');
  }
  return null;
}

function Login() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  const submit = useSubmit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    submit(formData, {
      method: 'post',
      action: '/login',
    });
  };

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login to to your account</Heading>
      <form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            name="email"
            // This makes this form better for password managers
            autoComplete="username"
            defaultValue="djordje@example.com"
            required
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            defaultValue="testPassword"
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading} type="submit">
            {!isLoading ? 'Login' : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </form>
    </LoginLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return error ? <ErrorFallback error={error as Error} /> : null;
}

export default Login;
