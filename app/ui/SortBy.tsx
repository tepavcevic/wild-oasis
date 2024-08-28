import { useSearchParams } from '@remix-run/react';
import { ChangeEvent } from 'react';

import Select from './Select';

type SortByProps = {
  options: Array<{ value: string; label: string }>;
};

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
