import { useContext } from 'react';
import { AuthContext } from '../contexts';

export default function useAuth() {
  return useContext(AuthContext);
}
