import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useProvideAuth } from '../hooks';
import { AuthContext } from '../contexts';
import { Home, Login, Profile } from '../pages';
import ProtectedRoute from './ProtectedRoute';

export default function Routes() {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Switch>
          <ProtectedRoute component={Profile} path="/profile" />
          <ProtectedRoute component={Login} path="/login" reverse={true} />
          <Route component={Home} path="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
