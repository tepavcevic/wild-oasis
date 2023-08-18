import { styled } from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var() (--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoutes({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate('/');

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}
