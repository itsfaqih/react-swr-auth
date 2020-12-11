import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useProvideAuth() {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(!!JSON.parse(localStorage.getItem('isLogin')));
  const [isLoading, setIsLoading] = useState(true);

  const login = token => {
    localStorage.setItem('isLogin', true);
    setToken(token);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem('isLogin');
    setToken(null);
    setIsLogin(false);
  };

  // Refresh token for persisting session
  const { data, error, isValidating } = useSWR(
    isLogin ? `${process.env.REACT_APP_BACKEND}/refresh-token.php` : null,
    url =>
      fetch(url, {
        credentials: 'include',
      }).then(res => res.json()),
    { 
      // Silently refresh token every expiry time
      refreshInterval: 1000 * 60 * 15,
      revalidateOnFocus: false
    }
  );

  useEffect(() => {
    if (data) {
      login(data.accessToken);
    }
    if (error) {
      logout();
    }
    setIsLoading(isValidating);
  }, [data, error, isValidating]);

  useEffect(() => {
    // Sync all tabs on login or logout
    window.addEventListener('storage', e => {
      if (e.key === 'isLogin') {
        setIsLogin(e.newValue);
      }
    });
  });

  return { token, login, logout, isLogin, isLoading };
}
