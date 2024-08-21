import { MouseEventHandler } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSignup from './useSignup';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignupFormData>();

  const { signup, isLoading } = useSignup();

  const onSubmit = ({ fullName, email, password }: SignupFormData) => {
    if (!fullName || !email || !password) return;

    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'This field is required' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          // type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Provide a valid email address',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs minimum of 8 characters',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={reset as unknown as MouseEventHandler<HTMLButtonElement>}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>
            {!isLoading ? 'Create new user' : <SpinnerMini />}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
