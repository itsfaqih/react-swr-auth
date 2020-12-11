import { Link } from 'react-router-dom';
import { useUser } from '../hooks';

export default function Profile() {
  const { user } = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <Link to="/">Back to home</Link>
    </div>
  );
}
