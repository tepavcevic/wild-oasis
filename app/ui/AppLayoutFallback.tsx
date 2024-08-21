import { styled } from 'styled-components';

import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var() (--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AppLayoutFallback() {
  return (
    <FullPage>
      <Spinner />
    </FullPage>
  );
}
