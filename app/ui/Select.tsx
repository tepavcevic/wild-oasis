import { ComponentProps } from 'react';
import { styled } from 'styled-components';

type SelectProps = {
  options: Array<{ value: string; label: string }>;
  props: ComponentProps<'select'>;
  type?: 'white' | 'grey';
};

type StyledSelectProps = Omit<SelectProps, 'options'>;

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props: StyledSelectProps) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({ options, type, ...props }: SelectProps) {
  return (
    <StyledSelect {...props} type={type || 'grey'}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
