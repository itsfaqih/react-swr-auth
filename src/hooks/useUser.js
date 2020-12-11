import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useAuth from './useAuth';

export default function useUser() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  // Get user data
  const { data, error, mutate } = useSWR(
    token ? `${process.env.REACT_APP_BACKEND}/me.php` : null,
    url =>
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => res.json()),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      setUser(null);
    }
  }, [data, error]);

  return { user, mutate };
}
