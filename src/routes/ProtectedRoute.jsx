import { Redirect } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function ProtectedRoute({ component: Component, reverse, ...props }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }
  if (!auth.isLogin) {
    if (reverse === true) {
      return <Component {...props} />;
    }
    return <Redirect to="/" />;
  }
  if (reverse === true) {
    return <Redirect to="/" />;
  }
  return <Component {...props} />;
}
