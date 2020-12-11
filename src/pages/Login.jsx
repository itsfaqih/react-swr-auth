import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function Login() {
  const auth = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND}/login.php`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          auth.login(json.data.token);
        } else {
          setError(json.message);
          setIsLoading(false);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" id="password" name="password" onChange={handleChange} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/">Back to home</Link>
    </div>
  );
}
