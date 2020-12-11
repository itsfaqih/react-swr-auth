import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <h1>Welcome!</h1>
      {auth.isLogin ? (
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={auth.logout}>Log out</button>
          </li>
        </ul>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
