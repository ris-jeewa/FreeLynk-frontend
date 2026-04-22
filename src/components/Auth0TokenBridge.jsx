import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAccessTokenGetter } from '../api/apiClient';

export const Auth0TokenBridge = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setAccessTokenGetter(() => getAccessTokenSilently());
    } else {
      setAccessTokenGetter(null);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
};
