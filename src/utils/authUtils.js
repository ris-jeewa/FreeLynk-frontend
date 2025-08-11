// Authentication utility functions

export const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken');
  return !!authToken;
};

export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const setAuthData = (token, user) => {
  if (token) {
    localStorage.setItem('authToken', token);
  }
  if (user) {
    localStorage.setItem('userData', JSON.stringify(user));
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Check if user should be redirected to login
export const shouldRedirectToLogin = (isAuth0Authenticated, isAuth0Loading) => {
  const hasCustomAuth = isAuthenticated();
  return !isAuth0Authenticated && !hasCustomAuth && !isAuth0Loading;
};

// Get combined authentication status
export const getAuthStatus = (isAuth0Authenticated, isAuth0Loading) => {
  const hasCustomAuth = isAuthenticated();
  return {
    isAuthenticated: isAuth0Authenticated || hasCustomAuth,
    isLoading: isAuth0Loading,
    hasCustomAuth,
    hasAuth0Auth: isAuth0Authenticated
  };
}; 